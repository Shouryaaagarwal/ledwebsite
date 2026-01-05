// "use client";

// import { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { withRoleProtection } from "@/lib/withRoleProtection";

// interface ReferenceFile {
//   url: string;
//   name: string;
//   fileType: string;
//   size?: number;
// }

// interface PricingBlock {
//   clientAskedPrice: string;
//   reason: string;
// }

// interface CreatorRate {
//   _id: string;
//   userId: string;
//   pricingType: string;
//   hourlyRate: number;
//   weeklyAvailability: string;
//   availabilityStatus: string;
//   workWithInternational: boolean;
// }

// function CreateProjectRequestPage() {
//   const { data: session } = useSession();
//   const router = useRouter();
  
//   const [formData, setFormData] = useState({
//     projectTitle: "",
//     projectType: "",
//     receivedTime: new Date().toISOString().slice(0, 16),
//     projectDescription: "",
//     deadline: "",
//     referenceFiles: [] as ReferenceFile[],
//     pricingBlock: {
//       clientAskedPrice: "",
//       reason: "",
//     }
//   });

//   const [creatorRate, setCreatorRate] = useState<CreatorRate | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [loadingCreatorRate, setLoadingCreatorRate] = useState(true);
//   const [error, setError] = useState("");

//   const projectTypes = [
//     "Web Development",
//     "Mobile App",
//     "UI/UX Design",
//     "Graphic Design",
//     "Content Writing",
//     "Digital Marketing",
//     "Video Production",
//     "Consulting",
//     "Other"
//   ];

//   // Fetch creator rate when component mounts
//   useEffect(() => {
//     const fetchCreatorRate = async () => {
//       try {
//         const response = await fetch('/api/creator/profile/rate-availability');
//         const data = await response.json();  
//         console.log(data)
        
//         if (response.ok && data.success) {
//           setCreatorRate(data.rate);
//         }
//       } catch (error) {
//         console.error("Error fetching creator rate:", error);
//       } finally {
//         setLoadingCreatorRate(false);
//       }
//     };

//     fetchCreatorRate();
//   }, []);

//   const handleInputChange = (field: string, value: string | boolean) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handlePricingChange = (field: keyof PricingBlock, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       pricingBlock: {
//         ...prev.pricingBlock,
//         [field]: value
//       }
//     }));
//   };

//   const addReferenceFile = () => {
//     setFormData(prev => ({
//       ...prev,
//       referenceFiles: [
//         ...prev.referenceFiles,
//         { url: "", name: "", fileType: "" }
//       ]
//     }));
//   };

//   const removeReferenceFile = (index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       referenceFiles: prev.referenceFiles.filter((_, i) => i !== index)
//     }));
//   };

//   const updateReferenceFile = (index: number, field: keyof ReferenceFile, value: string) => {
//     const updatedFiles = [...formData.referenceFiles];
//     updatedFiles[index] = { ...updatedFiles[index], [field]: value };
//     setFormData(prev => ({ ...prev, referenceFiles: updatedFiles }));
//   };

//   const validateForm = () => {
//     if (!formData.projectTitle.trim()) {
//       setError("Project title is required");
//       return false;
//     }
//     if (!formData.projectType.trim()) {
//       setError("Project type is required");
//       return false;
//     }
//     if (!formData.projectDescription.trim()) {
//       setError("Project description is required");
//       return false;
//     }
//     if (!formData.deadline) {
//       setError("Deadline is required");
//       return false;
//     }
//     if (!formData.pricingBlock.clientAskedPrice || parseFloat(formData.pricingBlock.clientAskedPrice) <= 0) {
//       setError("Valid project budget is required");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     if (!validateForm()) {
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await fetch('/api/client/project-requirements', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || 'Failed to submit project request');
//       }

//       router.push('/client/dashboard');
//     } catch (err: any) {
//       setError(err.message || 'An error occurred');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Format price display
//   const formatPrice = (price: number) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 2
//     }).format(price);
//   };

//   if (!session) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
//         <div className="p-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit Project Request</h1>
//           <p className="text-gray-600 mb-8">Fill in the details to request services from creators</p>

//           {error && (
//             <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-8">
//             {/* Basic Information */}
//             <div className="border border-gray-200 rounded-lg p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Project Title *
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.projectTitle}
//                     onChange={(e) => handleInputChange("projectTitle", e.target.value)}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
//                     placeholder="Enter project title"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Project Type *
//                   </label>
//                   <select
//                     value={formData.projectType}
//                     onChange={(e) => handleInputChange("projectType", e.target.value)}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
//                     required
//                   >
//                     <option value="">Select project type</option>
//                     {projectTypes.map((type) => (
//                       <option key={type} value={type}>{type}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Received Time
//                   </label>
//                   <input
//                     type="datetime-local"
//                     value={formData.receivedTime}
//                     onChange={(e) => handleInputChange("receivedTime", e.target.value)}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Deadline *
//                   </label>
//                   <input
//                     type="datetime-local"
//                     value={formData.deadline}
//                     onChange={(e) => handleInputChange("deadline", e.target.value)}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
//                     required
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Project Description */}
//             <div className="border border-gray-200 rounded-lg p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Description *</h2>
//               <textarea
//                 value={formData.projectDescription}
//                 onChange={(e) => handleInputChange("projectDescription", e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent min-h-[150px]"
//                 placeholder="Describe the project requirements, scope, and any specific details..."
//                 required
//               />
//             </div>

