// import { NextRequest, NextResponse } from 'next/server';
// import dbConnect from '@/lib/mongodb';
// import {User} from '@/backend/models/User';
// import {CreatorSkillsAndExpertise} from '@/backend/models/CreatorSkillsAndExpertise';

// export async function GET(request:NextRequest) {
//   try {
//     await dbConnect();
    
//     const { searchParams } = new URL(request.url);
//     const searchQuery = searchParams.get('q') || '';
//     const skillsParam = searchParams.get('skills');
//     const categoryParam = searchParams.get('category');
//     const limitParam = searchParams.get('limit');
//     const pageParam = searchParams.get('page');
    
//     const limit = limitParam ? parseInt(limitParam) : 12;
//     const page = pageParam ? parseInt(pageParam) : 1;
//     const skip = (page - 1) * limit;
    
//     // Build base filter for creators
//     let filter = { role: 'creator' };
    
//     // Get all creator IDs with their skills for filtering
//     let creatorIdsWithSkills = [];
    
//     if (searchQuery || skillsParam) {
//       // If search query or skills filter is provided, fetch skills data
//       const skillsFilter = {};
      
//       if (skillsParam) {
//         const skillsArray = skillsParam.split(',').map(skill => skill.trim());
//         skillsFilter.skills = {
//           $elemMatch: {
//             name: { $in: skillsArray.map(skill => new RegExp(skill, 'i')) }
//           }
//         };
//       }
      
//       if (searchQuery) {
//         // Search in skills name or category
//         skillsFilter.$or = [
//           { 'skills.name': { $regex: searchQuery, $options: 'i' } },
//           { 'skills.category': { $regex: searchQuery, $options: 'i' } },
//           { categories: { $regex: searchQuery, $options: 'i' } }
//         ];
//       }
      
//       const skillsData = await CreatorSkillsAndExpertise.find(skillsFilter)
//         .select('userId')
//         .lean();
      
//       creatorIdsWithSkills = skillsData.map(doc => doc.userId);
//     }
    
//     // Build user search filter
//     const userSearchFilter = [];
    
//     if (searchQuery) {
//       userSearchFilter.push(
//         { name: { $regex: searchQuery, $options: 'i' } },
//         { firstName: { $regex: searchQuery, $options: 'i' } },
//         { lastName: { $regex: searchQuery, $options: 'i' } },
//         { email: { $regex: searchQuery, $options: 'i' } }
//       );
//     }
    
//     // If we have creator IDs from skills search, add them to filter
//     if (creatorIdsWithSkills.length > 0) {
//       if (searchQuery) {
//         // If also searching in user fields, combine with OR
//         userSearchFilter.push({ _id: { $in: creatorIdsWithSkills } });
//         filter.$or = userSearchFilter;
//       } else {
//         // If only skills filter, use the creator IDs
//         filter._id = { $in: creatorIdsWithSkills };
//       }
//     } else if (searchQuery && userSearchFilter.length > 0) {
//       filter.$or = userSearchFilter;
//     }
    
//     // Apply category filter if provided
//     if (categoryParam) {
//       // This would require joining with skills data or having category in User model
//       // For now, we'll handle it through skills aggregation
//       const categorySkillsData = await CreatorSkillsAndExpertise.find({
//         categories: { $regex: categoryParam, $options: 'i' }
//       }).select('userId').lean();
      
//       const categoryCreatorIds = categorySkillsData.map(doc => doc.userId);
      
//       if (filter.$or) {
//         // Add to existing OR conditions
//         filter.$or.push({ _id: { $in: categoryCreatorIds } });
//       } else if (filter._id) {
//         // Combine with existing creator IDs
//         const existingIds = filter._id.$in || [];
//         filter._id.$in = [...new Set([...existingIds, ...categoryCreatorIds])];
//       } else {
//         filter._id = { $in: categoryCreatorIds };
//       }
//     }
    
