// "use client";

// import { withRoleProtection } from "@/lib/withRoleProtection";
// import { Search, Filter, Star, MapPin, Briefcase, Award, Users, X, ChevronDown, Check } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useState, useEffect, useCallback, useRef } from "react";

// interface Skill {
//   id: string;
//   name: string;
//   category: string;
// }

// interface Creator {
//   _id: string;
//   name: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   image?: string;
//   createdAt: string;
//   isVerified: boolean;
//   skills: Skill[];
//   categories: string[];
// }

// interface FilterOption {
//   name: string;
//   category?: string;
//   count: number;
//   selected: boolean;
// }

// function SearchPage() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [creators, setCreators] = useState<Creator[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
  
//   // Filters
//   const [skills, setSkills] = useState<FilterOption[]>([]);
//   const [categories, setCategories] = useState<FilterOption[]>([]);
//   const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState<string>("");
  
//   // UI States
//   const [showSkillsFilter, setShowSkillsFilter] = useState(false);
//   const [showCategoriesFilter, setShowCategoriesFilter] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalResults, setTotalResults] = useState(0);

//   // Refs for debouncing
//   const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   // Handle search input change with debouncing
//   const handleSearchChange = (value: string) => {
//     setSearchQuery(value);
    
//     // Clear previous timeout
//     if (searchTimeoutRef.current) {
//       clearTimeout(searchTimeoutRef.current);
//     }
    
//     // Set new timeout for search
//     searchTimeoutRef.current = setTimeout(() => {
//       fetchCreators(1);
//     }, 500); // 500ms debounce delay
//   };

//   // Fetch creators with search and filters
//   const fetchCreators = useCallback(async (page = 1) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const params = new URLSearchParams({
//         page: page.toString(),
//         limit: '12'
//       });
      
//       if (searchQuery) {
//         params.append('q', searchQuery);
//       }
      
//       if (selectedSkills.length > 0) {
//         params.append('skills', selectedSkills.join(','));
//       }
      
//       if (selectedCategory) {
//         params.append('category', selectedCategory);
//       }
      
//       const response = await fetch(`/api/creator/search?${params}`);
//       const data = await response.json();
      
//       if (data.success) {
//         setCreators(data.data.creators);
//         setTotalPages(data.data.pagination.totalPages);
//         setTotalResults(data.data.pagination.total);
//         setCurrentPage(data.data.pagination.currentPage);
        
//         // Update filters with counts from API
//         if (data.data.filters) {
//           setSkills(data.data.filters.skills.map((skill: any) => ({
//             ...skill,
//             selected: selectedSkills.includes(skill.name)
//           })));
          
//           setCategories(data.data.filters.categories.map((cat: any) => ({
//             ...cat,
//             selected: selectedCategory === cat.name
//           })));
//         }
//       } else {
//         throw new Error(data.message || 'Failed to fetch creators');
//       }
//     } catch (err: any) {
//       console.error('Error fetching creators:', err);
//       setError(err.message);
      
//       // Fallback to mock data
//       setCreators([
//         {
//           _id: '1',
//           name: 'Alex Johnson',
//           firstName: 'Alex',
//           lastName: 'Johnson',
//           email: 'alex@example.com',
//           image: 'https://lh3.googleusercontent.com/a/ACg8ocJyQ',
//           createdAt: new Date().toISOString(),
//           isVerified: true,
//           skills: [
//             { id: '1', name: 'Video Editing', category: 'Creative' },
//             { id: '2', name: 'Motion Graphics', category: 'Creative' }
//           ],
//           categories: ['Video Production', 'Animation']
//         },
//         {
//           _id: '2',
//           name: 'Sarah Miller',
//           firstName: 'Sarah',
//           lastName: 'Miller',
//           email: 'sarah@example.com',
//           createdAt: new Date().toISOString(),
//           isVerified: false,
//           skills: [
//             { id: '3', name: 'Social Media Marketing', category: 'Marketing' },
//             { id: '4', name: 'Content Strategy', category: 'Marketing' }
//           ],
//           categories: ['Digital Marketing', 'Content Creation']
//         }
//       ]);
//       setTotalResults(2);
//       setTotalPages(1);
//     } finally {
//       setLoading(false);
//     }
//   }, [searchQuery, selectedSkills, selectedCategory]);

