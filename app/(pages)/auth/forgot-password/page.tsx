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

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send reset email');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
      <div className="max-w-md mx-auto px-6 mt-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className={`${poppins.className} text-2xl font-normal text-gray-900 mb-3`}>
            Forgot your password?
          </h1>
          <p className="text-sm text-gray-600">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="text-lg mr-2">✅</span>
              <span className="font-semibold">Check your email!</span>
            </div>
            <p className="text-sm">
              We've sent a password reset link to <strong>{email}</strong>. 
              The link will expire in 1 hour.
            </p>
            <div className="mt-3 text-xs">
              <p>Didn't receive the email?</p>
              <button
                onClick={() => setSuccess(false)}
                className="text-green-700 font-semibold hover:text-green-800 mt-1"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Reset Form */}
        {!success && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address *
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                placeholder="Enter your email address"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending reset link...' : 'Send reset link'}
            </button>

            {/* Back to Sign In */}
            <div className="text-center">
              <button 
                type="button"
                onClick={() => router.push('/auth/signin')}
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                ← Back to sign in
              </button>
            </div>
          </form>
        )}

        {/* Help Text */}
        {!success && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Need help?</h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Check your spam or junk folder</li>
              <li>• Make sure you entered the correct email address</li>
              <li>• Contact support if you continue having issues</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}