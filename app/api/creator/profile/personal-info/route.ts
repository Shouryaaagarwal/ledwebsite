import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import  {CreatorPersonalInfo} from '@/backend/models/CreatorPersonalInfo';
import dbConnect from '@/lib/mongodb';

// Type guards and validation
const isValidGender = (gender: any): gender is 'male' | 'female' | 'non-binary' | 'prefer-not-to-say' => {
  return ['male', 'female', 'non-binary', 'prefer-not-to-say'].includes(gender);
};

const isValidDate = (date: any): boolean => {
  if (!date) return false;
  const d = new Date(date);
  return d instanceof Date && !isNaN(d.getTime());
};

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const personalInfo = await CreatorPersonalInfo.findOne({ userId: session.user.id }).lean();

    if (!personalInfo) {
      return NextResponse.json({ 
        personalInfo: {
          fullName: '',
          dateOfBirth: new Date().toISOString().split('T')[0],
          gender: undefined,
          profilePhoto: undefined,
          city: '',
          country: '',
          timeZone: 'Asia/Kolkata',
          spokenLanguages: [],
          personalStatement: '',
          completed: false
        }
      });
    }

    // Format the response
    const formattedInfo = {
      ...personalInfo,
      dateOfBirth: personalInfo.dateOfBirth 
        ? new Date(personalInfo.dateOfBirth).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0]
    };

    return NextResponse.json({ personalInfo: formattedInfo });
  } catch (error) {
    console.error('Error fetching personal info:', error);
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
      fullName: body.fullName?.trim() || '',
      dateOfBirth: isValidDate(body.dateOfBirth) ? new Date(body.dateOfBirth) : new Date(),
      gender: isValidGender(body.gender) ? body.gender : undefined,
      profilePhoto: body.profilePhoto?.trim() || undefined,
      city: body.city?.trim() || '',
      country: body.country?.trim() || '',
      timeZone: body.timeZone?.trim() || 'Asia/Kolkata',
      spokenLanguages: Array.isArray(body.spokenLanguages) ? body.spokenLanguages : [],
      personalStatement: body.personalStatement?.trim() || '',
      completed: true
    };

    // Find or create personal info
    let personalInfo = await CreatorPersonalInfo.findOne({ userId: session.user.id });

    if (!personalInfo) {
      // Create new personal info
      personalInfo = new CreatorPersonalInfo({ 
        userId: session.user.id,
        ...sanitizedData
      });
    } else {
      // Update existing personal info
      Object.assign(personalInfo, sanitizedData);
    }

    await personalInfo.save();

    // Format the response
    const responseData = {
      fullName: personalInfo.fullName,
      dateOfBirth: personalInfo.dateOfBirth 
        ? new Date(personalInfo.dateOfBirth).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
      gender: personalInfo.gender,
      profilePhoto: personalInfo.profilePhoto,
      city: personalInfo.city,
      country: personalInfo.country,
      timeZone: personalInfo.timeZone,
      spokenLanguages: personalInfo.spokenLanguages,
      personalStatement: personalInfo.personalStatement,
      completed: personalInfo.completed
    };

    return NextResponse.json({   
      success: true,
      message: 'Personal info saved successfully',
      personalInfo: responseData
    });
  } catch (error: any) {
    console.error('Error saving personal info:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to save personal information',
        details: error.message 
      },
      { status: 400 }
    );
  }
}