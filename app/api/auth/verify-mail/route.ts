// import { NextResponse } from 'next/server'
// import clientPromise from '@/lib/mongodb'

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url)
//     const token = searchParams.get('token')

//     if (!token) {
//       return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/auth/verification-error?error=invalid_token`)
//     }

//     const client = await clientPromise
//     const db = client.db()

//     // Find user with this token
//     const user = await db.collection("users").findOne({ emailToken: token })

//     if (!user) {
//       return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/auth/verification-error?error=invalid_token`)
//     }

//     // Update user as verified
//     await db.collection("users").updateOne(
//       { _id: user._id },
//       { 
//         $set: { 
//           emailVerified: new Date(),
//           emailToken: null,
//           updatedAt: new Date()
//         } 
//       }
//     )

//     // Redirect to success page
//     return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/auth/verification-success`)
    
//   } catch (error) {
//     console.error("Email verification error:", error)
//     return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/auth/verification-error?error=server_error`)
//   }
// }


// import { NextResponse } from 'next/server'
// import dbConnect from '@/lib/mongodb'
// import { User } from '@/backend/models/User'

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url)
//     const token = searchParams.get('token')

//     if (!token) {
//       return NextResponse.json(
//         { error: "Verification token is required" },
//         { status: 400 }
//       )
//     }

//     await dbConnect();

//     // Find user by verification token
//     const user = await User.findOne({ emailToken: token });

//     if (!user) {
//       return NextResponse.json(
//         { error: "Invalid or expired verification token" },
//         { status: 400 }
//       )
//     }

//     // Check if already verified
//     if (user.emailVerified) {
//       return NextResponse.json(
//         { message: "Email already verified" },
//         { status: 200 }
//       )
//     }

//     // Verify email and clear token
//     user.emailVerified = new Date();
//     user.emailToken = '';
//     await user.save();

//     return NextResponse.json(
//       { message: "Email verified successfully" },
//       { status: 200 }
//     )

//   } catch (error) {
//     console.error("Email verification error:", error)
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     )
//   }
// }

// // Optional: Add POST method for manual verification requests
// export async function POST(request: Request) {
//   try {
//     const { token } = await request.json();

//     if (!token) {
//       return NextResponse.json(
//         { error: "Verification token is required" },
//         { status: 400 }
//       )
//     }

//     await dbConnect();

//     const user = await User.findOne({ emailToken: token });

//     if (!user) {
//       return NextResponse.json(
//         { error: "Invalid or expired verification token" },
//         { status: 400 }
//       )
//     }

//     if (user.emailVerified) {
//       return NextResponse.json(
//         { message: "Email already verified" },
//         { status: 200 }
//       )
//     }

//     user.emailVerified = new Date();
//     user.emailToken = '';
//     await user.save();

//     return NextResponse.json(
//       { message: "Email verified successfully" },
//       { status: 200 }
//     )

//   } catch (error) {
//     console.error("Email verification error:", error)
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     )
//   }
// }



// import { NextResponse } from 'next/server'
// import dbConnect from '@/lib/mongodb'
// import { User } from '@/backend/models/User'

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url)
//     const token = searchParams.get('token')

//     if (!token) {
//       return NextResponse.json(
//         { error: "Verification token is required" },
//         { status: 400 }
//       )
//     }

//     await dbConnect();

//     // Use updateOne directly to avoid validation issues
//     const result = await User.updateOne(
//       { emailToken: token },
//       { 
//         $set: { 
//           emailVerified: new Date(),
//           // Don't set emailToken to empty string, use a placeholder or remove it
//         },
//         $unset: { emailToken: "" } // This removes the field entirely
//       }
//     );

//     // Check if any document was modified
//     if (result.matchedCount === 0) {
//       return NextResponse.json(
//         { error: "Invalid or expired verification token" },
//         { status: 400 }
//       )
//     }

//     // Check if already verified by querying the user
//     const user = await User.findOne({ emailToken: token });
//     if (user && user.emailVerified) {
//       return NextResponse.json(
//         { message: "Email already verified" },
//         { status: 200 }
//       )
//     }

//     return NextResponse.json(
//       { message: "Email verified successfully" },
//       { status: 200 }
//     )

//   } catch (error) {
//     console.error("Email verification error:", error)
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     )
//   }
// }

// export async function POST(request: Request) {
//   try {
//     const { token } = await request.json();

//     if (!token) {
//       return NextResponse.json(
//         { error: "Verification token is required" },
//         { status: 400 }
//       )
//     }

