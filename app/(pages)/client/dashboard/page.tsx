// "use client";

// import { withRoleProtection } from "@/lib/withRoleProtection";
// import { Search, Briefcase, CheckCircle, Clock, DollarSign, Users, UserPlus, TrendingUp, Video, Image as ImageIcon } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// // Type definitions
// interface Creator {
//   _id: string;
//   name: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   image?: string;
//   createdAt: string;
// }

// interface DashboardStats {
//   totalCreatorsAvailable: number;
//   newCreatorsThisMonth: number;
//   activeJobs: number;
//   completedJobs: number;
//   recentCreators?: Creator[];
// }

// function ClientPage() {
//   const [stats, setStats] = useState<DashboardStats>({
//     totalCreatorsAvailable: 0,
//     newCreatorsThisMonth: 0,
//     activeJobs: 3, // Hardcoded for now
//     completedJobs: 8, // Hardcoded for now
//   });
//   const [recentCreators, setRecentCreators] = useState<Creator[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch dashboard data
//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       console.log('🔍 [DEBUG] Starting to fetch creator data...');
      
//       // Fetch only creator data
//       const creatorsResponse = await fetch('/api/creator/stats?limit=5');
//       console.log('🔍 [DEBUG] Creator API Response Status:', creatorsResponse.status);
//       console.log('🔍 [DEBUG] Creator API Response OK:', creatorsResponse.ok);
      
//       if (!creatorsResponse.ok) {
//         throw new Error(`API returned ${creatorsResponse.status}: ${creatorsResponse.statusText}`);
//       }
      
//       const creatorsData = await creatorsResponse.json();
//       console.log('🔍 [DEBUG] Creator API Response Data:', creatorsData);
      
//       if (creatorsData.success) {
//         console.log('✅ [DEBUG] Creator API Success:', creatorsData.data);
//         console.log('✅ [DEBUG] Total Creators:', creatorsData.data?.totalCreators);
//         console.log('✅ [DEBUG] Recent Creators Count:', creatorsData.data?.recentCreators);
//         console.log('✅ [DEBUG] Creators List:', creatorsData.data?.creators);
        
//         setStats(prev => ({
//           ...prev,
//           totalCreatorsAvailable: creatorsData.data?.totalCreators || 0,
//           newCreatorsThisMonth: creatorsData.data?.recentCreators || 0,
//         }));
        
//         setRecentCreators(creatorsData.data?.creators || []);
//       } else {
//         console.error('❌ [DEBUG] Creator API returned success: false');
//         console.error('❌ [DEBUG] Error message:', creatorsData.message);
//         throw new Error(creatorsData.message || 'API returned success: false');
//       }
      
//     } catch (err: any) {
//       console.error('❌ [DEBUG] Error in fetchDashboardData:', err);
//       console.error('❌ [DEBUG] Error message:', err.message);
//       console.error('❌ [DEBUG] Error stack:', err.stack);
      
//       setError(`Failed to load dashboard data: ${err.message}`);
      
//       // Fallback to mock data if API fails
//       console.log('⚠️ [DEBUG] Using fallback mock data');
//       setStats({
//         totalCreatorsAvailable: 45,
//         newCreatorsThisMonth: 12,
//         activeJobs: 3,
//         completedJobs: 8,
//       });
      
//       // Mock data for recent creators - Using Date.now() to ensure unique keys
//       const mockCreators = [
//         {
//           _id: `mock_${Date.now()}_1`,
//           name: 'John Doe',
//           firstName: 'John',
//           lastName: 'Doe',
//           email: 'john@example.com',
//           image: 'https://lh3.googleusercontent.com/a/ACg8ocJyQ',
//           createdAt: new Date().toISOString()
//         },
//         {
//           _id: `mock_${Date.now()}_2`,
//           name: 'Jane Smith',
//           firstName: 'Jane',
//           lastName: 'Smith',
//           email: 'jane@example.com',
//           createdAt: new Date().toISOString()
//         }
//       ];
//       console.log('⚠️ [DEBUG] Using mock creators:', mockCreators);
//       setRecentCreators(mockCreators);
//     } finally {
//       setLoading(false);
//       console.log('🔍 [DEBUG] Loading state set to false');
//     }
//   };

//   useEffect(() => {
//     console.log('🔍 [DEBUG] ClientPage component mounted, fetching data...');
//     fetchDashboardData();
//   }, []);

