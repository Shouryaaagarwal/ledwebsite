// import { NextRequest, NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// import { ProjectRequest } from '@/backend/models/ProjectRequest';
// import dbConnect from '@/lib/mongodb';

// // POST - Create a new project request
// export async function POST(request: NextRequest) {
//   try {
//     await dbConnect();
    
//     const session = await getServerSession(authOptions);

//     console.log("Session in API:", session);

//     if (!session?.user?.id) {
//       return NextResponse.json({ error: 'Unauthorized: No session found' }, { status: 401 });
//     }

//     // Check if user is a client
//     // if (session.user.role !== 'client') {
//     //   return NextResponse.json({ 
//     //     error: 'Forbidden: Only clients can create project requests' 
//     //   }, { status: 403 });
//     // }

//     const body = await request.json();
    
//     // Log the incoming data for debugging
//     console.log('Incoming project request data:', {
//       userId: session.user.id,
//       userRole: session.user.role,
//       body: body
//     });
  
//     // Validate required fields
//     const requiredFields = [
//       { field: 'projectTitle', message: 'Project title is required' },
//       { field: 'projectType', message: 'Project type is required' },
//       { field: 'projectDescription', message: 'Project description is required' },
//       { field: 'deadline', message: 'Deadline is required' },
//       { field: 'creatorId', message: 'Creator ID is required' },
//     ];

//     for (const { field, message } of requiredFields) {
//       if (!body[field]?.toString()?.trim()) {
//         console.log(`Missing field: ${field}`);
//         return NextResponse.json({ error: message }, { status: 400 });
//       }
//     }

//     // Validate pricing block
//     if (!body.pricingBlock?.clientAskedPrice || parseFloat(body.pricingBlock.clientAskedPrice) <= 0) {
//       return NextResponse.json(
//         { error: 'Valid client asked price is required' },
//         { status: 400 }
//       );
//     }

//     // Check if creatorId is valid ObjectId
//     const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(body.creatorId);
//     if (!isValidObjectId) {
//       return NextResponse.json(
//         { error: 'Invalid Creator ID format' },
//         { status: 400 }
//       );
//     }

//     // Sanitize and create project request
//     const projectRequestData = {
//       creatorId: body.creatorId, // Creator who will receive the request
//       clientId: session.user.id, // Client who is creating the request
//       projectTitle: body.projectTitle.toString().trim(),
//       projectType: body.projectType.toString().trim(),
//       projectDescription: body.projectDescription.toString().trim(),
//       deadline: new Date(body.deadline),
//       referenceFiles: Array.isArray(body.referenceFiles) ? body.referenceFiles.map((file: any) => ({
//         url: file.url?.toString().trim() || '',
//         name: file.name?.toString().trim() || 'Unnamed File',
//         fileType: file.fileType?.toString().trim() || 'other',
//         size: file.size || 0
//       })) : [],
//       pricingBlock: {
//         clientAskedPrice: parseFloat(body.pricingBlock.clientAskedPrice),
//         yourPrice: body.pricingBlock.yourPrice ? 
//           parseFloat(body.pricingBlock.yourPrice) : 
//           parseFloat(body.pricingBlock.clientAskedPrice),
//         reason: body.pricingBlock.reason?.toString().trim() || undefined,
//         accepted: false,
//         status: 'pending' as const
//       },
//       status: 'pending' as const,
//       isActive: true
//     };

//     console.log('Creating project request with data:', projectRequestData);

//     // Create and save the project request
//     const projectRequest = new ProjectRequest(projectRequestData);
//     await projectRequest.save();

//     return NextResponse.json({
//       success: true,
//       message: 'Project request created successfully',
//       projectRequest: {
//         id: projectRequest._id.toString(),
//         projectTitle: projectRequest.projectTitle,
//         projectType: projectRequest.projectType,
//         status: projectRequest.status,
//         createdAt: projectRequest.createdAt,
//         deadline: projectRequest.deadline
//       }
//     }, { status: 201 });

//   } catch (error: any) {
//     console.error('Error creating project request:', error);
    
//     // More specific error messages
//     if (error.name === 'ValidationError') {
//       const validationErrors = Object.values(error.errors).map((err: any) => err.message);
//       return NextResponse.json(
//         { 
//           error: 'Validation error',
//           details: validationErrors.join(', ')
//         },
//         { status: 400 }
//       );
//     }
    
//     if (error.code === 11000) {
//       return NextResponse.json(
//         { 
//           error: 'Duplicate entry',
//           details: 'A similar project request already exists'
//         },
//         { status: 400 }
//       );
//     }
    
//     return NextResponse.json(
//       { 
//         error: 'Failed to create project request',
//         details: error.message || 'Internal server error'
//       },
//       { status: 500 }
//     );
//   }
// }

// // GET - Get project requests for client
// export async function GET(request: NextRequest) {
//   try {
//     await dbConnect();
    
//     const session = await getServerSession(authOptions);

//     if (!session?.user?.id) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     if (session.user.role !== 'client') {
//       return NextResponse.json({ error: 'Forbidden - Clients only' }, { status: 403 });
//     }

