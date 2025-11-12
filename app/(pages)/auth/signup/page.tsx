// "use client";

// import { Inter, Poppins } from "next/font/google";
// import { useState } from "react";
// import Image from "next/image";   
// import {signIn} from "next-auth/react"

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

// export default function SignUpPage() {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     country: "",
//     emailUpdates: false,
//     agreeTerms: false
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
//     }));
//   };

  

//   return (
//     <div className={`${inter.className} w-full bg-white min-h-screen`}>
//       {/* Header with Logo */}
//       <div className="w-full  px-8 ">
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
//       <div className="max-w-md mx-auto px-6 -mt-10">
//         {/* Header Section */}
//         <div className="text-center mb-8">
//           <h1 className={`${poppins.className} text-2xl font-normal text-gray-900 mb-3`}>
//             Sign up to find work you love
//           </h1>
//         </div>

//         {/* Google Auth Button */}
//         <button
//           onClick={()=> signIn('google')}
//           className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors mb-6"
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
//           <span className="text-gray-700 font-medium">Continue with Google</span>
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

//         {/* Form Section */}
//         <div className="space-y-6">
//           {/* Name Fields */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
//                 First name
//               </label>
//               <input
//                 type="text"
//                 id="firstName"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
//                 placeholder="First name"
//               />
//             </div>
//             <div>
//               <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
//                 Last name
//               </label>
//               <input
//                 type="text"
//                 id="lastName"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
//                 placeholder="Last name"
//               />
//             </div>
//           </div>

//           {/* Email Field */}
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
//               placeholder="Enter your email"
//             />
//           </div>

//           {/* Password Field */}
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
//               placeholder="Password (8 or more characters)"
//             />
//             <p className="text-xs text-gray-500 mt-2">Password (8 or more characters)</p>
//           </div>

//           {/* Email Updates Checkbox */}
//           <div className="flex items-start space-x-3">
//             <input
//               type="checkbox"
//               id="emailUpdates"
//               name="emailUpdates"
//               checked={formData.emailUpdates}
//               onChange={handleChange}
//               className="mt-1 w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
//             />
//             <label htmlFor="emailUpdates" className="text-sm text-gray-700">
//               Send me helpful emails to find rewarding work and job leads.
//             </label>
//           </div>

//           {/* Terms Checkbox */}
//           <div className="flex items-start space-x-3">
//             <input
//               type="checkbox"
//               id="agreeTerms"
//               name="agreeTerms"
//               checked={formData.agreeTerms}
//               onChange={handleChange}
//               className="mt-1 w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
//             />
//             <label htmlFor="agreeTerms" className="text-sm text-gray-700">
//               Yes, I understand and agree to the Hey Humanz Terms of Service, including the User Agreement and Privacy Policy.
//             </label>
//           </div>

//           {/* Submit Button */}
//           <button
//             className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//             disabled={!formData.agreeTerms}
//           >
//             Create my account
//           </button>

//           {/* Login Link */}
//           <div className="text-center">
//             <p className="text-gray-600">
//               Already have an account?{" "}
//               <a href="#" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
//                 Log In
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { Inter, Poppins } from "next/font/google";
// import { useState } from "react";
// import Image from "next/image";   
// import { signIn, signOut, useSession } from "next-auth/react";

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

// export default function SignUpPage() {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     country: "",
//     emailUpdates: false,
//     agreeTerms: false
//   });

//   const { data: session } = useSession();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
//     }));
//   };

//   return (
//     <div className={`${inter.className} w-full bg-white min-h-screen`}>
//       {/* Header with Logo */}
//       <div className="w-full px-8">
//         <div className="max-w-6xl mx-10 flex justify-between items-center">
//           <Image 
//             src="/blacklogo.jpg" 
//             alt="Hey Humanz" 
//             width={180} 
//             height={40}
//             className="object-contain"
//           />
//           {/* Sign Out Button - Only show when signed in */}
//           {session && (
//             <button
//               onClick={() => signOut()}
//               className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
//             >
//               Sign Out
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-md mx-auto px-6 -mt-10">
//         {/* Header Section */}
//         <div className="text-center mb-8">
//           <h1 className={`${poppins.className} text-2xl font-normal text-gray-900 mb-3`}>
//             Sign up to find work you love
//           </h1>
//         </div>

