import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/posts/[slug]/likes - Get like count for a post
export async function GET(request, { params }) {
  try {
    const { slug } = params;
    
    // Find the post by slug
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      select: {
        id: true,
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ count: post._count.likes });
  } catch (error) {
    console.error('Error fetching likes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch likes' },
      { status: 500 }
    );
  }
}

// Rate limiter for likes to prevent spam
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_REQUESTS_PER_WINDOW = 50;
const ipRequestCounts = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const requestHistory = ipRequestCounts.get(ip) || [];
  
  // Filter out requests older than the window
  const recentRequests = requestHistory.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW);
  
  // Update the request history for this IP
  ipRequestCounts.set(ip, [...recentRequests, now]);
  
  return recentRequests.length >= MAX_REQUESTS_PER_WINDOW;
}

// POST /api/posts/[slug]/likes - Like a post
export async function POST(request, { params }) {
  try {
    const { slug } = params;
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    // Check rate limiting
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }
    
    // Find the post by slug
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      select: { id: true },
    });
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }
    
    // Create a unique identifier for the user (in a real app, you'd use the user ID)
    // For anonymous users, we can use a combination of IP and post ID
    const anonymousId = `anonymous-${ip}-${post.id}`;
    
    // Check if this user has already liked the post
    const existingLike = await prisma.like.findFirst({
      where: {
        postId: post.id,
        userId: null,
        id: { startsWith: anonymousId },
      },
    });
    
    if (existingLike) {
      // User has already liked the post, so we'll remove the like (toggle)
      await prisma.like.delete({
        where: { id: existingLike.id },
      });
      
      // Get updated count
      const updatedPost = await prisma.blogPost.findUnique({
        where: { id: post.id },
        select: {
          _count: {
            select: {
              likes: true,
            },
          },
        },
      });
      
      return NextResponse.json({ 
        liked: false, 
        count: updatedPost._count.likes 
      });
    } else {
      // User hasn't liked the post yet, so add a like
      await prisma.like.create({
        data: {
          id: `${anonymousId}-${Date.now()}`,
          postId: post.id,
        },
      });
      
      // Get updated count
      const updatedPost = await prisma.blogPost.findUnique({
        where: { id: post.id },
        select: {
          _count: {
            select: {
              likes: true,
            },
          },
        },
      });
      
      return NextResponse.json({ 
        liked: true, 
        count: updatedPost._count.likes 
      });
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    return NextResponse.json(
      { error: 'Failed to toggle like' },
      { status: 500 }
    );
  }
} 