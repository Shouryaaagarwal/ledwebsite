// "use client";

// import { Inter, Poppins } from "next/font/google";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { useSearchParams, useRouter } from "next/navigation";
// import Link from "next/link";

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

// export default function VerifyEmailPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
  
//   const token = searchParams.get('token');
//   const email = searchParams.get('email');
//   const success = searchParams.get('success');
//   const error = searchParams.get('error');
  
//   const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     // Handle direct API redirects with success/error params
//     if (success === 'true' && token) {
//       setStatus('success');
//       setMessage('Email verified successfully!');
      
//       // Redirect to home page after 3 seconds
//       setTimeout(() => {
//         router.push('/home');
//       }, 3000);
//       return;
//     }

//     if (error) {
//       setStatus('error');
//       setMessage(decodeURIComponent(error));
//       return;
//     }

//     // Handle normal verification flow
//     if (token) {
//       // If token is present, verify the email via API
//       verifyEmail(token);
//     } else if (email) {
//       // If only email is present, show "check your email" message
//       setStatus('success');
//       setMessage(`Verification email sent to ${email}. Please check your inbox.`);
//     } else {
//       setStatus('error');
//       setMessage('Invalid verification link.');
//     }
//   }, [token, email, success, error, router]);

//   const verifyEmail = async (verificationToken: string) => {
//     try {
//       const response = await fetch('/api/auth/verify-mail', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ token: verificationToken }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setStatus('success');
//         setMessage(data.message || 'Email verified successfully!');
        
//         // Redirect to home page after 3 seconds
//         setTimeout(() => {
//           router.push('/home');
//         }, 3000);
//       } else {
//         setStatus('error');
//         setMessage(data.error || 'Verification failed.');
//       }
//     } catch (error) {
//       setStatus('error');
//       setMessage('An error occurred during verification.');
//     }
//   };

//   return (
//     <div className={`${inter.className} w-full bg-white min-h-screen`}>
//       {/* Header with Logo */}
//       <div className="w-full px-8 pt-8">
//         <div className="max-w-6xl mx-10">
//           <Image 
//             src="/blacklogo.jpg" 
//             alt="Hey Humanz" 
//             width={180} 
//             height={40}
//             className="object-contain"
//           />
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-md mx-auto px-6 mt-8">
//         <div className="text-center">
//           {/* Status Icon */}
//           <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
//             status === 'loading' ? 'bg-blue-100' :
//             status === 'success' ? 'bg-green-100' : 'bg-red-100'
//           }`}>
//             {status === 'loading' && (
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             )}
//             {status === 'success' && <span className="text-2xl">✅</span>}
//             {status === 'error' && <span className="text-2xl">❌</span>}
//           </div>

//           {/* Status Message */}
//           <h1 className={`${poppins.className} text-2xl font-bold text-gray-900 mb-4`}>
//             {status === 'loading' && 'Verifying Email...'}
//             {status === 'success' && 'Success!'}
//             {status === 'error' && 'Verification Failed'}
//           </h1>

//           <p className="text-gray-600 mb-6">
//             {message}
//           </p>

//           {/* Auto-redirect notice */}
//           {status === 'success' && token && (
//             <p className="text-blue-600 mb-4">
//               Redirecting to home page in 3 seconds...
//             </p>
//           )}

//           {/* Actions */}
//           <div className="space-y-4">
//             {status === 'success' && (
//               <>
//                 <button
//                   onClick={() => router.push('/home')}
//                   className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
//                 >
//                   Go to Home Now
//                 </button>
//                 <Link
//                   href="/auth/signin"
//                   className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors block text-center"
//                 >
//                   Sign In
//                 </Link>
//               </>
//             )}
            
//             {status === 'error' && (
//               <Link
//                 href="/auth/signup"
//                 className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors block text-center"
//               >
//                 Try Signing Up Again
//               </Link>
//             )}

//             <Link
//               href="/"
//               className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors block text-center"
//             >
//               Go Home
//             </Link>
//           </div>

//           {/* Additional Info */}
//           {status === 'loading' && (
//             <p className="text-sm text-gray-500 mt-4">
//               Please wait while we verify your email address...
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { Inter, Poppins } from "next/font/google";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { useSearchParams, useRouter } from "next/navigation";
// import Link from "next/link";

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

// export default function VerifyEmailPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
  
//   const token = searchParams.get('token');
//   const email = searchParams.get('email');
//   const success = searchParams.get('success');
//   const error = searchParams.get('error');
  
//   const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'pending'>('loading');
//   const [message, setMessage] = useState('');
//   const [countdown, setCountdown] = useState(50);
//   const [canResend, setCanResend] = useState(false);

//   useEffect(() => {
//     // Handle direct API redirects with success/error params
//     if (success === 'true' && token) {
//       setStatus('success');
//       setMessage('Email verified successfully! You can now sign in to your account.');
//       return;
//     }

//     if (error) {
//       setStatus('error');
//       setMessage(decodeURIComponent(error));
//       return;
//     }

//     // Handle normal verification flow
//     if (token) {
//       // If token is present, verify the email via API
//       verifyEmail(token);
//     } else if (email) {
//       // If only email is present, show "check your email" message
//       setStatus('pending');
//       setMessage(`We've sent a verification email to ${email}. Please check your inbox and click the verification link to complete your registration.`);
      
