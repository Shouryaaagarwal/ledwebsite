"use client";

import { useState, useRef, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { withRoleProtection } from "@/lib/withRoleProtection";

interface PortfolioFile {
  url: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
}

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  externalLink: string;
  files: PortfolioFile[];
  previewUrls: string[];
}

function PortfolioShowcasePage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    {
      id: "1",
      title: "",
      description: "",
      category: "",
      externalLink: "",
      files: [],
      previewUrls: [],
    },
  ]);

  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const router = useRouter();

  const categories = [
    "Video Ads",
    "Animation",
    "Graphic Design",
    "Motion Graphics",
    "Social Media Content",
    "Brand Identity",
    "Presentation Design",
    "3D Modeling",
    "Visual Effects",
    "UI/UX Design",
    "Photography",
    "Illustration",
    "Web Design",
    "App Design",
  ];

  // Load data on component mount
  useEffect(() => {
    loadPortfolioShowcase();
  }, []);

  const loadPortfolioShowcase = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/creator/profile/portfolio-showcase");

      if (response.ok) {
        const data = await response.json();
        if (data.portfolioShowcase && data.portfolioShowcase.portfolioItems) {
          // Convert database files to component format
          const itemsWithPreviews = data.portfolioShowcase.portfolioItems.map(
            (item: any) => ({
              ...item,
              previewUrls: item.files.map((file: any) => file.url), // Use stored URLs for previews
            })
          );
          setPortfolioItems(
            itemsWithPreviews.length > 0
              ? itemsWithPreviews
              : [
                  {
                    id: "1",
                    title: "",
                    description: "",
                    category: "",
                    externalLink: "",
                    files: [],
                    previewUrls: [],
                  },
                ]
          );
        }
      } else {
        console.error("Failed to load portfolio showcase");
      }
    } catch (error) {
      console.error("Error loading portfolio showcase:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = (): void => {
    console.log("Signing out...");
    setIsDropdownOpen(false);
  };

  const handleAddPortfolioItem = (): void => {
    setPortfolioItems((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title: "",
        description: "",
        category: "",
        externalLink: "",
        files: [],
        previewUrls: [],
      },
    ]);
  };

  const handleRemovePortfolioItem = (id: string): void => {
    if (portfolioItems.length > 1) {
      setPortfolioItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleInputChange = (
    id: string,
    field: string,
    value: string
  ): void => {
    setPortfolioItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleFileUpload = (
    id: string,
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newFiles = files.slice(0, 5); // Limit to 5 files per item
      const previewUrls = newFiles.map((file) => URL.createObjectURL(file));

      // Convert File objects to PortfolioFile format
      const portfolioFiles = newFiles.map((file) => ({
        url: URL.createObjectURL(file), // Temporary URL for preview
        name: file.name,
        size: file.size,
        type: getFileType(file),
        uploadedAt: new Date(),
      }));

      setPortfolioItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                files: [...item.files, ...portfolioFiles],
                previewUrls: [...item.previewUrls, ...previewUrls],
              }
            : item
        )
      );
    }
  };

  const handleRemoveFile = (itemId: string, fileIndex: number): void => {
    setPortfolioItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          // Revoke object URL to prevent memory leaks
          URL.revokeObjectURL(item.previewUrls[fileIndex]);

          return {
            ...item,
            files: item.files.filter((_, index) => index !== fileIndex),
            previewUrls: item.previewUrls.filter(
              (_, index) => index !== fileIndex
            ),
          };
        }
        return item;
      })
    );
  };

  const getFileType = (file: File): string => {
    if (file.type.startsWith("video/")) return "video";
    if (file.type.startsWith("image/")) return "image";
    if (file.type === "application/zip" || file.name.endsWith(".zip"))
      return "zip";
    return "other";
  };

  // const handleSave = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     setIsSaving(true);

  //     // Validate required fields - both files and externalLink are now completely optional
  //     const isValid = portfolioItems.every(item =>
  //       item.title.trim() &&
  //       item.description.trim() &&
  //       item.category
  //       // No requirement for files or externalLink - both are optional
  //     );

  //     if (!isValid) {
  //       alert("Please fill all required fields (Title, Description, and Category) for each portfolio item.");
  //       return;
  //     }

  //     // Prepare data for API (remove previewUrls as they're not stored in DB)
  //     const portfolioData = {
  //       portfolioItems: portfolioItems.map(item => ({
  //         ...item,
  //         previewUrls: undefined // Remove previewUrls from API payload
  //       }))
  //     };

  //     const response = await fetch('/api/creator/profile/portfolio-showcase', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(portfolioData),
  //     });

  //     const result = await response.json();

  //     if (response.ok) {
  //       router.push('/creator/create-profile/work-experience');
  //     } else {
  //       throw new Error(result.error || 'Failed to save portfolio showcase');
  //     }
  //   } catch (error) {
  //     console.error('Error saving portfolio showcase:', error);
  //     alert('Failed to save portfolio showcase. Please try again.');
  //   } finally {
  //     setIsSaving(false);
  //   }
  // };
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);

      // Validate required fields - both files and externalLink are now completely optional
      const isValid = portfolioItems.every(
        (item) => item.title.trim() && item.description.trim() && item.category
        // No requirement for files or externalLink - both are optional
      );

      if (!isValid) {
        alert(
          "Please fill all required fields (Title, Description, and Category) for each portfolio item."
        );
        return;
      }

      // Prepare data for API (remove previewUrls as they're not stored in DB)
      const portfolioData = {
        portfolioItems: portfolioItems.map((item) => ({
          ...item,
          previewUrls: undefined, // Remove previewUrls from API payload
        })),
      };

      const response = await fetch("/api/creator/profile/portfolio-showcase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(portfolioData),
      });

      const result = await response.json();

      if (response.ok) {
        // Check if user came from profile-review page
        const urlParams = new URLSearchParams(window.location.search);
        const returnTo = urlParams.get("returnTo");

        if (returnTo === "profile-review") {
          router.push("/creator/create-profile/profile-review");
        } else {
          router.push("/creator/create-profile/work-experience");
        }
      } else {
        throw new Error(result.error || "Failed to save portfolio showcase");
      }
    } catch (error) {
      console.error("Error saving portfolio showcase:", error);
      alert("Failed to save portfolio showcase. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };
  const handleBack = (): void => {
    router.push("/creator/create-profile/skills-expertise");
  };

  // Fixed ref callback function
  const setFileInputRef = (id: string) => (el: HTMLInputElement | null) => {
    fileInputRefs.current[id] = el;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-white text-black">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-10 h-10 bg-linear-to-r from-black to-gray-800 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">HH</span>
              </div>
              <span className="ml-3 text-xl font-bold bg-linear-to-r from-black to-gray-700 bg-clip-text text-transparent">
                Hey Humanz
              </span>
            </div>

            {/* Account Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-3 px-4 py-2 rounded-xl hover:bg-gray-50 transition-all duration-200 border border-gray-200 shadow-sm"
              >
                <div className="w-9 h-9 bg-linear-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center shadow-inner">
                  <span className="text-white font-medium text-sm">A</span>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Account
                </span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 text-gray-600 ${
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

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 backdrop-blur-sm">
                  <button
                    onClick={() => setIsDropdownOpen(false)}
                    className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-gray-600">
              Step 4 of 7
            </span>
            <span className="text-sm font-semibold text-gray-600">57%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
            <div
              className="bg-linear-to-r from-black to-gray-700 h-3 rounded-full transition-all duration-500 shadow-md"
              style={{ width: "57%" }}
            ></div>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-linear-to-r from-black to-gray-700 bg-clip-text text-transparent">
            Portfolio Showcase
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Showcase your best work and impress potential clients with real
            examples of your creativity
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <form onSubmit={handleSave} className="space-y-12">
            {portfolioItems.map((item, index) => (
              <div
                key={item.id}
                className="border-2 border-gray-200 rounded-xl p-8 hover:border-gray-300 transition-all duration-200"
              >
                {/* Item Header */}
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold text-gray-900">
                    Portfolio Item {index + 1}
                  </h3>
                  {portfolioItems.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePortfolioItem(item.id)}
                      className="px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200 text-sm font-medium"
                    >
                      Remove Item
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Basic Info */}
                  <div className="space-y-6">
                    {/* Project Title */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-800 mb-3">
                        Project Title *
                      </label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) =>
                          handleInputChange(item.id, "title", e.target.value)
                        }
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 group-hover:border-gray-300 bg-gray-50/50"
                        placeholder="e.g., Animated Product Explainer Video"
                        required
                      />
                    </div>

                    {/* Category */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-800 mb-3">
                        Category *
                      </label>
                      <select
                        value={item.category}
                        onChange={(e) =>
                          handleInputChange(item.id, "category", e.target.value)
                        }
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 group-hover:border-gray-300 bg-gray-50/50"
                        required
                      >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* External Link - Completely Optional */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-800 mb-3">
                        External Link (Optional)
                      </label>
                      <input
                        type="url"
                        value={item.externalLink}
                        onChange={(e) =>
                          handleInputChange(
                            item.id,
                            "externalLink",
                            e.target.value
                          )
                        }
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 group-hover:border-gray-300 bg-gray-50/50"
                        placeholder="https://youtube.com/your-video or https://behance.net/your-project (Optional)"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Optional: Link to YouTube, Vimeo, Behance, Dribbble, or
                        your personal website
                      </p>
                    </div>
                  </div>

                  {/* Right Column - Description & Files */}
                  <div className="space-y-6">
                    {/* Description */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-800 mb-3">
                        Project Description *
                      </label>
                      <textarea
                        value={item.description}
                        onChange={(e) =>
                          handleInputChange(
                            item.id,
                            "description",
                            e.target.value
                          )
                        }
                        rows={4}
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 group-hover:border-gray-300 bg-gray-50/50 resize-none"
                        placeholder="Describe this project, your role, tools used, and any notable achievements or results..."
                        maxLength={300}
                        required
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>
                          Tell the story behind this project (300 characters
                          max)
                        </span>
                        <span>{item.description.length}/300</span>
                      </div>
                    </div>

                    {/* File Upload - Completely Optional */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-800 mb-4">
                        Upload Sample Files (Optional)
                        <span className="text-gray-500 font-normal ml-2">
                          (Max 5 files per project)
                        </span>
                      </label>

                      {/* File Upload Area */}
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-gray-400 transition-colors bg-gray-50/50">
                        <input
                          ref={setFileInputRef(item.id)}
                          type="file"
                          onChange={(e) => handleFileUpload(item.id, e)}
                          accept="video/*,image/*,.zip,.rar,.7z"
                          multiple
                          className="hidden"
                        />

                        {item.files.length === 0 ? (
                          <div className="space-y-4">
                            <svg
                              className="w-16 h-16 text-gray-400 mx-auto"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                Upload your project files (Optional)
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                Supports videos, images, and ZIP files up to
                                100MB each
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                fileInputRefs.current[item.id]?.click()
                              }
                              className="bg-linear-to-r from-black to-gray-700 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-200 shadow-md hover:scale-105 transform"
                            >
                              Choose Files
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                              <svg
                                className="w-5 h-5 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span>{item.files.length} file(s) uploaded</span>
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                fileInputRefs.current[item.id]?.click()
                              }
                              className="bg-linear-to-r from-black to-gray-700 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-200 shadow-md hover:scale-105 transform"
                            >
                              Add More Files
                            </button>
                          </div>
                        )}
                      </div>

                      {/* File Previews */}
                      {item.files.length > 0 && (
                        <div className="mt-6 space-y-4">
                          <h4 className="text-sm font-semibold text-gray-800">
                            Uploaded Files:
                          </h4>
                          <div className="space-y-3">
                            {item.files.map((file, fileIndex) => (
                              <div
                                key={fileIndex}
                                className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200"
                              >
                                <div className="flex items-center space-x-4">
                                  {/* File Icon */}
                                  <div
                                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                      file.type === "video"
                                        ? "bg-red-100 text-red-600"
                                        : file.type === "image"
                                        ? "bg-blue-100 text-blue-600"
                                        : file.type === "zip"
                                        ? "bg-yellow-100 text-yellow-600"
                                        : "bg-gray-100 text-gray-600"
                                    }`}
                                  >
                                    {file.type === "video" && (
                                      <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                        />
                                      </svg>
                                    )}
                                    {file.type === "image" && (
                                      <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                      </svg>
                                    )}
                                    {file.type === "zip" && (
                                      <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                      </svg>
                                    )}
                                  </div>

                                  <div className="text-left">
                                    <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                                      {file.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {(file.size / (1024 * 1024)).toFixed(2)}{" "}
                                      MB • {file.type.toUpperCase()}
                                    </p>
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleRemoveFile(item.id, fileIndex)
                                  }
                                  className="text-red-600 hover:text-red-800 transition-colors p-2 hover:bg-red-50 rounded-lg"
                                >
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Another Item Button */}
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={handleAddPortfolioItem}
                className="flex items-center space-x-3 px-8 py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-all duration-200 bg-gray-50/50 hover:bg-gray-100"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="font-semibold">
                  Add Another Portfolio Item
                </span>
              </button>
            </div>

            {/* Pro Tip */}
            <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-blue-600 text-sm font-bold">💡</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-3 text-blue-900">
                    Portfolio Best Practices
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-2">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Showcase your best and most relevant work first
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Include a variety of projects to demonstrate range
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Provide context with detailed descriptions
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Use high-quality images and videos when available
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Highlight projects that got results for clients
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-8 border-t border-gray-200 mt-8">
              <button
                type="button"
                onClick={handleBack}
                className="px-10 py-4 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-12 py-4 bg-linear-to-r from-black to-gray-700 text-white rounded-xl hover:shadow-xl transition-all duration-200 font-semibold shadow-lg hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <span className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Saving...
                  </span>
                ) : // Check if coming from profile-review and change button text accordingly
                new URLSearchParams(window.location.search).get("returnTo") ===
                  "profile-review" ? (
                  "Save & Return to Review"
                ) : (
                  "Save & Continue"
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default withRoleProtection(PortfolioShowcasePage, ["creator"]);