//             {/* Reference Files */}
//             <div className="border border-gray-200 rounded-lg p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-semibold text-gray-900">Reference Files (Drive Links)</h2>
//                 <button
//                   type="button"
//                   onClick={addReferenceFile}
//                   className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//                 >
//                   + Add File
//                 </button>
//               </div>
              
//               {formData.referenceFiles.length === 0 ? (
//                 <p className="text-gray-500 italic">No reference files added</p>
//               ) : (
//                 <div className="space-y-4">
//                   {formData.referenceFiles.map((file, index) => (
//                     <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
//                       <div className="flex-1 space-y-3">
//                         <input
//                           type="text"
//                           value={file.url}
//                           onChange={(e) => updateReferenceFile(index, 'url', e.target.value)}
//                           className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-black focus:border-transparent"
//                           placeholder="Google Drive/Cloud URL"
//                         />
//                         <div className="grid grid-cols-2 gap-3">
//                           <input
//                             type="text"
//                             value={file.name}
//                             onChange={(e) => updateReferenceFile(index, 'name', e.target.value)}
//                             className="px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-black focus:border-transparent"
//                             placeholder="File name"
//                           />
//                           <input
//                             type="text"
//                             value={file.fileType}
//                             onChange={(e) => updateReferenceFile(index, 'fileType', e.target.value)}
//                             className="px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-black focus:border-transparent"
//                             placeholder="File type (image, pdf, etc.)"
//                           />
//                         </div>
//                       </div>
//                       <button
//                         type="button"
//                         onClick={() => removeReferenceFile(index)}
//                         className="px-3 py-2 text-red-600 hover:text-red-800"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Creator Pricing Information */}
//             <div className="border border-gray-200 rounded-lg p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Creator Pricing Information</h2>
              
//               {loadingCreatorRate ? (
//                 <div className="border border-gray-200 rounded-lg p-8 bg-gray-50 max-w-2xl mx-auto">
//                   <div className="flex items-center justify-center">
//                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//                     <p className="ml-3 text-gray-600">Loading creator rates...</p>
//                   </div>
//                 </div>
//               ) : creatorRate ? (
//                 <div className="border border-gray-200 rounded-lg p-6 bg-blue-50 max-w-2xl mx-auto">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-lg font-semibold text-gray-900">Creator's Standard Rates</h3>
//                     <div className="flex items-center">
//                       <div className={`px-3 py-1 rounded-full text-sm font-medium ${
//                         creatorRate.availabilityStatus === 'activez' 
//                           ? "bg-green-100 text-green-800"
//                           : "bg-yellow-100 text-yellow-800"
//                       }`}>
//                         {creatorRate.availabilityStatus === 'activez' ? 'Available' : 'Limited'}
//                       </div>
//                       {creatorRate.workWithInternational && (
//                         <div className="ml-2 px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
//                           International
//                         </div>
//                       )}
//                     </div>
//                   </div>
                  
//                   <div className="space-y-4">
//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="bg-white p-4 rounded-lg border border-gray-200">
//                         <div className="flex items-center justify-between">
//                           <p className="text-sm font-medium text-gray-700">Hourly Rate</p>
//                           <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
//                             {creatorRate.pricingType === 'hourlyz' ? 'Primary' : 'Fixed'}
//                           </span>
//                         </div>
//                         <p className="text-2xl font-bold text-gray-900 mt-1">
//                           {formatPrice(creatorRate.hourlyRate)}
//                         </p>
//                         <p className="text-sm text-gray-500 mt-1">Per hour</p>
//                       </div>
                      
//                       <div className="bg-white p-4 rounded-lg border border-gray-200">
//                         <p className="text-sm font-medium text-gray-700">Weekly Availability</p>
//                         <p className="text-2xl font-bold text-gray-900 mt-1">
//                           {creatorRate.weeklyAvailability}
//                         </p>
//                         <p className="text-sm text-gray-500 mt-1">Hours per week</p>
//                       </div>
//                     </div>
                    