//   // Initial fetch
//   useEffect(() => {
//     fetchCreators(1);
//   }, []);

//   // Cleanup timeout on unmount
//   useEffect(() => {
//     return () => {
//       if (searchTimeoutRef.current) {
//         clearTimeout(searchTimeoutRef.current);
//       }
//     };
//   }, []);

//   // Handle skill selection
//   const handleSkillToggle = (skillName: string) => {
//     setSelectedSkills(prev => {
//       if (prev.includes(skillName)) {
//         return prev.filter(skill => skill !== skillName);
//       } else {
//         return [...prev, skillName];
//       }
//     });
//     setCurrentPage(1);
//   };

//   // Handle category selection
//   const handleCategorySelect = (categoryName: string) => {
//     setSelectedCategory(prev => prev === categoryName ? "" : categoryName);
//     setCurrentPage(1);
//   };

//   // Clear all filters
//   const clearFilters = () => {
//     setSelectedSkills([]);
//     setSelectedCategory("");
//     setSearchQuery("");
//     setCurrentPage(1);
//   };

//   // Get initials from name
//   const getInitials = (name: string) => {
//     return name
//       .split(' ')
//       .map(word => word[0])
//       .join('')
//       .toUpperCase()
//       .slice(0, 2);
//   };

//   // Format date
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long'
//     });
//   };

//   // Pagination handlers
//   const goToPage = (page: number) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//       fetchCreators(page);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header with Logo */}
//       <header className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
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
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Search Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Find Creators</h1>
//           <p className="text-gray-600 mt-2">
//             Discover talented creators for your projects
//           </p>
//         </div>

//         {/* Search and Filter Bar */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
//           {/* Search Input */}
//           <div className="relative mb-6">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Search className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => handleSearchChange(e.target.value)}
//               placeholder="Search by name, skills, or categories..."
//               className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors"
//             />
//             {searchQuery && (
//               <button
//                 onClick={() => {
//                   setSearchQuery("");
//                   fetchCreators(1);
//                 }}
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
//               >
//                 <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//               </button>
//             )}
//           </div>

//           {/* Filters Row */}
//           <div className="flex flex-wrap items-center justify-between gap-4">
//             <div className="flex flex-wrap items-center gap-3">
//               <button
//                 onClick={() => setShowSkillsFilter(!showSkillsFilter)}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
//                   selectedSkills.length > 0
//                     ? "bg-blue-50 border-blue-200 text-blue-700"
//                     : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
//                 } transition-colors`}
//               >
//                 <Filter className="h-4 w-4" />
//                 Skills {selectedSkills.length > 0 && `(${selectedSkills.length})`}
//                 <ChevronDown className={`h-4 w-4 transition-transform ${showSkillsFilter ? 'rotate-180' : ''}`} />
//               </button>

//               <button
//                 onClick={() => setShowCategoriesFilter(!showCategoriesFilter)}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
//                   selectedCategory
//                     ? "bg-purple-50 border-purple-200 text-purple-700"
//                     : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
//                 } transition-colors`}
//               >
//                 <Briefcase className="h-4 w-4" />
//                 Category {selectedCategory && `(1)`}
//                 <ChevronDown className={`h-4 w-4 transition-transform ${showCategoriesFilter ? 'rotate-180' : ''}`} />
//               </button>

//               {(selectedSkills.length > 0 || selectedCategory || searchQuery) && (
//                 <button
//                   onClick={clearFilters}
//                   className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors"
//                 >
//                   <X className="h-4 w-4" />
//                   Clear all
//                 </button>
//               )}
//             </div>

//             <div className="text-sm text-gray-600">
//               <span className="font-semibold">{totalResults}</span> creators found
//             </div>
//           </div>

