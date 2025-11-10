"use client";

import { Inter, Poppins } from "next/font/google";
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

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className={`${inter.className} w-full bg-white min-h-screen`}>
      {/* Header with Logo */}
      <div className="w-full px-8 pt-8">
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
      <div className="max-w-md mx-auto px-6 mt-16 text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl">🚫</span>
        </div>
        
        <h1 className={`${poppins.className} text-3xl font-bold text-gray-900 mb-4`}>
          Access Denied
        </h1>
        
        <p className="text-gray-600 mb-8 text-lg">
          You don't have permission to access this page with your current role.
        </p>

        <div className="space-y-4 max-w-md mx-auto">
          <button
            onClick={() => router.push('/home')}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Go to Dashboard
          </button>
          
          <button
            onClick={() => router.push('/auth/signin')}
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Switch Account
          </button>
        </div>
      </div>
    </div>
  );
}