//         {/* Google Auth Button */}
//         <button
//           onClick={() => signIn('google')}
//           className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors mb-6"
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
//           <span className="text-gray-700 font-medium">Continue with Google</span>
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

//         {/* Form Section */}
//         <div className="space-y-6">
//           {/* Name Fields */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
//                 First name
//               </label>
//               <input
//                 type="text"
//                 id="firstName"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
//                 placeholder="First name"
//               />
//             </div>
//             <div>
//               <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
//                 Last name
//               </label>
//               <input
//                 type="text"
//                 id="lastName"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
//                 placeholder="Last name"
//               />
//             </div>
//           </div>

//           {/* Email Field */}
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
//               placeholder="Enter your email"
//             />
//           </div>

//           {/* Password Field */}
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
//               placeholder="Password (8 or more characters)"
//             />
//             <p className="text-xs text-gray-500 mt-2">Password (8 or more characters)</p>
//           </div>

//           {/* Email Updates Checkbox */}
//           <div className="flex items-start space-x-3">
//             <input
//               type="checkbox"
//               id="emailUpdates"
//               name="emailUpdates"
//               checked={formData.emailUpdates}
//               onChange={handleChange}
//               className="mt-1 w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
//             />
//             <label htmlFor="emailUpdates" className="text-sm text-gray-700">
//               Send me helpful emails to find rewarding work and job leads.
//             </label>
//           </div>

//           {/* Terms Checkbox */}
//           <div className="flex items-start space-x-3">
//             <input
//               type="checkbox"
//               id="agreeTerms"
//               name="agreeTerms"
//               checked={formData.agreeTerms}
//               onChange={handleChange}
//               className="mt-1 w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
//             />
//             <label htmlFor="agreeTerms" className="text-sm text-gray-700">
//               Yes, I understand and agree to the Hey Humanz Terms of Service, including the User Agreement and Privacy Policy.
//             </label>
//           </div>

//           {/* Submit Button */}
//           <button
//             className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//             disabled={!formData.agreeTerms}
//           >
//             Create my account
//           </button>

//           {/* Login Link */}
//           <div className="text-center">
//             <p className="text-gray-600">
//               Already have an account?{" "}
//               <a href="#" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
//                 Log In
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



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

// export default function SignUpPage() {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     country: "",
//     emailUpdates: false,
//     agreeTerms: false
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const { data: session } = useSession();
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const role = searchParams.get('role') || 'creator';

//   useEffect(() => {
//     if (session) {
//       router.push('/home');
//     }
//   }, [session, router]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.agreeTerms) return;

//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch('/api/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           email: formData.email,
//           password: formData.password,
//           role: role as 'client' | 'creator',
//           emailUpdates: formData.emailUpdates
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || 'Registration failed');
//       }

//       // Redirect to verification page
//       router.push('/auth/verify-email?email=' + encodeURIComponent(formData.email));
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (session) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <p>You are already signed in.</p>
//           <button
//             onClick={() => signOut()}
//             className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
//           >
//             Sign Out
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`${inter.className} w-full bg-white min-h-screen`}>
//       {/* Header with Logo */}
//       <div className="w-full px-8 pt-8">
//         <div className="max-w-6xl mx-10 flex justify-between items-center">
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
//       <div className="max-w-md mx-auto px-6 mt-4">
//         {/* Header Section */}
//         <div className="text-center mb-8">
//           <h1 className={`${poppins.className} text-2xl font-normal text-gray-900 mb-3`}>
//             Sign up to find work you love
//           </h1>
//           <p className="text-sm text-gray-600">
//             Joining as a <span className="font-semibold capitalize">{role}</span>
//           </p>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//             {error}
//           </div>
//         )}

//         {/* Google Auth Button */}
//         <button
//           onClick={() => signIn('google')}
//           className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors mb-6"
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
//           <span className="text-gray-700 font-medium">Continue with Google</span>
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