//                     {/* Estimated Project Cost */}
//                     <div className="bg-white p-4 rounded-lg border border-gray-200">
//                       <p className="text-sm font-medium text-gray-700 mb-2">Estimated Project Cost</p>
//                       <div className="space-y-2">
//                         <div className="flex justify-between items-center">
//                           <span className="text-sm text-gray-600">20-hour project:</span>
//                           <span className="font-semibold text-gray-900">
//                             {formatPrice(creatorRate.hourlyRate * 20)}
//                           </span>
//                         </div>
//                         <div className="flex justify-between items-center">
//                           <span className="text-sm text-gray-600">40-hour project:</span>
//                           <span className="font-semibold text-gray-900">
//                             {formatPrice(creatorRate.hourlyRate * 40)}
//                           </span>
//                         </div>
//                         <div className="flex justify-between items-center">
//                           <span className="text-sm text-gray-600">80-hour project:</span>
//                           <span className="font-semibold text-gray-900">
//                             {formatPrice(creatorRate.hourlyRate * 80)}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="p-3 bg-blue-100 border border-blue-200 rounded">
//                       <div className="flex items-start">
//                         <svg className="h-5 w-5 text-blue-600 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                         </svg>
//                         <div>
//                           <p className="text-sm font-medium text-blue-800">Note:</p>
//                           <p className="text-sm text-blue-700 mt-1">
//                             Creators will use these rates as a reference when reviewing your project. 
//                             Final pricing may vary based on project complexity and requirements.
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 max-w-2xl mx-auto">
//                   <div className="text-center py-4">
//                     <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <p className="mt-3 text-gray-600">Creator pricing information not available</p>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Your Budget Information */}
//             <div className="border border-gray-200 rounded-lg p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Budget Information</h2>
              
//               {/* Client's Budget Card */}
//               <div className="border border-gray-200 rounded-lg p-6 bg-green-50 max-w-2xl mx-auto">
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="text-lg font-semibold text-gray-900">Set Your Project Budget</h3>
//                   <div className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
//                     Required
//                   </div>
//                 </div>
                
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Your Budget ($) *
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <span className="text-gray-500 sm:text-sm">$</span>
//                     </div>
//                     <input
//                       type="number"
//                       min="0"
//                       step="0.01"
//                       value={formData.pricingBlock.clientAskedPrice}
//                       onChange={(e) => handlePricingChange("clientAskedPrice", e.target.value)}
//                       className="w-full pl-7 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white"
//                       placeholder="0.00"
//                       required
//                     />
//                   </div>
//                   <p className="mt-1 text-sm text-gray-500">
//                     This is the maximum amount you're willing to pay for this project.
//                   </p>
//                 </div>
                
//                 <div className="mb-6">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Budget Notes (Optional)
//                   </label>
//                   <textarea
//                     value={formData.pricingBlock.reason}
//                     onChange={(e) => handlePricingChange("reason", e.target.value)}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent min-h-20 bg-white"
//                     placeholder="Any notes about your budget, payment terms, or flexibility..."
//                   />
//                 </div>
                
//                 {/* Budget Comparison */}
//                 {creatorRate && formData.pricingBlock.clientAskedPrice && (
//                   <div className="border-t border-gray-200 pt-4">
//                     <p className="text-sm font-medium text-gray-900 mb-2">Budget Comparison:</p>
//                     <div className="space-y-2">
//                       <div className="flex justify-between items-center">
//                         <span className="text-sm text-gray-600">Your budget:</span>
//                         <span className="font-semibold text-gray-900">
//                           {formatPrice(parseFloat(formData.pricingBlock.clientAskedPrice))}
//                         </span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-sm text-gray-600">Estimated 40-hour cost:</span>
//                         <span className={`font-semibold ${
//                           parseFloat(formData.pricingBlock.clientAskedPrice) >= creatorRate.hourlyRate * 40
//                             ? "text-green-600"
//                             : "text-red-600"
//                         }`}>
//                           {formatPrice(creatorRate.hourlyRate * 40)}
//                         </span>
//                       </div>
//                       <div className={`text-sm p-2 rounded ${
//                         parseFloat(formData.pricingBlock.clientAskedPrice) >= creatorRate.hourlyRate * 40
//                           ? "bg-green-50 text-green-700"
//                           : "bg-yellow-50 text-yellow-700"
//                       }`}>
//                         {parseFloat(formData.pricingBlock.clientAskedPrice) >= creatorRate.hourlyRate * 40
//                           ? "✓ Your budget is sufficient for a medium-sized project"
//                           : "ℹ️ Consider increasing your budget for better creator response"}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Form Actions */}
//             <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
//               <button
//                 type="button"
//                 onClick={() => router.back()}
//                 className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                 disabled={isLoading}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
//               >
//                 {isLoading ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                     </svg>
//                     Submitting...
//                   </>
//                 ) : (
//                   "Submit Project Request"
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default withRoleProtection(CreateProjectRequestPage, ["client"]);   

// "use client";

