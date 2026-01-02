"use client";

import { useState, useRef, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { withRoleProtection } from "@/lib/withRoleProtection";

interface VerificationData {
  phoneNumber: string;
  governmentId: File | null;
  governmentIdName: string;
  address: string;
  postalCode: string;
  emergencyContact: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
  agreedToTerms: boolean;
}

function VerificationContactPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [verificationData, setVerificationData] = useState<VerificationData>({
    phoneNumber: "",
    governmentId: null,
    governmentIdName: "",
    address: "",
    postalCode: "",
    emergencyContact: "",
    emergencyContactPhone: "",
    emergencyContactRelationship: "",
    agreedToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Load existing verification data on component mount
  useEffect(() => {
    const loadVerificationData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "/api/creator/profile/verification-contact"
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Loaded verification data:", data);

          if (data.verificationContact) {
            const vc = data.verificationContact;
            setVerificationData({
              phoneNumber: vc.phoneNumber || "",
              governmentId: null,
              governmentIdName: vc.governmentIdName || "",
              address: vc.address || "",
              postalCode: vc.postalCode || "",
              emergencyContact: vc.emergencyContact?.name || "",
              emergencyContactPhone: vc.emergencyContact?.phoneNumber || "",
              emergencyContactRelationship:
                vc.emergencyContact?.relationship || "",
              agreedToTerms: vc.agreedToTerms || false,
            });
          }
        } else {
          console.error("Failed to load verification data");
        }
      } catch (error) {
        console.error("Error loading verification data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadVerificationData();
  }, []);

  const handleSignOut = (): void => {
    console.log("Signing out...");
    setIsDropdownOpen(false);
  };

  const handleInputChange = (field: string, value: string | boolean): void => {
    setVerificationData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGovernmentIdUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file type and size
      const validTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "application/pdf",
      ];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        alert("Please upload a JPEG, PNG, or PDF file.");
        return;
      }

      if (file.size > maxSize) {
        alert("File size must be less than 5MB.");
        return;
      }

      setVerificationData((prev) => ({
        ...prev,
        governmentId: file,
        governmentIdName: file.name,
      }));
    }
  };

  const handleRemoveGovernmentId = (): void => {
    setVerificationData((prev) => ({
      ...prev,
      governmentId: null,
      governmentIdName: "",
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const saveVerificationData = async (): Promise<boolean> => {
    try {
      const response = await fetch(
        "/api/creator/profile/verification-contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: verificationData.phoneNumber,
            phoneVerified: true, // Auto-verify since no OTP
            governmentIdName: verificationData.governmentIdName,
            address: verificationData.address,
            postalCode: verificationData.postalCode,
            emergencyContact: {
              name: verificationData.emergencyContact,
              phoneNumber: verificationData.emergencyContactPhone,
              relationship: verificationData.emergencyContactRelationship,
            },
            agreedToTerms: verificationData.agreedToTerms,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to save verification data");
      }

      return true;
    } catch (error) {
      console.error("Error saving verification data:", error);
      return false;
    }
  };

  // const handleSubmit = async (e: React.FormEvent): Promise<void> => {
  //   e.preventDefault();

  //   // Validate required fields
  //   if (!verificationData.phoneNumber.trim()) {
  //     alert("Please enter your phone number.");
  //     return;
  //   }

  //   if (!verificationData.address.trim()) {
  //     alert("Please enter your address.");
  //     return;
  //   }

  //   if (!verificationData.postalCode.trim()) {
  //     alert("Please enter your postal code.");
  //     return;
  //   }

  //   if (!verificationData.emergencyContact.trim()) {
  //     alert("Please enter emergency contact name.");
  //     return;
  //   }

  //   if (!verificationData.emergencyContactPhone.trim()) {
  //     alert("Please enter emergency contact phone number.");
  //     return;
  //   }

  //   if (!verificationData.emergencyContactRelationship.trim()) {
  //     alert("Please specify your relationship with the emergency contact.");
  //     return;
  //   }

  //   if (!verificationData.agreedToTerms) {
  //     alert("Please agree to the Creator Terms to continue.");
  //     return;
  //   }

  //   setIsSaving(true);

  //   // Save to database
  //   const saved = await saveVerificationData();

  //   if (saved) {
  //     console.log("Verification data saved successfully");
  //     // Navigate to dashboard
  //     router.push("/creator/create-profile/profile-review");
  //   } else {
  //     alert("Failed to save verification data. Please try again.");
  //   }

  //   setIsSaving(false);
  // };
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    // Validate required fields
    if (!verificationData.phoneNumber.trim()) {
      alert("Please enter your phone number.");
      return;
    }

    if (!verificationData.address.trim()) {
      alert("Please enter your address.");
      return;
    }

    if (!verificationData.postalCode.trim()) {
      alert("Please enter your postal code.");
      return;
    }

    if (!verificationData.emergencyContact.trim()) {
      alert("Please enter emergency contact name.");
      return;
    }

    if (!verificationData.emergencyContactPhone.trim()) {
      alert("Please enter emergency contact phone number.");
      return;
    }

    if (!verificationData.emergencyContactRelationship.trim()) {
      alert("Please specify your relationship with the emergency contact.");
      return;
    }

    if (!verificationData.agreedToTerms) {
      alert("Please agree to the Creator Terms to continue.");
      return;
    }

    setIsSaving(true);

    // Save to database
    const saved = await saveVerificationData();

    if (saved) {
      console.log("Verification data saved successfully");
      // Check if user came from profile-review page
      const urlParams = new URLSearchParams(window.location.search);
      const returnTo = urlParams.get("returnTo");

      if (returnTo === "profile-review") {
        router.push("/creator/create-profile/profile-review");
      } else {
        router.push("/creator/create-profile/profile-review");
      }
    } else {
      alert("Failed to save verification data. Please try again.");
    }

    setIsSaving(false);
  };
  const handleBack = (): void => {
    router.push("/creator/create-profile/rate");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">
            Loading your verification data...
          </p>
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
              Complete your verification and build trust with clients
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
                Final Step
              </span>
              <span className="text-sm font-medium text-gray-600">100%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div
                className="bg-black h-2 rounded-full transition-all duration-300"
                style={{ width: "100%" }}
              ></div>
            </div>
          </div>

          {/* Page Title */}
          <div className="px-6 pb-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Verification & Contact Information
            </h2>
            <p className="text-gray-600">
              Complete your profile verification to build trust with clients and
              ensure we can reach you when needed.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Phone Number */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Contact Information
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={verificationData.phoneNumber}
                    onChange={(e) =>
                      handleInputChange("phoneNumber", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    We'll use this number to contact you about important account
                    updates
                  </p>
                </div>
              </div>
            </div>

            {/* Government ID Upload */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Identity Verification (Optional)
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Upload Government ID
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleGovernmentIdUpload}
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="hidden"
                  />

                  {verificationData.governmentIdName ? (
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
                            {verificationData.governmentIdName}
                          </p>
                          <p className="text-xs text-gray-500">
                            Click to replace
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveGovernmentId}
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
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Upload your government ID
                        </p>
                        <p className="text-xs text-gray-500">
                          JPEG, PNG, or PDF up to 5MB
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-black text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                      >
                        Choose File
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  This helps build trust with clients. We securely store and
                  protect your information.
                </p>
              </div>
            </div>

            {/* Address Information */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Address Information
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={verificationData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                    placeholder="123 Main Street, Apt 4B"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    value={verificationData.postalCode}
                    onChange={(e) =>
                      handleInputChange("postalCode", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                    placeholder="12345"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Emergency Contact
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      value={verificationData.emergencyContact}
                      onChange={(e) =>
                        handleInputChange("emergencyContact", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={verificationData.emergencyContactPhone}
                      onChange={(e) =>
                        handleInputChange(
                          "emergencyContactPhone",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Relationship *
                  </label>
                  <select
                    value={verificationData.emergencyContactRelationship}
                    onChange={(e) =>
                      handleInputChange(
                        "emergencyContactRelationship",
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                    required
                  >
                    <option value="">Select relationship</option>
                    <option value="parent">Parent</option>
                    <option value="spouse">Spouse</option>
                    <option value="sibling">Sibling</option>
                    <option value="friend">Friend</option>
                    <option value="relative">Relative</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms-agreement"
                  checked={verificationData.agreedToTerms}
                  onChange={(e) =>
                    handleInputChange("agreedToTerms", e.target.checked)
                  }
                  className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black mt-1"
                  required
                />
                <div>
                  <label
                    htmlFor="terms-agreement"
                    className="text-sm font-medium text-gray-700"
                  >
                    I agree to the Hey Humanz Creator Terms *
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    By checking this box, you acknowledge that you have read,
                    understood, and agree to be bound by our{" "}
                    <a href="/terms" className="text-black hover:underline">
                      Terms of Service
                    </a>
                    ,{" "}
                    <a href="/privacy" className="text-black hover:underline">
                      Privacy Policy
                    </a>
                    , and{" "}
                    <a
                      href="/creator-agreement"
                      className="text-black hover:underline"
                    >
                      Creator Agreement
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                  <svg
                    className="w-4 h-4 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2 text-green-900">
                    Your Information is Secure
                  </h4>
                  <p className="text-xs text-green-800">
                    We use bank-level encryption to protect your personal
                    information. Your data is never shared with third parties
                    without your explicit consent, and we comply with all data
                    protection regulations.
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
                <span>
                  {isSaving
                    ? "Saving..."
                    : new URLSearchParams(window.location.search).get(
                        "returnTo"
                      ) === "profile-review"
                    ? "Save & Return to Review"
                    : "Complete Profile"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default withRoleProtection(VerificationContactPage, ["creator"]);