//     // Optional query parameters
//     const { searchParams } = new URL(request.url);
//     const status = searchParams.get('status');
//     const limit = parseInt(searchParams.get('limit') || '10');
//     const page = parseInt(searchParams.get('page') || '1');
//     const skip = (page - 1) * limit;

//     // Build query
//     const query: any = { clientId: session.user.id };
    
//     if (status) {
//       const validStatuses = ['pending', 'under_review', 'accepted', 'rejected', 'completed'];
//       if (validStatuses.includes(status)) {
//         query.status = status;
//       }
//     }

//     const projectRequests = await ProjectRequest.find(query)
//       .populate('creatorId', 'name email') // Populate creator details
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     const totalCount = await ProjectRequest.countDocuments(query);

//     return NextResponse.json({
//       success: true,
//       projectRequests,
//       pagination: {
//         total: totalCount,
//         page,
//         limit,
//         totalPages: Math.ceil(totalCount / limit)
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching project requests:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }  



import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { ProjectRequest } from '@/backend/models/ProjectRequest';
import dbConnect from '@/lib/mongodb';

// POST - Create a new project request
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const session = await getServerSession(authOptions);

    console.log("Session in API:", session);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized: No session found' }, { status: 401 });
    }

    const body = await request.json();
    
    // Log the incoming data for debugging
    console.log('Incoming project request data:', {
      userId: session.user.id,
      userRole: session.user.role,
      body: body
    });
    
    // Validate required fields
    const requiredFields = [
      { field: 'projectTitle', message: 'Project title is required' },
      { field: 'projectType', message: 'Project type is required' },
      { field: 'projectDescription', message: 'Project description is required' },
      { field: 'deadline', message: 'Deadline is required' },
      { field: 'creatorId', message: 'Creator ID is required' },
    ];

    for (const { field, message } of requiredFields) {
      if (!body[field]?.toString()?.trim()) {
        console.log(`Missing field: ${field}`);
        return NextResponse.json({ error: message }, { status: 400 });
      }
    }

    // Validate pricing block
    if (!body.pricingBlock?.clientAskedPrice || parseFloat(body.pricingBlock.clientAskedPrice) <= 0) {
      return NextResponse.json(
        { error: 'Valid client asked price is required' },
        { status: 400 }
      );
    }

    // Check if creatorId is valid ObjectId
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(body.creatorId);
    if (!isValidObjectId) {
      return NextResponse.json(
        { error: 'Invalid Creator ID format' },
        { status: 400 }
      );
    }

    // Sanitize and create project request
    const projectRequestData = {
      creatorId: body.creatorId, // Creator who will receive the request
      clientId: session.user.id, // Client who is creating the request
      projectTitle: body.projectTitle.toString().trim(),
      projectType: body.projectType.toString().trim(),
      projectDescription: body.projectDescription.toString().trim(),
      deadline: new Date(body.deadline),
      referenceFiles: Array.isArray(body.referenceFiles) ? body.referenceFiles.map((file: any) => ({
        url: file.url?.toString().trim() || '',
        name: file.name?.toString().trim() || 'Unnamed File',
        fileType: file.fileType?.toString().trim() || 'other',
        size: file.size || 0
      })) : [],
      pricingBlock: {
        clientAskedPrice: parseFloat(body.pricingBlock.clientAskedPrice),
        yourPrice: body.pricingBlock.yourPrice ? 
          parseFloat(body.pricingBlock.yourPrice) : 
          parseFloat(body.pricingBlock.clientAskedPrice),
        reason: body.pricingBlock.reason?.toString().trim() || undefined,
        accepted: false,
        status: 'pending' as const
      },
      status: 'pending' as const,
      isActive: true
    };

    console.log('Creating project request with data:', projectRequestData);

    // Create and save the project request
    const projectRequest = new ProjectRequest(projectRequestData);
    await projectRequest.save();

    return NextResponse.json({
      success: true,
      message: 'Project request created successfully',
      projectRequest: {
        id: projectRequest._id.toString(),
        projectTitle: projectRequest.projectTitle,
        projectType: projectRequest.projectType,
        status: projectRequest.status,
        createdAt: projectRequest.createdAt,
        deadline: projectRequest.deadline
      }
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating project request:', error);
    
    // More specific error messages
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { 
          error: 'Validation error',
          details: validationErrors.join(', ')
        },
        { status: 400 }
      );
    }
    
    if (error.code === 11000) {
      return NextResponse.json(
        { 
          error: 'Duplicate entry',
          details: 'A similar project request already exists'
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to create project request',
        details: error.message || 'Internal server error'
      },
      { status: 500 }
    );
  }
}

// GET - Get all project requests for client
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Optional query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    // Build query
    const query: any = { $or: [{ clientId: session.user.id }, { creatorId: session.user.id }] };
    
    if (status) {
      const validStatuses = ['pending', 'under_review', 'accepted', 'rejected', 'completed'];
      if (validStatuses.includes(status)) {
        query.status = status;
      }
    }

    const projectRequests = await ProjectRequest.find(query)
      .populate('creatorId', 'name email')
      .populate('clientId', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalCount = await ProjectRequest.countDocuments(query);

    return NextResponse.json({
      success: true,
      projectRequests,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching project requests:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}