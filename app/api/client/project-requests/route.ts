import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { ProjectRequest } from '@/backend/models/ProjectRequest';
import dbConnect from '@/lib/mongodb';

// Type validation
const isValidStatus = (status: any): boolean => {
  return ['pending', 'under_review', 'accepted', 'rejected', 'completed'].includes(status);
};

const isValidPricingStatus = (status: any): boolean => {
  return ['counter_sent', 'accepted', 'rejected', 'pending'].includes(status);
};

// GET - Get all project requests for creator
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Optional query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const projectType = searchParams.get('projectType');
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    // Build query
    const query: any = { creatorId: session.user.id };
    
    if (status && isValidStatus(status)) {
      query.status = status;
    }
    
    if (projectType) {
      query.projectType = { $regex: projectType, $options: 'i' };
    }

    const projectRequests = await ProjectRequest.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalCount = await ProjectRequest.countDocuments(query);

    return NextResponse.json({
      success: true,
      projectRequests,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching project requests:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create a new project request
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    // Validate required fields
    if (!body.projectTitle?.trim()) {
      return NextResponse.json(
        { error: 'Project title is required' },
        { status: 400 }
      );
    }

    if (!body.projectType?.trim()) {
      return NextResponse.json(
        { error: 'Project type is required' },
        { status: 400 }
      );
    }

    if (!body.projectDescription?.trim()) {
      return NextResponse.json(
        { error: 'Project description is required' },
        { status: 400 }
      );
    }

    if (!body.deadline) {
      return NextResponse.json(
        { error: 'Deadline is required' },
        { status: 400 }
      );
    }

    if (!body.pricingBlock?.clientAskedPrice || body.pricingBlock.clientAskedPrice <= 0) {
      return NextResponse.json(
        { error: 'Valid client asked price is required' },
        { status: 400 }
      );
    }

    if (!body.pricingBlock?.yourPrice || body.pricingBlock.yourPrice <= 0) {
      return NextResponse.json(
        { error: 'Valid your price is required' },
        { status: 400 }
      );
    }

    // Sanitize and create project request
    const projectRequestData = {
      creatorId: session.user.id,
      projectTitle: body.projectTitle.trim(),
      projectType: body.projectType.trim(),
      receivedTime: body.receivedTime ? new Date(body.receivedTime) : new Date(),
      projectDescription: body.projectDescription.trim(),
      deadline: new Date(body.deadline),
      referenceFiles: Array.isArray(body.referenceFiles) ? body.referenceFiles.map((file: any) => ({
        url: file.url?.trim() || '',
        name: file.name?.trim() || 'Unnamed File',
        fileType: file.fileType?.trim() || 'other',
        size: file.size || 0
      })) : [],
      pricingBlock: {
        clientAskedPrice: parseFloat(body.pricingBlock.clientAskedPrice),
        yourPrice: parseFloat(body.pricingBlock.yourPrice),
        reason: body.pricingBlock.reason?.trim() || undefined,
        accepted: false,
        status: 'pending' as const
      },
      status: 'pending' as const,
      isActive: true
    };

    const projectRequest = new ProjectRequest(projectRequestData);
    await projectRequest.save();

    return NextResponse.json({
      success: true,
      message: 'Project request created successfully',
      projectRequest
    });
  } catch (error: any) {
    console.error('Error creating project request:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to create project request',
        details: error.message 
      },
      { status: 400 }
    );
  }
}