"use client";

import { useState } from "react";
import { withRoleProtection } from "@/lib/withRoleProtection";
import { useRouter } from "next/navigation";
import Link from "next/link";

function OnboardingPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = () => {
    // Add your sign out logic here
    console.log("Signing out...");
    setIsDropdownOpen(false);
  };

  const handleBeginOnboarding = () => {
    // Navigate to the next onboarding page
    router.push("/onboarding/step-1");
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-10 h-10 bg-black rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">HH</span>
          </div>
          <span className="ml-3 text-lg font-semibold">Hey Humanz</span>
        </div>

        {/* Account Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">A</span>
            </div>
            <span className="text-sm">Account</span>
            <svg
              className={`w-4 h-4 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10">
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Step 1 of 8</span>
            <span className="text-sm font-medium text-gray-600">13%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-black h-2 rounded-full transition-all duration-300"
              style={{ width: "13%" }}
            ></div>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6 leading-tight">
            Welcome to Hey Humanz Creators!
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Let's create your professional profile so clients can discover and hire you for their next big project.
          </p>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <Link href= "/creator/create-profile/personal-info"
            className="bg-black text-white px-12 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Let's Begin
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 text-sm">
            This process takes about 10-15 minutes. You can save your progress and return anytime.
          </p>
        </div>
      </main>
    </div>
  );
}

export default withRoleProtection(OnboardingPage, ["creator"]);