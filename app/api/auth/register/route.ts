// import { NextResponse } from 'next/server'
// import bcrypt from 'bcryptjs'
// import clientPromise from '@/lib/mongodb'
// import { sendVerificationEmail } from '@/lib/email'

// export async function POST(request: Request) {
//   try {
//     const { firstName, lastName, email, password, role, emailUpdates } = await request.json()

//     if (!firstName || !lastName || !email || !password || !role) {
//       return NextResponse.json(
//         { error: "All fields are required" },
//         { status: 400 }
//       )
//     }

//     if (password.length < 8) {
//       return NextResponse.json(
//         { error: "Password must be at least 8 characters" },
//         { status: 400 }
//       )
//     }

//     if (!['client', 'creator'].includes(role)) {
//       return NextResponse.json(
//         { error: "Invalid role selected" },
//         { status: 400 }
//       )
//     }

//     const client = await clientPromise
//     const db = client.db()

//     // Check if user already exists
//     const existingUser = await db.collection("users").findOne({ email })
    
//     if (existingUser) {
//       return NextResponse.json(
//         { error: "User already exists with this email" },
//         { status: 400 }
//       )
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 12)

//     // Generate email verification token
//     const emailToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

//     // Create user
//     const result = await db.collection("users").insertOne({
//       name: `${firstName} ${lastName}`,
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword,
//       role,
//       emailUpdates: emailUpdates || false,
//       emailVerified: null,
//       emailToken,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     })

//     // Send verification email
//     await sendVerificationEmail(email, emailToken, firstName)

//     return NextResponse.json(
//       { 
//         message: "User created successfully. Please check your email for verification.", 
//         userId: result.insertedId 
//       },
//       { status: 201 }
//     )

//   } catch (error) {
//     console.error("Registration error:", error)
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     )
//   }
// }


import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { User } from '@/backend/models/User'
import { sendVerificationEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password, role, emailUpdates } = await request.json()

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !role) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      )
    }

    // Validate role
    if (!['client', 'creator'].includes(role)) {
      return NextResponse.json(
        { error: "Invalid role selected" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists with this email" },
        { status: 400 }
      )
    }

    // Generate email verification token
    const emailToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    // Create user
    const user = await User.create({
      name: `${firstName} ${lastName}`,
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
      role,
      emailUpdates: emailUpdates || false,
      emailVerified: null,
      emailToken,
    });

    // Send verification email
    await sendVerificationEmail(email, emailToken, firstName);

    return NextResponse.json(
      { 
        message: "User created successfully. Please check your email for verification.", 
        userId: user._id 
      },
      { status: 201 }
    )

  } catch (error: any) {
    console.error("Registration error:", error);
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: errors.join(', ') },
        { status: 400 }
      );
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "User already exists with this email" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}