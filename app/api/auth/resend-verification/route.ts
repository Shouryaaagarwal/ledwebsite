import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { User } from '@/backend/models/User'
import { sendVerificationEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    await dbConnect();

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // Check if already verified
    if (user.emailVerified) {
      return NextResponse.json(
        { error: "Email is already verified" },
        { status: 400 }
      )
    }

    // Generate new email verification token
    const newEmailToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    // Update user with new token
    await User.updateOne(
      { email: email.toLowerCase() },
      { 
        $set: { 
          emailToken: newEmailToken,
          updatedAt: new Date()
        }
      }
    );

    // Send verification email
    await sendVerificationEmail(email, newEmailToken, user.firstName);

    return NextResponse.json(
      { 
        message: "Verification email sent successfully" 
      },
      { status: 200 }
    )

  } catch (error: any) {
    console.error("Resend verification error:", error);
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}