//           {/* Skills Filter Dropdown */}
//           {showSkillsFilter && skills.length > 0 && (
//             <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
//               <h3 className="font-medium text-gray-900 mb-3">Filter by Skills</h3>
//               <div className="flex flex-wrap gap-2">
//                 {skills.map((skill) => (
//                   <button
//                     key={skill.name}
//                     onClick={() => {
//                       handleSkillToggle(skill.name);
//                       fetchCreators(1);
//                     }}
//                     className={`flex items-center gap-2 px-3 py-2 rounded-full border transition-colors ${
//                       skill.selected
//                         ? "bg-blue-100 border-blue-300 text-blue-700"
//                         : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
//                     }`}
//                   >
//                     {skill.selected && <Check className="h-3 w-3" />}
//                     <span>{skill.name}</span>
//                     <span className="text-xs text-gray-500">({skill.count})</span>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Categories Filter Dropdown */}
//           {showCategoriesFilter && categories.length > 0 && (
//             <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
//               <h3 className="font-medium text-gray-900 mb-3">Filter by Category</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
//                 {categories.map((category) => (
//                   <button
//                     key={category.name}
//                     onClick={() => {
//                       handleCategorySelect(category.name);
//                       fetchCreators(1);
//                     }}
//                     className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
//                       category.selected
//                         ? "bg-purple-100 border-purple-300 text-purple-700"
//                         : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
//                     }`}
//                   >
//                     <span>{category.name}</span>
//                     <div className="flex items-center gap-2">
//                       <span className="text-xs text-gray-500">({category.count})</span>
//                       {category.selected && <Check className="h-4 w-4" />}
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Error Display */}
//         {error && (
//           <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
//             <p className="text-red-700">{error}</p>
//           </div>
//         )}

//         {/* Results Section */}
//         <div>
//           {/* Active Filters Display */}
//           {(selectedSkills.length > 0 || selectedCategory) && (
//             <div className="mb-6">
//               <div className="flex flex-wrap gap-2">
//                 {selectedSkills.map((skill) => (
//                   <div
//                     key={skill}
//                     className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full"
//                   >
//                     <span className="text-sm">{skill}</span>
//                     <button
//                       onClick={() => {
//                         handleSkillToggle(skill);
//                         fetchCreators(1);
//                       }}
//                       className="text-blue-500 hover:text-blue-700"
//                     >
//                       <X className="h-3 w-3" />
//                     </button>
//                   </div>
//                 ))}
//                 {selectedCategory && (
//                   <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full">
//                     <span className="text-sm">{selectedCategory}</span>
//                     <button
//                       onClick={() => {
//                         setSelectedCategory("");
//                         fetchCreators(1);
//                       }}
//                       className="text-purple-500 hover:text-purple-700"
//                     >
//                       <X className="h-3 w-3" />
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Loading State */}
//           {loading ? (
//             <div className="text-center py-12">
//               <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//               <p className="mt-4 text-gray-600">Searching creators...</p>
//             </div>
//           ) : creators.length > 0 ? (
//             <>
//               {/* Creators Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {creators.map((creator) => (
//                   <div
//                     key={creator._id}
//                     className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
//                   >
//                     {/* Creator Header */}
//                     <div className="p-6">
//                       <div className="flex items-start space-x-4">
//                         <div className="shrink-0">
//                           {creator.image ? (
//                             <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 border-2 border-white shadow">
//                               <img
//                                 src={creator.image}
//                                 alt={creator.name}
//                                 className="w-full h-full object-cover"
//                               />
//                             </div>
//                           ) : (
//                             <div className="w-16 h-16 bg-linear-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center border-2 border-white shadow">
//                               <span className="text-blue-600 font-bold text-xl">
//                                 {getInitials(creator.name)}
//                               </span>
//                             </div>
//                           )}
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <div className="flex items-center justify-between">
//                             <h3 className="font-semibold text-gray-900 truncate">
//                               {creator.name}
//                             </h3>
//                             {creator.isVerified && (
//                               <div className="shrink-0">
//                                 <Award className="h-5 w-5 text-blue-500" />
//                               </div>
//                             )}
//                           </div>
//                           <p className="text-sm text-gray-500 truncate mt-1">
//                             {creator.email}
//                           </p>
//                           <div className="flex items-center mt-2">
//                             <Users className="h-4 w-4 text-gray-400 mr-1" />
//                             <span className="text-xs text-gray-500">
//                               Joined {formatDate(creator.createdAt)}
//                             </span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Skills */}
//                       {creator.skills.length > 0 && (
//                         <div className="mt-4">
//                           <h4 className="text-sm font-medium text-gray-700 mb-2">Skills</h4>
//                           <div className="flex flex-wrap gap-2">
//                             {creator.skills.slice(0, 3).map((skill) => (
//                               <span
//                                 key={skill.id}
//                                 className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
//                               >
//                                 {skill.name}
//                               </span>
//                             ))}
//                             {creator.skills.length > 3 && (
//                               <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
//                                 +{creator.skills.length - 3} more
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       )}

