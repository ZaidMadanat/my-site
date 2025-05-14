import Link from 'next/link';
import BlogContent from './BlogContent';

export const metadata = {
  title: 'Blog | Zaid Madanat',
  description: 'Read my latest thoughts on technology, programming, AI, and more',
};

// Example blog posts for initial UI
const dummyPosts = [
  {
    id: 1,
    title: 'Getting Started with Next.js',
    excerpt: 'Learn how to build modern web applications with Next.js, the React framework for production.',
    date: 'May 15, 2023',
    tags: ['Programming', 'React', 'Next.js'],
    slug: 'getting-started-with-nextjs',
    likes: 24,
    comments: 5
  },
  {
    id: 2,
    title: 'The Future of AI in Web Development',
    excerpt: 'Exploring how artificial intelligence is changing the landscape of web development and design.',
    date: 'June 3, 2023',
    tags: ['AI', 'Programming', 'Technology'],
    slug: 'future-of-ai-in-web-development',
    likes: 42,
    comments: 8
  },
  {
    id: 3,
    title: 'My Journey Learning to Play Piano',
    excerpt: "Sharing my experience learning to play piano as an adult and the lessons I've learned along the way.",
    date: 'July 12, 2023',
    tags: ['Hobby', 'Music', 'Life'],
    slug: 'learning-piano-as-adult',
    likes: 18,
    comments: 3
  },
  {
    id: 4,
    title: 'Building a Personal Brand in Tech',
    excerpt: 'Tips and strategies for building your personal brand in the tech industry.',
    date: 'August 27, 2023',
    tags: ['Career', 'Technology'],
    slug: 'building-personal-brand-tech',
    likes: 35,
    comments: 12
  }
];

// Extract all unique tags
const allTags = [...new Set(dummyPosts.flatMap(post => post.tags))];

export default function BlogPage() {
  return (
    <BlogContent posts={dummyPosts} tags={allTags} />
  );
} 