// import { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { withRoleProtection } from "@/lib/withRoleProtection";

// interface ReferenceFile {
//   url: string;
//   name: string;
//   fileType: string;
//   size?: number;
// }

// interface PricingBlock {
//   clientAskedPrice: string;
//   reason: string;
// }

// interface CreatorRateAvailability {
//   id: string;
//   userId: string;
//   pricingType: string;
//   hourlyRate: number;
//   weeklyAvailability: string;
//   availabilityStatus: string;
//   workWithInternational: boolean;
// }

// function CreateProjectRequestPage() {
//   const { data: session } = useSession();
//   const router = useRouter();
  
//   const [formData, setFormData] = useState({
//     projectTitle: "",
//     projectType: "",
//     receivedTime: new Date().toISOString().slice(0, 16),
//     projectDescription: "",
//     deadline: "",
//     referenceFiles: [] as ReferenceFile[],
//     pricingBlock: {
//       clientAskedPrice: "",
//       reason: "",
//     }
//   });

//   const [creatorRateAvailability, setCreatorRateAvailability] = useState<CreatorRateAvailability | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [loadingCreatorRate, setLoadingCreatorRate] = useState(true);
//   const [error, setError] = useState("");

//   const projectTypes = [
//     "Web Development",
//     "Mobile App",
//     "UI/UX Design",
//     "Graphic Design",
//     "Content Writing",
//     "Digital Marketing",
//     "Video Production",
//     "Consulting",
//     "Other"
//   ];

//   // Fetch creator rate when component mounts
//   useEffect(() => {
//     const fetchCreatorRate = async () => {
//       try {
//         const response = await fetch('/api/creator/profile/rate-availability');
//         const data = await response.json();
//         console.log("API Response:", data); // Debug log
        
//         if (response.ok && data.success && data.rateAvailability) {
//           setCreatorRateAvailability(data.rateAvailability);
//         } else {
//           console.error("No rateAvailability in response:", data);
//         }
//       } catch (error) {
//         console.error("Error fetching creator rate:", error);
//       } finally {
//         setLoadingCreatorRate(false);
//       }
//     };

//     fetchCreatorRate();
//   }, []);

//   const handleInputChange = (field: string, value: string | boolean) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handlePricingChange = (field: keyof PricingBlock, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       pricingBlock: {
//         ...prev.pricingBlock,
//         [field]: value
//       }
//     }));
//   };

//   const addReferenceFile = () => {
//     setFormData(prev => ({
//       ...prev,
//       referenceFiles: [
//         ...prev.referenceFiles,
//         { url: "", name: "", fileType: "" }
//       ]
//     }));
//   };

//   const removeReferenceFile = (index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       referenceFiles: prev.referenceFiles.filter((_, i) => i !== index)
//     }));
//   };

//   const updateReferenceFile = (index: number, field: keyof ReferenceFile, value: string) => {
//     const updatedFiles = [...formData.referenceFiles];
//     updatedFiles[index] = { ...updatedFiles[index], [field]: value };
//     setFormData(prev => ({ ...prev, referenceFiles: updatedFiles }));
//   };

//   const validateForm = () => {
//     if (!formData.projectTitle.trim()) {
//       setError("Project title is required");
//       return false;
//     }
//     if (!formData.projectType.trim()) {
//       setError("Project type is required");
//       return false;
//     }
//     if (!formData.projectDescription.trim()) {
//       setError("Project description is required");
//       return false;
//     }
//     if (!formData.deadline) {
//       setError("Deadline is required");
//       return false;
//     }
//     if (!formData.pricingBlock.clientAskedPrice || parseFloat(formData.pricingBlock.clientAskedPrice) <= 0) {
//       setError("Valid project budget is required");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     if (!validateForm()) {
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await fetch('/api/client/project-requirements', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || 'Failed to submit project request');
//       }

//       router.push('/client/dashboard');
//     } catch (err: any) {
//       setError(err.message || 'An error occurred');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Format price display
//   const formatPrice = (price: number) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 2
//     }).format(price);
//   };

//   if (!session) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
//         <div className="p-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit Project Request</h1>
//           <p className="text-gray-600 mb-8">Fill in the details to request services from creators</p>

