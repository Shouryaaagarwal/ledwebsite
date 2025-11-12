"use client";

import { useState, ChangeEvent } from "react";
import { withRoleProtection } from "@/lib/withRoleProtection";

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

function PersonalInfoPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "John Doe",
    dateOfBirth: "",
    gender: "",
    profilePhoto: null,
    city: "",
    country: "",
    timeZone: "",
    spokenLanguages: [],
    personalStatement: ""
  });

  const handleSignOut = (): void => {
    console.log("Signing out...");
    setIsDropdownOpen(false);
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
      setFormData(prev => ({
        ...prev,
        profilePhoto: URL.createObjectURL(file)
      }));
    }
  };

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const options = e.target.options;
    const selectedLanguages: string[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedLanguages.push(options[i].value);
      }
    }
    setFormData(prev => ({
      ...prev,
      spokenLanguages: selectedLanguages
    }));
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
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Step 2 of 6</span>
            <span className="text-sm font-medium text-gray-600">33%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-black h-2 rounded-full transition-all duration-300"
              style={{ width: "33%" }}
            ></div>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Personal Information</h1>
          <p className="text-gray-600">Tell us about yourself so clients can get to know you better.</p>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                placeholder="Enter your full name"
              />
              <p className="text-xs text-gray-500 mt-1">Auto-filled from your signup information</p>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth *
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender (Optional)
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>

            {/* City & Country */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                  placeholder="Your city"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country *
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                  placeholder="Your country"
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Profile Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Profile Photo *
              </label>
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  {formData.profilePhoto ? (
                    <img 
                      src={formData.profilePhoto} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    id="profilePhoto"
                    onChange={handlePhotoUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <label
                    htmlFor="profilePhoto"
                    className="cursor-pointer bg-black text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors inline-block"
                  >
                    Upload Photo
                  </label>
                  <p className="text-xs text-gray-500 mt-2">Recommended: Square image, 500x500px</p>
                </div>
              </div>
            </div>

            {/* Time Zone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Zone *
              </label>
              <select
                name="timeZone"
                value={formData.timeZone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
              >
                <option value="">Select your time zone</option>
                <option value="est">Eastern Time (ET)</option>
                <option value="cst">Central Time (CT)</option>
                <option value="pst">Pacific Time (PT)</option>
                <option value="gmt">Greenwich Mean Time (GMT)</option>
                <option value="cet">Central European Time (CET)</option>
              </select>
            </div>

            {/* Spoken Languages */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Spoken Languages *
              </label>
              <select
                multiple
                name="spokenLanguages"
                value={formData.spokenLanguages}
                onChange={handleLanguageChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors h-32"
                size={5}
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
                <option value="mandarin">Mandarin</option>
                <option value="hindi">Hindi</option>
                <option value="arabic">Arabic</option>
                <option value="portuguese">Portuguese</option>
                <option value="russian">Russian</option>
                <option value="japanese">Japanese</option>
              </select>
              <p className="text-xs text-gray-500 mt-2">Hold Ctrl/Cmd to select multiple languages</p>
            </div>
          </div>
        </div>

        {/* Personal Statement */}
        <div className="mt-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Personal Statement *
          </label>
          <textarea
            name="personalStatement"
            value={formData.personalStatement}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors resize-none"
            placeholder="Tell us about yourself, your passions, and what makes you unique as a creator..."
            maxLength={500}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Brief introduction about yourself</span>
            <span>{formData.personalStatement.length}/500</span>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
          <button className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium">
            Back
          </button>
          <button className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
            Save & Continue
          </button>
        </div>
      </main>
    </div>
  );
}

export default withRoleProtection(PersonalInfoPage, ["creator"]);