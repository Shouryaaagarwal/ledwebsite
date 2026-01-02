import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { CreatorRateAvailability } from '@/backend/models/CreatorRateAvailability';
import dbConnect from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const rateAvailability = await CreatorRateAvailability.findOne({ 
      userId: session.user.id 
    }).lean();

    if (!rateAvailability) {
      return NextResponse.json({ 
        success: true,
        rateAvailability: {
          pricingType: 'hourly',
          hourlyRate: '',
          minimumBudget: '',
          weeklyAvailability: '20',
          availabilityStatus: 'active',
          workWithInternational: true,
          currency: '₹',
          completed: false
        }
      });
    }

    // Convert numbers to strings for frontend display
    const formattedData = {
      ...rateAvailability,
      hourlyRate: rateAvailability.hourlyRate?.toString() || '',
      minimumBudget: rateAvailability.minimumBudget?.toString() || ''
    };

    return NextResponse.json({ 
      success: true,
      rateAvailability: formattedData
    });
  } catch (error) {
    console.error('Error fetching rate availability:', error);
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
    
    console.log('Received data:', body); // Debug log

    // Validate and sanitize input data
    const sanitizedData: any = {
      pricingType: body.pricingType || 'hourly',
      weeklyAvailability: body.weeklyAvailability || '20',
      availabilityStatus: body.availabilityStatus || 'active',
      workWithInternational: Boolean(body.workWithInternational),
      currency: body.currency || '₹',
      completed: true
    };

    // Handle hourly rate conversion
    if (body.pricingType === 'hourly' && body.hourlyRate) {
      const hourlyRate = parseFloat(body.hourlyRate);
      if (!isNaN(hourlyRate) && hourlyRate > 0) {
        sanitizedData.hourlyRate = hourlyRate;
        sanitizedData.minimumBudget = undefined; // Clear project rate
      } else {
        return NextResponse.json(
          { error: 'Please enter a valid hourly rate' },
          { status: 400 }
        );
      }
    }

    // Handle project budget conversion
    if (body.pricingType === 'project' && body.minimumBudget) {
      const minimumBudget = parseFloat(body.minimumBudget);
      if (!isNaN(minimumBudget) && minimumBudget > 0) {
        sanitizedData.minimumBudget = minimumBudget;
        sanitizedData.hourlyRate = undefined; // Clear hourly rate
      } else {
        return NextResponse.json(
          { error: 'Please enter a valid minimum budget' },
          { status: 400 }
        );
      }
    }

    // Validate required fields
    if (sanitizedData.pricingType === 'hourly' && !sanitizedData.hourlyRate) {
      return NextResponse.json(
        { error: 'Hourly rate is required for hourly pricing' },
        { status: 400 }
      );
    }

    if (sanitizedData.pricingType === 'project' && !sanitizedData.minimumBudget) {
      return NextResponse.json(
        { error: 'Minimum budget is required for project-based pricing' },
        { status: 400 }
      );
    }

    // Find or create rate availability
    let rateAvailability = await CreatorRateAvailability.findOne({ 
      userId: session.user.id 
    });

    if (!rateAvailability) {
      // Create new rate availability
      rateAvailability = new CreatorRateAvailability({ 
        userId: session.user.id,
        ...sanitizedData
      });
    } else {
      // Update existing rate availability
      Object.assign(rateAvailability, sanitizedData);
    }

    await rateAvailability.save();

    // Return formatted response for frontend
    const responseData = {
      ...rateAvailability.toObject(),
      hourlyRate: rateAvailability.hourlyRate?.toString() || '',
      minimumBudget: rateAvailability.minimumBudget?.toString() || ''
    };

    return NextResponse.json({   
      success: true,
      message: 'Rate and availability saved successfully',
      rateAvailability: responseData
    });
  } catch (error: any) {
    console.error('Error saving rate availability:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to save rate and availability',
        details: error.message 
      },
      { status: 400 }
    );
  }
}