//           {error && (
//             <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-8">
//             {/* Basic Information */}
//             <div className="border border-gray-200 rounded-lg p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Project Title *
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.projectTitle}
//                     onChange={(e) => handleInputChange("projectTitle", e.target.value)}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
//                     placeholder="Enter project title"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Project Type *
//                   </label>
//                   <select
//                     value={formData.projectType}
//                     onChange={(e) => handleInputChange("projectType", e.target.value)}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
//                     required
//                   >
//                     <option value="">Select project type</option>
//                     {projectTypes.map((type) => (
//                       <option key={type} value={type}>{type}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Received Time
//                   </label>
//                   <input
//                     type="datetime-local"
//                     value={formData.receivedTime}
//                     onChange={(e) => handleInputChange("receivedTime", e.target.value)}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Deadline *
//                   </label>
//                   <input
//                     type="datetime-local"
//                     value={formData.deadline}
//                     onChange={(e) => handleInputChange("deadline", e.target.value)}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
//                     required
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Project Description */}
//             <div className="border border-gray-200 rounded-lg p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Description *</h2>
//               <textarea
//                 value={formData.projectDescription}
//                 onChange={(e) => handleInputChange("projectDescription", e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent min-h-[150px]"
//                 placeholder="Describe the project requirements, scope, and any specific details..."
//                 required
//               />
//             </div>

//             {/* Reference Files */}
//             <div className="border border-gray-200 rounded-lg p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-semibold text-gray-900">Reference Files (Drive Links)</h2>
//                 <button
//                   type="button"
//                   onClick={addReferenceFile}
//                   className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//                 >
//                   + Add File
//                 </button>
//               </div>
              
//               {formData.referenceFiles.length === 0 ? (
//                 <p className="text-gray-500 italic">No reference files added</p>
//               ) : (
//                 <div className="space-y-4">
//                   {formData.referenceFiles.map((file, index) => (
//                     <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
//                       <div className="flex-1 space-y-3">
//                         <input
//                           type="text"
//                           value={file.url}
//                           onChange={(e) => updateReferenceFile(index, 'url', e.target.value)}
//                           className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-black focus:border-transparent"
//                           placeholder="Google Drive/Cloud URL"
//                         />
//                         <div className="grid grid-cols-2 gap-3">
//                           <input
//                             type="text"
//                             value={file.name}
//                             onChange={(e) => updateReferenceFile(index, 'name', e.target.value)}
//                             className="px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-black focus:border-transparent"
//                             placeholder="File name"
//                           />
//                           <input
//                             type="text"
//                             value={file.fileType}
//                             onChange={(e) => updateReferenceFile(index, 'fileType', e.target.value)}
//                             className="px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-black focus:border-transparent"
//                             placeholder="File type (image, pdf, etc.)"
//                           />
//                         </div>
//                       </div>
//                       <button
//                         type="button"
//                         onClick={() => removeReferenceFile(index)}
//                         className="px-3 py-2 text-red-600 hover:text-red-800"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Creator Pricing Information */}
//             <div className="border border-gray-200 rounded-lg p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Creator Pricing Information</h2>
              
//               {loadingCreatorRate ? (
//                 <div className="border border-gray-200 rounded-lg p-8 bg-gray-50 max-w-2xl mx-auto">
//                   <div className="flex items-center justify-center">
//                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//                     <p className="ml-3 text-gray-600">Loading creator rates...</p>
//                   </div>
//                 </div>
//               ) : creatorRateAvailability ? (
//                 <div className="border border-gray-200 rounded-lg p-6 bg-blue-50 max-w-2xl mx-auto">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-lg font-semibold text-gray-900">Creator's Standard Rates</h3>
//                     <div className="flex items-center">
//                       <div className={`px-3 py-1 rounded-full text-sm font-medium ${
//                         creatorRateAvailability.availabilityStatus === 'activez' 
//                           ? "bg-green-100 text-green-800"
//                           : "bg-yellow-100 text-yellow-800"
//                       }`}>
//                         {creatorRateAvailability.availabilityStatus === 'activez' ? 'Available' : 'Limited'}
//                       </div>
//                       {creatorRateAvailability.workWithInternational && (
//                         <div className="ml-2 px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
//                           International
//                         </div>
//                       )}
//                     </div>
//                   </div>
                  
//                   <div className="space-y-4">
//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="bg-white p-4 rounded-lg border border-gray-200">
//                         <div className="flex items-center justify-between">
//                           <p className="text-sm font-medium text-gray-700">Hourly Rate</p>
//                           <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
//                             {creatorRateAvailability.pricingType === 'hourlyz' ? 'Primary' : 'Fixed'}
//                           </span>
//                         </div>
//                         <p className="text-2xl font-bold text-gray-900 mt-1">
//                           {formatPrice(creatorRateAvailability.hourlyRate)}
//                         </p>
//                         <p className="text-sm text-gray-500 mt-1">Per hour</p>
//                       </div>
                      
//                       <div className="bg-white p-4 rounded-lg border border-gray-200">
//                         <p className="text-sm font-medium text-gray-700">Weekly Availability</p>
//                         <p className="text-2xl font-bold text-gray-900 mt-1">
//                           {creatorRateAvailability.weeklyAvailability}
//                         </p>
//                         <p className="text-sm text-gray-500 mt-1">Hours per week</p>
//                       </div>
//                     </div>
                    
