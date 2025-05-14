"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function BlogContent({ posts, tags }) {
  const [activeTag, setActiveTag] = useState('All');
  const [filteredPosts, setFilteredPosts] = useState(posts);
  
  const handleTagFilter = (tag) => {
    setActiveTag(tag);
    
    if (tag === 'All') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post => 
        post.tags.includes(tag)
      );
      setFilteredPosts(filtered);
    }
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Blog</h1>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          My thoughts, ideas, and experiences on technology, programming, life, and more.
        </p>
        
        {/* Tags Filter */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Filter by Topic</h2>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => handleTagFilter('All')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeTag === 'All' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {tags.map(tag => (
              <button 
                key={tag}
                onClick={() => handleTagFilter(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeTag === tag 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        
        {/* Blog Post Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <article 
                key={post.id}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-transform hover:scale-105"
              >
                <div className="h-48 bg-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-500">Featured Image</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <span key={tag} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                    <span className="text-gray-400 text-sm ml-auto">{post.date}</span>
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-gray-800">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Read More →
                    </Link>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center text-gray-600 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        {post.likes}
                      </span>
                      <span className="flex items-center text-gray-600 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                        </svg>
                        {post.comments}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-3 text-center py-8">
              <p className="text-gray-500 text-lg">No posts found for this tag.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 