//     // Count total creators with filters
//     const totalCreators = await User.countDocuments(filter);
    
//     // Get creator details with pagination
//     const creators = await User.find(filter)
//       .select('name firstName lastName email image createdAt emailVerified')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .lean();
    
//     // Fetch skills for each creator
//     const creatorsWithSkills = await Promise.all(
//       creators.map(async (creator) => {
//         const skillsData = await CreatorSkillsAndExpertise.findOne({
//           userId: creator._id
//         }).lean();
        
//         return {
//           ...creator,
//           skills: skillsData?.skills || [],
//           categories: skillsData?.categories || [],
//           isVerified: !!creator.emailVerified
//         };
//       })
//     );
    
//     // Get available skills and categories for filters
//     const allSkills = await CreatorSkillsAndExpertise.aggregate([
//       { $unwind: '$skills' },
//       { $group: { 
//         _id: '$skills.name',
//         category: { $first: '$skills.category' },
//         count: { $sum: 1 }
//       }},
//       { $sort: { count: -1 } },
//       { $limit: 20 }
//     ]);
    
//     const allCategories = await CreatorSkillsAndExpertise.aggregate([
//       { $unwind: '$categories' },
//       { $group: { 
//         _id: '$categories',
//         count: { $sum: 1 }
//       }},
//       { $sort: { count: -1 } },
//       { $limit: 10 }
//     ]);
    
//     return NextResponse.json({
//       success: true,
//       data: {
//         creators: creatorsWithSkills,
//         filters: {
//           skills: allSkills.map(skill => ({
//             name: skill._id,
//             category: skill.category,
//             count: skill.count
//           })),
//           categories: allCategories.map(cat => ({
//             name: cat._id,
//             count: cat.count
//           }))
//         },
//         pagination: {
//           currentPage: page,
//           totalPages: Math.ceil(totalCreators / limit),
//           limit,
//           total: totalCreators,
//           hasNextPage: page < Math.ceil(totalCreators / limit),
//           hasPrevPage: page > 1
//         },
//         searchQuery,
//         resultsCount: creatorsWithSkills.length,
//         totalResults: totalCreators
//       }
//     });
    
//   } catch (error) {
//     console.error('Error searching creators:', error);
//     return NextResponse.json(
//       { 
//         success: false, 
//         message: 'Failed to search creators',
//         error: process.env.NODE_ENV === 'development' ? error.message : undefined
//       },
//       { status: 500 }
//     );
//   }
// }   

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import {User} from '@/backend/models/User';
import {CreatorSkillsAndExpertise} from '@/backend/models/CreatorSkillsAndExpertise';