//                     {/* Estimated Project Cost */}
//                     <div className="bg-white p-4 rounded-lg border border-gray-200">
//                       <p className="text-sm font-medium text-gray-700 mb-2">Estimated Project Cost</p>
//                       <div className="space-y-2">
//                         <div className="flex justify-between items-center">
//                           <span className="text-sm text-gray-600">20-hour project:</span>
//                           <span className="font-semibold text-gray-900">
//                             {formatPrice(creatorRateAvailability.hourlyRate * 20)}
//                           </span>
//                         </div>
//                         <div className="flex justify-between items-center">
//                           <span className="text-sm text-gray-600">40-hour project:</span>
//                           <span className="font-semibold text-gray-900">
//                             {formatPrice(creatorRateAvailability.hourlyRate * 40)}
//                           </span>
//                         </div>
//                         <div className="flex justify-between items-center">
//                           <span className="text-sm text-gray-600">80-hour project:</span>
//                           <span className="font-semibold text-gray-900">
//                             {formatPrice(creatorRateAvailability.hourlyRate * 80)}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="p-3 bg-blue-100 border border-blue-200 rounded">
//                       <div className="flex items-start">
//                         <svg className="h-5 w-5 text-blue-600 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                         </svg>
//                         <div>
//                           <p className="text-sm font-medium text-blue-800">Note:</p>
//                           <p className="text-sm text-blue-700 mt-1">
//                             Creators will use these rates as a reference when reviewing your project. 
//                             Final pricing may vary based on project complexity and requirements.
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 max-w-2xl mx-auto">
//                   <div className="text-center py-4">
//                     <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <p className="mt-3 text-gray-600">Creator pricing information not available</p>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Your Budget Information */}
//             <div className="border border-gray-200 rounded-lg p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Budget Information</h2>
              
//               {/* Client's Budget Card */}
//               <div className="border border-gray-200 rounded-lg p-6 bg-green-50 max-w-2xl mx-auto">
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="text-lg font-semibold text-gray-900">Set Your Project Budget</h3>
//                   <div className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
//                     Required
//                   </div>
//                 </div>
                
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Your Budget ($) *
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <span className="text-gray-500 sm:text-sm">$</span>
//                     </div>
//                     <input
//                       type="number"
//                       min="0"
//                       step="0.01"
//                       value={formData.pricingBlock.clientAskedPrice}
//                       onChange={(e) => handlePricingChange("clientAskedPrice", e.target.value)}
//                       className="w-full pl-7 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white"
//                       placeholder="0.00"
//                       required
//                     />
//                   </div>
//                   <p className="mt-1 text-sm text-gray-500">
//                     This is the maximum amount you're willing to pay for this project.
//                   </p>
//                 </div>
                
//                 <div className="mb-6">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Budget Notes (Optional)
//                   </label>
//                   <textarea
//                     value={formData.pricingBlock.reason}
//                     onChange={(e) => handlePricingChange("reason", e.target.value)}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent min-h-20 bg-white"
//                     placeholder="Any notes about your budget, payment terms, or flexibility..."
//                   />
//                 </div>
                
//                 {/* Budget Comparison */}
//                 {creatorRateAvailability && formData.pricingBlock.clientAskedPrice && (
//                   <div className="border-t border-gray-200 pt-4">
//                     <p className="text-sm font-medium text-gray-900 mb-2">Budget Comparison:</p>
//                     <div className="space-y-2">
//                       <div className="flex justify-between items-center">
//                         <span className="text-sm text-gray-600">Your budget:</span>
//                         <span className="font-semibold text-gray-900">
//                           {formatPrice(parseFloat(formData.pricingBlock.clientAskedPrice))}
//                         </span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-sm text-gray-600">Estimated 40-hour cost:</span>
//                         <span className={`font-semibold ${
//                           parseFloat(formData.pricingBlock.clientAskedPrice) >= creatorRateAvailability.hourlyRate * 40
//                             ? "text-green-600"
//                             : "text-red-600"
//                         }`}>
//                           {formatPrice(creatorRateAvailability.hourlyRate * 40)}
//                         </span>
//                       </div>
//                       <div className={`text-sm p-2 rounded ${
//                         parseFloat(formData.pricingBlock.clientAskedPrice) >= creatorRateAvailability.hourlyRate * 40
//                           ? "bg-green-50 text-green-700"
//                           : "bg-yellow-50 text-yellow-700"
//                       }`}>
//                         {parseFloat(formData.pricingBlock.clientAskedPrice) >= creatorRateAvailability.hourlyRate * 40
//                           ? "✓ Your budget is sufficient for a medium-sized project"
//                           : "ℹ️ Consider increasing your budget for better creator response"}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Form Actions */}
//             <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
//               <button
//                 type="button"
//                 onClick={() => router.back()}
//                 className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                 disabled={isLoading}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
//               >
//                 {isLoading ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                     </svg>
//                     Submitting...
//                   </>
//                 ) : (
//                   "Submit Project Request"
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default withRoleProtection(CreateProjectRequestPage, ["client"]);   