//         {/* Form Section */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Name Fields */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
//                 First name *
//               </label>
//               <input
//                 type="text"
//                 id="firstName"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
//                 placeholder="First name"
//               />
//             </div>
//             <div>
//               <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
//                 Last name *
//               </label>
//               <input
//                 type="text"
//                 id="lastName"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
//                 placeholder="Last name"
//               />
//             </div>
//           </div>

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
//               minLength={8}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
//               placeholder="Password (8 or more characters)"
//             />
//             <p className="text-xs text-gray-500 mt-2">Password must be at least 8 characters</p>
//           </div>

//           {/* Email Updates Checkbox */}
//           <div className="flex items-start space-x-3">
//             <input
//               type="checkbox"
//               id="emailUpdates"
//               name="emailUpdates"
//               checked={formData.emailUpdates}
//               onChange={handleChange}
//               className="mt-1 w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
//             />
//             <label htmlFor="emailUpdates" className="text-sm text-gray-700">
//               Send me helpful emails to find rewarding work and job leads.
//             </label>
//           </div>

//           {/* Terms Checkbox */}
//           <div className="flex items-start space-x-3">
//             <input
//               type="checkbox"
//               id="agreeTerms"
//               name="agreeTerms"
//               checked={formData.agreeTerms}
//               onChange={handleChange}
//               required
//               className="mt-1 w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
//             />
//             <label htmlFor="agreeTerms" className="text-sm text-gray-700">
//               Yes, I understand and agree to the Hey Humanz Terms of Service, including the User Agreement and Privacy Policy. *
//             </label>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//             disabled={!formData.agreeTerms || loading}
//           >
//             {loading ? 'Creating Account...' : 'Create my account'}
//           </button>

//           {/* Login Link */}
//           <div className="text-center">
//             <p className="text-gray-600">
//               Already have an account?{" "}
//               <a href="/auth/signin" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
//                 Log In
//               </a>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

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

// export default function SignUpPage() {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     country: "",
//     emailUpdates: false,
//     agreeTerms: false
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const role = searchParams.get('role') || 'creator';

//   useEffect(() => {
//     if (session) {
//       router.push('/home');
//     }
//   }, [session, router]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.agreeTerms) return;

//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch('/api/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           email: formData.email,
//           password: formData.password,
//           role: role as 'client' | 'creator',
//           emailUpdates: formData.emailUpdates
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || 'Registration failed');
//       }

//       // Redirect to verification page
//       router.push('/auth/verify-email?email=' + encodeURIComponent(formData.email));
//     } catch (err: any) {
//       setError(err.message);
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
//               <button
//                 onClick={() => signOut({ callbackUrl: '/auth/signup' })}
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

//             <button
//               onClick={() => signOut({ callbackUrl: '/auth/signup' })}
//               className="w-full border border-red-300 text-red-600 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors"
//             >
//               Sign Out
//             </button>
//           </div>

//           {/* Session Debug Info */}
//           {process.env.NODE_ENV === 'development' && (
//             <div className="mt-8 p-4 bg-gray-100 rounded-lg max-w-md mx-auto">
//               <h3 className="font-semibold mb-2">Session Info (Debug):</h3>
//               <pre className="text-xs text-left">
//                 {JSON.stringify(session, null, 2)}
//               </pre>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }

//   // Main signup form for non-signed-in users
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
//             Sign up to find work you love
//           </h1>
//           <p className="text-sm text-gray-600">
//             Joining as a <span className="font-semibold capitalize">{role}</span>
//           </p>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//             {error}
//           </div>
//         )}

//         {/* Google Auth Button */}
//         <button
//           onClick={() => signIn('google', { callbackUrl: '/home' })}
//           className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors mb-6"
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
//           <span className="text-gray-700 font-medium">Continue with Google</span>
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

//         {/* Form Section */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Name Fields */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
//                 First name *
//               </label>
//               <input
//                 type="text"
//                 id="firstName"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
//                 placeholder="First name"
//               />
//             </div>
//             <div>
//               <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
//                 Last name *
//               </label>
//               <input
//                 type="text"
//                 id="lastName"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
//                 placeholder="Last name"
//               />
//             </div>
//           </div>

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
//               minLength={8}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
//               placeholder="Password (8 or more characters)"
//             />
//             <p className="text-xs text-gray-500 mt-2">Password must be at least 8 characters</p>
//           </div>