export async function GET(request:NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get('q') || '';
    const skillsParam = searchParams.get('skills');
    const categoryParam = searchParams.get('category');
    const limitParam = searchParams.get('limit');
    const pageParam = searchParams.get('page');
    
    const limit = limitParam ? parseInt(limitParam) : 12;
    const page = pageParam ? parseInt(pageParam) : 1;
    const skip = (page - 1) * limit;
    
    // Build base filter for creators
    let filter: any = { role: 'creator' };
    
    // Get all creator IDs with their skills for filtering
    let creatorIdsWithSkills: string[] = [];
    
    if (searchQuery || skillsParam) {
      // If search query or skills filter is provided, fetch skills data
      const skillsFilter: any = {};
      
      if (skillsParam) {
        const skillsArray = skillsParam.split(',').map(skill => skill.trim());
        skillsFilter.skills = {
          $elemMatch: {
            name: { $in: skillsArray.map(skill => new RegExp(skill, 'i')) }
          }
        };
      }
      
      if (searchQuery) {
        // Search in skills name or category
        skillsFilter.$or = [
          { 'skills.name': { $regex: searchQuery, $options: 'i' } },
          { 'skills.category': { $regex: searchQuery, $options: 'i' } },
          { categories: { $regex: searchQuery, $options: 'i' } }
        ];
      }
      
      const skillsData = await CreatorSkillsAndExpertise.find(skillsFilter)
        .select('userId')
        .lean();
      
      creatorIdsWithSkills = skillsData.map(doc => doc.userId.toString());
    }
    
    // Build user search filter
    const userSearchFilter: any[] = [];
    
    if (searchQuery) {
      userSearchFilter.push(
        { name: { $regex: searchQuery, $options: 'i' } },
        { firstName: { $regex: searchQuery, $options: 'i' } },
        { lastName: { $regex: searchQuery, $options: 'i' } },
        { email: { $regex: searchQuery, $options: 'i' } }
      );
    }
    
    // If we have creator IDs from skills search, add them to filter
    if (creatorIdsWithSkills.length > 0) {
      if (searchQuery) {
        // If also searching in user fields, combine with OR
        userSearchFilter.push({ _id: { $in: creatorIdsWithSkills } });
        filter.$or = userSearchFilter;
      } else {
        // If only skills filter, use the creator IDs
        filter._id = { $in: creatorIdsWithSkills };
      }
    } else if (searchQuery && userSearchFilter.length > 0) {
      filter.$or = userSearchFilter;
    }
    
    // Apply category filter if provided
    if (categoryParam) {
      // This would require joining with skills data or having category in User model
      // For now, we'll handle it through skills aggregation
      const categorySkillsData = await CreatorSkillsAndExpertise.find({
        categories: { $regex: categoryParam, $options: 'i' }
      }).select('userId').lean();
      
      const categoryCreatorIds = categorySkillsData.map(doc => doc.userId.toString());
      
      if (filter.$or) {
        // Add to existing OR conditions
        filter.$or.push({ _id: { $in: categoryCreatorIds } });
      } else if (filter._id) {
        // Combine with existing creator IDs
        const existingIds = filter._id.$in || [];
        filter._id.$in = [...new Set([...existingIds, ...categoryCreatorIds])];
      } else {
        filter._id = { $in: categoryCreatorIds };
      }
    }
    
    // Count total creators with filters
    const totalCreators = await User.countDocuments(filter);
    
    // Get creator details with pagination
    const creators = await User.find(filter)
      .select('name firstName lastName email image createdAt emailVerified')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    // Fetch skills for each creator
    const creatorsWithSkills = await Promise.all(
      creators.map(async (creator) => {
        const skillsData = await CreatorSkillsAndExpertise.findOne({
          userId: creator._id
        }).lean();
        
        return {
          ...creator,
          _id: creator._id.toString(),
          skills: skillsData?.skills || [],
          categories: skillsData?.categories || [],
          isVerified: !!creator.emailVerified
        };
      })
    );
    
    // Get available skills and categories for filters
    const allSkills = await CreatorSkillsAndExpertise.aggregate([
      { $unwind: '$skills' },
      { $group: { 
        _id: '$skills.name',
        category: { $first: '$skills.category' },
        count: { $sum: 1 }
      }},
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);
    
    const allCategories = await CreatorSkillsAndExpertise.aggregate([
      { $unwind: '$categories' },
      { $group: { 
        _id: '$categories',
        count: { $sum: 1 }
      }},
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    
    return NextResponse.json({
      success: true,
      data: {
        creators: creatorsWithSkills,
        filters: {
          skills: allSkills.map((skill: any) => ({
            name: skill._id,
            category: skill.category,
            count: skill.count
          })),
          categories: allCategories.map((cat: any) => ({
            name: cat._id,
            count: cat.count
          }))
        },
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalCreators / limit),
          limit,
          total: totalCreators,
          hasNextPage: page < Math.ceil(totalCreators / limit),
          hasPrevPage: page > 1
        },
        searchQuery,
        resultsCount: creatorsWithSkills.length,
        totalResults: totalCreators
      }
    });
    
  } catch (error: any) {
    console.error('Error searching creators:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to search creators',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}