//       // Start countdown for resend button
//       startCountdown();
//     } else {
//       setStatus('error');
//       setMessage('Invalid verification link.');
//     }
//   }, [token, email, success, error, router]);

//   const startCountdown = () => {
//     setCountdown(50);
//     setCanResend(false);
    
//     const timer = setInterval(() => {
//       setCountdown((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           setCanResend(true);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };

//   const verifyEmail = async (verificationToken: string) => {
//     try {
//       const response = await fetch('/api/auth/verify-mail', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ token: verificationToken }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setStatus('success');
//         setMessage('Email verified successfully! You can now sign in to your account.');
//       } else {
//         setStatus('error');
//         setMessage(data.error || 'Verification failed. Please try again.');
//       }
//     } catch (error) {
//       setStatus('error');
//       setMessage('An error occurred during verification. Please try again.');
//     }
//   };

//   const handleResendEmail = async () => {
//     if (!email || !canResend) return;

//     setStatus('loading');
//     setMessage('Sending verification email...');

//     try {
//       const response = await fetch('/api/auth/resend-verification', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setStatus('pending');
//         setMessage(`Verification email sent to ${email}. Please check your inbox.`);
//         startCountdown();
//       } else {
//         setStatus('error');
//         setMessage(data.error || 'Failed to resend verification email.');
//       }
//     } catch (error) {
//       setStatus('error');
//       setMessage('Failed to resend verification email. Please try again.');
//     }
//   };

//   return (
//     <div className={`${inter.className} w-full bg-white min-h-screen`}>
//       {/* Header with Logo */}
//       <div className="w-full px-8 pt-8">
//         <div className="max-w-6xl mx-10">
//           <Image 
//             src="/blacklogo.jpg" 
//             alt="Hey Humanz" 
//             width={180} 
//             height={40}
//             className="object-contain"
//           />
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-md mx-auto px-6 mt-8">
//         <div className="text-center">
//           {/* Status Icon */}
//           <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
//             status === 'loading' ? 'bg-blue-100' :
//             status === 'success' ? 'bg-green-100' :
//             status === 'pending' ? 'bg-yellow-100' : 'bg-red-100'
//           }`}>
//             {status === 'loading' && (
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             )}
//             {status === 'success' && <span className="text-2xl">✅</span>}
//             {status === 'pending' && <span className="text-2xl">📧</span>}
//             {status === 'error' && <span className="text-2xl">❌</span>}
//           </div>

//           {/* Status Message */}
//           <h1 className={`${poppins.className} text-2xl font-bold text-gray-900 mb-4`}>
//             {status === 'loading' && 'Verifying Email...'}
//             {status === 'success' && 'Email Verified!'}
//             {status === 'pending' && 'Check Your Email'}
//             {status === 'error' && 'Verification Failed'}
//           </h1>

//           <p className="text-gray-600 mb-6 leading-relaxed">
//             {message}
//           </p>

//           {/* Resend Email Section */}
//           {status === 'pending' && email && (
//             <div className="space-y-4">
//               <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
//                 <p className="text-sm text-blue-800 mb-3">
//                   Didn't receive the email? Check your spam folder or resend the verification email.
//                 </p>
                
//                 <button
//                   onClick={handleResendEmail}
//                   disabled={!canResend}
//                   className={`w-full py-3 rounded-lg font-semibold transition-colors ${
//                     canResend
//                       ? 'bg-black text-white hover:bg-gray-800'
//                       : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   }`}
//                 >
//                   {canResend ? 'Resend Verification Email' : `Resend available in ${countdown}s`}
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Success Actions */}
//           {status === 'success' && (
//             <div className="space-y-4">
//               <div className="p-4 bg-green-50 rounded-lg border border-green-200">
//                 <p className="text-sm text-green-800">
//                   Your email has been successfully verified. You can now sign in to your account.
//                 </p>
//               </div>
//               <Link
//                 href="/auth/signin"
//                 className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors block text-center"
//               >
//                 Sign In to Your Account
//               </Link>
//             </div>
//           )}

//           {/* Error Actions */}
//           {status === 'error' && (
//             <div className="space-y-4">
//               <Link
//                 href="/auth/signup"
//                 className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors block text-center"
//               >
//                 Try Signing Up Again
//               </Link>
//             </div>
//           )}

//           {/* Additional Info */}
//           {status === 'loading' && (
//             <p className="text-sm text-gray-500 mt-4">
//               Please wait while we verify your email address...
//             </p>
//           )}

//           {/* General Help */}
//           <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
//             <h3 className="text-sm font-semibold text-gray-800 mb-2">Need help?</h3>
//             <ul className="text-xs text-gray-600 space-y-1 text-left">
//               <li>• Check your spam or junk folder</li>
//               <li>• Make sure you entered the correct email address</li>
//               <li>• Contact support if you continue having issues</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { Suspense } from "react";
import VerifyEmailContent from "@/app/components/SignInContent";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<VerifyEmailLoading />}>
      <VerifyEmailContent />
    </Suspense>
  );
}

function VerifyEmailLoading() {
  return (
    <div className="w-full bg-white min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading verification...</p>
      </div>
    </div>
  );
}