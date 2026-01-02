"use client";

import { useState, ChangeEvent, useRef, useEffect } from "react";
import { withRoleProtection } from "@/lib/withRoleProtection";
import { useRouter } from "next/navigation";

interface FormData {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  profilePhoto: string | null;
  city: string;
  country: string;
  timeZone: string;
  spokenLanguages: string[];
  personalStatement: string;
}

interface Language {
  value: string;
  label: string;
  category: "indian" | "international";
}

function PersonalInfoPage() {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isLanguageDialogOpen, setIsLanguageDialogOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    profilePhoto: null,
    city: "",
    country: "",
    timeZone: "Asia/Kolkata",
    spokenLanguages: [],
    personalStatement: ""
  });

  // Time Zones (simplified)
  const timeZones = [
    { value: "Asia/Kolkata", label: "Indian Standard Time (IST) - UTC+5:30" },
    { value: "America/New_York", label: "Eastern Time (ET) - UTC-5" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT) - UTC-8" },
    { value: "Europe/London", label: "Greenwich Mean Time (GMT) - UTC+0" },
    { value: "Europe/Paris", label: "Central European Time (CET) - UTC+1" },
    { value: "Asia/Dubai", label: "Gulf Standard Time (GST) - UTC+4" },
    { value: "Asia/Singapore", label: "Singapore Time (SGT) - UTC+8" },
    { value: "Asia/Tokyo", label: "Japan Standard Time (JST) - UTC+9" }
  ];

  // Languages including Indian and popular international languages
  const languages: Language[] = [
    // Indian Languages
    { value: "hindi", label: "Hindi", category: "indian" },
    { value: "bengali", label: "Bengali", category: "indian" },
    { value: "telugu", label: "Telugu", category: "indian" },
    { value: "marathi", label: "Marathi", category: "indian" },
    { value: "tamil", label: "Tamil", category: "indian" },
    { value: "urdu", label: "Urdu", category: "indian" },
    { value: "gujarati", label: "Gujarati", category: "indian" },
    { value: "kannada", label: "Kannada", category: "indian" },
    { value: "malayalam", label: "Malayalam", category: "indian" },
    { value: "odia", label: "Odia", category: "indian" },
    { value: "punjabi", label: "Punjabi", category: "indian" },
    { value: "assamese", label: "Assamese", category: "indian" },
    // International Languages
    { value: "english", label: "English", category: "international" },
    { value: "spanish", label: "Spanish", category: "international" },
    { value: "french", label: "French", category: "international" },
    { value: "arabic", label: "Arabic", category: "international" },
    { value: "mandarin", label: "Mandarin Chinese", category: "international" },
    { value: "russian", label: "Russian", category: "international" },
    { value: "portuguese", label: "Portuguese", category: "international" },
    { value: "german", label: "German", category: "international" },
    { value: "japanese", label: "Japanese", category: "international" },
    { value: "korean", label: "Korean", category: "international" }
  ];

  // Filter languages based on search term
  const filteredLanguages = languages.filter(language =>
    language.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indianLanguages = filteredLanguages.filter(lang => lang.category === "indian");
  const internationalLanguages = filteredLanguages.filter(lang => lang.category === "international");

  // Load data on component mount
  useEffect(() => {
    loadPersonalInfo();
  }, []);

  const loadPersonalInfo = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/creator/profile/personal-info');
      
      if (response.ok) {
        const data = await response.json();
        if (data.personalInfo) {
          setFormData(data.personalInfo);
        }
      } else {
        console.error('Failed to load personal info');
      }
    } catch (error) {
      console.error('Error loading personal info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to cloud storage and get URL
      const objectUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        profilePhoto: objectUrl
      }));
    }
  };

  const toggleLanguage = (languageValue: string): void => {
    setFormData(prev => {
      const isSelected = prev.spokenLanguages.includes(languageValue);
      if (isSelected) {
        return {
          ...prev,
          spokenLanguages: prev.spokenLanguages.filter(lang => lang !== languageValue)
        };
      } else {
        return {
          ...prev,
          spokenLanguages: [...prev.spokenLanguages, languageValue]
        };
      }
    });
  };

  const removeLanguage = (languageToRemove: string): void => {
    setFormData(prev => ({
      ...prev,
      spokenLanguages: prev.spokenLanguages.filter(lang => lang !== languageToRemove)
    }));
  };

  const openLanguageDialog = (): void => {
    setIsLanguageDialogOpen(true);
    setSearchTerm("");
  };

  const closeLanguageDialog = (): void => {
    setIsLanguageDialogOpen(false);
    setSearchTerm("");
  };

  const handleDialogClick = (e: React.MouseEvent): void => {
    if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
      closeLanguageDialog();
    }
  };

  // const handleSave = async () => {
  //   try {
  //     setIsSaving(true);
      
  //     // Validate required fields
  //     const requiredFields = ['fullName', 'dateOfBirth', 'city', 'country', 'timeZone', 'personalStatement'];
  //     const missingFields = requiredFields.filter(field => !formData[field as keyof FormData]);
      
  //     if (missingFields.length > 0) {
  //       alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
  //       return;
  //     }

  //     if (formData.spokenLanguages.length === 0) {
  //       alert('Please select at least one language');
  //       return;
  //     }

  //     const response = await fetch('/api/creator/profile/personal-info', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     const result = await response.json();
      
  //     if (response.ok) {
  //       router.push('/creator/create-profile/professional-background');
  //     } else {
  //       throw new Error(result.error || 'Failed to save personal information');
  //     }
  //   } catch (error) {
  //     console.error('Error saving personal info:', error);
  //     alert('Failed to save personal information. Please try again.');
  //   } finally {
  //     setIsSaving(false);
  //   }
  // };
