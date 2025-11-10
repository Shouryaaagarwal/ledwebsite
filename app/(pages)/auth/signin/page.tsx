// "use client";

// import { Inter, Poppins } from "next/font/google";
// import { useState, useEffect } from "react";
// import Image from "next/image";   
// import { signIn, signOut, useSession } from "next-auth/react";
// import { useRouter, useSearchParams } from "next/navigation";

// const inter = Inter({
//   weight: ["400", "500", "600"],
//   subsets: ["latin"],
//   display: "swap",
// });

// const poppins = Poppins({
//   weight: ["700", "800"],
//   subsets: ["latin"],
//   display: "swap",
// });

// export default function SignInPage() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [signInMethod, setSignInMethod] = useState<'google' | 'manual' | null>(null);

//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const verified = searchParams.get('verified');
//   const callbackUrl = searchParams.get('callbackUrl') || '/home';

//   useEffect(() => {
//     if (session) {
//       checkSignInMethod();
//     }
//   }, [session]);

//   const checkSignInMethod = () => {
//     const isManualSignIn = localStorage.getItem('manual-signin') === 'true';
//     if (isManualSignIn) {
//       setSignInMethod('manual');
//     } else if (session?.user) {
//       setSignInMethod('google');
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleManualSignIn = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const result = await signIn('credentials', {
//         email: formData.email,
//         password: formData.password,
//         redirect: false,
//       });

//       if (result?.error) {
//         setError("Invalid email or password");
//         return;
//       }

//       // Store manual sign-in flag
//       localStorage.setItem('manual-signin', 'true');
      
//       // Redirect to the intended page
//       router.push(callbackUrl);
//     } catch (err: any) {
//       setError(err.message || "Sign in failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       setLoading(true);
//       await signIn('google', { callbackUrl });
//     } catch (err: any) {
//       setError(err.message || "Google sign in failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Show loading state while checking session
//   if (status === "loading") {
//     return (
//       <div className={`${inter.className} w-full bg-white min-h-screen flex items-center justify-center`}>
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
//           <p className="mt-4 text-gray-600">Checking authentication...</p>
//         </div>
//       </div>
//     );
//   }

//   // If user is signed in, show signed in state
//   if (session) {
//     return (
//       <div className={`${inter.className} w-full bg-white min-h-screen`}>
//         {/* Header with Logo and Sign Out Button */}
//         <div className="w-full px-8 pt-8">
//           <div className="max-w-6xl mx-10 flex justify-between items-center">
//             <Image 
//               src="/blacklogo.jpg" 
//               alt="Hey Humanz" 
//               width={180} 
//               height={40}
//               className="object-contain"
//             />
//             <div className="flex items-center gap-4">
//               <span className="text-sm text-gray-600">
//                 Signed in as: <span className="font-semibold">{session.user?.email}</span>
//               </span>
              
//               {/* Manual Sign Out Button */}
//               {signInMethod === 'manual' && (
//                 <button
//                   onClick={() => {
//                     localStorage.removeItem('manual-signin');
//                     signOut({ callbackUrl: '/auth/signin' });
//                   }}
//                   className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
//                 >
//                   Manual Sign Out
//                 </button>
//               )}

//               {/* Regular Sign Out Button */}
//               <button
//                 onClick={() => signOut({ callbackUrl: '/auth/signin' })}
//                 className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
//               >
//                 Sign Out
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Main Content for Signed In Users */}
//         <div className="max-w-2xl mx-auto px-6 mt-16 text-center">
//           <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//             <span className="text-2xl">✅</span>
//           </div>
          
//           <h1 className={`${poppins.className} text-3xl font-bold text-gray-900 mb-4`}>
//             Welcome back!
//           </h1>
          
//           <p className="text-gray-600 mb-8 text-lg">
//             You are already signed in as <span className="font-semibold">{session.user?.name || session.user?.email}</span>
//           </p>

//           {/* Sign-in Method Info */}
//           <div className={`mb-6 p-4 rounded-lg border ${
//             signInMethod === 'manual' 
//               ? 'bg-green-50 border-green-200 text-green-800'
//               : 'bg-blue-50 border-blue-200 text-blue-800'
//           }`}>
//             <p className="font-medium">
//               {signInMethod === 'manual' 
//                 ? '✅ Signed in with Email & Password' 
//                 : '✅ Signed in with Google'
//               }
//             </p>
//           </div>

//           <div className="space-y-4 max-w-md mx-auto">
//             <button
//               onClick={() => router.push('/home')}
//               className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
//             >
//               Go to Dashboard
//             </button>
            
//             <button
//               onClick={() => router.push('/createads')}
//               className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
//             >
//               Create New Ads
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Main sign-in form for non-signed-in users
//   return (
//     <div className={`${inter.className} w-full bg-white min-h-screen`}>
//       {/* Header with Logo and Not Signed In Status */}
//       <div className="w-full px-8 pt-8">
//         <div className="max-w-6xl mx-10 flex justify-between items-center">
//           <Image 
//             src="/blacklogo.jpg" 
//             alt="Hey Humanz" 
//             width={180} 
//             height={40}
//             className="object-contain"
//           />
//           <div className="flex items-center gap-4">
//             <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
//               Not signed in
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-md mx-auto px-6 mt-4">
//         {/* Header Section */}
//         <div className="text-center mb-8">
//           <h1 className={`${poppins.className} text-2xl font-normal text-gray-900 mb-3`}>
//             Sign in to your account
//           </h1>
//           <p className="text-sm text-gray-600">
//             Welcome back! Please sign in to continue.
//           </p>
//         </div>

//         {/* Success message after verification */}
//         {verified === 'true' && (
//           <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
//             ✅ Email verified successfully! You can now sign in.
//           </div>
//         )}

//         {/* Error Message */}
//         {error && (
//           <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//             {error}
//           </div>
//         )}

//         {/* Google Auth Button */}
//         <button
//           onClick={handleGoogleSignIn}
//           disabled={loading}
//           className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           <svg className="w-5 h-5" viewBox="0 0 24 24">
//             <path
//               fill="#4285F4"
//               d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//             />
//             <path
//               fill="#34A853"
//               d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//             />
//             <path
//               fill="#FBBC05"
//               d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//             />
//             <path
//               fill="#EA4335"
//               d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//             />
//           </svg>
//           <span className="text-gray-700 font-medium">
//             {loading ? 'Signing in...' : 'Continue with Google'}
//           </span>
//         </button>

//         {/* Divider */}
//         <div className="relative mb-6">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t border-gray-300"></div>
//           </div>
//           <div className="relative flex justify-center text-sm">
//             <span className="px-2 bg-white text-gray-500">or</span>
//           </div>
//         </div>

//         {/* Manual Sign In Form */}
//         <form onSubmit={handleManualSignIn} className="space-y-6">
//           {/* Email Field */}
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//               Email *
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
//               placeholder="Enter your email"
//             />
//           </div>

//           {/* Password Field */}
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//               Password *
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
//               placeholder="Enter your password"
//             />
//           </div>

//           {/* Forgot Password Link */}
//           <div className="text-right">
//             <button 
//               type="button"
//               onClick={() => router.push('/auth/forgot-password')}
//               className="text-sm text-blue-600 font-semibold hover:text-blue-700 transition-colors"
//             >
//               Forgot your password?
//             </button>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//           >
//             {loading ? 'Signing in...' : 'Sign in to your account'}
//           </button>

//           {/* Sign Up Link */}
//           <div className="text-center">
//             <p className="text-gray-600">
//               Don't have an account?{" "}
//               <button 
//                 type="button"
//                 onClick={() => router.push('/auth/signup')}
//                 className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
//               >
//                 Sign Up
//               </button>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


"use client";

import { Inter, Poppins } from "next/font/google";
import { useState, useEffect } from "react";
import Image from "next/image";   
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const inter = Inter({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  weight: ["700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [signInMethod, setSignInMethod] = useState<'google' | 'manual' | null>(null);

  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const verified = searchParams.get('verified');
  const resetSuccess = searchParams.get('reset');
  const callbackUrl = searchParams.get('callbackUrl') || '/home';

  useEffect(() => {
    if (session) {
      checkSignInMethod();
    }
  }, [session]);

  const checkSignInMethod = () => {
    const isManualSignIn = localStorage.getItem('manual-signin') === 'true';
    if (isManualSignIn) {
      setSignInMethod('manual');
    } else if (session?.user) {
      setSignInMethod('google');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleManualSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        // ✅ Better error messages based on the error type
        let errorMessage = "Invalid email or password";
        
        if (result.error.includes("Email and password are required")) {
          errorMessage = "Please enter both email and password";
        } else if (result.error.includes("No user found")) {
          errorMessage = "No account found with this email";
        } else if (result.error.includes("Google sign-in")) {
          errorMessage = "This account uses Google sign-in. Please sign in with Google.";
        } else if (result.error.includes("verify your email")) {
          errorMessage = "Please verify your email before signing in";
        } else if (result.error.includes("Invalid password")) {
          errorMessage = "Invalid password";
        }
        
        setError(errorMessage);
        return;
      }

      // ✅ Store manual sign-in flag
      localStorage.setItem('manual-signin', 'true');
      
      // ✅ Redirect to the intended page
      if (result?.url) {
        router.push(result.url);
      } else {
        router.push(callbackUrl);
      }
    } catch (err: any) {
      setError(err.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError("");
      await signIn('google', { callbackUrl });
    } catch (err: any) {
      setError(err.message || "Google sign in failed");
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while checking session
  if (status === "loading") {
    return (
      <div className={`${inter.className} w-full bg-white min-h-screen flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If user is signed in, show signed in state
  if (session) {
    return (
      <div className={`${inter.className} w-full bg-white min-h-screen`}>
        {/* Header with Logo and Sign Out Button */}
        <div className="w-full px-8 pt-8">
          <div className="max-w-6xl mx-10 flex justify-between items-center">
            <Image 
              src="/blacklogo.jpg" 
              alt="Hey Humanz" 
              width={180} 
              height={40}
              className="object-contain"
            />
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Signed in as: <span className="font-semibold">{session.user?.email}</span>
              </span>
              
              {/* Manual Sign Out Button */}
              {signInMethod === 'manual' && (
                <button
                  onClick={() => {
                    localStorage.removeItem('manual-signin');
                    signOut({ callbackUrl: '/auth/signin' });
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Manual Sign Out
                </button>
              )}

              {/* Regular Sign Out Button */}
              <button
                onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Main Content for Signed In Users */}
        <div className="max-w-2xl mx-auto px-6 mt-16 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">✅</span>
          </div>
          
          <h1 className={`${poppins.className} text-3xl font-bold text-gray-900 mb-4`}>
            Welcome back!
          </h1>
          
          <p className="text-gray-600 mb-8 text-lg">
            You are already signed in as <span className="font-semibold">{session.user?.name || session.user?.email}</span>
          </p>

          {/* Sign-in Method Info */}
          <div className={`mb-6 p-4 rounded-lg border ${
            signInMethod === 'manual' 
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-blue-50 border-blue-200 text-blue-800'
          }`}>
            <p className="font-medium">
              {signInMethod === 'manual' 
                ? '✅ Signed in with Email & Password' 
                : '✅ Signed in with Google'
              }
            </p>
          </div>

          <div className="space-y-4 max-w-md mx-auto">
            <button
              onClick={() => router.push('/home')}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Go to Dashboard
            </button>
            
            <button
              onClick={() => router.push('/createads')}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Create New Ads
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main sign-in form for non-signed-in users
  return (
    <div className={`${inter.className} w-full bg-white min-h-screen`}>
      {/* Header with Logo and Not Signed In Status */}
      <div className="w-full px-8 pt-8">
        <div className="max-w-6xl mx-10 flex justify-between items-center">
          <Image 
            src="/blacklogo.jpg" 
            alt="Hey Humanz" 
            width={180} 
            height={40}
            className="object-contain"
          />
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              Not signed in
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-6 mt-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className={`${poppins.className} text-2xl font-normal text-gray-900 mb-3`}>
            Sign in to your account
          </h1>
          <p className="text-sm text-gray-600">
            Welcome back! Please sign in to continue.
          </p>
        </div>

        {/* Success messages */}
        {verified === 'true' && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            ✅ Email verified successfully! You can now sign in.
          </div>
        )}

        {resetSuccess === 'success' && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            ✅ Password reset successfully! You can now sign in with your new password.
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Google Auth Button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="text-gray-700 font-medium">
            {loading ? 'Signing in...' : 'Continue with Google'}
          </span>
        </button>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>

        {/* Manual Sign In Form */}
        <form onSubmit={handleManualSignIn} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
              placeholder="Enter your password"
            />
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <button 
              type="button"
              onClick={() => router.push('/auth/forgot-password')}
              className="text-sm text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              Forgot your password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign in to your account'}
          </button>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button 
                type="button"
                onClick={() => router.push('/auth/signup')}
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                Sign Up
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}