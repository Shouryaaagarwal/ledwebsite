import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import {User} from '@/backend/models/User';

export async function GET(request:NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') ?? '10');
const page = parseInt(searchParams.get('page') ?? '1');
    const skip = (page - 1) * limit;
    
    // Get only creators
    const filter = { role: 'creator' };
    
    // Count total creators
    const totalCreators = await User.countDocuments(filter);
    
    // Count recent creators (last 30 days)
    const monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);
    const recentCreators = await User.countDocuments({ 
      ...filter,
      createdAt: { $gte: monthAgo } 
    });
    
    // Get creator details
    const creators = await User.find(filter)
      .select('name firstName lastName email image createdAt')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    return NextResponse.json({
      success: true,
      data: {
        totalCreators,
        recentCreators,
        creators,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalCreators / limit),
          limit,
          total: totalCreators
        }
      }
    });
    
  } catch (error) {
    console.error('Error fetching creators:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch creators'
      },
      { status: 500 }
    );
  }
}