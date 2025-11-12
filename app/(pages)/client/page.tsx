"use client";

import  {withRoleProtection}  from "@/lib/withRoleProtection";

function ClientPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Client Dashboard</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome, Client!</h2>
          <p className="text-gray-600">
            This page is only accessible to clients. You can manage your projects, 
            hire creators, and track your campaigns here.
          </p>
          {/* Add client-specific content */}
        </div>
      </div>
    </div>
  );
}

export default withRoleProtection(ClientPage, ["client"]);