"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { withRoleProtection } from "@/lib/withRoleProtection";

interface ReferenceFile {
  url: string;
  name: string;
  fileType: string;
  size?: number;
}

interface PricingBlock {
  clientAskedPrice: string;
  reason: string;
}

interface CreatorRateAvailability {
  id: string;
  userId: string;
  pricingType: string;
  hourlyRate: number;
  weeklyAvailability: string;
  availabilityStatus: string;
  workWithInternational: boolean;
}

function CreateProjectRequestPage() {
  const { data: session } = useSession();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    projectTitle: "",
    projectType: "",
    receivedTime: new Date().toISOString().slice(0, 16),
    projectDescription: "",
    deadline: "",
    referenceFiles: [] as ReferenceFile[],
    pricingBlock: {
      clientAskedPrice: "",
      reason: "",
    }
  });

  const [creatorRateAvailability, setCreatorRateAvailability] = useState<CreatorRateAvailability | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCreatorRate, setLoadingCreatorRate] = useState(true);
  const [error, setError] = useState("");

  const projectTypes = [
    "Web Development",
    "Mobile App",
    "UI/UX Design",
    "Graphic Design",
    "Content Writing",
    "Digital Marketing",
    "Video Production",
    "Consulting",
    "Other"
  ];

  // Fetch creator rate when component mounts
  useEffect(() => {
    const fetchCreatorRate = async () => {
      try {
        const response = await fetch('/api/creator/profile/rate-availability');
        const data = await response.json();
        console.log("API Response:", data);
        
        if (response.ok && data.success && data.rateAvailability) {
          setCreatorRateAvailability(data.rateAvailability);
        } else {
          console.error("No rateAvailability in response:", data);
        }
      } catch (error) {
        console.error("Error fetching creator rate:", error);
      } finally {
        setLoadingCreatorRate(false);
      }
    };

    fetchCreatorRate();
  }, []);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePricingChange = (field: keyof PricingBlock, value: string) => {
    setFormData(prev => ({
      ...prev,
      pricingBlock: {
        ...prev.pricingBlock,
        [field]: value
      }
    }));
  };

  const addReferenceFile = () => {
    setFormData(prev => ({
      ...prev,
      referenceFiles: [
        ...prev.referenceFiles,
        { url: "", name: "", fileType: "" }
      ]
    }));
  };

  const removeReferenceFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      referenceFiles: prev.referenceFiles.filter((_, i) => i !== index)
    }));
  };

  const updateReferenceFile = (index: number, field: keyof ReferenceFile, value: string) => {
    const updatedFiles = [...formData.referenceFiles];
    updatedFiles[index] = { ...updatedFiles[index], [field]: value };
    setFormData(prev => ({ ...prev, referenceFiles: updatedFiles }));
  };

  const validateForm = () => {
    if (!formData.projectTitle.trim()) {
      setError("Project title is required");
      return false;
    }
    if (!formData.projectType.trim()) {
      setError("Project type is required");
      return false;
    }
    if (!formData.projectDescription.trim()) {
      setError("Project description is required");
      return false;
    }
    if (!formData.deadline) {
      setError("Deadline is required");
      return false;
    }
    if (!formData.pricingBlock.clientAskedPrice || parseFloat(formData.pricingBlock.clientAskedPrice) <= 0) {
      setError("Valid project budget is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/client/project-requirements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit project request');
      }

      router.push('/client/dashboard');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Format price display in Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  if (!session) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit Project Request</h1>
          <p className="text-gray-600 mb-8">Fill in the details to request services from creators</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={formData.projectTitle}
                    onChange={(e) => handleInputChange("projectTitle", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Enter project title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Type *
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => handleInputChange("projectType", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  >
                    <option value="">Select project type</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Received Time
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.receivedTime}
                    onChange={(e) => handleInputChange("receivedTime", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deadline *
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.deadline}
                    onChange={(e) => handleInputChange("deadline", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Project Description */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Description *</h2>
              <textarea
                value={formData.projectDescription}
                onChange={(e) => handleInputChange("projectDescription", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent min-h-[150px]"
                placeholder="Describe the project requirements, scope, and any specific details..."
                required
              />
            </div>

            {/* Reference Files */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Reference Files (Drive Links)</h2>
                <button
                  type="button"
                  onClick={addReferenceFile}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  + Add File
                </button>
              </div>
              
              {formData.referenceFiles.length === 0 ? (
                <p className="text-gray-500 italic">No reference files added</p>
              ) : (
                <div className="space-y-4">
                  {formData.referenceFiles.map((file, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1 space-y-3">
                        <input
                          type="text"
                          value={file.url}
                          onChange={(e) => updateReferenceFile(index, 'url', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-black focus:border-transparent"
                          placeholder="Google Drive/Cloud URL"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={file.name}
                            onChange={(e) => updateReferenceFile(index, 'name', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-black focus:border-transparent"
                            placeholder="File name"
                          />
                          <input
                            type="text"
                            value={file.fileType}
                            onChange={(e) => updateReferenceFile(index, 'fileType', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-black focus:border-transparent"
                            placeholder="File type (image, pdf, etc.)"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeReferenceFile(index)}
                        className="px-3 py-2 text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Creator Pricing Information */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Creator Pricing Information</h2>
              
              {loadingCreatorRate ? (
                <div className="border border-gray-200 rounded-lg p-8 bg-gray-50 max-w-2xl mx-auto">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <p className="ml-3 text-gray-600">Loading creator rates...</p>
                  </div>
                </div>
              ) : creatorRateAvailability ? (
                <div className="border border-gray-200 rounded-lg p-6 bg-blue-50 max-w-2xl mx-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Creator's Standard Rates</h3>
                    <div className="flex items-center">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        creatorRateAvailability.availabilityStatus === 'activez' 
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {creatorRateAvailability.availabilityStatus === 'activez' ? 'Available' : 'Limited'}
                      </div>
                      {creatorRateAvailability.workWithInternational && (
                        <div className="ml-2 px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                          International
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-700">Hourly Rate</p>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                            {creatorRateAvailability.pricingType === 'hourlyz' ? 'Primary' : 'Fixed'}
                          </span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 mt-1">
                          {formatPrice(creatorRateAvailability.hourlyRate)}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">Per hour</p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <p className="text-sm font-medium text-gray-700">Weekly Availability</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">
                          {creatorRateAvailability.weeklyAvailability}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">Hours per week</p>
                      </div>
                    </div>
                    
                    {/* Estimated Project Cost */}
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <p className="text-sm font-medium text-gray-700 mb-2">Estimated Project Cost</p>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">20-hour project:</span>
                          <span className="font-semibold text-gray-900">
                            {formatPrice(creatorRateAvailability.hourlyRate * 20)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">40-hour project:</span>
                          <span className="font-semibold text-gray-900">
                            {formatPrice(creatorRateAvailability.hourlyRate * 40)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">80-hour project:</span>
                          <span className="font-semibold text-gray-900">
                            {formatPrice(creatorRateAvailability.hourlyRate * 80)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-blue-100 border border-blue-200 rounded">
                      <div className="flex items-start">
                        <svg className="h-5 w-5 text-blue-600 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-blue-800">Note:</p>
                          <p className="text-sm text-blue-700 mt-1">
                            Creators will use these rates as a reference when reviewing your project. 
                            Final pricing may vary based on project complexity and requirements.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 max-w-2xl mx-auto">
                  <div className="text-center py-4">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="mt-3 text-gray-600">Creator pricing information not available</p>
                  </div>
                </div>
              )}
            </div>

            {/* Your Budget Information - SIMPLIFIED VERSION */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Budget Information</h2>
              
              {/* Client's Budget Card */}
              <div className="border border-gray-200 rounded-lg p-6 bg-green-50 max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Set Your Project Budget</h3>
                  <div className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    Required
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Project Budget (₹) *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">₹</span>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={formData.pricingBlock.clientAskedPrice}
                      onChange={(e) => handlePricingChange("clientAskedPrice", e.target.value)}
                      className="w-full pl-7 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white"
                      placeholder="Enter amount in Rupees"
                      required
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Enter the total budget you're willing to pay for this project in Indian Rupees (₹).
                  </p>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Notes (Optional)
                  </label>
                  <textarea
                    value={formData.pricingBlock.reason}
                    onChange={(e) => handlePricingChange("reason", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent min-h-[80px] bg-white"
                    placeholder="Any notes about your budget, payment terms, or flexibility..."
                  />
                </div>
                
                {/* Simple Budget Note */}
                {creatorRateAvailability && formData.pricingBlock.clientAskedPrice && (
                  <div className="border-t border-gray-200 pt-4">
                    <div className="p-3 bg-gray-50 rounded">
                      <div className="flex items-start">
                        <svg className="h-5 w-5 text-gray-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-gray-800">Budget Information</p>
                          <div className="mt-1 space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Your budget:</span>
                              <span className="font-medium text-gray-900">
                                {formatPrice(parseFloat(formData.pricingBlock.clientAskedPrice))}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Creator's hourly rate:</span>
                              <span className="font-medium text-gray-900">
                                {formatPrice(creatorRateAvailability.hourlyRate)}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                              Note: Consider the creator's hourly rate when setting your project budget.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit Project Request"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default withRoleProtection(CreateProjectRequestPage, ["client"]);