//           {/* Email Updates Checkbox */}
//           <div className="flex items-start space-x-3">
//             <input
//               type="checkbox"
//               id="emailUpdates"
//               name="emailUpdates"
//               checked={formData.emailUpdates}
//               onChange={handleChange}
//               className="mt-1 w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
//             />
//             <label htmlFor="emailUpdates" className="text-sm text-gray-700">
//               Send me helpful emails to find rewarding work and job leads.
//             </label>
//           </div>

//           {/* Terms Checkbox */}
//           <div className="flex items-start space-x-3">
//             <input
//               type="checkbox"
//               id="agreeTerms"
//               name="agreeTerms"
//               checked={formData.agreeTerms}
//               onChange={handleChange}
//               required
//               className="mt-1 w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
//             />
//             <label htmlFor="agreeTerms" className="text-sm text-gray-700">
//               Yes, I understand and agree to the Hey Humanz Terms of Service, including the User Agreement and Privacy Policy. *
//             </label>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//             disabled={!formData.agreeTerms || loading}
//           >
//             {loading ? 'Creating Account...' : 'Create my account'}
//           </button>

//           {/* Login Link */}
//           <div className="text-center">
//             <p className="text-gray-600">
//               Already have an account?{" "}
//               <button 
//                 type="button"
//                 onClick={() => router.push('/auth/signin')}
//                 className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
//               >
//                 Log In
//               </button>
//             </p>
//           </div>
//         </form>

//         {/* Session Status Debug */}
//         {process.env.NODE_ENV === 'development' && (
//           <div className="mt-8 p-4 bg-gray-100 rounded-lg">
//             <h3 className="font-semibold mb-2">Session Status (Debug):</h3>
//             <p className="text-sm">
//               Status: <span className="font-mono">{status}</span><br/>
//               Signed in: <span className="font-mono">{session ? 'Yes' : 'No'}</span>
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




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

// export default function SignUpPage() {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     country: "",
//     emailUpdates: false,
//     agreeTerms: false
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [signInMethod, setSignInMethod] = useState<'google' | 'manual' | null>(null);

//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const role = searchParams.get('role') || 'creator';

//   useEffect(() => {
//     if (session) {
//       // Check how user signed in by looking at the token
//       checkSignInMethod();
//     }
//   }, [session]);

//   const checkSignInMethod = async () => {
//     try {
//       // You can check the session token or make an API call to get user details
//       const response = await fetch('/api/auth/user-details');
//       if (response.ok) {
//         const userData = await response.json();
//         // If user has password, they signed in manually
//         // If user has googleId or no password, they signed in with Google
//         setSignInMethod(userData.hasPassword ? 'manual' : 'google');
//       }
//     } catch (error) {
//       console.error('Error checking sign-in method:', error);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.agreeTerms) return;

//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch('/api/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           email: formData.email,
//           password: formData.password,
//           role: role as 'client' | 'creator',
//           emailUpdates: formData.emailUpdates
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || 'Registration failed');
//       }

//       // Redirect to verification page
//       router.push('/auth/verify-email?email=' + encodeURIComponent(formData.email));
//     } catch (err: any) {
//       setError(err.message);
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
//               <button
//                 onClick={() => signOut({ callbackUrl: '/auth/signup' })}
//                 className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
//               >
//                 Sign Out
//               </button>

//               {/* Additional Manual Sign Out Button */}
//               <button
//                 onClick={() => {
//                   // Clear any local storage or state
//                   localStorage.removeItem('manual-signin');
//                   signOut({ callbackUrl: '/auth/signup' });
//                 }}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
//               >
//                 Manual Sign Out
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
//           <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
//             <p className="text-blue-800 font-medium">
//               {signInMethod === 'manual' 
//                 ? '✓ Signed in with Email & Password' 
//                 : signInMethod === 'google'
//                 ? '✓ Signed in with Google'
//                 : '✓ Signed in successfully'
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

//             {/* Additional Sign Out Options */}
//             <div className="grid grid-cols-2 gap-4">
//               <button
//                 onClick={() => signOut({ callbackUrl: '/auth/signup' })}
//                 className="w-full border border-red-300 text-red-600 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors"
//               >
//                 Quick Sign Out
//               </button>

