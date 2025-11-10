"use client";

import { useSearchParams } from "next/navigation";
import { Inter, Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

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

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "Callback":
        return "There was a problem with the authentication callback. Check your Google OAuth configuration.";
      case "OAuthSignin":
        return "Error in OAuth sign in process.";
      case "OAuthCallback":
        return "Error in OAuth callback.";
      case "OAuthCreateAccount":
        return "Could not create OAuth account.";
      case "EmailCreateAccount":
        return "Could not create email account.";
      case "Callback":
        return "Error in callback.";
      case "OAuthAccountNotLinked":
        return "Email already in use with different provider.";
      case "EmailSignin":
        return "Check your email address.";
      case "CredentialsSignin":
        return "Sign in failed. Check your credentials.";
      case "SessionRequired":
        return "Please sign in to access this page.";
      default:
        return "An unexpected error occurred during authentication.";
    }
  };

  return (
    <div className={`${inter.className} w-full bg-white min-h-screen`}>
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

      <div className="max-w-md mx-auto px-6 mt-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">❌</span>
          </div>
          
          <h1 className={`${poppins.className} text-2xl font-bold text-gray-900 mb-4`}>
            Authentication Error
          </h1>
          
          <p className="text-gray-600 mb-4">
            {getErrorMessage(error)}
          </p>

          <div className="space-y-4 mt-6">
            <Link
              href="/auth/signup"
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors block text-center"
            >
              Try Sign Up Again
            </Link>
            
            <Link
              href="/"
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors block text-center"
            >
              Go Home
            </Link>
          </div>

          {/* Detailed debug info */}
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">Debug Information:</h3>
            <div className="text-left text-sm text-yellow-700">
              <p><strong>Error:</strong> {error}</p>
              <p><strong>Check:</strong> Google OAuth credentials in .env.local</p>
              <p><strong>Verify:</strong> MongoDB connection is working</p>
              <p><strong>Ensure:</strong> NEXTAUTH_URL is set to http://localhost:3000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}