//   // Function to get initials from name
//   const getInitials = (name: string) => {
//     const initials = name
//       .split(' ')
//       .map(word => word[0])
//       .join('')
//       .toUpperCase()
//       .slice(0, 2);
//     console.log('🔍 [DEBUG] Getting initials for', name, '->', initials);
//     return initials;
//   };

//   // Function to format date
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     const formatted = date.toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });
//     console.log('🔍 [DEBUG] Formatting date', dateString, '->', formatted);
//     return formatted;
//   };

//   console.log('🔍 [DEBUG] Component render - Loading:', loading);
//   console.log('🔍 [DEBUG] Component render - Stats:', stats);
//   console.log('🔍 [DEBUG] Component render - Recent Creators count:', recentCreators.length);
//   console.log('🔍 [DEBUG] Component render - Error:', error);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header with Logo */}
//       <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center">
//               <div className="shrink-0">
//                 <Image
//                   src="/blacklogo.jpg"
//                   alt="Brand Logo"
//                   width={250}
//                   height={140}
//                   className="h-28 w-auto"
//                   priority
//                 />
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-3">
//                 <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                   <span className="text-blue-600 font-semibold">C</span>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-900">Showrya Agarwal</p>
//                   <p className="text-xs text-gray-500">Client Account</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="py-8">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Welcome Header */}
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-gray-900">Client Dashboard</h1>
//             <p className="text-gray-600 mt-2">Welcome back, Showrya! Here's your overview</p>
//           </div>

//           {error && (
//             <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
//               <p className="text-red-700">Error: {error}</p>
//               <p className="text-sm text-red-600 mt-1">Check browser console for details</p>
//             </div>
//           )}

//           {/* Stats Cards Section */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             {/* Search Creators Card */}
//             <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-blue-100 p-6 hover:shadow-md transition-shadow duration-200">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="p-3 bg-blue-100 rounded-lg">
//                   <Search className="h-6 w-6 text-blue-600" />
//                 </div>
//                 <span className="text-sm font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
//                   {loading ? '...' : `${stats.newCreatorsThisMonth} New`}
//                 </span>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">Find Creators</h3>
//               <p className="text-gray-600 text-sm mb-4">
//                 Search and hire talented creators for your projects
//               </p>
//               <div className="flex items-center justify-between">
//                 <span className="text-2xl font-bold text-gray-900">
//                   {loading ? '...' : `${stats.totalCreatorsAvailable}+`}
//                 </span>
//                 <Link  href="/client/dashboard/search"
//                   className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  
//                 >
//                   Search Now
//                 </Link>
//               </div>
//             </div>

//             {/* Active Jobs Card */}
//             <div className="bg-linear-to-br from-amber-50 to-orange-50 rounded-xl shadow-sm border border-amber-100 p-6 hover:shadow-md transition-shadow duration-200">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="p-3 bg-amber-100 rounded-lg">
//                   <Briefcase className="h-6 w-6 text-amber-600" />
//                 </div>
//                 <span className="text-sm font-medium text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
//                   {loading ? '...' : `${stats.activeJobs} In Progress`}
//                 </span>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Jobs</h3>
//               <p className="text-gray-600 text-sm mb-4">
//                 Track your ongoing projects and campaigns
//               </p>
//               <div className="space-y-3">
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-gray-700">Campaign Videos</span>
//                   <span className="text-sm font-medium text-amber-700">2 jobs</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-gray-700">Social Media</span>
//                   <span className="text-sm font-medium text-amber-700">1 job</span>
//                 </div>
//               </div>
//             </div>