//               <button
//                 onClick={() => {
//                   localStorage.clear();
//                   sessionStorage.clear();
//                   signOut({ callbackUrl: '/auth/signup?cleared=true' });
//                 }}
//                 className="w-full border border-orange-300 text-orange-600 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
//               >
//                 Clear & Sign Out
//               </button>
//             </div>
//           </div>

//           {/* Session Debug Info */}
//           {process.env.NODE_ENV === 'development' && (
//             <div className="mt-8 p-4 bg-gray-100 rounded-lg max-w-md mx-auto">
//               <h3 className="font-semibold mb-2">Session Info (Debug):</h3>
//               <pre className="text-xs text-left">
//                 {JSON.stringify(session, null, 2)}
//               </pre>
//               <p className="mt-2 text-sm">
//                 Sign-in method: {signInMethod || 'Checking...'}
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }

//   // Rest of your signup form remains the same...
//   // Main signup form for non-signed-in users
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
//             Sign up to find work you love
//           </h1>
//           <p className="text-sm text-gray-600">
//             Joining as a <span className="font-semibold capitalize">{role}</span>
//           </p>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//             {error}
//           </div>
//         )}

//         {/* Google Auth Button */}
//         <button
//           onClick={() => signIn('google', { callbackUrl: '/home' })}
//           className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors mb-6"
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
//           <span className="text-gray-700 font-medium">Continue with Google</span>
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

//         {/* Form Section */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Name Fields */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
//                 First name *
//               </label>
//               <input
//                 type="text"
//                 id="firstName"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
//                 placeholder="First name"
//               />
//             </div>
//             <div>
//               <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
//                 Last name *
//               </label>
//               <input
//                 type="text"
//                 id="lastName"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
//                 placeholder="Last name"
//               />
//             </div>
//           </div>

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
//               minLength={8}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
//               placeholder="Password (8 or more characters)"
//             />
//             <p className="text-xs text-gray-500 mt-2">Password must be at least 8 characters</p>
//           </div>

//           {/* Email Updates Checkbox */}
//           <div className="flex items-start space-x-3">
//             <input
//               type="checkbox"
//               id="emailUpdates"
//               name="emailUpdates"
//               checked={formData.emailUpdates}
//               onChange={handleChange}
//               className="mt-1 w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
//             />
//             <label htmlFor="emailUpdates" className="text-sm text-gray-700">
//               Send me helpful emails to find rewarding work and job leads.
//             </label>
//           </div>

//           {/* Terms Checkbox */}
//           <div className="flex items-start space-x-3">
//             <input
//               type="checkbox"
//               id="agreeTerms"
//               name="agreeTerms"
//               checked={formData.agreeTerms}
//               onChange={handleChange}
//               required
//               className="mt-1 w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
//             />
//             <label htmlFor="agreeTerms" className="text-sm text-gray-700">
//               Yes, I understand and agree to the Hey Humanz Terms of Service, including the User Agreement and Privacy Policy. *
//             </label>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//             disabled={!formData.agreeTerms || loading}
//           >
//             {loading ? 'Creating Account...' : 'Create my account'}
//           </button>

//           {/* Login Link */}
//           <div className="text-center">
//             <p className="text-gray-600">
//               Already have an account?{" "}
//               <button 
//                 type="button"
//                 onClick={() => router.push('/auth/signin')}
//                 className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
//               >
//                 Log In
//               </button>
//             </p>
//           </div>
//         </form>

//         {/* Session Status Debug */}
//         {process.env.NODE_ENV === 'development' && (
//           <div className="mt-8 p-4 bg-gray-100 rounded-lg">
//             <h3 className="font-semibold mb-2">Session Status (Debug):</h3>
//             <p className="text-sm">
//               Status: <span className="font-mono">{status}</span><br/>
//               Signed in: <span className="font-mono">{session ? 'Yes' : 'No'}</span>
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



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

// export default function SignUpPage() {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     country: "",
//     emailUpdates: false,
//     agreeTerms: false
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [signInMethod, setSignInMethod] = useState<'google' | 'manual' | null>(null);
//   const [showManualSignIn, setShowManualSignIn] = useState(false);

