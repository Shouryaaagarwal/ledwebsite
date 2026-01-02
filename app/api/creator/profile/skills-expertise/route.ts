import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { CreatorSkillsAndExpertise } from '@/backend/models/CreatorSkillsAndExpertise';
import dbConnect from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const skillsAndExpertise = await CreatorSkillsAndExpertise.findOne({ 
      userId: session.user.id 
    }).lean();

    if (!skillsAndExpertise) {
      return NextResponse.json({ 
        skillsAndExpertise: {
          skills: [],
          categories: [],
          completed: false
        }
      });
    }

    return NextResponse.json({ skillsAndExpertise });
  } catch (error) {
    console.error('Error fetching skills and expertise:', error);
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
      skills: Array.isArray(body.skills) ? body.skills.map((skill: any) => ({
        id: skill.id?.toString() || Date.now().toString(),
        name: skill.name?.trim() || '',
        category: skill.category?.trim() || 'General'
      })) : [],
      categories: Array.isArray(body.categories) ? body.categories : [],
      completed: true
    };

    // Find or create skills and expertise
    let skillsAndExpertise = await CreatorSkillsAndExpertise.findOne({ 
      userId: session.user.id 
    });

    if (!skillsAndExpertise) {
      // Create new skills and expertise
      skillsAndExpertise = new CreatorSkillsAndExpertise({ 
        userId: session.user.id,
        ...sanitizedData
      });
    } else {
      // Update existing skills and expertise
      Object.assign(skillsAndExpertise, sanitizedData);
    }

    await skillsAndExpertise.save();

    // Format the response
    const responseData = {
      skills: skillsAndExpertise.skills,
      categories: skillsAndExpertise.categories,
      completed: skillsAndExpertise.completed
    };

    return NextResponse.json({   
      success: true,
      message: 'Skills and expertise saved successfully',
      skillsAndExpertise: responseData
    });
  } catch (error: any) {
    console.error('Error saving skills and expertise:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to save skills and expertise',
        details: error.message 
      },
      { status: 400 }
    );
  }
}