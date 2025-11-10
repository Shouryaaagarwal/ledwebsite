import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { sendPasswordResetEmail } from '@/lib/email';
import { User } from '@/backend/models/User';
import dbConnect from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if user exists
    const user = await User.findOne({ email });
    
    // For security, always return success even if user doesn't exist
    if (user) {
      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      // ✅ OPTION 1: Use the model method (if you added it to your User model)
      // user.setPasswordResetToken();
      // await user.save();

      // ✅ OPTION 2: Use findByIdAndUpdate to avoid validation issues
      await User.findByIdAndUpdate(
        user._id,
        {
          resetToken,
          resetTokenExpiry
        },
        { 
          runValidators: false, // Skip validation
          new: true 
        }
      );

      // Send email
      await sendPasswordResetEmail(email, resetToken);
    }

    // Always return success to prevent email enumeration
    return NextResponse.json(
      { message: 'If an account with that email exists, a reset link has been sent.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Failed to process reset request' },
      { status: 500 }
    );
  }
}