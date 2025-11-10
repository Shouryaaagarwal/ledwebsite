// "use client";

// import { Inter, Poppins } from "next/font/google";
// import { useState } from "react";
// import Image from "next/image";
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

// type UserType = "client" | "creator" | null;

// export default function JoinPage() {
//   const [selectedType, setSelectedType] = useState<UserType>(null);

//   return (
//     <div className={`${inter.className} w-full bg-white min-h-screen`}>
//       {/* Header with Logo */}
//       <div className="w-full -mt-5  ">
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
//       <div className="max-w-4xl mx-auto px-6 mt-[-50px] ">
//         {/* Header Section */}
//         <div className="text-center mb-10">
//           <h1 className={`${poppins.className} text-3xl font-bold text-gray-900 mb-4`}>
//             Join Hey Humanz
//           </h1>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Join our platform to either hire top creative talent or find amazing projects that match your skills.
//           </p>
//         </div>

//         {/* Selection Cards Grid */}
//         <div className="grid md:grid-cols-2 gap-8 mb-12">
//           {/* Client Card */}
//           <div
//             className={`relative border rounded-xl p-8 cursor-pointer transition-all duration-300 ${
//               selectedType === "client"
//                 ? "border-blue-500 bg-blue-50 shadow-lg"
//                 : "border-gray-300 bg-white hover:shadow-md"
//             }`}
//             onClick={() => setSelectedType("client")}
//           >
//             <div className="flex flex-col items-center text-center h-full">
//               {/* Icon */}
//               <div
//                 className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors ${
//                   selectedType === "client" ? "bg-blue-100" : "bg-gray-100"
//                 }`}
//               >
//                 <span className="text-2xl">👔</span>
//               </div>

//               {/* Title */}
//               <h3
//                 className={`${poppins.className} text-xl font-bold mb-4 ${
//                   selectedType === "client" ? "text-blue-600" : "text-gray-900"
//                 }`}
//               >
//                 I'm a client
//               </h3>

//               {/* Description */}
//               <p className="text-gray-600 mb-6 leading-relaxed grow">
//                 Hiring for a project. Find talented creators for your advertising needs.
//               </p>

//               {/* Selection Indicator */}
//               <div
//                 className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
//                   selectedType === "client"
//                     ? "border-blue-500 bg-blue-500"
//                     : "border-gray-300"
//                 }`}
//               >
//                 {selectedType === "client" && (
//                   <div className="w-2 h-2 bg-white rounded-full"></div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Creator Card */}
//           <div
//             className={`relative border rounded-xl p-8 cursor-pointer transition-all duration-300 ${
//               selectedType === "creator"
//                 ? "border-purple-500 bg-purple-50 shadow-lg"
//                 : "border-gray-300 bg-white hover:shadow-md"
//             }`}
//             onClick={() => setSelectedType("creator")}
//           >
//             <div className="flex flex-col items-center text-center h-full">
//               {/* Icon */}
//               <div
//                 className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors ${
//                   selectedType === "creator" ? "bg-purple-100" : "bg-gray-100"
//                 }`}
//               >
//                 <span className="text-2xl">🎨</span>
//               </div>

//               {/* Title */}
//               <h3
//                 className={`${poppins.className} text-xl font-bold mb-4 ${
//                   selectedType === "creator" ? "text-purple-600" : "text-gray-900"
//                 }`}
//               >
//                 I'm a creator
//               </h3>

//               {/* Description */}
//               <p className="text-gray-600 mb-6 leading-relaxed grow">
//                 Looking for work. Showcase your skills and collaborate with top brands.
//               </p>

//               {/* Selection Indicator */}
//               <div
//                 className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
//                   selectedType === "creator"
//                     ? "border-purple-500 bg-purple-500"
//                     : "border-gray-300"
//                 }`}
//               >
//                 {selectedType === "creator" && (
//                   <div className="w-2 h-2 bg-white rounded-full"></div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Action Section */}
//         <div className="text-center">
//           {selectedType ? (
//             <div className="space-y-6">
//               <button className="bg-black text-white px-12 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors w-full max-w-xs">
//                 Continue as {selectedType === "client" ? "Client" : "Creator"}
//               </button>
//               <div className="flex items-center justify-center space-x-2 text-gray-600">
//                 <span>Don't have an account?</span>
//                 <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
//                   Create account
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               <div className="space-y-4">
//                 <button className="w-full max-w-xs bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
//                   Continue
//                 </button>
//                 <div className="flex items-center justify-center space-x-2 text-gray-600">
//                   <span>Don't have an account?</span>
//                   <Link href="/signup" className="text-blue-600 hover:cursor-pointer  font-semibold hover:text-blue-700 transition-colors">
//                     Create account
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { Inter, Poppins } from "next/font/google";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