//             {/* Completed Jobs Card */}
//             <div className="bg-linear-to-br from-emerald-50 to-green-50 rounded-xl shadow-sm border border-emerald-100 p-6 hover:shadow-md transition-shadow duration-200">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="p-3 bg-emerald-100 rounded-lg">
//                   <CheckCircle className="h-6 w-6 text-emerald-600" />
//                 </div>
//                 <span className="text-sm font-medium text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
//                   {loading ? '...' : `${stats.completedJobs} Completed`}
//                 </span>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">Completed Jobs</h3>
//               <p className="text-gray-600 text-sm mb-4">
//                 View your successfully delivered projects
//               </p>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600">Total Spent</p>
//                   <p className="text-2xl font-bold text-gray-900">$4,250</p>
//                 </div>
//                 <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
//                   View All →
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Additional Info Section */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
//             <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               {/* Quick Action Cards */}
//               <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer text-left">
//                 <div className="flex items-center space-x-3">
//                   <div className="p-2 bg-purple-100 rounded-lg">
//                     <Users className="h-5 w-5 text-purple-600" />
//                   </div>
//                   <div>
//                     <h4 className="font-medium text-gray-900">Browse Creators</h4>
//                     <p className="text-sm text-gray-500">{loading ? '...' : `${stats.totalCreatorsAvailable} available`}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer text-left">
//                 <div className="flex items-center space-x-3">
//                   <div className="p-2 bg-blue-100 rounded-lg">
//                     <UserPlus className="h-5 w-5 text-blue-600" />
//                   </div>
//                   <div>
//                     <h4 className="font-medium text-gray-900">New Creators</h4>
//                     <p className="text-sm text-gray-500">{loading ? '...' : `${stats.newCreatorsThisMonth} this month`}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer text-left">
//                 <div className="flex items-center space-x-3">
//                   <div className="p-2 bg-green-100 rounded-lg">
//                     <TrendingUp className="h-5 w-5 text-green-600" />
//                   </div>
//                   <div>
//                     <h4 className="font-medium text-gray-900">Top Creators</h4>
//                     <p className="text-sm text-gray-500">View highest rated</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer text-left">
//                 <div className="flex items-center space-x-3">
//                   <div className="p-2 bg-amber-100 rounded-lg">
//                     <Briefcase className="h-5 w-5 text-amber-600" />
//                   </div>
//                   <div>
//                     <h4 className="font-medium text-gray-900">Post New Job</h4>
//                     <p className="text-sm text-gray-500">Hire creators</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Recent Creators Section */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h2 className="text-xl font-semibold text-gray-900">Recent Creators</h2>
//                 <p className="text-gray-600 text-sm mt-1">
//                   Newly joined creators available for hire
//                 </p>
//               </div>
//               <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
//                 View All Creators →
//               </button>
//             </div>

//             {loading ? (
//               <div key="loading-state" className="text-center py-8">
//                 <div key="spinner" className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                 <p key="loading-text" className="mt-2 text-gray-500">Loading creators...</p>
//               </div>
//             ) : recentCreators.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {recentCreators.map((creator) => (
//                   <div key={creator._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
//                     <div className="flex items-center space-x-3">
//                       <div className="shrink-0">
//                         {creator.image ? (
//                           <div key={`image-${creator._id}`} className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
//                             <img
//                               src={creator.image}
//                               alt={creator.name}
//                               className="w-full h-full object-cover"
//                               onError={(e) => {
//                                 console.error('❌ [DEBUG] Image failed to load:', creator.image);
//                                 e.currentTarget.style.display = 'none';
//                               }}
//                             />
//                           </div>
//                         ) : (
//                           <div key={`initials-${creator._id}`} className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//                             <span className="text-blue-600 font-semibold">
//                               {getInitials(creator.name)}
//                             </span>
//                           </div>
//                         )}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <h4 className="font-medium text-gray-900 truncate">{creator.name}</h4>
//                         <p className="text-sm text-gray-500 truncate">{creator.email}</p>
//                         <div className="flex items-center mt-1">
//                           <span className="text-xs text-gray-500">
//                             Joined {formatDate(creator.createdAt)}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="mt-4 flex items-center justify-between">
//                       <div className="flex items-center space-x-2">
//                         <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
//                           Creator
//                         </span>
//                         {creator.image && (
//                           <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
//                             Has Portfolio
//                           </span>
//                         )}
//                       </div>
//                       <button 
//                         className="text-blue-600 hover:text-blue-700 text-sm font-medium"
//                         onClick={() => {
//                           console.log('🔍 [DEBUG] View Profile clicked for:', creator.name);
//                           console.log('🔍 [DEBUG] Creator details:', creator);
//                         }}
//                       >
//                         View Profile
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div key="no-creators-state" className="text-center py-8">
//                 <Users key="no-creators-icon" className="h-12 w-12 text-gray-300 mx-auto" />
//                 <p key="no-creators-text" className="mt-2 text-gray-500">No creators found</p>
//                 <button key="explore-button" className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium">
//                   Explore Creators
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default withRoleProtection(ClientPage, ["client"]);   
"use client";

