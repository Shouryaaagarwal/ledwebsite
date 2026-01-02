  // import NextAuth from "next-auth"
  // import GoogleProvider from "next-auth/providers/google"

  // export const authOptions = {
  //   // Configure one or more authentication providers
  //   providers: [
  //     GoogleProvider({
  //       clientId: process.env.GOOGLE_CLIENT_ID!,
  //       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  //     }),
  //     // ...add more providers here
  //   ],
  // }

  // const handler  =  NextAuth(authOptions)   

  // export {handler as GET , handler as POST}  

// import NextAuth, { NextAuthOptions } from "next-auth"
// import GoogleProvider from "next-auth/providers/google"
// import CredentialsProvider from "next-auth/providers/credentials"
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
// import clientPromise from "@/lib/mongodb"
// import bcrypt from "bcryptjs"
// import { JWT } from "next-auth/jwt"
// import { Session, User } from "next-auth"

// // Extend next-auth types
// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string
//       email?: string | null
//       name?: string | null
//       role?: string | null
//     }
//   }

//   interface User {
//     role?: string | null
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     id?: string
//     role?: string | null
//   }
// }

// export const authOptions: NextAuthOptions = {
//   adapter: MongoDBAdapter(clientPromise),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials): Promise<User | null> {
//         if (!credentials?.email || !credentials?.password) {
//           return null
//         }

//         const client = await clientPromise
//         const db = client.db()
        
//         const user = await db.collection("users").findOne({
//           email: credentials.email
//         })

//         if (!user || !user.password) {
//           return null
//         }

//         // Check if email is verified
//         if (!user.emailVerified) {
//           throw new Error("EMAIL_NOT_VERIFIED")
//         }

//         const passwordMatch = await bcrypt.compare(credentials.password, user.password)

//         if (!passwordMatch) {
//           return null
//         }

