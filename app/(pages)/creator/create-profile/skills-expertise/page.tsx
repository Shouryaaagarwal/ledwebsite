"use client";

import { useState, useRef, ChangeEvent, KeyboardEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { withRoleProtection } from "@/lib/withRoleProtection";

interface Skill {
  id: string;
  name: string;
  category: string;
}

function SkillsAndExpertisePage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [customCategory, setCustomCategory] = useState("General");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const suggestedSkills: Skill[] = [
    { id: "1", name: "Video Editing", category: "Video" },
    { id: "2", name: "Animation", category: "Design" },
    { id: "3", name: "Business Presentation", category: "Business" },
    {
      id: "4",
      name: "Construction Document Preparation",
      category: "Technical",
    },
    { id: "5", name: "Presentation Design", category: "Design" },
    { id: "6", name: "Presentations", category: "Business" },
    { id: "7", name: "Specifications", category: "Technical" },
    { id: "8", name: "Video Ads", category: "Video" },
    { id: "9", name: "Posters", category: "Design" },
    { id: "10", name: "Motion Graphics", category: "Video" },
    { id: "11", name: "Social Media Content", category: "Marketing" },
    { id: "12", name: "Brand Identity", category: "Design" },
    { id: "13", name: "Graphic Design", category: "Design" },
    { id: "14", name: "UI/UX Design", category: "Design" },
    { id: "15", name: "3D Modeling", category: "Design" },
    { id: "16", name: "Video Production", category: "Video" },
    { id: "17", name: "Content Writing", category: "Writing" },
    { id: "18", name: "Digital Marketing", category: "Marketing" },
    { id: "19", name: "Web Development", category: "Technical" },
    { id: "20", name: "Photography", category: "Creative" },
  ];

  const categories = [
    "General",
    "Video",
    "Design",
    "Business",
    "Technical",
    "Marketing",
    "Writing",
    "Creative",
    "Audio",
    "Development",
    "Consulting",
    "Other",
  ];

  // Load data on component mount
  useEffect(() => {
    loadSkillsAndExpertise();
  }, []);

  const loadSkillsAndExpertise = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/creator/profile/skills-expertise");

      if (response.ok) {
        const data = await response.json();
        if (data.skillsAndExpertise && data.skillsAndExpertise.skills) {
          setSkills(data.skillsAndExpertise.skills);
        }
      } else {
        console.error("Failed to load skills and expertise");
      }
    } catch (error) {
      console.error("Error loading skills and expertise:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSuggestions = suggestedSkills.filter(
    (skill) =>
      skill.name.toLowerCase().includes(inputValue.toLowerCase()) &&
      !skills.some((s) => s.id === skill.id)
  );

  const handleAddSkill = (skill: Skill): void => {
    if (!skills.some((s) => s.id === skill.id)) {
      setSkills((prev) => [...prev, skill]);
      setInputValue("");
      setShowSuggestions(false);
      setCustomCategory("General");
      inputRef.current?.focus();
    }
  };

  const handleAddCustomSkill = (): void => {
    if (inputValue.trim()) {
      const newSkill: Skill = {
        id: Date.now().toString(),
        name: inputValue.trim(),
        category: customCategory,
      };
      handleAddSkill(newSkill);
    }
  };

  const handleRemoveSkill = (skillId: string): void => {
    setSkills((prev) => prev.filter((skill) => skill.id !== skillId));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
    setShowSuggestions(true);
  };

  const handleInputFocus = (): void => {
    setShowSuggestions(true);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      handleAddCustomSkill();
    } else if (e.key === "Backspace" && !inputValue && skills.length > 0) {
      handleRemoveSkill(skills[skills.length - 1].id);
    }
  };

  // const handleSave = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     setIsSaving(true);

  //     if (skills.length === 0) {
  //       alert('Please add at least one skill');
  //       return;
  //     }

  //     // Extract unique categories from skills
  //     const categories = [...new Set(skills.map(skill => skill.category))];

  //     const response = await fetch('/api/creator/profile/skills-expertise', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         skills,
  //         categories
  //       }),
  //     });

  //     const result = await response.json();

  //     if (response.ok) {
  //       router.push('/creator/create-profile/portfolio');
  //     } else {
  //       throw new Error(result.error || 'Failed to save skills and expertise');
  //     }
  //   } catch (error) {
  //     console.error('Error saving skills and expertise:', error);
  //     alert('Failed to save skills and expertise. Please try again.');
  //   } finally {
  //     setIsSaving(false);
  //   }
  // };
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);

      if (skills.length === 0) {
        alert("Please add at least one skill");
        return;
      }

      // Extract unique categories from skills
      const categories = [...new Set(skills.map((skill) => skill.category))];

      const response = await fetch("/api/creator/profile/skills-expertise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skills,
          categories,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Check if user came from profile-review page
        const urlParams = new URLSearchParams(window.location.search);
        const returnTo = urlParams.get("returnTo");

        if (returnTo === "profile-review") {
          router.push("/creator/create-profile/profile-review");
        } else {
          router.push("/creator/create-profile/portfolio");
        }
      } else {
        throw new Error(result.error || "Failed to save skills and expertise");
      }
    } catch (error) {
      console.error("Error saving skills and expertise:", error);
      alert("Failed to save skills and expertise. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };
  const handleBack = (): void => {
    router.push("/creator/create-profile/professional-background");
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
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-gray-600">
              Step 3 of 7
            </span>
            <span className="text-sm font-semibold text-gray-600">43%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
            <div
              className="bg-linear-to-r from-black to-gray-700 h-3 rounded-full transition-all duration-500 shadow-md"
              style={{ width: "43%" }}
            ></div>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-linear-to-r from-black to-gray-700 bg-clip-text text-transparent">
            Skills & Expertise
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Add any skills you have - choose from suggestions or create your own
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <form onSubmit={handleSave} className="space-y-8">
            {/* Skills Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-4">
                Your skills *
              </label>

              {/* Skills Input Container */}
              <div className="space-y-4">
                {/* Category Selection for Custom Skills */}
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-700">
                    Category:
                  </span>
                  <select
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Input Section */}
                <div
                  className={`w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-black focus-within:border-black transition-all duration-200 min-h-16 flex flex-wrap items-center gap-2 bg-gray-50/50 ${
                    showSuggestions ? "rounded-b-none border-b-0" : ""
                  }`}
                  onClick={() => inputRef.current?.focus()}
                >
                  {/* Skill Chips */}
                  {skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-center bg-linear-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm"
                    >
                      {skill.name}
                      <span className="text-xs bg-blue-400 px-2 py-1 rounded-full ml-2">
                        {skill.category}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill.id)}
                        className="ml-2 text-white hover:text-blue-200 transition-colors text-lg leading-none"
                      >
                        ×
                      </button>
                    </div>
                  ))}

                  {/* Input Field */}
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onKeyDown={handleInputKeyDown}
                    className="flex-1 min-w-[120px] py-2 outline-none bg-transparent placeholder-gray-400"
                    placeholder={
                      skills.length === 0
                        ? "Type any skill and press Enter..."
                        : "Add another skill..."
                    }
                  />
                </div>

                {/* Add Custom Skill Button */}
                {inputValue.trim() && (
                  <button
                    type="button"
                    onClick={handleAddCustomSkill}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                  >
                    + Add "{inputValue}" as {customCategory} skill
                  </button>
                )}

                {/* Suggestions Dropdown */}
                {showSuggestions && filteredSuggestions.length > 0 && (
                  <div className="border-2 border-gray-200 border-t-0 rounded-b-xl bg-white shadow-lg max-h-60 overflow-y-auto z-10">
                    <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                      <span className="text-xs font-medium text-gray-600">
                        Suggested Skills
                      </span>
                    </div>
                    {filteredSuggestions.map((skill) => (
                      <button
                        key={skill.id}
                        type="button"
                        onClick={() => handleAddSkill(skill)}
                        className="w-full text-left px-5 py-4 hover:bg-gray-50 transition-all duration-200 border-b border-gray-100 last:border-b-0 flex justify-between items-center group"
                      >
                        <span className="font-medium group-hover:text-black">
                          {skill.name}
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full group-hover:bg-gray-200">
                          {skill.category}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <p className="text-xs text-gray-500 mt-3">
                • Press Enter to add custom skills • Click suggestions to add
                recommended skills • {skills.length} skill(s) added
              </p>
            </div>

            {/* Current Skills Display */}
            {skills.length > 0 && (
              <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-sm mb-4 text-blue-900">
                  Your Current Skills ({skills.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-center bg-white px-3 py-2 rounded-lg border border-blue-200 text-sm"
                    >
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full ml-2">
                        {skill.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Suggested Skills */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">
                Popular skills for creators (click to add)
              </h4>
              <div className="flex flex-wrap gap-3">
                {suggestedSkills.map((skill) => (
                  <button
                    key={skill.id}
                    type="button"
                    onClick={() => handleAddSkill(skill)}
                    disabled={skills.some((s) => s.id === skill.id)}
                    className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      skills.some((s) => s.id === skill.id)
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed shadow-inner"
                        : "bg-linear-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 border-2 border-gray-200 hover:border-gray-300 hover:shadow-md"
                    }`}
                  >
                    + {skill.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Pro Tip */}
            <div className="p-6 bg-purple-50 rounded-xl border border-purple-200">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-purple-600 text-sm font-bold">💡</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-3 text-purple-900">
                    Creator Pro Tip
                  </h4>
                  <p className="text-sm text-purple-800 leading-relaxed">
                    "Add any skill you're comfortable with - both from our
                    suggestions and your own custom skills. The more accurate
                    your skills list, the better we can match you with perfect
                    projects. Don't forget to categorize them properly!"
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
                disabled={skills.length === 0 || isSaving}
                className={`px-12 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:scale-105 transform ${
                  skills.length === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-linear-to-r from-black to-gray-700 text-white hover:shadow-xl"
                } ${isSaving ? "opacity-50 cursor-not-allowed" : ""}`}
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

export default withRoleProtection(SkillsAndExpertisePage, ["creator"]);
