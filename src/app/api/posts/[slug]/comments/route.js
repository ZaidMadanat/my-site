import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/posts/[slug]/comments - Get all comments for a post
export async function GET(request, { params }) {
  try {
    const { slug } = params;
    
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
    
    // Get all comments for this post
    const comments = await prisma.comment.findMany({
      where: { postId: post.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        content: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    
    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

// Rate limiter for comment creation to prevent spam
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_REQUESTS_PER_WINDOW = 20;
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

// POST /api/posts/[slug]/comments - Add a comment to a post
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
    
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.content) {
      return NextResponse.json(
        { error: 'Name and content are required' },
        { status: 400 }
      );
    }
    
    // Create the comment
    const comment = await prisma.comment.create({
      data: {
        content: data.content,
        name: data.name,
        email: data.email,
        postId: post.id,
      },
      select: {
        id: true,
        content: true,
        name: true,
        createdAt: true,
      },
    });
    
    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  }
} 