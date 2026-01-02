import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { CreatorWorkExperience } from '@/backend/models/CreatorWorkExperience';
import dbConnect from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const workExperience = await CreatorWorkExperience.findOne({ 
      userId: session.user.id 
    }).lean();

    if (!workExperience) {
      return NextResponse.json({ 
        workExperience: {
          workExperiences: [],
          completed: false
        }
      });
    }

    return NextResponse.json({ workExperience });
  } catch (error) {
    console.error('Error fetching work experience:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    // Validate and sanitize input data
    const sanitizedData = {
      workExperiences: Array.isArray(body.workExperiences) ? body.workExperiences.map((exp: any) => ({
        id: exp.id?.toString() || Date.now().toString(),
        title: exp.title?.trim() || '',
        company: exp.company?.trim() || '',
        location: exp.location?.trim() || '',
        country: exp.country?.trim() || '',
        currentlyWorking: Boolean(exp.currentlyWorking),
        startDate: exp.startDate?.trim() || '',
        endDate: exp.currentlyWorking ? '' : (exp.endDate?.trim() || ''),
        description: exp.description?.trim() || '',
        workLetterUrl: exp.workLetterUrl || '',
        workLetterName: exp.workLetterName || '',
        completed: true
      })) : [],
      completed: body.workExperiences?.length > 0
    };

    // Find or create work experience
    let workExperience = await CreatorWorkExperience.findOne({ 
      userId: session.user.id 
    });

    if (!workExperience) {
      // Create new work experience
      workExperience = new CreatorWorkExperience({ 
        userId: session.user.id,
        ...sanitizedData
      });
    } else {
      // Update existing work experience
      Object.assign(workExperience, sanitizedData);
    }

    await workExperience.save();

    // Format the response
    const responseData = {
      workExperiences: workExperience.workExperiences,
      completed: workExperience.completed
    };

    return NextResponse.json({   
      success: true,
      message: 'Work experience saved successfully',
      workExperience: responseData
    });
  } catch (error: any) {
    console.error('Error saving work experience:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to save work experience',
        details: error.message 
      },
      { status: 400 }
    );
  }
}