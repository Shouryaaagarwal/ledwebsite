import { NextRequest, NextResponse } from 'next/server';
import {User} from '@/backend/models/User';
import dbConnect from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    console.log("🔑 Reset Password Debug - New password received:", password);
    console.log("🔑 Reset Password Debug - Token:", token);

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Verify token and get user
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() }
    });

    console.log("🔑 Reset Password Debug - User found:", user ? "Yes" : "No");
    console.log("🔑 Reset Password Debug - User email:", user?.email);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }

    // ✅ FIX: Just set the plain password - let the User model's pre-save middleware hash it
    user.password = password; // This will be automatically hashed by the pre-save middleware
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    
    await user.save();

    console.log("🔑 Reset Password Debug - Password reset completed for:", user.email);

    return NextResponse.json(
      { message: 'Password reset successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}