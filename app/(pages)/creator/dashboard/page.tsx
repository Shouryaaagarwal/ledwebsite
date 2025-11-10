"use client";

import { withRoleProtection } from "@/app/(pages)/withRoleProtection/page";

function CreatorPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Creator Dashboard</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome, Creator!</h2>
          <p className="text-gray-600">
            This page is only accessible to creators. You can showcase your portfolio, 
            find projects, and manage your work here.
          </p>
          {/* Add creator-specific content */}
        </div>  
      </div>
    </div>
  );
}

export default withRoleProtection(CreatorPage, ["creator"]);