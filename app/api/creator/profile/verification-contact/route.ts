import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { CreatorVerificationContact}  from '@/backend/models/CreatorVerificationContact';
import dbConnect from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const verificationContact = await CreatorVerificationContact.findOne({ 
      userId: session.user.id 
    }).lean();

    if (!verificationContact) {
      return NextResponse.json({ 
        success: true,
        verificationContact: {
          phoneNumber: '',
          phoneVerified: false,
          governmentIdName: '',
          address: '',
          postalCode: '',
          emergencyContact: {
            name: '',
            phoneNumber: '',
            relationship: ''
          },
          agreedToTerms: false,
          completed: false
        }
      });
    }

    return NextResponse.json({ 
      success: true,
      verificationContact 
    });
  } catch (error) {
    console.error('Error fetching verification contact:', error);
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
    
    console.log('Received verification data:', body); // Debug log

    // Validate required fields
    if (!body.phoneNumber?.trim()) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    if (!body.address?.trim()) {
      return NextResponse.json(
        { error: 'Address is required' },
        { status: 400 }
      );
    }

    if (!body.postalCode?.trim()) {
      return NextResponse.json(
        { error: 'Postal code is required' },
        { status: 400 }
      );
    }

    if (!body.emergencyContact?.name?.trim()) {
      return NextResponse.json(
        { error: 'Emergency contact name is required' },
        { status: 400 }
      );
    }

    if (!body.emergencyContact?.phoneNumber?.trim()) {
      return NextResponse.json(
        { error: 'Emergency contact phone number is required' },
        { status: 400 }
      );
    }

    if (!body.emergencyContact?.relationship?.trim()) {
      return NextResponse.json(
        { error: 'Emergency contact relationship is required' },
        { status: 400 }
      );
    }

    if (!body.agreedToTerms) {
      return NextResponse.json(
        { error: 'You must agree to the terms and conditions' },
        { status: 400 }
      );
    }

    // Prepare data for saving
    const verificationData: any = {
      phoneNumber: body.phoneNumber.trim(),
      address: body.address.trim(),
      postalCode: body.postalCode.trim(),
      emergencyContact: {
        name: body.emergencyContact.name.trim(),
        phoneNumber: body.emergencyContact.phoneNumber.trim(),
        relationship: body.emergencyContact.relationship
      },
      agreedToTerms: Boolean(body.agreedToTerms),
      phoneVerified: Boolean(body.phoneVerified),
      completed: true
    };

    // Add phone verification timestamp if verified
    if (body.phoneVerified) {
      verificationData.phoneVerifiedAt = new Date();
    }

    // Add terms agreement timestamp
    if (body.agreedToTerms) {
      verificationData.agreedToTermsAt = new Date();
    }

    // Add government ID info if provided
    if (body.governmentIdName) {
      verificationData.governmentIdName = body.governmentIdName;
      // In a real app, you'd handle file upload separately and store the URL
    }

    // Find or create verification contact
    let verificationContact = await CreatorVerificationContact.findOne({ 
      userId: session.user.id 
    });

    if (!verificationContact) {
      // Create new verification contact
      verificationContact = new CreatorVerificationContact({ 
        userId: session.user.id,
        ...verificationData
      });
    } else {
      // Update existing verification contact
      Object.assign(verificationContact, verificationData);
    }

    await verificationContact.save();

    return NextResponse.json({   
      success: true,
      message: 'Verification and contact information saved successfully',
      verificationContact
    });
  } catch (error: any) {
    console.error('Error saving verification contact:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to save verification and contact information',
        details: error.message 
      },
      { status: 400 }
    );
  }
}

// API route for phone verification (simulated)
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    // Find verification contact
    const verificationContact = await CreatorVerificationContact.findOne({ 
      userId: session.user.id 
    });

    if (!verificationContact) {
      return NextResponse.json(
        { error: 'Verification contact not found' },
        { status: 404 }
      );
    }

    // Simulate phone verification
    verificationContact.phoneVerified = true;
    verificationContact.phoneVerifiedAt = new Date();
    
    await verificationContact.save();

    return NextResponse.json({   
      success: true,
      message: 'Phone number verified successfully',
      verificationContact
    });
  } catch (error: any) {
    console.error('Error verifying phone:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to verify phone number',
        details: error.message 
      },
      { status: 400 }
    );
  }
}