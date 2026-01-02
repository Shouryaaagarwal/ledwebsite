"use client";

import { useState, useRef, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { withRoleProtection } from "@/lib/withRoleProtection";

interface WorkExperience {
  id: string;
  title: string;
  company: string;
  location: string;
  country: string;
  currentlyWorking: boolean;
  startDate: string;
  endDate: string;
  description: string;
  resume: File | null;
  resumeName: string;
}

function WorkExperiencePage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([
    {
      id: "1",
      title: "",
      company: "",
      location: "",
      country: "",
      currentlyWorking: false,
      startDate: "",
      endDate: "",
      description: "",
      resume: null,
      resumeName: "",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const router = useRouter();

  // Load existing work experiences on component mount
  useEffect(() => {
    const loadWorkExperiences = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/creator/profile/work-experience");

        if (response.ok) {
          const data = await response.json();
          // Updated to match your API response structure
          if (
            data.workExperience &&
            data.workExperience.workExperiences &&
            data.workExperience.workExperiences.length > 0
          ) {
            // Convert backend data to frontend format
            const formattedExperiences =
              data.workExperience.workExperiences.map((exp: any) => ({
                id: exp.id || Date.now().toString(),
                title: exp.title || "",
                company: exp.company || "",
                location: exp.location || "",
                country: exp.country || "",
                currentlyWorking: exp.currentlyWorking || false,
                startDate: exp.startDate || "",
                endDate: exp.endDate || "",
                description: exp.description || "",
                resume: null, // Files need to be re-uploaded or handled separately
                resumeName: exp.workLetterName || "",
              }));
            setWorkExperiences(formattedExperiences);
          }
        }
      } catch (error) {
        console.error("Error loading work experiences:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadWorkExperiences();
  }, []);

  const handleSignOut = (): void => {
    console.log("Signing out...");
    setIsDropdownOpen(false);
    // Add your sign out logic here
  };

  const handleAddWorkExperience = (): void => {
    setWorkExperiences((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title: "",
        company: "",
        location: "",
        country: "",
        currentlyWorking: false,
        startDate: "",
        endDate: "",
        description: "",
        resume: null,
        resumeName: "",
      },
    ]);
  };

  const handleRemoveWorkExperience = (id: string): void => {
    if (workExperiences.length > 1) {
      setWorkExperiences((prev) => prev.filter((exp) => exp.id !== id));
    }
  };

  const handleInputChange = (
    id: string,
    field: string,
    value: string | boolean
  ): void => {
    setWorkExperiences((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );

    // Clear end date if currently working is checked
    if (field === "currentlyWorking" && value === true) {
      setWorkExperiences((prev) =>
        prev.map((exp) => (exp.id === id ? { ...exp, endDate: "" } : exp))
      );
    }
  };

  const handleResumeUpload = (
    id: string,
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    const file = e.target.files?.[0];
    if (file) {
      setWorkExperiences((prev) =>
        prev.map((exp) =>
          exp.id === id ? { ...exp, resume: file, resumeName: file.name } : exp
        )
      );
    }
  };

  const handleRemoveResume = (id: string): void => {
    setWorkExperiences((prev) =>
      prev.map((exp) =>
        exp.id === id ? { ...exp, resume: null, resumeName: "" } : exp
      )
    );
    if (fileInputRefs.current[id]) {
      fileInputRefs.current[id]!.value = "";
    }
  };

  const saveWorkExperiences = async (): Promise<boolean> => {
    try {
      setIsSaving(true);

      // Prepare data for API - convert files to uploadable format
      const experiencesToSave = workExperiences.map((exp) => ({
        id: exp.id,
        title: exp.title,
        company: exp.company,
        location: exp.location,
        country: exp.country,
        currentlyWorking: exp.currentlyWorking,
        startDate: exp.startDate,
        endDate: exp.endDate,
        description: exp.description,
        workLetterName: exp.resumeName,
        // File upload would be handled separately in a real app
      }));

      const response = await fetch("/api/creator/profile/work-experience", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workExperiences: experiencesToSave,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to save work experiences");
      }

      return true;
    } catch (error) {
      console.error("Error saving work experiences:", error);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // const handleSubmit = async (e: React.FormEvent): Promise<void> => {
  //   e.preventDefault();

  //   // Validate required fields for each experience
  //   const isValid = workExperiences.every(exp =>
  //     exp.title.trim() && exp.company.trim() && exp.startDate
  //   );

  //   if (!isValid) {
  //     alert("Please fill all required fields (Title, Company, and Start Date) for each work experience.");
  //     return;
  //   }

  //   // Save to database
  //   const saved = await saveWorkExperiences();

  //   if (saved) {
  //     console.log("Work experience data saved:", workExperiences);
  //     router.push("/creator/create-profile/rate");
  //   } else {
  //     alert("Failed to save work experiences. Please try again.");
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    // Validate required fields for each experience
    const isValid = workExperiences.every(
      (exp) => exp.title.trim() && exp.company.trim() && exp.startDate
    );

    if (!isValid) {
      alert(
        "Please fill all required fields (Title, Company, and Start Date) for each work experience."
      );
      return;
    }

    // Save to database
    const saved = await saveWorkExperiences();

    if (saved) {
      console.log("Work experience data saved:", workExperiences);
      // Check if user came from profile-review page
      const urlParams = new URLSearchParams(window.location.search);
      const returnTo = urlParams.get("returnTo");

      if (returnTo === "profile-review") {
        router.push("/creator/create-profile/profile-review");
      } else {
        router.push("/creator/create-profile/rate");
      }
    } else {
      alert("Failed to save work experiences. Please try again.");
    }
  };
  const handleBack = (): void => {
    router.push("/creator/create-profile/portfolio");
  };

  // Generate year options for dropdowns
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Fixed ref callback function
  const setFileInputRef = (id: string) => (el: HTMLInputElement | null) => {
    fileInputRefs.current[id] = el;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your work experiences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Creator Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Showcase your professional journey and build trust with clients
            </p>
          </div>

          {/* Account Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
            >
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">C</span>
              </div>
              <span className="text-sm font-medium">Creator Account</span>
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

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow">
          {/* Progress Bar */}
          <div className="px-6 pt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Step 5 of 7
              </span>
              <span className="text-sm font-medium text-gray-600">71%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div
                className="bg-black h-2 rounded-full transition-all duration-300"
                style={{ width: "71%" }}
              ></div>
            </div>
          </div>

          {/* Page Title */}
          <div className="px-6 pb-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Here's what you've told us about your experience — any more to
              add?
            </h2>
            <p className="text-gray-600">
              The more you tell us, the better: creators who've added their work
              experience are twice as likely to win work.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-8">
              {workExperiences.map((exp, index) => (
                <div
                  key={exp.id}
                  className="border border-gray-200 rounded-lg p-6"
                >
                  {/* Item Header */}
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Work Experience {index + 1}
                    </h3>
                    {workExperiences.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveWorkExperience(exp.id)}
                        className="text-red-600 hover:text-red-800 transition-colors text-sm font-medium"
                      >
                        Remove Experience
                      </button>
                    )}
                  </div>

                  <div className="space-y-6">
                    {/* Title and Company */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Job Title */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Title *
                        </label>
                        <input
                          type="text"
                          value={exp.title}
                          onChange={(e) =>
                            handleInputChange(exp.id, "title", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                          placeholder="e.g., Video Editor, Graphic Designer"
                          required
                        />
                      </div>

                      {/* Company */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company / Client Name *
                        </label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) =>
                            handleInputChange(exp.id, "company", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                          placeholder="e.g., CBL, Freelance Client"
                          required
                        />
                      </div>
                    </div>

                    {/* Location and Country */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Location */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          value={exp.location}
                          onChange={(e) =>
                            handleInputChange(
                              exp.id,
                              "location",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                          placeholder="e.g., London, Remote"
                        />
                      </div>

                      {/* Country */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country
                        </label>
                        <input
                          type="text"
                          value={exp.country}
                          onChange={(e) =>
                            handleInputChange(exp.id, "country", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                          placeholder="e.g., United Kingdom"
                        />
                      </div>
                    </div>

                    {/* Currently Working Checkbox */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`currently-working-${exp.id}`}
                        checked={exp.currentlyWorking}
                        onChange={(e) =>
                          handleInputChange(
                            exp.id,
                            "currentlyWorking",
                            e.target.checked
                          )
                        }
                        className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                      />
                      <label
                        htmlFor={`currently-working-${exp.id}`}
                        className="ml-2 text-sm text-gray-700"
                      >
                        I am currently working in this role
                      </label>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Start Date */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Start Date *
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <select
                            value={exp.startDate.split("-")[0] || ""}
                            onChange={(e) => {
                              const month = e.target.value;
                              const year = exp.startDate.split("-")[1] || "";
                              handleInputChange(
                                exp.id,
                                "startDate",
                                `${month}-${year}`
                              );
                            }}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                            required
                          >
                            <option value="">Month</option>
                            {months.map((month) => (
                              <option key={month} value={month}>
                                {month}
                              </option>
                            ))}
                          </select>
                          <select
                            value={exp.startDate.split("-")[1] || ""}
                            onChange={(e) => {
                              const month = exp.startDate.split("-")[0] || "";
                              const year = e.target.value;
                              handleInputChange(
                                exp.id,
                                "startDate",
                                `${month}-${year}`
                              );
                            }}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                            required
                          >
                            <option value="">Year</option>
                            {years.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* End Date */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          End Date {!exp.currentlyWorking && "*"}
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <select
                            value={exp.endDate.split("-")[0] || ""}
                            onChange={(e) => {
                              const month = e.target.value;
                              const year = exp.endDate.split("-")[1] || "";
                              handleInputChange(
                                exp.id,
                                "endDate",
                                `${month}-${year}`
                              );
                            }}
                            disabled={exp.currentlyWorking}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                            required={!exp.currentlyWorking}
                          >
                            <option value="">Month</option>
                            {months.map((month) => (
                              <option key={month} value={month}>
                                {month}
                              </option>
                            ))}
                          </select>
                          <select
                            value={exp.endDate.split("-")[1] || ""}
                            onChange={(e) => {
                              const month = exp.endDate.split("-")[0] || "";
                              const year = e.target.value;
                              handleInputChange(
                                exp.id,
                                "endDate",
                                `${month}-${year}`
                              );
                            }}
                            disabled={exp.currentlyWorking}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                            required={!exp.currentlyWorking}
                          >
                            <option value="">Year</option>
                            {years.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>
                        {exp.currentlyWorking && (
                          <p className="text-xs text-gray-500 mt-1">
                            End date is optional for current positions
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={exp.description}
                        onChange={(e) =>
                          handleInputChange(
                            exp.id,
                            "description",
                            e.target.value
                          )
                        }
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors resize-none"
                        placeholder="Describe your responsibilities, achievements, and key projects in this role. What did you accomplish? What skills did you use?"
                        maxLength={1000}
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>
                          Highlight your achievements and responsibilities
                        </span>
                        <span>{exp.description.length}/1000</span>
                      </div>
                    </div>

                    {/* Upload Work Letter/Resume */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">
                        Upload Work Letter or Certificate (Optional)
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                        <input
                          ref={setFileInputRef(exp.id)}
                          type="file"
                          onChange={(e) => handleResumeUpload(exp.id, e)}
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          className="hidden"
                        />

                        {exp.resumeName ? (
                          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                                <svg
                                  className="w-5 h-5 text-blue-600"
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
                                  {exp.resumeName}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Click to replace
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveResume(exp.id)}
                              className="text-red-600 hover:text-red-800 transition-colors"
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
                          <div className="space-y-3">
                            <svg
                              className="w-12 h-12 text-gray-400 mx-auto"
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
                                Upload work letter or certificate
                              </p>
                              <p className="text-xs text-gray-500">
                                PDF, DOC, DOCX, JPG, PNG up to 10MB
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                fileInputRefs.current[exp.id]?.click()
                              }
                              className="bg-black text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                            >
                              Choose File
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Another Experience Button */}
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={handleAddWorkExperience}
                className="flex items-center space-x-2 px-6 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors"
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="font-medium">Add Another Work Experience</span>
              </button>
            </div>

            {/* Review Section */}
            <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-yellow-600 text-sm font-bold">!</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2 text-yellow-900">
                    Review Your Experience
                  </h4>
                  <p className="text-xs text-yellow-800 mb-3">
                    We only got part of that. Can you check we're not missing
                    anything?
                  </p>
                  <ul className="text-xs text-yellow-800 space-y-1">
                    <li>• Include both freelance and full-time positions</li>
                    <li>• Add client work to show your freelance experience</li>
                    <li>
                      • Highlight projects relevant to the services you offer
                    </li>
                    <li>
                      • Upload certificates or work letters for verification
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Next Step Preview */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-sm text-blue-900">
                    Next step:
                  </h4>
                  <p className="text-xs text-blue-800 mt-1">
                    Add your education background
                  </p>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 border-t border-gray-200 mt-8">
              <button
                type="button"
                onClick={handleBack}
                disabled={isSaving}
                className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSaving && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                )}
                <span>
                  {isSaving
                    ? "Saving..."
                    : new URLSearchParams(window.location.search).get(
                        "returnTo"
                      ) === "profile-review"
                    ? "Save & Return to Review"
                    : "Save and Continue"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default withRoleProtection(WorkExperiencePage, ["creator"]);