type UserType = "client" | "creator" | null;

export default function CreateAdsPage() {
  const [selectedType, setSelectedType] = useState<UserType>(null);
  const router = useRouter();

  const handleContinue = () => {
    if (selectedType) {
      // Navigate to signup page with role as query parameter
      router.push(`/auth/signup?role=${selectedType}`);
    }
  };

  return (
    <div className={`${inter.className} w-full bg-white min-h-screen`}>
      {/* Header with Logo */}
      <div className="w-full -mt-5">
        <div className="max-w-6xl mx-10">
          <Image 
            src="/blacklogo.jpg" 
            alt="Hey Humanz" 
            width={180}
            height={40}
            className="object-contain"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 mt-[-50px]">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className={`${poppins.className} text-3xl font-bold text-gray-900 mb-4`}>
            Join Hey Humanz
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our platform to either hire top creative talent or find amazing projects that match your skills.
          </p>
        </div>

        {/* Selection Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Client Card */}
          <div
            className={`relative border rounded-xl p-8 cursor-pointer transition-all duration-300 ${
              selectedType === "client"
                ? "border-blue-500 bg-blue-50 shadow-lg"
                : "border-gray-300 bg-white hover:shadow-md"
            }`}
            onClick={() => setSelectedType("client")}
          >
            <div className="flex flex-col items-center text-center h-full">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors ${
                  selectedType === "client" ? "bg-blue-100" : "bg-gray-100"
                }`}
              >
                <span className="text-2xl">👔</span>
              </div>

              <h3
                className={`${poppins.className} text-xl font-bold mb-4 ${
                  selectedType === "client" ? "text-blue-600" : "text-gray-900"
                }`}
              >
                I'm a client
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed grow">
                Hiring for a project. Find talented creators for your advertising needs.
              </p>

              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  selectedType === "client"
                    ? "border-blue-500 bg-blue-500"
                    : "border-gray-300"
                }`}
              >
                {selectedType === "client" && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
            </div>
          </div>

          {/* Creator Card */}
          <div
            className={`relative border rounded-xl p-8 cursor-pointer transition-all duration-300 ${
              selectedType === "creator"
                ? "border-purple-500 bg-purple-50 shadow-lg"
                : "border-gray-300 bg-white hover:shadow-md"
            }`}
            onClick={() => setSelectedType("creator")}
          >
            <div className="flex flex-col items-center text-center h-full">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors ${
                  selectedType === "creator" ? "bg-purple-100" : "bg-gray-100"
                }`}
              >
                <span className="text-2xl">🎨</span>
              </div>

              <h3
                className={`${poppins.className} text-xl font-bold mb-4 ${
                  selectedType === "creator" ? "text-purple-600" : "text-gray-900"
                }`}
              >
                I'm a creator
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed grow">
                Looking for work. Showcase your skills and collaborate with top brands.
              </p>

              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  selectedType === "creator"
                    ? "border-purple-500 bg-purple-500"
                    : "border-gray-300"
                }`}
              >
                {selectedType === "creator" && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Section */}
        <div className="text-center">
          {selectedType ? (
            <div className="space-y-6">
              <button 
                onClick={handleContinue}
                className="bg-black text-white px-12 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors w-full max-w-xs"
              >
                Continue as {selectedType === "client" ? "Client" : "Creator"}
              </button>
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <span>Don't have an account?</span>
                <button 
                  onClick={() => router.push('/auth/signup')}
                  className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  Create account
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                <button 
                  disabled
                  className="w-full max-w-xs bg-gray-400 text-white py-4 rounded-lg font-semibold transition-colors cursor-not-allowed"
                >
                  Continue
                </button>
                <div className="flex items-center justify-center space-x-2 text-gray-600">
                  <span>Already have an account?</span>
                  <button 
                    onClick={() => router.push('/auth/signin')}
                    className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}