import { withRoleProtection } from "@/lib/withRoleProtection";
import { Search, Briefcase, CheckCircle, MessageSquare, DollarSign, Users, UserPlus, TrendingUp, Clock, Check, X, MoreVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Type definitions
interface Negotiation {
  _id: string;
  creatorName: string;
  creatorImage?: string;
  projectTitle: string;
  status: 'pending' | 'accepted' | 'rejected' | 'countered';
  proposedAmount: number;
  clientCounterAmount?: number;
  createdAt: string;
  lastMessage: string;
  unreadMessages: number;
}

interface DashboardStats {
  totalCreatorsAvailable: number;
  newCreatorsThisMonth: number;
  activeJobs: number;
  completedJobs: number;
}

function ClientPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalCreatorsAvailable: 0,
    newCreatorsThisMonth: 0,
    activeJobs: 3,
    completedJobs: 8,
  });
  const [negotiations, setNegotiations] = useState<Negotiation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔍 [DEBUG] Starting to fetch creator data...');
      
      // Fetch creator stats
      const creatorsResponse = await fetch('/api/creator/stats?limit=5');
      console.log('🔍 [DEBUG] Creator API Response Status:', creatorsResponse.status);
      
      if (!creatorsResponse.ok) {
        throw new Error(`API returned ${creatorsResponse.status}: ${creatorsResponse.statusText}`);
      }
      
      const creatorsData = await creatorsResponse.json();
      console.log('🔍 [DEBUG] Creator API Response Data:', creatorsData);
      
      if (creatorsData.success) {
        setStats(prev => ({
          ...prev,
          totalCreatorsAvailable: creatorsData.data?.totalCreators || 0,
          newCreatorsThisMonth: creatorsData.data?.recentCreators || 0,
        }));
      } else {
        console.error('❌ [DEBUG] Creator API returned success: false');
        throw new Error(creatorsData.message || 'API returned success: false');
      }
      
      // Fetch mock negotiations data (you'll replace this with your actual API)
      setNegotiations([
        {
          _id: '1',
          creatorName: 'Alex Johnson',
          creatorImage: 'https://lh3.googleusercontent.com/a/ACg8ocJyQ',
          projectTitle: 'Social Media Campaign Video',
          status: 'pending',
          proposedAmount: 1500,
          createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          lastMessage: 'Looking forward to working with you on this project!',
          unreadMessages: 2
        },
        {
          _id: '2',
          creatorName: 'Sarah Miller',
          projectTitle: 'Product Photography',
          status: 'accepted',
          proposedAmount: 800,
          clientCounterAmount: 700,
          createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          lastMessage: 'Thanks for accepting my counter offer!',
          unreadMessages: 0
        },
        {
          _id: '3',
          creatorName: 'Michael Chen',
          creatorImage: 'https://lh3.googleusercontent.com/a/ACg8ocJyQ',
          projectTitle: 'Website Redesign',
          status: 'countered',
          proposedAmount: 2500,
          clientCounterAmount: 2000,
          createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
          lastMessage: 'I can do it for $2000 if we extend the timeline by a week.',
          unreadMessages: 1
        },
        {
          _id: '4',
          creatorName: 'Jessica Williams',
          projectTitle: 'Brand Identity Package',
          status: 'rejected',
          proposedAmount: 1200,
          createdAt: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
          lastMessage: 'Unfortunately, the budget doesn\'t work for me.',
          unreadMessages: 0
        }
      ]);
      
    } catch (err: any) {
      console.error('❌ [DEBUG] Error in fetchDashboardData:', err);
      setError(`Failed to load dashboard data: ${err.message}`);
      
      // Fallback to mock data if API fails
      console.log('⚠️ [DEBUG] Using fallback mock data');
      setStats({
        totalCreatorsAvailable: 45,
        newCreatorsThisMonth: 12,
        activeJobs: 3,
        completedJobs: 8,
      });
    } finally {
      setLoading(false);
      console.log('🔍 [DEBUG] Loading state set to false');
    }
  };

  useEffect(() => {
    console.log('🔍 [DEBUG] ClientPage component mounted, fetching data...');
    fetchDashboardData();
  }, []);

  // Function to get status color and text
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { color: 'text-amber-600 bg-amber-50', text: 'Pending', icon: <Clock className="h-3 w-3" /> };
      case 'accepted':
        return { color: 'text-emerald-600 bg-emerald-50', text: 'Accepted', icon: <Check className="h-3 w-3" /> };
      case 'rejected':
        return { color: 'text-red-600 bg-red-50', text: 'Rejected', icon: <X className="h-3 w-3" /> };
      case 'countered':
        return { color: 'text-blue-600 bg-blue-50', text: 'Countered', icon: <DollarSign className="h-3 w-3" /> };
      default:
        return { color: 'text-gray-600 bg-gray-50', text: 'Unknown', icon: <MoreVertical className="h-3 w-3" /> };
    }
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Handle negotiation actions
  const handleNegotiationAction = (negotiationId: string, action: string) => {
    console.log(`Action ${action} on negotiation ${negotiationId}`);
    // Implement your negotiation action logic here
  };

  console.log('🔍 [DEBUG] Component render - Loading:', loading);
  console.log('🔍 [DEBUG] Component render - Stats:', stats);
  console.log('🔍 [DEBUG] Component render - Negotiations count:', negotiations.length);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Logo */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="shrink-0">
                <Image
                  src="/blacklogo.jpg"
                  alt="Brand Logo"
                  width={250}
                  height={140}
                  className="h-28 w-auto"
                  priority
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">C</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Showrya Agarwal</p>
                  <p className="text-xs text-gray-500">Client Account</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Client Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back, Showrya! Here's your overview</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">Error: {error}</p>
              <p className="text-sm text-red-600 mt-1">Check browser console for details</p>
            </div>
          )}

          {/* Stats Cards Section - Now 4 cards in a 2x2 grid on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Search Creators Card */}
            <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-blue-100 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Search className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                  {loading ? '...' : `${stats.newCreatorsThisMonth} New`}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Find Creators</h3>
              <p className="text-gray-600 text-sm mb-4">
                Search and hire talented creators for your projects
              </p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  {loading ? '...' : `${stats.totalCreatorsAvailable}+`}
                </span>
                <Link 
                  href="/client/dashboard/search"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Search Now
                </Link>
              </div>
            </div>

            {/* Active Jobs Card */}
            <div className="bg-linear-to-br from-amber-50 to-orange-50 rounded-xl shadow-sm border border-amber-100 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-amber-100 rounded-lg">
                  <Briefcase className="h-6 w-6 text-amber-600" />
                </div>
                <span className="text-sm font-medium text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                  {loading ? '...' : `${stats.activeJobs} In Progress`}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Jobs</h3>
              <p className="text-gray-600 text-sm mb-4">
                Track your ongoing projects and campaigns
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Campaign Videos</span>
                  <span className="text-sm font-medium text-amber-700">2 jobs</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Social Media</span>
                  <span className="text-sm font-medium text-amber-700">1 job</span>
                </div>
              </div>
            </div>

            {/* Completed Jobs Card - ADDED BACK */}
            <div className="bg-linear-to-br from-emerald-50 to-green-50 rounded-xl shadow-sm border border-emerald-100 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-emerald-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-emerald-600" />
                </div>
                <span className="text-sm font-medium text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                  {loading ? '...' : `${stats.completedJobs} Completed`}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Completed Jobs</h3>
              <p className="text-gray-600 text-sm mb-4">
                View your successfully delivered projects
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">$4,250</p>
                </div>
                <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                  View All →
                </button>
              </div>
            </div>

            {/* Negotiations Card */}
            <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-xl shadow-sm border border-purple-100 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                  {negotiations.filter(n => n.status === 'pending' || n.status === 'countered').length} Active
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Negotiations</h3>
              <p className="text-gray-600 text-sm mb-4">
                Manage ongoing discussions with creators
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Pending Review</span>
                  <span className="text-sm font-medium text-purple-700">
                    {negotiations.filter(n => n.status === 'pending').length} offers
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Counter Offers</span>
                  <span className="text-sm font-medium text-purple-700">
                    {negotiations.filter(n => n.status === 'countered').length} waiting
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Quick Action Cards */}
              <Link 
                href="/client/dashboard/search"
                className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer text-left block"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Browse Creators</h4>
                    <p className="text-sm text-gray-500">{loading ? '...' : `${stats.totalCreatorsAvailable} available`}</p>
                  </div>
                </div>
              </Link>

              <button className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer text-left">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <UserPlus className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">New Creators</h4>
                    <p className="text-sm text-gray-500">{loading ? '...' : `${stats.newCreatorsThisMonth} this month`}</p>
                  </div>
                </div>
              </button>

              <button className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer text-left">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Top Creators</h4>
                    <p className="text-sm text-gray-500">View highest rated</p>
                  </div>
                </div>
              </button>

              <button className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer text-left">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Briefcase className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Post New Job</h4>
                    <p className="text-sm text-gray-500">Hire creators</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Two Column Layout for Negotiations and Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Negotiations Section - Left Column */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Active Negotiations</h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Manage your ongoing discussions with creators
                  </p>
                </div>
                <Link 
                  href="/client/dashboard/negotiations"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View All →
                </Link>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="mt-2 text-gray-500">Loading negotiations...</p>
                </div>
              ) : negotiations.length > 0 ? (
                <div className="space-y-4">
                  {negotiations.slice(0, 3).map((negotiation) => {
                    const statusInfo = getStatusInfo(negotiation.status);
                    
                    return (
                      <div 
                        key={negotiation._id} 
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className="shrink-0">
                              {negotiation.creatorImage ? (
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                                  <img
                                    src={negotiation.creatorImage}
                                    alt={negotiation.creatorName}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="w-10 h-10 bg-linear-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                                  <span className="text-purple-600 font-semibold text-xs">
                                    {getInitials(negotiation.creatorName)}
                                  </span>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-medium text-gray-900 text-sm">{negotiation.creatorName}</h4>
                                  <p className="text-xs text-gray-500 truncate">{negotiation.projectTitle}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusInfo.color}`}>
                                    {statusInfo.icon}
                                    {statusInfo.text}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="mt-2">
                                <p className="text-xs text-gray-600 line-clamp-1">{negotiation.lastMessage}</p>
                              </div>
                              
                              <div className="mt-3 flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="text-xs">
                                    <span className="text-gray-500">Amount: </span>
                                    <span className="font-medium text-gray-900">${negotiation.proposedAmount.toLocaleString()}</span>
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {formatDate(negotiation.createdAt)}
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-1">
                                  {negotiation.unreadMessages > 0 && (
                                    <span className="bg-red-100 text-red-600 text-xs font-medium px-1.5 py-0.5 rounded-full">
                                      {negotiation.unreadMessages}
                                    </span>
                                  )}
                                  <button className="text-blue-600 hover:text-blue-700 text-xs font-medium">
                                    View
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="h-8 w-8 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No active negotiations
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Start negotiating with creators by hiring them from the search page.
                  </p>
                  <Link 
                    href="/client/dashboard/search"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    <Search className="h-4 w-4" />
                    Find Creators
                  </Link>
                </div>
              )}
            </div>

            {/* Recent Activity / Completed Jobs Section - Right Column */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Latest updates from your jobs and negotiations
                  </p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All →
                </button>
              </div>

              <div className="space-y-4">
                {/* Recent Activity Items */}
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="shrink-0 p-2 bg-blue-100 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">Social Media Campaign</span> marked as completed
                    </p>
                    <p className="text-xs text-gray-500 mt-1">2 hours ago • Paid $800</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-emerald-50 rounded-lg">
                  <div className="shrink-0 p-2 bg-emerald-100 rounded-lg">
                    <DollarSign className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      Accepted counter offer from <span className="font-medium">Michael Chen</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">1 day ago • $2,000</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg">
                  <div className="shrink-0 p-2 bg-amber-100 rounded-lg">
                    <Briefcase className="h-4 w-4 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      New job posted: <span className="font-medium">Product Video</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">2 days ago • Budget: $1,200 - $1,800</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                  <div className="shrink-0 p-2 bg-purple-100 rounded-lg">
                    <Users className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">Alex Johnson</span> sent a new proposal
                    </p>
                    <p className="text-xs text-gray-500 mt-1">3 days ago • $1,500</p>
                  </div>
                </div>

                {/* Completed Jobs Summary */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-3">Completed Jobs Summary</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500">Total Jobs</p>
                      <p className="text-xl font-bold text-gray-900">{stats.completedJobs}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500">Total Spent</p>
                      <p className="text-xl font-bold text-gray-900">$4,250</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Average per job</span>
                      <span className="font-medium text-gray-900">$531</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRoleProtection(ClientPage, ["client"]);