//     await dbConnect();

//     // Use updateOne to avoid validation
//     const result = await User.updateOne(
//       { emailToken: token },
//       { 
//         $set: { emailVerified: new Date() },
//         $unset: { emailToken: "" }
//       }
//     );

//     if (result.matchedCount === 0) {
//       return NextResponse.json(
//         { error: "Invalid or expired verification token" },
//         { status: 400 }
//       )
//     }

//     return NextResponse.json(
//       { message: "Email verified successfully" },
//       { status: 200 }
//     )

//   } catch (error) {
//     console.error("Email verification error:", error)
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     )
//   }
// } 


// import { NextResponse } from 'next/server'
// import dbConnect from '@/lib/mongodb'
// import { User } from '@/backend/models/User'

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url)
//     const token = searchParams.get('token')

//     if (!token) {
//       // CHANGED: Redirect to error page if accessed directly without token
//       return NextResponse.redirect(new URL('/auth/verify-email?error=Missing+token', request.url))
//     }

//     await dbConnect();

//     // Use updateOne directly to avoid validation issues
//     const result = await User.updateOne(
//       { emailToken: token },
//       { 
//         $set: { 
//           emailVerified: new Date(),
//         },
//         $unset: { emailToken: "" } // This removes the field entirely
//       }
//     );

//     // Check if any document was modified
//     if (result.matchedCount === 0) {
//       // CHANGED: Redirect to error page
//       return NextResponse.redirect(new URL('/auth/verify-email?error=Invalid+or+expired+token', request.url))
//     }

//     // CHANGED: Redirect to success page with token for the page to handle
//     return NextResponse.redirect(new URL('/auth/verify-email?success=true&token=' + token, request.url))

//   } catch (error) {
//     console.error("Email verification error:", error)
//     // CHANGED: Redirect to error page
//     return NextResponse.redirect(new URL('/auth/verify-email?error=Server+error', request.url))
//   }
// }

// export async function POST(request: Request) {
//   try {
//     const { token } = await request.json();

//     if (!token) {
//       return NextResponse.json(
//         { error: "Verification token is required" },
//         { status: 400 }
//       )
//     }

//     await dbConnect();

//     // Use updateOne to avoid validation
//     const result = await User.updateOne(
//       { emailToken: token },
//       { 
//         $set: { emailVerified: new Date() },
//         $unset: { emailToken: "" }
//       }
//     );

//     if (result.matchedCount === 0) {
//       return NextResponse.json(
//         { error: "Invalid or expired verification token" },
//         { status: 400 }
//       )
//     }

//     return NextResponse.json(
//       { message: "Email verified successfully" },
//       { status: 200 }
//     )

//   } catch (error) {
//     console.error("Email verification error:", error)
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     )
//   }
// }   


// app/api/auth/verify-email/route.ts
import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { User } from '@/backend/models/User'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      // Redirect to error page if accessed directly without token
      return NextResponse.redirect(new URL('/auth/verify-email?error=Missing+token', request.url))
    }

    await dbConnect();

    console.log("🔍 Verifying email with token:", token);

    // Use updateOne directly to avoid validation issues
    const result = await User.updateOne(
      { emailToken: token },
      { 
        $set: { 
          emailVerified: new Date(),
        },
        $unset: { emailToken: "" } // This removes the field entirely
      }
    );

    // Check if any document was modified
    if (result.matchedCount === 0) {
      console.log("❌ No user found with token:", token);
      // Redirect to error page
      return NextResponse.redirect(new URL('/auth/verify-email?error=Invalid+or+expired+token', request.url))
    }

    console.log("✅ Email verified successfully for token:", token);

    // Get the user email for redirect
    const user = await User.findOne({ emailToken: token });
    const email = user?.email || '';

    // Redirect to success page
    return NextResponse.redirect(new URL(`/auth/verify-email?success=true&token=${token}&email=${encodeURIComponent(email)}`, request.url))

  } catch (error) {
    console.error("Email verification error:", error)
    // Redirect to error page
    return NextResponse.redirect(new URL('/auth/verify-email?error=Server+error', request.url))
  }
}

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: "Verification token is required" },
        { status: 400 }
      )
    }

    await dbConnect();

    console.log("🔍 Verifying email with token (POST):", token);

    // Use updateOne to avoid validation
    const result = await User.updateOne(
      { emailToken: token },
      { 
        $set: { emailVerified: new Date() },
        $unset: { emailToken: "" }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Invalid or expired verification token" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    )

  } catch (error) {
    console.error("Email verification error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}