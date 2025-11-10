"use client";

import { Inter, Poppins } from "next/font/google";
import { useState, useEffect } from "react";
import Image from "next/image";   
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

export default function ResetPasswordPage() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [validToken, setValidToken] = useState(false);
  const [token, setToken] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      setToken(token);
      verifyToken(token);
    } else {
      setError("Invalid or missing reset token");
    }
  }, [searchParams]);

  const verifyToken = async (token: string) => {
    try {
      const response = await fetch(`/api/auth/verify-reset-token?token=${token}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid token');
      }

      setValidToken(true);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to reset password');
      }

      setSuccess(true);
      
      // Redirect to signin after 3 seconds
      setTimeout(() => {
        router.push('/auth/signin?reset=success');
      }, 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!validToken && !error) {
    return (
      <div className={`${inter.className} w-full bg-white min-h-screen flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying reset token...</p>
        </div>
      </div>
    );
  }

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
            Reset your password
          </h1>
          <p className="text-sm text-gray-600">
            {success 
              ? "Your password has been reset successfully!" 
              : "Enter your new password below."
            }
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
            <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">✅</span>
            </div>
            <p className="font-semibold mb-2">Password reset successful!</p>
            <p className="text-sm">Redirecting you to sign in page...</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
            <div className="mt-2">
              <button 
                onClick={() => router.push('/auth/forgot-password')}
                className="text-sm text-red-700 font-semibold hover:text-red-800"
              >
                Request new reset link
              </button>
            </div>
          </div>
        )}

        {/* Reset Form */}
        {!success && validToken && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                New Password *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                placeholder="Enter new password (8+ characters)"
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password *
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                placeholder="Confirm your new password"
              />
            </div>

            {/* Password Requirements */}
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Password requirements:</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li className={formData.password.length >= 8 ? "text-green-600" : ""}>
                  • At least 8 characters long
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Resetting password...' : 'Reset password'}
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
      </div>
    </div>
  );
}