//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const role = searchParams.get('role') || 'creator';
//   const verified = searchParams.get('verified');
//   const method = searchParams.get('method');

//   useEffect(() => {
//     // Check if user just verified their email manually
//     if (verified === 'true' && method === 'manual') {
//       setShowManualSignIn(true);
//       // Store manual sign-in flag
//       localStorage.setItem('manual-signin', 'true');
//     }

//     if (session) {
//       // Check how user signed in
//       checkSignInMethod();
//     }
//   }, [session, verified, method]);

//   const checkSignInMethod = () => {
//     // Check localStorage first for manual sign-in
//     const isManualSignIn = localStorage.getItem('manual-signin') === 'true';
//     if (isManualSignIn) {
//       setSignInMethod('manual');
//     } else if (session?.user) {
//       // If no manual flag but session exists, assume Google
//       setSignInMethod('google');
//     }
//   };

//   const handleManualSignIn = async () => {
//     try {
//       setLoading(true);
//       // Use credentials provider to sign in
//       const result = await signIn('credentials', {
//         email: localStorage.getItem('verified-email') || '',
//         password: 'auto-signin', // This won't work, just for the flow
//         redirect: false,
//       });

//       if (result?.error) {
//         // This is expected since we don't have the actual password
//         // Show the manual sign-in form instead
//         setShowManualSignIn(true);
//       }
//     } catch (error) {
//       console.error('Manual sign-in error:', error);
//       setShowManualSignIn(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.agreeTerms) return;

//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch('/api/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           email: formData.email,
//           password: formData.password,
//           role: role as 'client' | 'creator',
//           emailUpdates: formData.emailUpdates
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || 'Registration failed');
//       }

//       // Store email for manual sign-in detection
//       localStorage.setItem('verified-email', formData.email);
      
//       // Redirect to verification page
//       router.push('/auth/verify-email?email=' + encodeURIComponent(formData.email));
//     } catch (err: any) {
//       setError(err.message);
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
              
//               {/* Manual Sign Out Button - Only show if signed in manually */}
//               {signInMethod === 'manual' && (
//                 <button
//                   onClick={() => {
//                     localStorage.removeItem('manual-signin');
//                     localStorage.removeItem('verified-email');
//                     signOut({ callbackUrl: '/auth/signup' });
//                   }}
//                   className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
//                 >
//                   Manual Sign Out
//                 </button>
//               )}

//               {/* Regular Sign Out Button */}
//               <button
//                 onClick={() => signOut({ callbackUrl: '/auth/signup' })}
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
//                 ? '✅ Signed in with Email & Password (Manual)' 
//                 : '✅ Signed in with Google'
//               }
//             </p>
//             {signInMethod === 'manual' && (
//               <p className="text-sm mt-1">
//                 You successfully signed in using your email and password.
//               </p>
//             )}
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

//             {/* Special manual sign-out option */}
//             {signInMethod === 'manual' && (
//               <button
//                 onClick={() => {
//                   localStorage.removeItem('manual-signin');
//                   localStorage.removeItem('verified-email');
//                   signOut({ callbackUrl: '/auth/signup?manual=true' });
//                 }}
//                 className="w-full border border-green-300 text-green-600 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
//               >
//                 Sign Out (Manual)
//               </button>
//             )}
//           </div>

//           {/* Session Debug Info */}
//           {process.env.NODE_ENV === 'development' && (
//             <div className="mt-8 p-4 bg-gray-100 rounded-lg max-w-md mx-auto">
//               <h3 className="font-semibold mb-2">Session Info (Debug):</h3>
//               <pre className="text-xs text-left">
//                 {JSON.stringify(session, null, 2)}
//               </pre>
//               <p className="mt-2 text-sm">
//                 Sign-in method: {signInMethod || 'Checking...'}
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }

//   // Show manual sign-in prompt after verification
//   if (showManualSignIn) {
//     return (
//       <div className={`${inter.className} w-full bg-white min-h-screen`}>
//         {/* Header with Logo */}
//         <div className="w-full px-8 pt-8">
//           <div className="max-w-6xl mx-10">
//             <Image 
//               src="/blacklogo.jpg" 
//               alt="Hey Humanz" 
//               width={180} 
//               height={40}
//               className="object-contain"
//             />
//           </div>
//         </div>

