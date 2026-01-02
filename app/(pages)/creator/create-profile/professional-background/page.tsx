"use client";

import { useState, useRef, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { withRoleProtection } from "@/lib/withRoleProtection";

interface FormData {
  professionalTitle: string;
  bio: string;
  resumeUrl: string;
  experienceLevel: string;
  yearsOfExperience: string;
}

function ProfessionalBackgroundPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    professionalTitle: "",
    bio: "",
    resumeUrl: "",
    experienceLevel: "",
    yearsOfExperience: "",
  });
  const [resumeName, setResumeName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Load data on component mount
  useEffect(() => {
    loadProfessionalBackground();
  }, []);

  const loadProfessionalBackground = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "/api/creator/profile/professional-background"
      );

      if (response.ok) {
        const data = await response.json();
        if (data.professionalBackground) {
          setFormData(data.professionalBackground);
          if (data.professionalBackground.resumeUrl) {
            setResumeName(
              data.professionalBackground.resumeUrl.split("/").pop() || "Resume"
            );
          }
        }
      } else {
        console.error("Failed to load professional background");
      }
    } catch (error) {
      console.error("Error loading professional background:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResumeUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to cloud storage and get URL
      // For now, we'll store the file name
      setResumeName(file.name);
      setFormData((prev) => ({
        ...prev,
        resumeUrl: URL.createObjectURL(file), // Temporary URL for demo
      }));
    }
  };

  const handleRemoveResume = (): void => {
    setFormData((prev) => ({
      ...prev,
      resumeUrl: "",
    }));
    setResumeName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // const handleSave = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     setIsSaving(true);

  //     // Validate required fields
  //     const requiredFields = ['professionalTitle', 'bio', 'experienceLevel', 'yearsOfExperience'];
  //     const missingFields = requiredFields.filter(field => !formData[field as keyof FormData]);

  //     if (missingFields.length > 0) {
  //       alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
  //       return;
  //     }

  //     const response = await fetch('/api/creator/profile/professional-background', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     const result = await response.json();

  //     if (response.ok) {
  //       router.push('/creator/create-profile/skills-expertise');
  //     } else {
  //       throw new Error(result.error || 'Failed to save professional background');
  //     }
  //   } catch (error) {
  //     console.error('Error saving professional background:', error);
  //     alert('Failed to save professional background. Please try again.');
  //   } finally {
  //     setIsSaving(false);
  //   }
  // };
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);

      // Validate required fields
      const requiredFields = [
        "professionalTitle",
        "bio",
        "experienceLevel",
        "yearsOfExperience",
      ];
      const missingFields = requiredFields.filter(
        (field) => !formData[field as keyof FormData]
      );

      if (missingFields.length > 0) {
        alert(
          `Please fill in all required fields: ${missingFields.join(", ")}`
        );
        return;
      }

      const response = await fetch(
        "/api/creator/profile/professional-background",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        // Check if user came from profile-review page
        const urlParams = new URLSearchParams(window.location.search);
        const returnTo = urlParams.get("returnTo");

        if (returnTo === "profile-review") {
          router.push("/creator/create-profile/profile-review");
        } else {
          router.push("/creator/create-profile/skills-expertise");
        }
      } else {
        throw new Error(
          result.error || "Failed to save professional background"
        );
      }
    } catch (error) {
      console.error("Error saving professional background:", error);
      alert("Failed to save professional background. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };
  const handleBack = (): void => {
    router.push("/creator/create-profile/personal-info");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your information...</p>
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
              Step 2 of 7
            </span>
            <span className="text-sm font-semibold text-gray-600">28%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
            <div
              className="bg-linear-to-r from-black to-gray-700 h-3 rounded-full transition-all duration-500 shadow-md"
              style={{ width: "28%" }}
            ></div>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-linear-to-r from-black to-gray-700 bg-clip-text text-transparent">
            Professional Background
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Tell us about your professional experience and expertise as a
            creator.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <form onSubmit={handleSave} className="space-y-8">
            {/* Professional Title */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Professional Title *
              </label>
              <input
                type="text"
                name="professionalTitle"
                value={formData.professionalTitle}
                onChange={handleInputChange}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 group-hover:border-gray-300 bg-gray-50/50"
                placeholder="e.g., Video Ad Designer, Animator, Graphic Designer"
                required
              />
              <p className="text-xs text-gray-500 mt-2">
                This will be displayed on your creator profile
              </p>
            </div>

            {/* Bio / Overview */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Bio / Overview *
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 group-hover:border-gray-300 bg-gray-50/50 resize-none"
                placeholder="Tell clients about yourself, your creative skills, and what you bring to the table. Describe your expertise, creative approach, and what makes you unique as a creator..."
                maxLength={500}
                required
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>
                  Brief professional introduction (500 characters max)
                </span>
                <span>{formData.bio.length}/500</span>
              </div>
            </div>

            {/* Upload Resume */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-800 mb-4">
                Upload Resume (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-gray-400 transition-colors">
                {resumeName ? (
                  <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-blue-600"
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
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-900">
                          {resumeName}
                        </p>
                        <p className="text-xs text-gray-500">
                          Click to replace
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveResume}
                      className="text-red-600 hover:text-red-800 transition-colors p-2"
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
                ) : (
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
                        Upload your resume
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, DOCX up to 10MB
                      </p>
                    </div>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleResumeUpload}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  id="resume-upload"
                />
                <label
                  htmlFor="resume-upload"
                  className="cursor-pointer bg-linear-to-r from-black to-gray-700 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-200 inline-block mt-4 shadow-md hover:scale-105 transform"
                >
                  {resumeName ? "Replace File" : "Choose File"}
                </label>
              </div>
            </div>

            {/* Experience Level & Years of Experience */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Experience Level */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Experience Level *
                </label>
                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 group-hover:border-gray-300 bg-gray-50/50"
                  required
                >
                  <option value="">Select experience level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="expert">Expert</option>
                </select>
              </div>

              {/* Years of Experience */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Years of Experience *
                </label>
                <select
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 group-hover:border-gray-300 bg-gray-50/50"
                  required
                >
                  <option value="">Select years</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-7">5-7 years</option>
                  <option value="7-10">7-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>
            </div>

            {/* Experience Level Descriptions */}
            <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
              <h4 className="font-semibold text-sm mb-4 text-blue-900">
                Experience Level Guide:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-blue-800">
                <div>
                  <span className="font-medium block mb-2">Beginner:</span>
                  <p>
                    0-2 years experience, learning foundational skills, building
                    portfolio
                  </p>
                </div>
                <div>
                  <span className="font-medium block mb-2">Intermediate:</span>
                  <p>
                    2-5 years experience, proficient in core skills, independent
                    work
                  </p>
                </div>
                <div>
                  <span className="font-medium block mb-2">Expert:</span>
                  <p>
                    5+ years experience, advanced skills, leadership, mentoring
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-8 border-t border-gray-200">
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

export default withRoleProtection(ProfessionalBackgroundPage, ["creator"]);
