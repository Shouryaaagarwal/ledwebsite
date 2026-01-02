"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { withRoleProtection } from "@/lib/withRoleProtection";

interface ReferenceFile {
  url: string;
  name: string;
  fileType: string;
  size?: number;
}

interface PricingBlock {
  clientAskedPrice: string;
  yourPrice: string;
  reason: string;
  accepted: boolean;
  status: 'counter_sent' | 'accepted' | 'rejected' | 'pending';
}

function CreateProjectRequestPage() {
  const { data: session } = useSession();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    projectTitle: "",
    projectType: "",
    receivedTime: new Date().toISOString().slice(0, 16),
    projectDescription: "",
    deadline: "",
    referenceFiles: [] as ReferenceFile[],
    pricingBlock: {
      clientAskedPrice: "",
      yourPrice: "",
      reason: "",
      accepted: false,
      status: 'pending' as const
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const projectTypes = [
    "Web Development",
    "Mobile App",
    "UI/UX Design",
    "Graphic Design",
    "Content Writing",
    "Digital Marketing",
    "Video Production",
    "Consulting",
    "Other"
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePricingChange = (field: keyof PricingBlock, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      pricingBlock: {
        ...prev.pricingBlock,
        [field]: value
      }
    }));
  };

  const addReferenceFile = () => {
    setFormData(prev => ({
      ...prev,
      referenceFiles: [
        ...prev.referenceFiles,
        { url: "", name: "", fileType: "" }
      ]
    }));
  };

  const removeReferenceFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      referenceFiles: prev.referenceFiles.filter((_, i) => i !== index)
    }));
  };

  const updateReferenceFile = (index: number, field: keyof ReferenceFile, value: string) => {
    const updatedFiles = [...formData.referenceFiles];
    updatedFiles[index] = { ...updatedFiles[index], [field]: value };
    setFormData(prev => ({ ...prev, referenceFiles: updatedFiles }));
  };

  const validateForm = () => {
    if (!formData.projectTitle.trim()) {
      setError("Project title is required");
      return false;
    }
    if (!formData.projectType.trim()) {
      setError("Project type is required");
      return false;
    }
    if (!formData.projectDescription.trim()) {
      setError("Project description is required");
      return false;
    }
    if (!formData.deadline) {
      setError("Deadline is required");
      return false;
    }
    if (!formData.pricingBlock.clientAskedPrice || parseFloat(formData.pricingBlock.clientAskedPrice) <= 0) {
      setError("Valid client asked price is required");
      return false;
    }
    if (!formData.pricingBlock.yourPrice || parseFloat(formData.pricingBlock.yourPrice) <= 0) {
      setError("Valid your price is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/creator/project-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create project request');
      }

      router.push('/creator/workspace/requested');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">New Project Request</h1>
          <p className="text-gray-600 mb-8">Fill in the details for the new project request</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={formData.projectTitle}
                    onChange={(e) => handleInputChange("projectTitle", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Enter project title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Type *
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => handleInputChange("projectType", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  >
                    <option value="">Select project type</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Received Time
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.receivedTime}
                    onChange={(e) => handleInputChange("receivedTime", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deadline *
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.deadline}
                    onChange={(e) => handleInputChange("deadline", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Project Description */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Description *</h2>
              <textarea
                value={formData.projectDescription}
                onChange={(e) => handleInputChange("projectDescription", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent min-h-[150px]"
                placeholder="Describe the project requirements, scope, and any specific details..."
                required
              />
            </div>

            {/* Reference Files */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Reference Files (Drive Links)</h2>
                <button
                  type="button"
                  onClick={addReferenceFile}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  + Add File
                </button>
              </div>
              
              {formData.referenceFiles.length === 0 ? (
                <p className="text-gray-500 italic">No reference files added</p>
              ) : (
                <div className="space-y-4">
                  {formData.referenceFiles.map((file, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1 space-y-3">
                        <input
                          type="text"
                          value={file.url}
                          onChange={(e) => updateReferenceFile(index, 'url', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-black focus:border-transparent"
                          placeholder="Google Drive/Cloud URL"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={file.name}
                            onChange={(e) => updateReferenceFile(index, 'name', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-black focus:border-transparent"
                            placeholder="File name"
                          />
                          <input
                            type="text"
                            value={file.fileType}
                            onChange={(e) => updateReferenceFile(index, 'fileType', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-black focus:border-transparent"
                            placeholder="File type (image, pdf, etc.)"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeReferenceFile(index)}
                        className="px-3 py-2 text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pricing Block */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Pricing Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Asked Price ($) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.pricingBlock.clientAskedPrice}
                    onChange={(e) => handlePricingChange("clientAskedPrice", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Price ($) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.pricingBlock.yourPrice}
                    onChange={(e) => handlePricingChange("yourPrice", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Price Difference (Optional)
                </label>
                <textarea
                  value={formData.pricingBlock.reason}
                  onChange={(e) => handlePricingChange("reason", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent min-h-[100px]"
                  placeholder="Explain why your price differs from the client's asked price..."
                />
              </div>

              <div className="mt-6 flex items-center">
                <input
                  type="checkbox"
                  id="accepted"
                  checked={formData.pricingBlock.accepted}
                  onChange={(e) => handlePricingChange("accepted", e.target.checked)}
                  className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                />
                <label htmlFor="accepted" className="ml-2 text-sm text-gray-700">
                  Accept project with these terms
                </label>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating..." : "Create Project Request"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default withRoleProtection(CreateProjectRequestPage, ["client"]);