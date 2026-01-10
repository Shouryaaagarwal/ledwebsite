// app/api/auth/check-verification/route.ts
import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { User } from '@/backend/models/User'

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    await dbConnect();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { exists: false, verified: false },
        { status: 200 }
      )
    }

    return NextResponse.json(
      { 
        exists: true, 
        verified: !!user.emailVerified,
        email: user.email,
        emailVerified: user.emailVerified
      },
      { status: 200 }
    )

  } catch (error) {
    console.error("Check verification error:", error)
    return NextResponse.json(
      { error: "Internal server error", exists: false, verified: false },
      { status: 500 }
    )
  }
}