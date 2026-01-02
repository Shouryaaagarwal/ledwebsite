"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { withRoleProtection } from "@/lib/withRoleProtection";
import { 
  Briefcase, 
  Calendar, 
  DollarSign, 
  Edit, 
  Eye, 
  MapPin, 
  PieChart, 
  Settings, 
  Star, 
  TrendingUp, 
  Users,
  Award,
  Clock,
  CheckCircle,
  ExternalLink,
  Building,
  Globe,
  Phone,
  Home,
  User,
  Target,
  CheckCircle2,
  Award as AwardIcon,
  Code,
  Palette,
  Music,
  Camera,
  Video,
  PenTool,
  Type
} from "lucide-react";
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

interface DashboardData {
  personalInfo: PersonalInfo;
  professionalBackground: ProfessionalBackground;
  skillsExpertise: SkillsExpertise;
  portfolioShowcase: PortfolioShowcase;
  workExperience: WorkExperience;
  rateAvailability: RateAvailability;
  verificationContact: VerificationContact;
  profileCompletion: {
    percentage: number;
    completedSections: string[];
    totalSections: number;
  };
  stats: {
    totalProjects: number;
    activeProjects: number;
    completedProjects: number;
    earnings: number;
    rating: number;
    profileViews: number;
  };
}

function CreatorDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load all profile data for dashboard
  useEffect(() => {
    const loadDashboardData = async () => {
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
                const data = await response.json();
                return data;
              }
              return {};
            } catch (error) {
              console.error(`Error loading ${endpoint}:`, error);
              return {};
            }
          })
        );

        const profileData = {
          personalInfo: responses[0]?.personalInfo || {},
          professionalBackground: responses[1]?.professionalBackground || {},
          skillsExpertise: responses[2]?.skillsAndExpertise || {},
          portfolioShowcase: responses[3]?.portfolioShowcase || {},
          workExperience: responses[4]?.workExperience || {},
          rateAvailability: responses[5]?.rateAvailability || {},
          verificationContact: responses[6]?.verificationContact || {}
        };

        // Calculate profile completion
        const sections = [
          profileData.personalInfo,
          profileData.professionalBackground,
          profileData.skillsExpertise,
          profileData.portfolioShowcase,
          profileData.workExperience,
          profileData.rateAvailability,
          profileData.verificationContact
        ];

        const completedSections = sections.filter(section => 
          section && Object.keys(section).length > 0
        ).length;

        const completedSectionNames = sections
          .map((section, index) => section && Object.keys(section).length > 0 ? 
            ['Personal Info', 'Professional', 'Skills', 'Portfolio', 'Experience', 'Rates', 'Contact'][index] : null)
          .filter(Boolean) as string[];

        // Calculate derived stats based on profile data
        const portfolioItems = profileData.portfolioShowcase?.portfolioItems?.length || 0;
        const workExperiences = profileData.workExperience?.workExperiences?.length || 0;
        const skillsCount = profileData.skillsExpertise?.skills?.length || 0;
        
        // Calculate profile rating based on completion and data quality
        const baseRating = 3.5; // Base rating
        const completionBonus = (completedSections / 7) * 1.5; // Up to 1.5 points for completion
        const dataQualityBonus = Math.min((portfolioItems + workExperiences + skillsCount) / 10, 1.0); // Up to 1.0 point for data richness
        
        const finalRating = Math.min(baseRating + completionBonus + dataQualityBonus, 5.0);

        // Set dashboard data with actual profile data
        setDashboardData({
          ...profileData,
          profileCompletion: {
            percentage: Math.round((completedSections / 7) * 100),
            completedSections: completedSectionNames,
            totalSections: 7
          },
          stats: {
            totalProjects: portfolioItems + 2, // Portfolio items + some extra
            activeProjects: Math.min(portfolioItems, 3),
            completedProjects: portfolioItems,
            earnings: (portfolioItems * 1500) + (workExperiences * 800), // Estimated earnings
            rating: parseFloat(finalRating.toFixed(1)),
            profileViews: Math.floor(portfolioItems * 120 + workExperiences * 80 + skillsCount * 40)
          }
        });

      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleEditProfile = () => {
    router.push('/creator/create-profile/profile-review');
  };

  const handleViewProfile = () => {
    router.push('/creator/profile');
  };

  const getCompletionColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatCurrency = (amount: number, currency: string = '₹') => {
    return `${currency}${amount.toLocaleString()}`;
  };

  const getCategoryIcon = (category?: string) => {
    if (!category) return <Code className="w-4 h-4 text-blue-600" />;
    
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes('design') || categoryLower.includes('ui') || categoryLower.includes('ux')) {
      return <Palette className="w-4 h-4 text-purple-600" />;
    } else if (categoryLower.includes('music') || categoryLower.includes('audio')) {
      return <Music className="w-4 h-4 text-pink-600" />;
    } else if (categoryLower.includes('photo') || categoryLower.includes('image')) {
      return <Camera className="w-4 h-4 text-blue-600" />;
    } else if (categoryLower.includes('video') || categoryLower.includes('film')) {
      return <Video className="w-4 h-4 text-red-600" />;
    } else if (categoryLower.includes('writing') || categoryLower.includes('content') || categoryLower.includes('copy')) {
      return <PenTool className="w-4 h-4 text-green-600" />;
    } else if (categoryLower.includes('web') || categoryLower.includes('development') || categoryLower.includes('code')) {
      return <Code className="w-4 h-4 text-orange-600" />;
    }
    return <Briefcase className="w-4 h-4 text-gray-600" />;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Type guard - if no dashboard data, show loading state
  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Preparing your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
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

            {/* Dashboard Title */}
            <div className="hidden md:block">
              <h1 className="text-2xl font-bold text-gray-900">Creator Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back! Here's your overview</p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleEditProfile}
                className="flex items-center px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-all duration-200 shadow-sm"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Banner */}
        <div className="bg-linear-to-r from-blue-500 to-purple-600 rounded-2xl p-6 mb-8 text-white shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                Welcome back, {dashboardData.personalInfo.fullName || 'Creator'}!
              </h1>
              <p className="text-blue-100">
                {dashboardData.professionalBackground.professionalTitle || 'Professional Creator'} • 
                {dashboardData.personalInfo.city && ` ${dashboardData.personalInfo.city}`}
                {dashboardData.personalInfo.country && `, ${dashboardData.personalInfo.country}`}
              </p>
              <p className="mt-2 text-blue-100">
                {dashboardData.stats.activeProjects} active projects • {dashboardData.profileCompletion.completedSections.length} of 7 profile sections complete
              </p>
            </div>
            <Link href="/creator/workspace" 
              className="mt-4 md:mt-0 px-6 py-3 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
            >
             
              Enter Workspace 
            </Link>
          </div>
        </div>

       

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Overview */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Profile Overview</h2>
                <button 
                  onClick={handleEditProfile}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                >
                  Edit All
                  <Edit className="w-4 h-4 ml-1" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Info Card */}
                <div className="border border-gray-200 rounded-xl p-5">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Personal Information</h3>
                      <p className="text-sm text-gray-600">Your basic details</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Full Name</p>
                      <p className="font-medium">{dashboardData.personalInfo.fullName || 'Not set'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="font-medium">
                        {dashboardData.personalInfo.city || dashboardData.personalInfo.country ? 
                          `${dashboardData.personalInfo.city || ''}${dashboardData.personalInfo.city && dashboardData.personalInfo.country ? ', ' : ''}${dashboardData.personalInfo.country || ''}` : 
                          'Not set'
                        }
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Languages</p>
                      <p className="font-medium">
                        {dashboardData.personalInfo.spokenLanguages?.join(', ') || 'Not set'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Professional Info Card */}
                <div className="border border-gray-200 rounded-xl p-5">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <AwardIcon className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Professional</h3>
                      <p className="text-sm text-gray-600">Your career details</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Professional Title</p>
                      <p className="font-medium">{dashboardData.professionalBackground.professionalTitle || 'Not set'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Experience</p>
                      <p className="font-medium">
                        {dashboardData.professionalBackground.yearsOfExperience || '0'} years • 
                        {dashboardData.professionalBackground.experienceLevel ? ` ${dashboardData.professionalBackground.experienceLevel}` : ''}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Bio</p>
                      <p className="font-medium text-sm line-clamp-2">
                        {dashboardData.professionalBackground.bio || 'No bio added'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Skills Card */}
                <div className="border border-gray-200 rounded-xl p-5 md:col-span-2">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                      <Target className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Skills & Expertise</h3>
                      <p className="text-sm text-gray-600">Your creative capabilities</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {dashboardData.skillsExpertise.skills && dashboardData.skillsExpertise.skills.length > 0 ? (
                      dashboardData.skillsExpertise.skills.slice(0, 8).map((skill, index) => (
                        <span key={skill.id || index} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {skill.name}
                          {skill.category && (
                            <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full ml-2">
                              {skill.category}
                            </span>
                          )}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">No skills added yet</p>
                    )}
                    {dashboardData.skillsExpertise.skills && dashboardData.skillsExpertise.skills.length > 8 && (
                      <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm">
                        +{dashboardData.skillsExpertise.skills.length - 8} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Portfolio Showcase */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Portfolio Showcase</h2>
                <button 
                  onClick={() => router.push('/creator/create-profile/portfolio?returnTo=dashboard')}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                >
                  Add More
                  <ExternalLink className="w-4 h-4 ml-1" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dashboardData.portfolioShowcase.portfolioItems && dashboardData.portfolioShowcase.portfolioItems.length > 0 ? (
                  dashboardData.portfolioShowcase.portfolioItems.slice(0, 4).map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <div className="w-12 h-12 bg-linear-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mr-3">
                          <Briefcase className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{item.title || 'Untitled Project'}</h3>
                          <p className="text-sm text-gray-600">{item.category || 'General'}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {item.description || 'No description provided'}
                      </p>
                      {item.externalLink && (
                        <a 
                          href={item.externalLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                        >
                          View Project
                          <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="md:col-span-2 text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Briefcase className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">No Portfolio Items</h3>
                    <p className="text-gray-600 mb-4">Showcase your best work to attract clients</p>
                    <button 
                      onClick={() => router.push('/creator/create-profile/portfolio?returnTo=dashboard')}
                      className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 text-sm"
                    >
                      Add Portfolio Items
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-8">
            {/* Full Profile Data Section - Replacing Quick Stats & Contact */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Full Profile Data</h2>
                <span className="text-xs font-medium px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                  Complete View
                </span>
              </div>
              
              <div className="space-y-8">
                {/* Portfolio Projects Summary */}
                <div className="border-b pb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Portfolio Projects</h3>
                    <span className="text-sm font-medium px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
                      {dashboardData.portfolioShowcase.portfolioItems?.length || 0} items
                    </span>
                  </div>
                  
                  {dashboardData.portfolioShowcase.portfolioItems && dashboardData.portfolioShowcase.portfolioItems.length > 0 ? (
                    <div className="space-y-4">
                      {dashboardData.portfolioShowcase.portfolioItems.map((item, index) => (
                        <div key={index} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start">
                            <div className="w-8 h-8 bg-linear-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center mr-3">
                              {getCategoryIcon(item.category)}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{item.title || 'Untitled Project'}</h4>
                              {item.category && (
                                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                  {item.category}
                                </span>
                              )}
                              {item.description && (
                                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{item.description}</p>
                              )}
                              {item.externalLink && (
                                <a 
                                  href={item.externalLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-blue-600 hover:text-blue-800 mt-2 inline-flex items-center"
                                >
                                  View Project <ExternalLink className="w-3 h-3 ml-1" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-500 text-sm">No portfolio projects added yet</p>
                    </div>
                  )}
                </div>

                {/* Work Experience Summary */}
                <div className="border-b pb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Work Experience</h3>
                    <span className="text-sm font-medium px-3 py-1 bg-green-100 text-green-800 rounded-full">
                      {dashboardData.workExperience.workExperiences?.length || 0} positions
                    </span>
                  </div>
                  
                  {dashboardData.workExperience.workExperiences && dashboardData.workExperience.workExperiences.length > 0 ? (
                    <div className="space-y-4">
                      {dashboardData.workExperience.workExperiences.map((exp, index) => (
                        <div key={index} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start">
                            <div className="w-8 h-8 bg-linear-to-r from-green-50 to-blue-50 rounded-lg flex items-center justify-center mr-3">
                              <Building className="w-4 h-4 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{exp.title || 'Untitled Position'}</h4>
                              <p className="text-sm text-gray-600">
                                {exp.company} {exp.location && `• ${exp.location}`}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {formatDate(exp.startDate)} - {exp.currentlyWorking ? 'Present' : formatDate(exp.endDate)}
                              </p>
                              {exp.description && (
                                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{exp.description}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-500 text-sm">No work experience added yet</p>
                    </div>
                  )}
                </div>

                {/* Languages Spoken */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Languages Spoken</h3>
                    <span className="text-sm font-medium px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                      {dashboardData.personalInfo.spokenLanguages?.length || 0} languages
                    </span>
                  </div>
                  
                  {dashboardData.personalInfo.spokenLanguages && dashboardData.personalInfo.spokenLanguages.length > 0 ? (
                    <div className="space-y-3">
                      {dashboardData.personalInfo.spokenLanguages.map((language, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-8 h-8 bg-linear-to-r from-yellow-50 to-orange-50 rounded-lg flex items-center justify-center mr-3">
                            <Globe className="w-4 h-4 text-yellow-600" />
                          </div>
                          <span className="font-medium text-gray-900">{language}</span>
                          {index === 0 && (
                            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                              Primary
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-500 text-sm">No languages specified</p>
                    </div>
                  )}
                </div>

                {/* Skills Summary */}
                {dashboardData.skillsExpertise.skills && dashboardData.skillsExpertise.skills.length > 0 && (
                  <div className="border-t pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">Skills Summary</h3>
                      <span className="text-sm font-medium px-3 py-1 bg-red-100 text-red-800 rounded-full">
                        {dashboardData.skillsExpertise.skills.length} skills
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {dashboardData.skillsExpertise.skills.map((skill, index) => (
                        <span key={skill.id || index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Completion */}
            <div className="bg-linear-to-r from-gray-900 to-black rounded-2xl p-6 text-white">
              <h2 className="text-xl font-bold mb-6">Profile Completion</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Completion Status</span>
                  <span className={`font-bold ${getCompletionColor(dashboardData.profileCompletion.percentage)}`}>
                    {dashboardData.profileCompletion.percentage}%
                  </span>
                </div>
                
                <div className="space-y-3">
                  <p className="text-sm text-gray-300">Completed Sections:</p>
                  <div className="flex flex-wrap gap-2">
                    {dashboardData.profileCompletion.completedSections.map((section, index) => (
                      <span key={index} className="px-3 py-1 bg-green-900/30 text-green-300 rounded-full text-xs">
                        <CheckCircle2 className="w-3 h-3 inline mr-1" />
                        {section}
                      </span>
                    ))}
                  </div>
                </div>
                
                {dashboardData.profileCompletion.completedSections.length < dashboardData.profileCompletion.totalSections && (
                  <button 
                    onClick={handleEditProfile}
                    className="w-full mt-4 px-4 py-3 bg-white text-gray-900 rounded-xl hover:bg-gray-100 font-semibold transition-all duration-200"
                  >
                    Complete Your Profile
                  </button>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              
              <div className="space-y-3">
                <button 
                  onClick={() => router.push('/creator/create-profile/portfolio?returnTo=dashboard')}
                  className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <Briefcase className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-900">Add Portfolio Item</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </button>
                
                <button 
                  onClick={() => router.push('/creator/create-profile/skills-expertise?returnTo=dashboard')}
                  className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <Target className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="font-medium text-gray-900">Update Skills</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </button>
                
                <button 
                  onClick={() => router.push('/creator/create-profile/rate?returnTo=dashboard')}
                  className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                      <DollarSign className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="font-medium text-gray-900">Update Rates</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-200 pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-linear-to-r from-black to-gray-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">HH</span>
                </div>
                <span className="ml-2 font-bold">Hey Humanz</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">Empowering creators worldwide</p>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-sm text-gray-600">
                © {new Date().getFullYear()} Hey Humanz. All rights reserved.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex space-x-4">
                <a href="#" className="text-sm text-gray-600 hover:text-black">Privacy</a>
                <a href="#" className="text-sm text-gray-600 hover:text-black">Terms</a>
                <a href="#" className="text-sm text-gray-600 hover:text-black">Help</a>
                <a href="#" className="text-sm text-gray-600 hover:text-black">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default withRoleProtection(CreatorDashboard, ["creator"]);