//                       {/* Categories */}
//                       {creator.categories.length > 0 && (
//                         <div className="mt-4">
//                           <h4 className="text-sm font-medium text-gray-700 mb-2">Categories</h4>
//                           <div className="flex flex-wrap gap-2">
//                             {creator.categories.slice(0, 2).map((category, index) => (
//                               <span
//                                 key={index}
//                                 className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full"
//                               >
//                                 {category}
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
//                       <div className="flex items-center justify-between">
//                         <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
//                           View Profile
//                         </button>
//                         <Link href="/client/dashboard/search/project-requirement" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
//                           Hire Now
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Pagination */}
//               {totalPages > 1 && (
//                 <div className="mt-12 flex items-center justify-center">
//                   <nav className="flex items-center space-x-2">
//                     <button
//                       onClick={() => goToPage(currentPage - 1)}
//                       disabled={currentPage === 1}
//                       className={`px-3 py-2 rounded-lg border ${
//                         currentPage === 1
//                           ? "border-gray-200 text-gray-400 cursor-not-allowed"
//                           : "border-gray-300 text-gray-700 hover:bg-gray-50"
//                       }`}
//                     >
//                       Previous
//                     </button>

//                     {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                       let pageNum;
//                       if (totalPages <= 5) {
//                         pageNum = i + 1;
//                       } else if (currentPage <= 3) {
//                         pageNum = i + 1;
//                       } else if (currentPage >= totalPages - 2) {
//                         pageNum = totalPages - 4 + i;
//                       } else {
//                         pageNum = currentPage - 2 + i;
//                       }

//                       return (
//                         <button
//                           key={pageNum}
//                           onClick={() => goToPage(pageNum)}
//                           className={`px-3 py-2 rounded-lg border ${
//                             currentPage === pageNum
//                               ? "bg-blue-600 border-blue-600 text-white"
//                               : "border-gray-300 text-gray-700 hover:bg-gray-50"
//                           }`}
//                         >
//                           {pageNum}
//                         </button>
//                       );
//                     })}

//                     <button
//                       onClick={() => goToPage(currentPage + 1)}
//                       disabled={currentPage === totalPages}
//                       className={`px-3 py-2 rounded-lg border ${
//                         currentPage === totalPages
//                           ? "border-gray-200 text-gray-400 cursor-not-allowed"
//                           : "border-gray-300 text-gray-700 hover:bg-gray-50"
//                       }`}
//                     >
//                       Next
//                     </button>
//                   </nav>
//                 </div>
//               )}
//             </>
//           ) : (
//             /* No Results State */
//             <div className="text-center py-16">
//               <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <Search className="h-12 w-12 text-gray-400" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                 No creators found
//               </h3>
//               <p className="text-gray-600 mb-6 max-w-md mx-auto">
//                 {searchQuery || selectedSkills.length > 0 || selectedCategory
//                   ? "Try adjusting your search terms or filters to find what you're looking for."
//                   : "No creators are currently available. Check back soon!"}
//               </p>
//               {(searchQuery || selectedSkills.length > 0 || selectedCategory) && (
//                 <button
//                   onClick={clearFilters}
//                   className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
//                 >
//                   Clear all filters
//                 </button>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default withRoleProtection(SearchPage, ["client"]);   
"use client";

