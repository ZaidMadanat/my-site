import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import CommentSection from '@/components/CommentSection';
import LikeButton from '@/components/LikeButton';

// Generate metadata for the blog post
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
  
  return {
    title: `${post.title} | Zaid Madanat's Blog`,
    description: post.excerpt || `Read ${post.title} on Zaid Madanat's blog.`,
  };
}

// Fetch the post data
async function getPost(slug) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: {
        slug,
        published: true,
      },
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
    
    return post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

// Format the date
function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export default async function BlogPostPage({ params }) {
  const post = await getPost(params.slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back to Blog */}
          <div className="mb-8">
            <Link 
              href="/blog"
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Blog
            </Link>
          </div>
          
          {/* Post Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">{post.title}</h1>
            
            <div className="flex flex-wrap items-center text-gray-600 mb-6">
              <span className="mr-4">
                {post.author?.name || 'Zaid Madanat'}
              </span>
              <span className="mr-4">
                {formatDate(post.createdAt)}
              </span>
              <div className="flex items-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                {post._count.likes} likes
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                {post._count.comments} comments
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map(tag => (
                <Link 
                  key={tag.id}
                  href={`/blog?tag=${tag.name}`}
                  className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded hover:bg-blue-200 transition-colors"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          </header>
          
          {/* Post Content */}
          <div className="prose prose-lg max-w-none mb-16">
            {/* This is where the blog content would be rendered */}
            {/* In a real app, you might use a markdown renderer or rich text editor */}
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          
          {/* Like Button */}
          <div className="mb-16 flex justify-center">
            <LikeButton postSlug={post.slug} initialCount={post._count.likes} />
          </div>
          
          {/* Comments Section */}
          <div className="border-t pt-12">
            <h2 className="text-2xl font-bold mb-8">Comments ({post._count.comments})</h2>
            <CommentSection postSlug={post.slug} />
          </div>
        </div>
      </div>
    </div>
  );
} 