//         {/* Manual Sign-in Prompt */}
//         <div className="max-w-md mx-auto px-6 mt-16 text-center">
//           <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//             <span className="text-2xl">✅</span>
//           </div>
          
//           <h1 className={`${poppins.className} text-2xl font-bold text-gray-900 mb-4`}>
//             Email Verified Successfully!
//           </h1>
          
//           <p className="text-gray-600 mb-6">
//             Your email has been verified. Please sign in to continue.
//           </p>

//           <div className="space-y-4">
//             <button
//               onClick={() => router.push('/auth/signin')}
//               className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
//             >
//               Sign In to Your Account
//             </button>
            
//             <button
//               onClick={() => setShowManualSignIn(false)}
//               className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
//             >
//               Back to Sign Up
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Rest of your original signup form remains the same...
//   // Main signup form for non-signed-in users
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
//             Sign up to find work you love
//           </h1>
//           <p className="text-sm text-gray-600">
//             Joining as a <span className="font-semibold capitalize">{role}</span>
//           </p>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//             {error}
//           </div>
//         )}

//         {/* Google Auth Button */}
//         <button
//           onClick={() => signIn('google', { callbackUrl: '/home' })}
//           className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors mb-6"
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
//           <span className="text-gray-700 font-medium">Continue with Google</span>
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

//         {/* Form Section */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Name Fields */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
//                 First name *
//               </label>
//               <input
//                 type="text"
//                 id="firstName"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
//                 placeholder="First name"
//               />
//             </div>
//             <div>
//               <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
//                 Last name *
//               </label>
//               <input
//                 type="text"
//                 id="lastName"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
//                 placeholder="Last name"
//               />
//             </div>
//           </div>

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
//               minLength={8}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
//               placeholder="Password (8 or more characters)"
//             />
//             <p className="text-xs text-gray-500 mt-2">Password must be at least 8 characters</p>
//           </div>

//           {/* Email Updates Checkbox */}
//           <div className="flex items-start space-x-3">
//             <input
//               type="checkbox"
//               id="emailUpdates"
//               name="emailUpdates"
//               checked={formData.emailUpdates}
//               onChange={handleChange}
//               className="mt-1 w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
//             />
//             <label htmlFor="emailUpdates" className="text-sm text-gray-700">
//               Send me helpful emails to find rewarding work and job leads.
//             </label>
//           </div>

//           {/* Terms Checkbox */}
//           <div className="flex items-start space-x-3">
//             <input
//               type="checkbox"
//               id="agreeTerms"
//               name="agreeTerms"
//               checked={formData.agreeTerms}
//               onChange={handleChange}
//               required
//               className="mt-1 w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
//             />
//             <label htmlFor="agreeTerms" className="text-sm text-gray-700">
//               Yes, I understand and agree to the Hey Humanz Terms of Service, including the User Agreement and Privacy Policy. *
//             </label>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//             disabled={!formData.agreeTerms || loading}
//           >
//             {loading ? 'Creating Account...' : 'Create my account'}
//           </button>

//           {/* Login Link */}
//           <div className="text-center">
//             <p className="text-gray-600">
//               Already have an account?{" "}
//               <button 
//                 type="button"
//                 onClick={() => router.push('/auth/signin')}
//                 className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
//               >
//                 Log In
//               </button>
//             </p>
//           </div>
//         </form>

//         {/* Session Status Debug */}
//         {process.env.NODE_ENV === 'development' && (
//           <div className="mt-8 p-4 bg-gray-100 rounded-lg">
//             <h3 className="font-semibold mb-2">Session Status (Debug):</h3>
//             <p className="text-sm">
//               Status: <span className="font-mono">{status}</span><br/>
//               Signed in: <span className="font-mono">{session ? 'Yes' : 'No'}</span>
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



"use client";

import { Suspense } from "react";
import SignUpContent from "@/app/components/SignupContent";

export default function SignUpPage() {
  return (
    <Suspense fallback={<SignUpLoading />}>
      <SignUpContent />
    </Suspense>
  );
}

function SignUpLoading() {
  return (
    <div className="w-full bg-white min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading signup form...</p>
      </div>
    </div>
  );
}