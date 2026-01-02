import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { ProjectRequest } from '@/backend/models/ProjectRequest';
import dbConnect from '@/lib/mongodb';

// GET - Get single project request
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const projectRequest = await ProjectRequest.findOne({
      _id: params.id,
      creatorId: session.user.id
    }).lean();

    if (!projectRequest) {
      return NextResponse.json(
        { error: 'Project request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      projectRequest
    });
  } catch (error) {
    console.error('Error fetching project request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH - Update project request (including pricing)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const projectRequest = await ProjectRequest.findOne({
      _id: params.id,
      creatorId: session.user.id
    });

    if (!projectRequest) {
      return NextResponse.json(
        { error: 'Project request not found' },
        { status: 404 }
      );
    }

    // Update basic fields
    if (body.projectTitle?.trim()) {
      projectRequest.projectTitle = body.projectTitle.trim();
    }

    if (body.projectType?.trim()) {
      projectRequest.projectType = body.projectType.trim();
    }

    if (body.projectDescription?.trim()) {
      projectRequest.projectDescription = body.projectDescription.trim();
    }

    if (body.deadline) {
      projectRequest.deadline = new Date(body.deadline);
    }

    // Update reference files
    if (Array.isArray(body.referenceFiles)) {
      projectRequest.referenceFiles = body.referenceFiles.map((file: any) => ({
        url: file.url?.trim() || '',
        name: file.name?.trim() || 'Unnamed File',
        fileType: file.fileType?.trim() || 'other',
        size: file.size || 0,
        uploadedAt: file.uploadedAt ? new Date(file.uploadedAt) : new Date()
      }));
    }

    // Update pricing block
    if (body.pricingBlock) {
      if (typeof body.pricingBlock.yourPrice === 'number' && body.pricingBlock.yourPrice > 0) {
        projectRequest.pricingBlock.yourPrice = body.pricingBlock.yourPrice;
        
        // If price is updated, set status to counter sent
        if (body.pricingBlock.yourPrice !== projectRequest.pricingBlock.clientAskedPrice) {
          projectRequest.pricingBlock.status = 'counter_sent';
          projectRequest.pricingBlock.counterSentAt = new Date();
          projectRequest.status = 'under_review';
        }
      }

      if (body.pricingBlock.reason !== undefined) {
        projectRequest.pricingBlock.reason = body.pricingBlock.reason?.trim() || undefined;
      }

      if (body.pricingBlock.accepted !== undefined) {
        projectRequest.pricingBlock.accepted = Boolean(body.pricingBlock.accepted);
        if (body.pricingBlock.accepted) {
          projectRequest.pricingBlock.status = 'accepted';
          projectRequest.pricingBlock.acceptedAt = new Date();
          projectRequest.status = 'accepted';
        }
      }

      if (body.pricingBlock.status) {
        projectRequest.pricingBlock.status = body.pricingBlock.status;
      }
    }

    // Update status
    if (body.status) {
      projectRequest.status = body.status;
    }

    // Update isActive
    if (body.isActive !== undefined) {
      projectRequest.isActive = Boolean(body.isActive);
    }

    await projectRequest.save();

    return NextResponse.json({
      success: true,
      message: 'Project request updated successfully',
      projectRequest
    });
  } catch (error: any) {
    console.error('Error updating project request:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to update project request',
        details: error.message 
      },
      { status: 400 }
    );
  }
}

// DELETE - Delete (soft delete) project request
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const projectRequest = await ProjectRequest.findOne({
      _id: params.id,
      creatorId: session.user.id
    });

    if (!projectRequest) {
      return NextResponse.json(
        { error: 'Project request not found' },
        { status: 404 }
      );
    }

    // Soft delete by marking as inactive
    projectRequest.isActive = false;
    projectRequest.status = 'rejected';
    await projectRequest.save();

    return NextResponse.json({
      success: true,
      message: 'Project request deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting project request:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to delete project request',
        details: error.message 
      },
      { status: 400 }
    );
  }
}