//         return {
//           id: user._id.toString(),
//           email: user.email,
//           name: user.name,
//           role: user.role,
//         }
//       }
//     })
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }: { token: JWT; user?: User }) {
//       if (user) {
//         token.id = user.id
//         token.role = user.role
//       }
//       return token
//     },
//     async session({ session, token }: { session: Session; token: JWT }) {
//       if (token) {
//         session.user.id = token.id as string
//         session.user.role = token.role as string
//       }
//       return session
//     },
//     async signIn({ user, account }: { user: User; account: any }) {
//       if (account?.provider === "google") {
//         const client = await clientPromise
//         const db = client.db()
        
//         // Check if user exists
//         const existingUser = await db.collection("users").findOne({ email: user.email })
        
//         if (existingUser) {
//           // Update existing user with Google data
//           await db.collection("users").updateOne(
//             { email: user.email },
//             { 
//               $set: { 
//                 name: user.name,
//                 image: user.image,
//                 updatedAt: new Date()
//               } 
//             }
//           )
//         } else {
//           // Create new user with Google data
//           await db.collection("users").insertOne({
//             name: user.name,
//             email: user.email,
//             image: user.image,
//             role: "creator", // Default role for Google signups
//             emailVerified: new Date(),
//             createdAt: new Date(),
//             updatedAt: new Date(),
//           })
//         }
//       }
//       return true
//     }
//   },
//   pages: {
//     signIn: '/auth/signin',
//     // Remove signUp from pages as it's not a standard NextAuth page
//   },
// }

// const handler = NextAuth(authOptions)
// export { handler as GET, handler as POST }  

// import NextAuth, { NextAuthOptions } from "next-auth"
// import GoogleProvider from "next-auth/providers/google"
// import CredentialsProvider from "next-auth/providers/credentials"
// import dbConnect from "@/lib/mongodb"
// import { User, IUser } from "@/backend/models/User"
// import { ObjectId } from "mongodb"

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string
//       email?: string | null
//       name?: string | null
//       role?: string | null
//       image?: string | null
//     }
//   }

//   interface User {
//     id?: string
//     role?: string | null
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     id?: string
//     role?: string | null
//   }
// }

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           return null
//         }

//         await dbConnect();

//         try {
//           // Find user by email
//           const user = await User.findOne({ email: credentials.email.toLowerCase() });
          
//           if (!user || !user.password) {
//             return null;
//           }

//           // Check if email is verified
//           if (!user.emailVerified) {
//             throw new Error("EMAIL_NOT_VERIFIED");
//           }

//           // Compare password
//           const isPasswordValid = await user.comparePassword(credentials.password);
          
//           if (!isPasswordValid) {
//             return null;
//           }

//           // Convert _id to string with proper typing
//           return {
//             id: user._id.toString(),
//             email: user.email,
//             name: user.name,
//             role: user.role,
//             image: user.image,
//           };
//         } catch (error) {
//           console.error("Auth error:", error);
//           return null;
//         }
//       }
//     })
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user, account }) {
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//       }

//       // Refresh user data on each sign in
//       if (account) {
//         await dbConnect();
//         const dbUser = await User.findById(token.id);
//         if (dbUser) {
//           token.role = dbUser.role;
//           token.name = dbUser.name;
//           token.email = dbUser.email;
//           token.picture = dbUser.image;
//         }
//       }

//       return token;
//     },
//     async session({ session, token }) {
//       if (token && session.user) {
//         session.user.id = token.id as string;
//         session.user.role = token.role as string;
//         session.user.name = token.name as string;
//         session.user.email = token.email as string;
//         session.user.image = token.picture as string;
//       }
//       return session;
//     },
//     async signIn({ user, account, profile }) {
//       if (account?.provider === "google") {
//         await dbConnect();

//         try {
//           // Check if user exists
//           const existingUser = await User.findOne({ email: user.email });
          
//           if (existingUser) {
//             // Update existing user with Google data - FIXED: use _id with proper typing
//             await User.findByIdAndUpdate(existingUser._id, {
//               name: user.name,
//               image: user.image,
//               updatedAt: new Date(),
//             });
//           } else {
//             // Create new user with Google data
//             await User.create({
//               name: user.name,
//               email: user.email,
//               image: user.image,
//               firstName: user.name?.split(' ')[0] || 'User',
//               lastName: user.name?.split(' ').slice(1).join(' ') || '',
//               role: "creator",
//               emailVerified: new Date(),
//               emailUpdates: false,
//               emailToken: Math.random().toString(36).substring(2),
//             });
//           }
//           return true;
//         } catch (error) {
//           console.error("Google signin error:", error);
//           return false;
//         }
//       }
//       return true;
//     }
//   },
//   pages: {
//     signIn: '/auth/signin',
//     error: '/auth/error',
//   },
// }

// const handler = NextAuth(authOptions)

// export { handler as GET, handler as POST }



// import NextAuth, { NextAuthOptions } from "next-auth"
// import GoogleProvider from "next-auth/providers/google"
// import CredentialsProvider from "next-auth/providers/credentials"
// import dbConnect from "@/lib/mongodb"
// import { User } from "@/backend/models/User"
// import { Types } from "mongoose"

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string
//       email?: string | null
//       name?: string | null
//       role?: string | null
//       image?: string | null
//     }
//   }

//   interface User {
//     id?: string
//     role?: string | null
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     id?: string
//     role?: string | null
//   }
// }

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       authorization: {
//         params: {
//           prompt: "consent",
//           access_type: "offline",
//           response_type: "code"
//         }
//       }
//     }),
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           return null
//         }

//         await dbConnect();

//         try {
//           const user = await User.findOne({ email: credentials.email.toLowerCase() });
          
//           if (!user || !user.password) {
//             return null;
//           }

//           if (!user.emailVerified) {
//             throw new Error("EMAIL_NOT_VERIFIED");
//           }

//           const isPasswordValid = await user.comparePassword(credentials.password);
          
//           if (!isPasswordValid) {
//             return null;
//           }

//           return {
//             id: user._id.toString(),
//             email: user.email,
//             name: user.name,
//             role: user.role,
//             image: user.image,
//           };
//         } catch (error) {
//           console.error("Auth error:", error);
//           return null;
//         }
//       }
//     })
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user, account }) {
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//       }

//       if (account) {
//         await dbConnect();
//         const dbUser = await User.findById(token.id);
//         if (dbUser) {
//           token.role = dbUser.role;
//           token.name = dbUser.name;
//           token.email = dbUser.email;
//           token.picture = dbUser.image;
//         }
//       }

//       return token;
//     },
//     async session({ session, token }) {
//       if (token && session.user) {
//         session.user.id = token.id as string;
//         session.user.role = token.role as string;
//         session.user.name = token.name as string;
//         session.user.email = token.email as string;
//         session.user.image = token.picture as string;
//       }
//       return session;
//     },
//     async signIn({ user, account, profile }) {
//       try {
//         if (account?.provider === "google") {
//           await dbConnect();

//           // Check if user exists
//           const existingUser = await User.findOne({ email: user.email });
          
//           if (existingUser) {
//             // Update existing user with Google data
//             await User.findByIdAndUpdate(existingUser._id, {
//               name: user.name,
//               image: user.image,
//               updatedAt: new Date(),
//             });
//           } else {
//             // Create new user with Google data
//             const firstName = user.name?.split(' ')[0] || 'User';
//             const lastName = user.name?.split(' ').slice(1).join(' ') || '';
            
//             await User.create({
//               name: user.name,
//               email: user.email,
//               image: user.image,
//               firstName: firstName,
//               lastName: lastName,
//               role: "creator",
//               emailVerified: new Date(),
//               emailUpdates: false,
//               emailToken: Math.random().toString(36).substring(2),
//             });
//           }
//           return true;
//         }
//         return true;
//       } catch (error) {
//         console.error("SignIn callback error:", error);
//         return false; // Return false to show error page
//       }
//     }
//   },
//   pages: {
//     signIn: '/auth/signup', // Changed from '/auth/signin' to your signup page
//     error: '/auth/error',
//   },
//   debug: process.env.NODE_ENV === 'development', // Enable debug in development
// }

// const handler = NextAuth(authOptions)

// export { handler as GET, handler as POST }

// import NextAuth, { NextAuthOptions } from "next-auth"
// import GoogleProvider from "next-auth/providers/google"
// import CredentialsProvider from "next-auth/providers/credentials"
// import dbConnect from "@/lib/mongodb"
// import { User } from "@/backend/models/User"

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string
//       email?: string | null
//       name?: string | null
//       role?: string | null
//       image?: string | null
//     }
//   }

//   interface User {
//     id?: string
//     role?: string | null
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     id?: string
//     role?: string | null
//   }
// }

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           return null
//         }

//         try {
//           await dbConnect();

//           const user = await User.findOne({ email: credentials.email.toLowerCase() });
          
//           if (!user || !user.password) {
//             return null;
//           }

//           if (!user.emailVerified) {
//             throw new Error("EMAIL_NOT_VERIFIED");
//           }

//           const isPasswordValid = await user.comparePassword(credentials.password);
          
//           if (!isPasswordValid) {
//             return null;
//           }

//           return {
//             id: user._id.toString(),
//             email: user.email,
//             name: user.name,
//             role: user.role,
//             image: user.image,
//           };
//         } catch (error) {
//           console.error("Auth error:", error);
//           return null;
//         }
//       }
//     })
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user, account }) {
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//       }

//       if (account) {
//         try {
//           await dbConnect();
//           const dbUser = await User.findById(token.id);
//           if (dbUser) {
//             token.role = dbUser.role;
//             token.name = dbUser.name;
//             token.email = dbUser.email;
//             token.picture = dbUser.image;
//           }
//         } catch (error) {
//           console.error("JWT callback error:", error);
//         }
//       }

//       return token;
//     },
//     async session({ session, token }) {
//       if (token && session.user) {
//         session.user.id = token.id as string;
//         session.user.role = token.role as string;
//         session.user.name = token.name as string;
//         session.user.email = token.email as string;
//         session.user.image = token.picture as string;
//       }
//       return session;
//     },
//     async signIn({ user, account, profile }) {
//       try {
//         // Only handle Google OAuth
//         if (account?.provider === "google") {
//           await dbConnect();

//           if (!user.email) {
//             console.error("Google OAuth: No email provided");
//             return false;
//           }

//           // Check if user exists
//           const existingUser = await User.findOne({ email: user.email });
          
//           if (existingUser) {
//             console.log("Google OAuth: Updating existing user", user.email);
//             // Update existing user with Google data
//             await User.findByIdAndUpdate(existingUser._id, {
//               name: user.name,
//               image: user.image,
//               updatedAt: new Date(),
//             });
//           } else {
//             console.log("Google OAuth: Creating new user", user.email);
//             // Create new user with Google data
//             const firstName = user.name?.split(' ')[0] || 'User';
//             const lastName = user.name?.split(' ').slice(1).join(' ') || '';
            
//             await User.create({
//               name: user.name,
//               email: user.email,
//               image: user.image,
//               firstName: firstName,
//               lastName: lastName,
//               role: "creator",
//               emailVerified: new Date(),
//               emailUpdates: false,
//               emailToken: Math.random().toString(36).substring(2),
//               password: undefined, // No password for OAuth users
//             });
//           }
//           return true;
//         }

//         // For credentials provider, just return true
//         if (account?.provider === "credentials") {
//           return true;
//         }

//         return false;
//       } catch (error) {
//         console.error("SignIn callback error:", error);
//         return false;
//       }
//     }
//   },
//   pages: {
//     signIn: '/auth/signup',
//     error: '/auth/error',
//   },
//   debug: process.env.NODE_ENV === 'development',
// }

// const handler = NextAuth(authOptions)

// export { handler as GET, handler as POST }    



//  upper one is the one 





// import NextAuth, { NextAuthOptions } from "next-auth"
// import GoogleProvider from "next-auth/providers/google"
// import CredentialsProvider from "next-auth/providers/credentials"
// import dbConnect from "@/lib/mongodb"
// import { User } from "@/backend/models/User"
// import { Types } from "mongoose"

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string
//       email?: string | null
//       name?: string | null
//       role?: string | null
//       image?: string | null
//     }
//   }

//   interface User {
//     id?: string
//     role?: string | null
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     id?: string
//     role?: string | null
//     email?: string | null
//   }
// }

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           return null
//         }

//         try {
//           await dbConnect();

//           const user = await User.findOne({ email: credentials.email.toLowerCase() });
          
//           if (!user || !user.password) {
//             return null;
//           }

//           if (!user.emailVerified) {
//             throw new Error("EMAIL_NOT_VERIFIED");
//           }

//           const isPasswordValid = await user.comparePassword(credentials.password);
          
//           if (!isPasswordValid) {
//             return null;
//           }

//           return {
//             id: user._id.toString(),
//             email: user.email,
//             name: user.name,
//             role: user.role,
//             image: user.image,
//           };
//         } catch (error) {
//           console.error("Auth error:", error);
//           return null;
//         }
//       }
//     })
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user, account }) {
//       // Initial sign in
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//       }

//       // Refresh user data from database on each sign in
//       if (account) {
//         try {
//           await dbConnect();
          
//           // For Google OAuth, find user by email since token.id is Google ID, not MongoDB _id
//           let dbUser;
//           if (account.provider === "google") {
//             dbUser = await User.findOne({ email: token.email });
//           } else {
//             // For credentials, use the id directly (it's MongoDB _id)
//             dbUser = await User.findById(token.id);
//           }
          
//           if (dbUser) {
//             token.id = dbUser._id.toString(); // Store MongoDB _id in token
//             token.role = dbUser.role;
//             token.name = dbUser.name;
//             token.email = dbUser.email;
//             token.picture = dbUser.image;
//           }
//         } catch (error) {
//           console.error("JWT callback error:", error);
//         }
//       }

//       return token;
//     },
//     async session({ session, token }) {
//       if (token && session.user) {
//         session.user.id = token.id as string;
//         session.user.role = token.role as string;
//         session.user.name = token.name as string;
//         session.user.email = token.email as string;
//         session.user.image = token.picture as string;
//       }
//       return session;
//     },
//     async signIn({ user, account, profile }) {
//       try {
//         // Only handle Google OAuth
//         if (account?.provider === "google") {
//           await dbConnect();

//           if (!user.email) {
//             console.error("Google OAuth: No email provided");
//             return false;
//           }

//           // Check if user exists
//           const existingUser = await User.findOne({ email: user.email });
          
//           if (existingUser) {
//             console.log("Google OAuth: Updating existing user", user.email);
//             // Update existing user with Google data
//             await User.findByIdAndUpdate(existingUser._id, {
//               name: user.name,
//               image: user.image,
//               updatedAt: new Date(),
//             });
//           } else {
//             console.log("Google OAuth: Creating new user", user.email);
//             // Create new user with Google data
//             const firstName = user.name?.split(' ')[0] || 'User';
//             const lastName = user.name?.split(' ').slice(1).join(' ') || '';
            
//             await User.create({
//               name: user.name,
//               email: user.email,
//               image: user.image,
//               firstName: firstName,
//               lastName: lastName,
//               role: "creator",
//               emailVerified: new Date(),
//               emailUpdates: false,
//               emailToken: Math.random().toString(36).substring(2),
//               password: undefined, // No password for OAuth users
//             });
//           }
//           return true;
//         }

//         // For credentials provider, just return true
//         if (account?.provider === "credentials") {
//           return true;
//         }

//         return false;
//       } catch (error) {
//         console.error("SignIn callback error:", error);
//         return false;
//       }
//     }
//   },
//   pages: {
//     signIn: '/auth/signup',
//     error: '/auth/error',
//   },
//   debug: process.env.NODE_ENV === 'development',
// }

// const handler = NextAuth(authOptions)

// export { handler as GET, handler as POST } 


import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import dbConnect from "@/lib/mongodb"
import { User } from "@/backend/models/User"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email?: string | null
      name?: string | null
      role?: string | null
      image?: string | null
    }
  }

  interface User {
    id?: string
    role?: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    role?: string | null
    email?: string | null
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          await dbConnect();

          console.log("🔍 Auth Debug - Looking for user:", credentials.email);
          const user = await User.findOne({ email: credentials.email.toLowerCase() });
          
          console.log("🔍 Auth Debug - User found:", user ? "Yes" : "No");
          
          if (!user) {
            throw new Error("No user found with this email");
          }

          if (!user.password) {
            throw new Error("This account uses Google sign-in");
          }

          console.log("🔍 Auth Debug - User email:", user.email);
          console.log("🔍 Auth Debug - Stored password hash exists:", !!user.password);
          console.log("🔍 Auth Debug - Input password length:", credentials.password.length);

          const isPasswordValid = await user.comparePassword(credentials.password);
          
          console.log("🔍 Auth Debug - Password validation result:", isPasswordValid);
          
          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }

          console.log("🔍 Auth Debug - Authentication successful for:", user.email);

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
            image: user.image,
          };
        } catch (error: any) {
          console.error("🔍 Auth Debug - Authentication error:", error);
          throw new Error(error.message || "Authentication failed");
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // async jwt({ token, user, account }) {
    //   if (user) {
    //     token.id = user.id;
    //     token.role = user.role;
    //   }
    //   return token;
    // },
    async jwt({ token, user, account }) {
  // Initial sign in
  if (user) {
    token.id = user.id;
    token.role = user.role;
    token.email = user.email; // Ensure email is in token
  }
  
  // CRITICAL: Always fetch fresh data from database on every JWT update
  if (token.email) {
    try {
      await dbConnect();
      const dbUser = await User.findOne({ email: token.email });
      
      if (dbUser) {
        token.id = dbUser._id.toString();
        token.role = dbUser.role;
        console.log("🔍 JWT Debug - Updated from DB:", { 
          id: token.id, 
          role: token.role,
          email: token.email 
        });
      }
    } catch (error) {
      console.error("Error fetching user in JWT callback:", error);
    }
  }
  
  return token;
},
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider === "google") {
          await dbConnect();

          if (!user.email) {
            console.error("Google OAuth: No email provided");
            return false;
          }

          const existingUser = await User.findOne({ email: user.email });
          
          if (existingUser) {
            console.log("Google OAuth: Updating existing user", user.email);
            await User.findByIdAndUpdate(existingUser._id, {
              name: user.name,
              image: user.image,
              updatedAt: new Date(),
            });
          } else {
            console.log("Google OAuth: Creating new user", user.email);
            const firstName = user.name?.split(' ')[0] || 'User';
            const lastName = user.name?.split(' ').slice(1).join(' ') || '';
            
            await User.create({
              name: user.name,
              email: user.email,
              image: user.image,
              firstName: firstName,
              lastName: lastName,
              role: "creator",
              emailVerified: new Date(),
              emailUpdates: false,
              emailToken: Math.random().toString(36).substring(2),
              password: undefined,
            });
          }
          return true;
        }

        if (account?.provider === "credentials") {
          return true;
        }

        return false;
      } catch (error) {
        console.error("SignIn callback error:", error);
        return false;
      }
    }
  },
  pages: {
    signIn: '/auth/signup',
    error: '/auth/error',
  },
  debug: process.env.NODE_ENV === 'development',
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }