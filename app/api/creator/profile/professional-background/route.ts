import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { CreatorProfessionalBackground } from '@/backend/models/CreatorProfessionalBackground';
import dbConnect from '@/lib/mongodb';

// Type guards and validation
const isValidExperienceLevel = (level: any): level is 'beginner' | 'intermediate' | 'expert' => {
  return ['beginner', 'intermediate', 'expert'].includes(level);
};

const isValidYearsOfExperience = (years: any): boolean => {
  return ['0-1', '1-3', '3-5', '5-7', '7-10', '10+'].includes(years);
};

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const professionalBackground = await CreatorProfessionalBackground.findOne({ 
      userId: session.user.id 
    }).lean();

    if (!professionalBackground) {
      return NextResponse.json({ 
        professionalBackground: {
          professionalTitle: '',
          bio: '',
          resumeUrl: '',
          experienceLevel: 'beginner',
          yearsOfExperience: '0-1',
          completed: false
        }
      });
    }

    return NextResponse.json({ professionalBackground });
  } catch (error) {
    console.error('Error fetching professional background:', error);
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
      professionalTitle: body.professionalTitle?.trim() || '',
      bio: body.bio?.trim() || '',
      resumeUrl: body.resumeUrl?.trim() || '',
      experienceLevel: isValidExperienceLevel(body.experienceLevel) ? body.experienceLevel : 'beginner',
      yearsOfExperience: isValidYearsOfExperience(body.yearsOfExperience) ? body.yearsOfExperience : '0-1',
      completed: true
    };

    // Find or create professional background
    let professionalBackground = await CreatorProfessionalBackground.findOne({ 
      userId: session.user.id 
    });

    if (!professionalBackground) {
      // Create new professional background
      professionalBackground = new CreatorProfessionalBackground({ 
        userId: session.user.id,
        ...sanitizedData
      });
    } else {
      // Update existing professional background
      Object.assign(professionalBackground, sanitizedData);
    }

    await professionalBackground.save();

    // Format the response
    const responseData = {
      professionalTitle: professionalBackground.professionalTitle,
      bio: professionalBackground.bio,
      resumeUrl: professionalBackground.resumeUrl,
      experienceLevel: professionalBackground.experienceLevel,
      yearsOfExperience: professionalBackground.yearsOfExperience,
      completed: professionalBackground.completed
    };

    return NextResponse.json({   
      success: true,
      message: 'Professional background saved successfully',
      professionalBackground: responseData
    });
  } catch (error: any) {
    console.error('Error saving professional background:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to save professional background',
        details: error.message 
      },
      { status: 400 }
    );
  }
}