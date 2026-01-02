import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { CreatorPortfolioShowcase } from '@/backend/models/CreatorPortfolioShowcase';
import dbConnect from '@/lib/mongodb';

// Helper function to determine file type
const getFileType = (fileName: string, fileType: string): string => {
  if (fileType.startsWith('video/')) return 'video';
  if (fileType.startsWith('image/')) return 'image';
  if (fileType === 'application/zip' || fileName.endsWith('.zip')) return 'zip';
  return 'other';
};

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const portfolioShowcase = await CreatorPortfolioShowcase.findOne({ 
      userId: session.user.id 
    }).lean();

    if (!portfolioShowcase) {
      return NextResponse.json({ 
        portfolioShowcase: {
          portfolioItems: [],
          completed: false
        }
      });
    }

    return NextResponse.json({ portfolioShowcase });
  } catch (error) {
    console.error('Error fetching portfolio showcase:', error);
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
      portfolioItems: Array.isArray(body.portfolioItems) ? body.portfolioItems.map((item: any) => ({
        id: item.id?.toString() || Date.now().toString(),
        title: item.title?.trim() || '',
        description: item.description?.trim() || '',
        category: item.category?.trim() || '',
        externalLink: item.externalLink?.trim() || '', // Now optional
        files: Array.isArray(item.files) ? item.files.map((file: any) => ({
          url: file.url || '',
          name: file.name?.trim() || '',
          size: typeof file.size === 'number' ? file.size : 0,
          type: getFileType(file.name || '', file.type || ''),
          uploadedAt: file.uploadedAt ? new Date(file.uploadedAt) : new Date()
        })) : [],
        completed: Boolean(item.completed),
        completedAt: item.completedAt ? new Date(item.completedAt) : undefined
      })) : [],
      completed: true
    };

    // Find or create portfolio showcase
    let portfolioShowcase = await CreatorPortfolioShowcase.findOne({ 
      userId: session.user.id 
    });

    if (!portfolioShowcase) {
      // Create new portfolio showcase
      portfolioShowcase = new CreatorPortfolioShowcase({ 
        userId: session.user.id,
        ...sanitizedData
      });
    } else {
      // Update existing portfolio showcase
      Object.assign(portfolioShowcase, sanitizedData);
    }

    await portfolioShowcase.save();

    // Format the response
    const responseData = {
      portfolioItems: portfolioShowcase.portfolioItems,
      completed: portfolioShowcase.completed
    };

    return NextResponse.json({   
      success: true,
      message: 'Portfolio showcase saved successfully',
      portfolioShowcase: responseData
    });
  } catch (error: any) {
    console.error('Error saving portfolio showcase:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to save portfolio showcase',
        details: error.message 
      },
      { status: 400 }
    );
  }
}