import { withRoleProtection } from "@/lib/withRoleProtection";
import { Search, Filter, Star, MapPin, Briefcase, Award, Users, X, ChevronDown, Check, DollarSign, Clock, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";

interface Skill {
  id: string;
  name: string;
  category: string;
}

interface PricingInfo {
  pricingType: "hourly" | "fixed" | "daily" | "weekly" | "monthly";
  hourlyRate: number;
  currency: string;
  weeklyAvailability: string;
  availabilityStatus: "active" | "busy" | "away";
  workWithInternational: boolean;
}

interface Creator {
  _id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
  createdAt: string;
  isVerified: boolean;
  skills: Skill[];
  categories: string[];
  pricing?: PricingInfo;
  location?: string;
  rating?: number;
  totalProjects?: number;
}

interface FilterOption {
  name: string;
  category?: string;
  count: number;
  selected: boolean;
}

// Currency configuration
const CURRENCY_CONFIG: Record<string, { symbol: string; code: string; locale: string }> = {
  "₹": { symbol: "₹", code: "INR", locale: "en-IN" },
  "$": { symbol: "$", code: "USD", locale: "en-US" },
  "€": { symbol: "€", code: "EUR", locale: "de-DE" },
  "£": { symbol: "£", code: "GBP", locale: "en-GB" },
  "¥": { symbol: "¥", code: "JPY", locale: "ja-JP" },
  "3": { symbol: "₹", code: "INR", locale: "en-IN" }, // Fix: "3" should be Indian Rupees
};

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [skills, setSkills] = useState<FilterOption[]>([]);
  const [categories, setCategories] = useState<FilterOption[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 50000 });
  const [selectedPriceRange, setSelectedPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 50000 });
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  
  // UI States
  const [showSkillsFilter, setShowSkillsFilter] = useState(false);
  const [showCategoriesFilter, setShowCategoriesFilter] = useState(false);
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Refs for debouncing
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle search input change with debouncing
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      fetchCreators(1);
    }, 500);
  };

  // Fix currency symbol (handle "3" as Indian Rupees)
  const getCorrectCurrency = (currency: string): string => {
    if (currency === "3") {
      return "₹"; // Convert "3" to Indian Rupees symbol
    }
    return currency || "₹"; // Default to INR if not specified
  };

  // Format price based on currency with proper locale
  const formatPrice = (amount: number | undefined, currency: string = "3") => {
    if (!amount && amount !== 0) return "Not specified";
    
    const correctCurrency = getCorrectCurrency(currency);
    const config = CURRENCY_CONFIG[correctCurrency] || CURRENCY_CONFIG["₹"];
    
    try {
      // For Indian Rupees, we want proper formatting with commas
      return new Intl.NumberFormat(config.locale, {
        style: 'currency',
        currency: config.code,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        currencyDisplay: 'symbol'
      }).format(amount);
    } catch (error) {
      // Fallback to simple formatting
      const formattedAmount = amount.toLocaleString('en-IN', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      });
      return `${config.symbol}${formattedAmount}`;
    }
  };

  // Format rate display for creator card
  const formatRateDisplay = (creator: Creator) => {
    if (!creator.pricing) return "Contact for pricing";
    
    const { pricingType, hourlyRate, currency } = creator.pricing;
    const formattedPrice = formatPrice(hourlyRate, currency);
    
    switch (pricingType) {
      case "hourly":
        return `${formattedPrice}/hour`;
      case "fixed":
        return `${formattedPrice} project`;
      case "daily":
        return `${formattedPrice}/day`;
      case "weekly":
        return `${formattedPrice}/week`;
      case "monthly":
        return `${formattedPrice}/month`;
      default:
        return "Contact for pricing";
    }
  };

  // Format hourly rate specifically for display
  const formatHourlyRate = (creator: Creator) => {
    if (!creator.pricing) return "Contact for rate";
    
    const { hourlyRate, currency } = creator.pricing;
    return formatPrice(hourlyRate, currency);
  };

  // Fetch creators with search and filters
  const fetchCreators = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12'
      });
      
      if (searchQuery) {
        params.append('q', searchQuery);
      }
      
      if (selectedSkills.length > 0) {
        params.append('skills', selectedSkills.join(','));
      }
      
      if (selectedCategory) {
        params.append('category', selectedCategory);
      }
      
      // Add price filter
      if (selectedPriceRange.min > 0 || selectedPriceRange.max < 50000) {
        params.append('minPrice', selectedPriceRange.min.toString());
        params.append('maxPrice', selectedPriceRange.max.toString());
      }
      
      const response = await fetch(`/api/creator/search?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setCreators(data.data.creators);
        setTotalPages(data.data.pagination.totalPages);
        setTotalResults(data.data.pagination.total);
        setCurrentPage(data.data.pagination.currentPage);
        
        // Update price range from API if available
        if (data.data.filters?.priceRange) {
          setPriceRange(data.data.filters.priceRange);
          if (!selectedPriceRange.max || selectedPriceRange.max === 50000) {
            setSelectedPriceRange(data.data.filters.priceRange);
          }
        }
        
        // Update filters with counts
        if (data.data.filters) {
          setSkills(data.data.filters.skills.map((skill: any) => ({
            ...skill,
            selected: selectedSkills.includes(skill.name)
          })));
          
          setCategories(data.data.filters.categories.map((cat: any) => ({
            ...cat,
            selected: selectedCategory === cat.name
          })));
        }
      } else {
        throw new Error(data.message || 'Failed to fetch creators');
      }
    } catch (err: any) {
      console.error('Error fetching creators:', err);
      setError(err.message);
      
      // Fallback to mock data with EXACT pricing information from database
      setCreators([
        {
          _id: '6956a656b952de2380fb55a5',
          name: 'Creator Name',
          firstName: 'Creator',
          lastName: 'Name',
          email: 'creator@example.com',
          image: 'https://lh3.googleusercontent.com/a/ACg8ocJyQ',
          createdAt: new Date().toISOString(),
          isVerified: true,
          skills: [
            { id: '1', name: 'Video Editing', category: 'Creative' },
            { id: '2', name: 'Motion Graphics', category: 'Creative' }
          ],
          categories: ['Video Production', 'Animation'],
          pricing: {
            pricingType: 'hourly',
            hourlyRate: 23222.96, // EXACT value from database
            currency: '3', // This will be converted to ₹
            weeklyAvailability: '20',
            availabilityStatus: 'active',
            workWithInternational: true
          },
          location: 'India',
          rating: 4.8,
          totalProjects: 47
        },
        {
          _id: '67a1b2c3d4e5f67890123457',
          name: 'Sarah Miller',
          firstName: 'Sarah',
          lastName: 'Miller',
          email: 'sarah@example.com',
          createdAt: new Date().toISOString(),
          isVerified: false,
          skills: [
            { id: '3', name: 'Social Media Marketing', category: 'Marketing' },
            { id: '4', name: 'Content Strategy', category: 'Marketing' }
          ],
          categories: ['Digital Marketing', 'Content Creation'],
          pricing: {
            pricingType: 'hourly',
            hourlyRate: 1500.50,
            currency: '₹',
            weeklyAvailability: '30',
            availabilityStatus: 'active',
            workWithInternational: false
          },
          location: 'Mumbai, India',
          rating: 4.5,
          totalProjects: 23
        }
      ]);
      setTotalResults(2);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedSkills, selectedCategory, selectedPriceRange]);

  // Initial fetch
  useEffect(() => {
    fetchCreators(1);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Handle skill selection
  const handleSkillToggle = (skillName: string) => {
    setSelectedSkills(prev => {
      if (prev.includes(skillName)) {
        return prev.filter(skill => skill !== skillName);
      } else {
        return [...prev, skillName];
      }
    });
    setCurrentPage(1);
  };

  // Handle category selection
  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(prev => prev === categoryName ? "" : categoryName);
    setCurrentPage(1);
  };

  // Handle price range change
  const handlePriceRangeChange = (min: number, max: number) => {
    setSelectedPriceRange({ min, max });
    setCurrentPage(1);
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedSkills([]);
    setSelectedCategory("");
    setSearchQuery("");
    setSelectedPriceRange(priceRange);
    setCurrentPage(1);
  };

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  // Pagination handlers
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      fetchCreators(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Logo */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Creators</h1>
          <p className="text-gray-600 mt-2">
            Discover talented creators for your projects
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          {/* Search Input */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by name, skills, or categories..."
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  fetchCreators(1);
                }}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowSkillsFilter(!showSkillsFilter)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  selectedSkills.length > 0
                    ? "bg-blue-50 border-blue-200 text-blue-700"
                    : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                } transition-colors`}
              >
                <Filter className="h-4 w-4" />
                Skills {selectedSkills.length > 0 && `(${selectedSkills.length})`}
                <ChevronDown className={`h-4 w-4 transition-transform ${showSkillsFilter ? 'rotate-180' : ''}`} />
              </button>

              <button
                onClick={() => setShowCategoriesFilter(!showCategoriesFilter)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  selectedCategory
                    ? "bg-purple-50 border-purple-200 text-purple-700"
                    : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                } transition-colors`}
              >
                <Briefcase className="h-4 w-4" />
                Category {selectedCategory && `(1)`}
                <ChevronDown className={`h-4 w-4 transition-transform ${showCategoriesFilter ? 'rotate-180' : ''}`} />
              </button>

              <button
                onClick={() => setShowPriceFilter(!showPriceFilter)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  (selectedPriceRange.min > 0 || selectedPriceRange.max < 50000)
                    ? "bg-green-50 border-green-200 text-green-700"
                    : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                } transition-colors`}
              >
                <DollarSign className="h-4 w-4" />
                Price
                <ChevronDown className={`h-4 w-4 transition-transform ${showPriceFilter ? 'rotate-180' : ''}`} />
              </button>

              {(selectedSkills.length > 0 || selectedCategory || searchQuery || selectedPriceRange.min > 0 || selectedPriceRange.max < 50000) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <X className="h-4 w-4" />
                  Clear all
                </button>
              )}
            </div>

            <div className="text-sm text-gray-600">
              <span className="font-semibold">{totalResults}</span> creators found
            </div>
          </div>

          {/* Skills Filter Dropdown */}
          {showSkillsFilter && skills.length > 0 && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-3">Filter by Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <button
                    key={skill.name}
                    onClick={() => {
                      handleSkillToggle(skill.name);
                      fetchCreators(1);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-full border transition-colors ${
                      skill.selected
                        ? "bg-blue-100 border-blue-300 text-blue-700"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {skill.selected && <Check className="h-3 w-3" />}
                    <span>{skill.name}</span>
                    <span className="text-xs text-gray-500">({skill.count})</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Categories Filter Dropdown */}
          {showCategoriesFilter && categories.length > 0 && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-3">Filter by Category</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => {
                      handleCategorySelect(category.name);
                      fetchCreators(1);
                    }}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                      category.selected
                        ? "bg-purple-100 border-purple-300 text-purple-700"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>{category.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">({category.count})</span>
                      {category.selected && <Check className="h-4 w-4" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price Filter Dropdown */}
          {showPriceFilter && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-3">Filter by Hourly Rate (₹)</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {formatPrice(selectedPriceRange.min, "₹")} - {formatPrice(selectedPriceRange.max, "₹")}
                  </span>
                  <button
                    onClick={() => {
                      handlePriceRangeChange(priceRange.min, priceRange.max);
                      fetchCreators(1);
                    }}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Apply
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="relative pt-1">
                    <input
                      type="range"
                      min={priceRange.min}
                      max={priceRange.max}
                      step="100"
                      value={selectedPriceRange.min}
                      onChange={(e) => handlePriceRangeChange(parseInt(e.target.value), selectedPriceRange.max)}
                      className="absolute w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                    />
                    <input
                      type="range"
                      min={priceRange.min}
                      max={priceRange.max}
                      step="100"
                      value={selectedPriceRange.max}
                      onChange={(e) => handlePriceRangeChange(selectedPriceRange.min, parseInt(e.target.value))}
                      className="absolute w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{formatPrice(priceRange.min, "₹")}</span>
                    <span>{formatPrice(priceRange.max, "₹")}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Results Section */}
        <div>
          {/* Active Filters Display */}
          {(selectedSkills.length > 0 || selectedCategory || selectedPriceRange.min > 0 || selectedPriceRange.max < 50000) && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {selectedSkills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full"
                  >
                    <span className="text-sm">{skill}</span>
                    <button
                      onClick={() => {
                        handleSkillToggle(skill);
                        fetchCreators(1);
                      }}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {selectedCategory && (
                  <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full">
                    <span className="text-sm">{selectedCategory}</span>
                    <button
                      onClick={() => {
                        setSelectedCategory("");
                        fetchCreators(1);
                      }}
                      className="text-purple-500 hover:text-purple-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                {(selectedPriceRange.min > 0 || selectedPriceRange.max < 50000) && (
                  <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full">
                    <span className="text-sm">
                      {formatPrice(selectedPriceRange.min, "₹")} - {formatPrice(selectedPriceRange.max, "₹")}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedPriceRange(priceRange);
                        fetchCreators(1);
                      }}
                      className="text-green-500 hover:text-green-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Searching creators...</p>
            </div>
          ) : creators.length > 0 ? (
            <>
              {/* Creators Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {creators.map((creator) => (
                  <div
                    key={creator._id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
                  >
                    {/* Creator Header */}
                    <div className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="shrink-0">
                          {creator.image ? (
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 border-2 border-white shadow">
                              <img
                                src={creator.image}
                                alt={creator.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-16 h-16 bg-linear-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center border-2 border-white shadow">
                              <span className="text-blue-600 font-bold text-xl">
                                {getInitials(creator.name)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900 truncate">
                              {creator.name}
                            </h3>
                            {creator.isVerified && (
                              <div className="shrink-0">
                                <Award className="h-5 w-5 text-blue-500" />
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 truncate mt-1">
                            {creator.email}
                          </p>
                          <div className="flex items-center mt-2">
                            <Users className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-500">
                              Joined {formatDate(creator.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Pricing Information */}
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-green-600" />
                            <span className="font-medium text-gray-900">
                              {formatRateDisplay(creator)}
                            </span>
                          </div>
                          {creator.pricing?.availabilityStatus === 'active' && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                              Available
                            </span>
                          )}
                        </div>
                        
                        {/* Show exact hourly rate */}
                        {creator.pricing && (
                          <div className="text-sm text-gray-700 font-medium">
                            Exact rate: {formatHourlyRate(creator)}/hour
                          </div>
                        )}
                        
                        {/* Additional pricing info */}
                        {creator.pricing && (
                          <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-600">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{creator.pricing.weeklyAvailability} hrs/week</span>
                            </div>
                            {creator.pricing.workWithInternational && (
                              <div className="flex items-center gap-1">
                                <Globe className="h-3 w-3" />
                                <span>International</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Location and Rating */}
                      <div className="mt-4 flex items-center justify-between">
                        {creator.location && (
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span>{creator.location}</span>
                          </div>
                        )}
                        {creator.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{creator.rating}</span>
                            {creator.totalProjects && (
                              <span className="text-xs text-gray-500 ml-1">
                                ({creator.totalProjects} projects)
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Skills */}
                      {creator.skills.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {creator.skills.slice(0, 3).map((skill) => (
                              <span
                                key={skill.id}
                                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                              >
                                {skill.name}
                              </span>
                            ))}
                            {creator.skills.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                +{creator.skills.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Categories */}
                      {creator.categories.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Categories</h4>
                          <div className="flex flex-wrap gap-2">
                            {creator.categories.slice(0, 2).map((category, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full"
                              >
                                {category}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          View Profile
                        </button>
                        {/* Pass creator ID and pricing info as query parameters */}
                        <Link 
                          href={{
                            pathname: `/client/dashboard/search/project-requirement`,
                            query: { 
                              creatorId: creator._id,
                              pricingType: creator.pricing?.pricingType,
                              hourlyRate: creator.pricing?.hourlyRate,
                              currency: creator.pricing?.currency
                            }
                          }}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          Hire Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center">
                  <nav className="flex items-center space-x-2">
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-3 py-2 rounded-lg border ${
                        currentPage === 1
                          ? "border-gray-200 text-gray-400 cursor-not-allowed"
                          : "border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Previous
                    </button>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => goToPage(pageNum)}
                          className={`px-3 py-2 rounded-lg border ${
                            currentPage === pageNum
                              ? "bg-blue-600 border-blue-600 text-white"
                              : "border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-2 rounded-lg border ${
                        currentPage === totalPages
                          ? "border-gray-200 text-gray-400 cursor-not-allowed"
                          : "border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </>
          ) : (
            /* No Results State */
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No creators found
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {searchQuery || selectedSkills.length > 0 || selectedCategory || selectedPriceRange.min > 0 || selectedPriceRange.max < 50000
                  ? "Try adjusting your search terms or filters to find what you're looking for."
                  : "No creators are currently available. Check back soon!"}
              </p>
              {(searchQuery || selectedSkills.length > 0 || selectedCategory || selectedPriceRange.min > 0 || selectedPriceRange.max < 50000) && (
                <button
                  onClick={clearFilters}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withRoleProtection(SearchPage, ["client"]);