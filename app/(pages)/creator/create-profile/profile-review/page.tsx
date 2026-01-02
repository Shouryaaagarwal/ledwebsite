"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { withRoleProtection } from "@/lib/withRoleProtection";
import Link from "next/link";

interface PersonalInfo {
  fullName?: string;
  dateOfBirth?: string;
  city?: string;
  country?: string;
  spokenLanguages?: string[];
}

interface ProfessionalBackground {
  professionalTitle?: string;
  experienceLevel?: string;
  yearsOfExperience?: string;
  bio?: string;
}

interface SkillsExpertise {
  skills?: Array<{
    id: string;
    name: string;
    category: string;
  }>;
}

interface PortfolioItem {
  title?: string;
  category?: string;
  description?: string;
  externalLink?: string;
}

interface PortfolioShowcase {
  portfolioItems?: PortfolioItem[];
}

interface WorkExperienceItem {
  title?: string;
  company?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  currentlyWorking?: boolean;
  description?: string;
}

interface WorkExperience {
  workExperiences?: WorkExperienceItem[];
}

interface RateAvailability {
  pricingType?: string;
  hourlyRate?: string;
  minimumBudget?: string;
  currency?: string;
  weeklyAvailability?: string;
  availabilityStatus?: string;
}

interface EmergencyContact {
  name?: string;
  relationship?: string;
  phoneNumber?: string;
}

interface VerificationContact {
  phoneNumber?: string;
  address?: string;
  postalCode?: string;
  emergencyContact?: EmergencyContact;
}

interface ApiResponse {
  personalInfo?: PersonalInfo;
  professionalBackground?: ProfessionalBackground;
  skillsAndExpertise?: SkillsExpertise;
  portfolioShowcase?: PortfolioShowcase;
  workExperience?: WorkExperience;
  rateAvailability?: RateAvailability;
  verificationContact?: VerificationContact;
}

interface ReviewData {
  personalInfo: PersonalInfo;
  professionalBackground: ProfessionalBackground;
  skillsExpertise: SkillsExpertise;
  portfolioShowcase: PortfolioShowcase;
  workExperience: WorkExperience;
  rateAvailability: RateAvailability;
  verificationContact: VerificationContact;
}

function ProfileReviewPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewData, setReviewData] = useState<ReviewData>({
    personalInfo: {},
    professionalBackground: {},
    skillsExpertise: {},
    portfolioShowcase: {},
    workExperience: {},
    rateAvailability: {},
    verificationContact: {}
  });
  const router = useRouter();

  // Load all profile data on component mount
  useEffect(() => {
    loadAllProfileData();
  }, []);

  const loadAllProfileData = async () => {
    try {
      setIsLoading(true);
      
      // Load data from all endpoints
      const endpoints = [
        '/api/creator/profile/personal-info',
        '/api/creator/profile/professional-background',
        '/api/creator/profile/skills-expertise',
        '/api/creator/profile/portfolio-showcase',
        '/api/creator/profile/work-experience',
        '/api/creator/profile/rate-availability',
        '/api/creator/profile/verification-contact'
      ];

      const responses = await Promise.all(
        endpoints.map(async (endpoint) => {
          try {
            const response = await fetch(endpoint);
            if (response.ok) {
              const data: ApiResponse = await response.json();
              return data;
            }
            return {};
          } catch (error) {
            console.error(`Error loading ${endpoint}:`, error);
            return {};
          }
        })
      );

      setReviewData({
        personalInfo: responses[0]?.personalInfo || {},
        professionalBackground: responses[1]?.professionalBackground || {},
        skillsExpertise: responses[2]?.skillsAndExpertise || {},
        portfolioShowcase: responses[3]?.portfolioShowcase || {},
        workExperience: responses[4]?.workExperience || {},
        rateAvailability: responses[5]?.rateAvailability || {},
        verificationContact: responses[6]?.verificationContact || {}
      });

    } catch (error) {
      console.error('Error loading profile data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleEditSection = (section: string) => {
  //   const routes: { [key: string]: string } = {
  //     personalInfo: '/creator/create-profile/personal-info',
  //     professionalBackground: '/creator/create-profile/professional-background',
  //     skillsExpertise: '/creator/create-profile/skills-expertise',
  //     portfolioShowcase: '/creator/create-profile/portfolio',
  //     workExperience: '/creator/create-profile/work-experience',
  //     rateAvailability: '/creator/create-profile/rate',
  //     verificationContact: '/creator/create-profile/verification'
  //   };

  //   if (routes[section]) {
  //     router.push(routes[section]);
  //   }
  // };
const handleEditSection = (section: string) => {
  const routes: { [key: string]: string } = {
    personalInfo: '/creator/create-profile/personal-info?returnTo=profile-review',
    professionalBackground: '/creator/create-profile/professional-background?returnTo=profile-review',
    skillsExpertise: '/creator/create-profile/skills-expertise?returnTo=profile-review',
    portfolioShowcase: '/creator/create-profile/portfolio?returnTo=profile-review',
    workExperience: '/creator/create-profile/work-experience?returnTo=profile-review',
    rateAvailability: '/creator/create-profile/rate?returnTo=profile-review',
    verificationContact: '/creator/create-profile/verification?returnTo=profile-review'
  };

  if (routes[section]) {
    router.push(routes[section]);
  }
};
  const handleCompleteProfile = async () => {
    try {
      // Mark profile as complete and redirect to dashboard
      const response = await fetch('/api/creator/profile/complete', {
        method: 'POST',
      });

      if (response.ok) {
        router.push('/creator/dashboard');
      } else {
        throw new Error('Failed to complete profile');
      }
    } catch (error) {
      console.error('Error completing profile:', error);
      alert('Failed to complete profile. Please try again.');
    }
  };

  const handleBack = () => {
    router.push('/creator/create-profile/verification');
  };

  const getCompletionStatus = () => {
    const sections = [
      reviewData.personalInfo,
      reviewData.professionalBackground,
      reviewData.skillsExpertise,
      reviewData.portfolioShowcase,
      reviewData.workExperience,
      reviewData.rateAvailability,
      reviewData.verificationContact
    ];

    const completedSections = sections.filter(section => 
      section && Object.keys(section).length > 0
    ).length;

    return {
      completed: completedSections,
      total: sections.length,
      percentage: Math.round((completedSections / sections.length) * 100)
    };
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not provided';
    
    // Handle both "Month-Year" and ISO date formats
    if (dateString.includes('-')) {
      const [month, year] = dateString.split('-');
      if (month && year) {
        return `${month} ${year}`;
      }
    }
    
    // Try to parse as ISO date
    try {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      }
    } catch (error) {
      console.error('Error parsing date:', error);
    }
    
    return dateString;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile information...</p>
        </div>
      </div>
    );
  }

  const completionStatus = getCompletionStatus();

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

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-gray-600">Final Step</span>
            <span className="text-sm font-semibold text-gray-600">{completionStatus.percentage}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
            <div
              className="bg-linear-to-r from-black to-gray-700 h-3 rounded-full transition-all duration-500 shadow-md"
              style={{ width: `${completionStatus.percentage}%` }}
            ></div>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-linear-to-r from-black to-gray-700 bg-clip-text text-transparent">
            Review Your Profile
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Almost there! Review all your information before completing your profile.
          </p>
          <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200 inline-block">
            <p className="text-green-700 font-medium">
              {completionStatus.completed} of {completionStatus.total} sections completed
            </p>
          </div>
        </div>

        {/* Review Sections */}
        <div className="space-y-6 mb-8">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
                <p className="text-gray-600 mt-1">Basic details about yourself</p>
              </div>
              <button
                onClick={() => handleEditSection('personalInfo')}
                className="px-4 py-2 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
              >
                Edit
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-600">Full Name</label>
                <p className="text-gray-900">{reviewData.personalInfo.fullName || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Date of Birth</label>
                <p className="text-gray-900">{reviewData.personalInfo.dateOfBirth || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Location</label>
                <p className="text-gray-900">
                  {reviewData.personalInfo.city && reviewData.personalInfo.country 
                    ? `${reviewData.personalInfo.city}, ${reviewData.personalInfo.country}`
                    : 'Not provided'
                  }
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Languages</label>
                <p className="text-gray-900">
                  {reviewData.personalInfo.spokenLanguages && reviewData.personalInfo.spokenLanguages.length > 0 
                    ? reviewData.personalInfo.spokenLanguages.join(', ')
                    : 'Not provided'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Professional Background */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Professional Background</h3>
                <p className="text-gray-600 mt-1">Your professional identity</p>
              </div>
              <button
                onClick={() => handleEditSection('professionalBackground')}
                className="px-4 py-2 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
              >
                Edit
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-600">Professional Title</label>
                <p className="text-gray-900">{reviewData.professionalBackground.professionalTitle || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Experience Level</label>
                <p className="text-gray-900 capitalize">{reviewData.professionalBackground.experienceLevel || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Years of Experience</label>
                <p className="text-gray-900">{reviewData.professionalBackground.yearsOfExperience || 'Not provided'}</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-gray-600">Bio</label>
                <p className="text-gray-900">{reviewData.professionalBackground.bio || 'Not provided'}</p>
              </div>
            </div>
          </div>

          {/* Skills & Expertise */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Skills & Expertise</h3>
                <p className="text-gray-600 mt-1">Your creative skills and capabilities</p>
              </div>
              <button
                onClick={() => handleEditSection('skillsExpertise')}
                className="px-4 py-2 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
              >
                Edit
              </button>
            </div>
            
            <div>
              <label className="text-sm font-semibold text-gray-600">Skills</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {reviewData.skillsExpertise.skills && reviewData.skillsExpertise.skills.length > 0 ? (
                  reviewData.skillsExpertise.skills.map((skill, index) => (
                    <span
                      key={skill.id || index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {skill.name}
                      <span className="text-xs bg-blue-200 px-2 py-0.5 rounded-full ml-2">
                        {skill.category}
                      </span>
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">No skills added</p>
                )}
              </div>
            </div>
          </div>

          {/* Portfolio Showcase */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Portfolio Showcase</h3>
                <p className="text-gray-600 mt-1">Your best work examples</p>
              </div>
              <button
                onClick={() => handleEditSection('portfolioShowcase')}
                className="px-4 py-2 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
              >
                Edit
              </button>
            </div>
            
            <div>
              <label className="text-sm font-semibold text-gray-600">Portfolio Items</label>
              <div className="space-y-3 mt-2">
                {reviewData.portfolioShowcase.portfolioItems && reviewData.portfolioShowcase.portfolioItems.length > 0 ? (
                  reviewData.portfolioShowcase.portfolioItems.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900">{item.title || 'Untitled Project'}</h4>
                      <p className="text-sm text-gray-600 mt-1">{item.category}</p>
                      <p className="text-sm text-gray-700 mt-2 line-clamp-2">{item.description}</p>
                      {item.externalLink && (
                        <a 
                          href={item.externalLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 text-sm hover:underline mt-1 inline-block"
                        >
                          View Project →
                        </a>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No portfolio items added</p>
                )}
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Work Experience</h3>
                <p className="text-gray-600 mt-1">Your professional journey</p>
              </div>
              <button
                onClick={() => handleEditSection('workExperience')}
                className="px-4 py-2 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
              >
                Edit
              </button>
            </div>
            
            <div className="space-y-4">
              {reviewData.workExperience.workExperiences && reviewData.workExperience.workExperiences.length > 0 ? (
                reviewData.workExperience.workExperiences.map((exp, index) => (
                  <div key={index} className="border-l-4 border-gray-300 pl-4">
                    <h4 className="font-semibold text-gray-900">{exp.title || 'Untitled Position'}</h4>
                    <p className="text-gray-600">
                      {exp.company} 
                      {exp.location && ` • ${exp.location}`}
                    </p>
                    <p className="text-sm text-gray-500">
                      {exp.startDate ? formatDate(exp.startDate) : 'Not specified'} - {' '}
                      {exp.currentlyWorking ? 'Present' : (exp.endDate ? formatDate(exp.endDate) : 'Not specified')}
                    </p>
                    {exp.description && (
                      <p className="text-gray-700 mt-2 text-sm">{exp.description}</p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No work experience added</p>
              )}
            </div>
          </div>

          {/* Rate & Availability */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Rate & Availability</h3>
                <p className="text-gray-600 mt-1">Your pricing and availability</p>
              </div>
              <button
                onClick={() => handleEditSection('rateAvailability')}
                className="px-4 py-2 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
              >
                Edit
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-600">Pricing Type</label>
                <p className="text-gray-900 capitalize">{reviewData.rateAvailability.pricingType || 'Not set'}</p>
              </div>
              {reviewData.rateAvailability.pricingType === 'hourly' && (
                <div>
                  <label className="text-sm font-semibold text-gray-600">Hourly Rate</label>
                  <p className="text-gray-900">
                    {reviewData.rateAvailability.hourlyRate 
                      ? `${reviewData.rateAvailability.currency || '₹'}${reviewData.rateAvailability.hourlyRate}/hour`
                      : 'Not set'
                    }
                  </p>
                </div>
              )}
              {reviewData.rateAvailability.pricingType === 'project' && (
                <div>
                  <label className="text-sm font-semibold text-gray-600">Minimum Budget</label>
                  <p className="text-gray-900">
                    {reviewData.rateAvailability.minimumBudget 
                      ? `${reviewData.rateAvailability.currency || '₹'}${reviewData.rateAvailability.minimumBudget}`
                      : 'Not set'
                    }
                  </p>
                </div>
              )}
              <div>
                <label className="text-sm font-semibold text-gray-600">Weekly Availability</label>
                <p className="text-gray-900">
                  {reviewData.rateAvailability.weeklyAvailability 
                    ? `${reviewData.rateAvailability.weeklyAvailability} hours/week`
                    : 'Not set'
                  }
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Availability Status</label>
                <p className="text-gray-900 capitalize">{reviewData.rateAvailability.availabilityStatus || 'Not set'}</p>
              </div>
            </div>
          </div>

          {/* Verification & Contact */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Verification & Contact</h3>
                <p className="text-gray-600 mt-1">Your contact and verification details</p>
              </div>
              <button
                onClick={() => handleEditSection('verificationContact')}
                className="px-4 py-2 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
              >
                Edit
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-600">Phone Number</label>
                <p className="text-gray-900">{reviewData.verificationContact.phoneNumber || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Address</label>
                <p className="text-gray-900">
                  {reviewData.verificationContact.address 
                    ? `${reviewData.verificationContact.address}${reviewData.verificationContact.postalCode ? `, ${reviewData.verificationContact.postalCode}` : ''}`
                    : 'Not provided'
                  }
                </p>
              </div>
              {reviewData.verificationContact.emergencyContact && (
                <>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Emergency Contact</label>
                    <p className="text-gray-900">{reviewData.verificationContact.emergencyContact.name || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Relationship</label>
                    <p className="text-gray-900 capitalize">
                      {reviewData.verificationContact.emergencyContact.relationship || 'Not provided'}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-200">
          <button 
            onClick={handleBack}
            className="px-10 py-4 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
          >
            Back
          </button>
          <Link href="/creator/dashboard" 
            className="px-12 py-4 bg-linear-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-xl transition-all duration-200 font-semibold shadow-lg hover:scale-105 transform"
          >
            Complete Profile & Go to Dashboard
          </Link>
        </div>

        {/* Completion Notice */}
        <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-1">
              <span className="text-blue-600 text-sm font-bold">🎉</span>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3 text-blue-900">
                You're Almost Ready to Start!
              </h4>
              <p className="text-sm text-blue-800 leading-relaxed">
                Once you complete your profile, you'll be able to start receiving project matches, 
                apply for opportunities, and build your creator portfolio on Hey Humanz. 
                You can always come back to update any section later.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default withRoleProtection(ProfileReviewPage, ["creator"]);