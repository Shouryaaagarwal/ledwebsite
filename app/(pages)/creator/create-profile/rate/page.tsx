"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { withRoleProtection } from "@/lib/withRoleProtection";

interface RateAvailabilityData {
  pricingType: "hourly" | "project";
  hourlyRate: string;
  minimumBudget: string;
  weeklyAvailability: string;
  availabilityStatus: "active" | "away";
  workWithInternational: boolean;
  currency: string;
}

function RateAvailabilityPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState<RateAvailabilityData>({
    pricingType: "hourly",
    hourlyRate: "",
    minimumBudget: "",
    weeklyAvailability: "20",
    availabilityStatus: "active",
    workWithInternational: true,
    currency: "₹"
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const router = useRouter();

  // Load existing rate availability on component mount
  useEffect(() => {
    const loadRateAvailability = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/creator/profile/rate-availability');
        
        if (response.ok) {
          const data = await response.json();
          console.log('Loaded data:', data); // Debug log
          
          if (data.rateAvailability) {
            setFormData({
              pricingType: data.rateAvailability.pricingType || "hourly",
              hourlyRate: data.rateAvailability.hourlyRate?.toString() || "",
              minimumBudget: data.rateAvailability.minimumBudget?.toString() || "",
              weeklyAvailability: data.rateAvailability.weeklyAvailability || "20",
              availabilityStatus: data.rateAvailability.availabilityStatus || "active",
              workWithInternational: data.rateAvailability.workWithInternational !== false,
              currency: data.rateAvailability.currency || "₹"
            });
          }
        } else {
          console.error('Failed to load rate availability');
        }
      } catch (error) {
        console.error('Error loading rate availability:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRateAvailability();
  }, []);

  const handleSignOut = (): void => {
    console.log("Signing out...");
    setIsDropdownOpen(false);
  };

  const handleInputChange = (field: string, value: string | boolean): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // FIXED: Remove the clearing of other fields when switching pricing types
  const handlePricingTypeChange = (type: "hourly" | "project"): void => {
    setFormData(prev => ({
      ...prev,
      pricingType: type
      // Don't clear the other fields - keep both values stored
    }));
  };

  const saveRateAvailability = async (): Promise<boolean> => {
    try {
      console.log('Saving data:', formData); // Debug log
      
      const response = await fetch('/api/creator/profile/rate-availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log('Save response:', result); // Debug log
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to save rate availability');
      }

      return true;
    } catch (error) {
      console.error('Error saving rate availability:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    console.log('Form data before validation:', formData); // Debug log

    // Validate required fields based on pricing type
    if (formData.pricingType === "hourly" && !formData.hourlyRate.trim()) {
      alert("Please enter your hourly rate.");
      return;
    }

    if (formData.pricingType === "project" && !formData.minimumBudget.trim()) {
      alert("Please enter your minimum project budget.");
      return;
    }

    if (!formData.weeklyAvailability.trim()) {
      alert("Please select your weekly availability.");
      return;
    }

    // Validate numeric values
    if (formData.pricingType === "hourly") {
      const hourlyRate = parseFloat(formData.hourlyRate);
      if (isNaN(hourlyRate) || hourlyRate <= 0) {
        alert("Please enter a valid hourly rate.");
        return;
      }
    }

    if (formData.pricingType === "project") {
      const minimumBudget = parseFloat(formData.minimumBudget);
      if (isNaN(minimumBudget) || minimumBudget <= 0) {
        alert("Please enter a valid minimum budget.");
        return;
      }
    }

    setIsSaving(true);
    
    // Save to database
    const saved = await saveRateAvailability();
    
    if (saved) {
      console.log("Rate & Availability data saved successfully");
      // Redirect to verification page
      router.push("/creator/create-profile/verification");
    } else {
      alert("Failed to save rate and availability. Please try again.");
    }
    
    setIsSaving(false);
  };

  const handleBack = (): void => {
    router.push("/onboarding/work-experience");
  };

  const weeklyAvailabilityOptions = [
    { value: "10", label: "10 hrs/week or less" },
    { value: "20", label: "20 hrs/week" },
    { value: "30", label: "30 hrs/week" },
    { value: "40", label: "40 hrs/week" },
    { value: "more", label: "More than 40 hrs/week" }
  ];

  const getAvailabilityDescription = (status: string): string => {
    switch (status) {
      case "10": return "Part-time (1-2 days/week)";
      case "20": return "Part-time (3-4 days/week)";
      case "30": return "Nearly full-time";
      case "40": return "Full-time";
      case "more": return "Full-time+ (Overtime available)";
      default: return "";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your rate settings...</p>
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
            <h1 className="text-3xl font-bold text-gray-900">Creator Dashboard</h1>
            <p className="text-gray-600 mt-2">Set your rates and availability to start getting projects</p>
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
              <span className="text-sm font-medium text-gray-600">Step 7 of 8</span>
              <span className="text-sm font-medium text-gray-600">88%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div
                className="bg-black h-2 rounded-full transition-all duration-300"
                style={{ width: "88%" }}
              ></div>
            </div>
          </div>

          {/* Page Title */}
          <div className="px-6 pb-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Set Your Rates & Availability
            </h2>
            <p className="text-gray-600">
              Define your pricing structure and let clients know when you're available for work.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Pricing Type */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Type</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Hourly Rate Card */}
                <button
                  type="button"
                  onClick={() => handlePricingTypeChange("hourly")}
                  className={`p-4 border-2 rounded-lg text-left transition-all ${
                    formData.pricingType === "hourly"
                      ? "border-black bg-black text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Hourly Rate</span>
                    {formData.pricingType === "hourly" && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <p className="text-sm opacity-90">
                    Charge by the hour for ongoing projects or tasks with uncertain scope
                  </p>
                  {/* Show the saved hourly rate when not active */}
                  {formData.pricingType !== "hourly" && formData.hourlyRate && (
                    <p className="text-xs text-green-600 mt-2">
                      Saved rate: {formData.currency}{formData.hourlyRate}/hour
                    </p>
                  )}
                </button>

                {/* Project-based Card */}
                <button
                  type="button"
                  onClick={() => handlePricingTypeChange("project")}
                  className={`p-4 border-2 rounded-lg text-left transition-all ${
                    formData.pricingType === "project"
                      ? "border-black bg-black text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Project-based</span>
                    {formData.pricingType === "project" && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <p className="text-sm opacity-90">
                    Set fixed prices for well-defined projects with clear deliverables
                  </p>
                  {/* Show the saved minimum budget when not active */}
                  {formData.pricingType !== "project" && formData.minimumBudget && (
                    <p className="text-xs text-green-600 mt-2">
                      Saved budget: {formData.currency}{formData.minimumBudget}
                    </p>
                  )}
                </button>
              </div>
            </div>

            {/* Rate Information */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Rate Information</h3>
              
              <div className="space-y-6">
                {formData.pricingType === "hourly" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hourly Rate *
                    </label>
                    <div className="relative max-w-xs">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 font-medium">{formData.currency}</span>
                      </div>
                      <input
                        type="number"
                        value={formData.hourlyRate}
                        onChange={(e) => handleInputChange("hourlyRate", e.target.value)}
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      This will be your default rate for hourly projects
                    </p>
                  </div>
                )}

                {formData.pricingType === "project" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Project Budget *
                    </label>
                    <div className="relative max-w-xs">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 font-medium">{formData.currency}</span>
                      </div>
                      <input
                        type="number"
                        value={formData.minimumBudget}
                        onChange={(e) => handleInputChange("minimumBudget", e.target.value)}
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Clients won't see projects below this amount
                    </p>
                  </div>
                )}

                {/* Rate Guidance */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-sm mb-2 text-blue-900">Rate Guidance</h4>
                  <div className="text-xs text-blue-800 space-y-1">
                    <p><strong>Beginner:</strong> {formData.currency}500 - {formData.currency}1,500/hour</p>
                    <p><strong>Intermediate:</strong> {formData.currency}1,500 - {formData.currency}3,500/hour</p>
                    <p><strong>Expert:</strong> {formData.currency}3,500+/hour</p>
                    <p className="mt-2 text-blue-600">Based on your experience level and skills</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Availability</h3>
              
              <div className="space-y-6">
                {/* Weekly Availability */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Weekly Availability *
                  </label>
                  <div className="space-y-3">
                    {weeklyAvailabilityOptions.map((option) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          id={`availability-${option.value}`}
                          name="weeklyAvailability"
                          value={option.value}
                          checked={formData.weeklyAvailability === option.value}
                          onChange={(e) => handleInputChange("weeklyAvailability", e.target.value)}
                          className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                        />
                        <label
                          htmlFor={`availability-${option.value}`}
                          className="ml-3 text-sm text-gray-700"
                        >
                          <div className="font-medium">{option.label}</div>
                          <div className="text-xs text-gray-500">
                            {getAvailabilityDescription(option.value)}
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Availability Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Availability Status
                  </label>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => handleInputChange("availabilityStatus", "active")}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-lg border-2 transition-all ${
                        formData.availabilityStatus === "active"
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full ${
                        formData.availabilityStatus === "active" ? "bg-green-500" : "bg-gray-300"
                      }`}></div>
                      <span className="font-medium">Active</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleInputChange("availabilityStatus", "away")}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-lg border-2 transition-all ${
                        formData.availabilityStatus === "away"
                          ? "border-yellow-500 bg-yellow-50 text-yellow-700"
                          : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full ${
                        formData.availabilityStatus === "away" ? "bg-yellow-500" : "bg-gray-300"
                      }`}></div>
                      <span className="font-medium">Away</span>
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {formData.availabilityStatus === "active" 
                      ? "Clients will see you're available for new projects"
                      : "Clients will see you're temporarily unavailable"
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* International Clients */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="international-clients"
                  checked={formData.workWithInternational}
                  onChange={(e) => handleInputChange("workWithInternational", e.target.checked)}
                  className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black mt-1"
                />
                <div>
                  <label htmlFor="international-clients" className="text-sm font-medium text-gray-700">
                    Work with international clients
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    By checking this, you're open to working with clients from other countries. 
                    This can significantly increase your project opportunities. We'll handle currency 
                    conversion and international payments automatically.
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 border-t border-gray-200">
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
                <span>{isSaving ? 'Saving...' : 'Save & Continue'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default withRoleProtection(RateAvailabilityPage, ["creator"]);