"use client";

import { useState } from "react";
import { withRoleProtection } from "@/lib/withRoleProtection";
import Image from "next/image";
import Link from "next/link";

function WorkspacePage() {
  const [activeTab, setActiveTab] = useState<'accepted' | 'requested'>('accepted');

  return (
    <div className="min-h-screen bg-white">
      {/* Logo at top left corner */}
      <div className="p-6">
        <Image 
          src="/blacklogo.jpg" 
          alt="Logo" 
          width={150} 
          height={40}
          className="object-contain"
        />
      </div>

      {/* Main Content - Lifted Upward */}
      <div className="flex flex-col items-center justify-start px-4 pt-16">
        <div className="w-full max-w-2xl text-center">
          
          {/* Workspace Heading and Description - Positioned higher */}
          <div className="mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Workspace</h1>
            <p className="text-gray-600 text-xl">
              Manage your accepted projects and review new requests in one place
            </p>
          </div>

          {/* Two Big Tabs - Positioned higher */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Link href="/creator/workspace/accepted"
              className={`flex-1 max-w-md mx-auto py-8 px-8 rounded-xl border-2 font-bold text-xl transition-all ${
                activeTab === 'accepted'
                  ? 'bg-black text-white border-black shadow-lg'
                  : 'bg-white text-gray-800 border-gray-300 hover:border-gray-400 hover:bg-gray-50 hover:shadow-md'
              }`}
            >
              Accepted Projects
            </Link>
            
            <Link 
              href="/creator/workspace/requested"
              className={`flex-1 max-w-md mx-auto py-8 px-8 rounded-xl border-2 font-bold text-xl transition-all text-center ${
                activeTab === 'requested'
                  ? 'bg-black text-white border-black shadow-lg'
                  : 'bg-white text-gray-800 border-gray-300 hover:border-gray-400 hover:bg-gray-50 hover:shadow-md'
              }`}
            >
              Requested Projects
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default withRoleProtection(WorkspacePage, ["creator"]);