const handleSave = async () => {
  try {
    setIsSaving(true);
    
    // ... your existing validation code ...

    const response = await fetch('/api/creator/profile/personal-info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    
    if (response.ok) {
      // Check if user came from profile-review page
      const urlParams = new URLSearchParams(window.location.search);
      const returnTo = urlParams.get('returnTo');
      
      if (returnTo === 'profile-review') {
        router.push('/creator/create-profile/profile-review');
      } else {
        router.push('/creator/create-profile/professional-background');
      }
    } else {
      throw new Error(result.error || 'Failed to save personal information');
    }
  } catch (error) {
    console.error('Error saving personal info:', error);
    alert('Failed to save personal information. Please try again.');
  } finally {
    setIsSaving(false);
  }
};
  const handleBack = () => {
    router.push('/creator/create-profile');
  };

  // Close dialog on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLanguageDialog();
      }
    };

    if (isLanguageDialogOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isLanguageDialogOpen]);

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
                <span className="text-sm font-medium text-gray-700">Account</span>
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

      {/* Language Selection Dialog */}
      {isLanguageDialogOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleDialogClick}
        >
          <div 
            ref={dialogRef}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col"
          >
            {/* Dialog Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-900">Select Languages</h3>
                <button
                  onClick={closeLanguageDialog}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600 mt-2">Choose the languages you speak</p>
              
              {/* Search Bar */}
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Search languages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                />
              </div>
            </div>

            {/* Languages List */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Indian Languages */}
              {indianLanguages.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200">
                    Indian Languages
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {indianLanguages.map((language) => (
                      <label
                        key={language.value}
                        className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                          formData.spokenLanguages.includes(language.value)
                            ? "border-black bg-black text-white"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.spokenLanguages.includes(language.value)}
                          onChange={() => toggleLanguage(language.value)}
                          className="hidden"
                        />
                        <div className={`w-5 h-5 border-2 rounded mr-3 flex items-center justify-center ${
                          formData.spokenLanguages.includes(language.value)
                            ? "border-white bg-white"
                            : "border-gray-400"
                        }`}>
                          {formData.spokenLanguages.includes(language.value) && (
                            <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className="font-medium">{language.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* International Languages */}
              {internationalLanguages.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200">
                    International Languages
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {internationalLanguages.map((language) => (
                      <label
                        key={language.value}
                        className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                          formData.spokenLanguages.includes(language.value)
                            ? "border-black bg-black text-white"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.spokenLanguages.includes(language.value)}
                          onChange={() => toggleLanguage(language.value)}
                          className="hidden"
                        />
                        <div className={`w-5 h-5 border-2 rounded mr-3 flex items-center justify-center ${
                          formData.spokenLanguages.includes(language.value)
                            ? "border-white bg-white"
                            : "border-gray-400"
                        }`}>
                          {formData.spokenLanguages.includes(language.value) && (
                            <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className="font-medium">{language.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {filteredLanguages.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No languages found matching your search.
                </div>
              )}
            </div>

            {/* Dialog Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  {formData.spokenLanguages.length} language(s) selected
                </span>
                <button
                  onClick={closeLanguageDialog}
                  className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors font-semibold"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-gray-600">Step 1 of 7</span>
            <span className="text-sm font-semibold text-gray-600">14%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
            <div
              className="bg-linear-to-r from-black to-gray-700 h-3 rounded-full transition-all duration-500 shadow-md"
              style={{ width: "14%" }}
            ></div>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-linear-to-r from-black to-gray-700 bg-clip-text text-transparent">
            Personal Information
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Tell us about yourself so clients can get to know you better. This helps us match you with perfect opportunities.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left Column */}
            <div className="space-y-7">
              {/* Full Name */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 group-hover:border-gray-300 bg-gray-50/50"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Date of Birth */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 group-hover:border-gray-300 bg-gray-50/50"
                  required
                />
              </div>

              {/* Gender */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Gender (Optional)
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 group-hover:border-gray-300 bg-gray-50/50"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>

              {/* City & Country */}
              <div className="grid grid-cols-2 gap-5">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 group-hover:border-gray-300 bg-gray-50/50"
                    placeholder="Your city"
                    required
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Country *
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 group-hover:border-gray-300 bg-gray-50/50"
                    placeholder="Your country"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-7">
              {/* Profile Photo Upload */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-800 mb-4">
                  Profile Photo (Optional)
                </label>
                <div className="flex items-start space-x-6">
                  <div className="w-28 h-28 bg-linear-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center overflow-hidden shadow-lg border-2 border-gray-200 group-hover:border-gray-300 transition-all duration-200">
                    {formData.profilePhoto ? (
                      <img 
                        src={formData.profilePhoto} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      id="profilePhoto"
                      onChange={handlePhotoUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <label
                      htmlFor="profilePhoto"
                      className="cursor-pointer bg-linear-to-r from-black to-gray-700 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-200 inline-block shadow-md hover:scale-105 transform"
                    >
                      Upload Photo
                    </label>
                  </div>
                </div>
              </div>

              {/* Time Zone */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Time Zone *
                </label>
                <select
                  name="timeZone"
                  value={formData.timeZone}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 group-hover:border-gray-300 bg-gray-50/50"
                  required
                >
                  <option value="">Select your time zone</option>
                  {timeZones.map((zone) => (
                    <option key={zone.value} value={zone.value}>
                      {zone.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Spoken Languages */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Spoken Languages *
                </label>
                <button
                  type="button"
                  onClick={openLanguageDialog}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 group-hover:border-gray-300 bg-gray-50/50 text-left cursor-pointer flex justify-between items-center"
                >
                  <span className="text-gray-600">
                    {formData.spokenLanguages.length > 0 
                      ? `${formData.spokenLanguages.length} language(s) selected`
                      : "Select languages"
                    }
                  </span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Selected Languages Display */}
                {formData.spokenLanguages.length > 0 && (
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {formData.spokenLanguages.map((lang) => {
                        const language = languages.find(l => l.value === lang);
                        return (
                          <span
                            key={lang}
                            className="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium bg-linear-to-r from-gray-800 to-black text-white shadow-sm"
                          >
                            {language?.label}
                            <button
                              type="button"
                              onClick={() => removeLanguage(lang)}
                              className="ml-2 hover:text-red-200 transition-colors text-lg leading-none"
                            >
                              ×
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Personal Statement */}
          <div className="mt-10 pt-8 border-t border-gray-200">
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Personal Statement *
            </label>
            <textarea
              name="personalStatement"
              value={formData.personalStatement}
              onChange={handleInputChange}
              rows={5}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 hover:border-gray-300 bg-gray-50/50 resize-none"
              placeholder="Tell us about yourself, your passions, and what makes you unique as a creator..."
              maxLength={500}
              required
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>{formData.personalStatement.length}/500 characters</span>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-6">
          <button 
            onClick={handleBack}
            className="px-10 py-4 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
          >
            Back
          </button>
          {/* <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-12 py-4 bg-linear-to-r from-black to-gray-700 text-white rounded-xl hover:shadow-xl transition-all duration-200 font-semibold shadow-lg hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <span className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Saving...
              </span>
            ) : (
              "Save & Continue"
            )}
          </button> */} 

          <button 
  onClick={handleSave}
  disabled={isSaving}
  className="px-12 py-4 bg-linear-to-r from-black to-gray-700 text-white rounded-xl hover:shadow-xl transition-all duration-200 font-semibold shadow-lg hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed"
>
  {isSaving ? (
    <span className="flex items-center">
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
      Saving...
    </span>
  ) : (
    (new URLSearchParams(window.location.search).get('returnTo') === 'profile-review' 
      ? "Save & Return to Review" 
      : "Save & Continue"
    )
  )}
</button>
        </div>
      </main>
    </div>
  );
}

export default withRoleProtection(PersonalInfoPage, ["creator"]);