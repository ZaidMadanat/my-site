import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/posts - Get all published blog posts
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')) : undefined;
    
    // Query to fetch posts with filtering options
    const whereClause = {
      published: true,
      ...(tag && {
        tags: {
          some: {
            name: tag,
          },
        },
      }),
    };
    
    const posts = await prisma.blogPost.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      include: {
        tags: true,
        author: {
          select: {
            name: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });
    
    // Get all available tags
    const tags = await prisma.tag.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    
    return NextResponse.json({ posts, tags });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// Rate limiter for post creation to prevent spam
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_REQUESTS_PER_WINDOW = 10;
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

// POST /api/posts - Create a new blog post (protected)
export async function POST(request) {
  try {
    // In a real application, you would authenticate the user here
    // For now, we'll use a placeholder user
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    // Check rate limiting
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }
    
    const data = await request.json();
    
    // Validate required fields
    if (!data.title || !data.content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }
    
    // Generate a slug from the title
    const slug = data.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-') + '-' + Date.now().toString().slice(-4);
    
    // Get or create tags
    const tagObjects = [];
    if (data.tags && Array.isArray(data.tags)) {
      for (const tagName of data.tags) {
        const tag = await prisma.tag.upsert({
          where: { name: tagName },
          update: {},
          create: { name: tagName },
        });
        tagObjects.push({ id: tag.id });
      }
    }
    
    // Create the post
    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        content: data.content,
        excerpt: data.excerpt || data.content.substring(0, 150) + '...',
        slug,
        published: data.published ?? false,
        authorId: data.authorId || 'placeholder-user-id', // Replace with actual user ID in production
        tags: {
          connect: tagObjects,
        },
      },
      include: {
        tags: true,
      },
    });
    
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
} 