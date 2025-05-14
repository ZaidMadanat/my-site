'use client';

import { useState, useEffect } from 'react';

export default function LikeButton({ postSlug, initialCount = 0 }) {
  const [count, setCount] = useState(initialCount);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Check if the user has already liked the post (using localStorage)
  useEffect(() => {
    const hasLiked = localStorage.getItem(`liked_${postSlug}`);
    
    if (hasLiked === 'true') {
      setIsLiked(true);
    }
  }, [postSlug]);
  
  // Handle like/unlike
  const handleLike = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`/api/posts/${postSlug}/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to like post');
      }
      
      const data = await response.json();
      
      // Update state based on the response
      setIsLiked(data.liked);
      setCount(data.count);
      
      // Store the liked state in localStorage
      localStorage.setItem(`liked_${postSlug}`, data.liked.toString());
    } catch (err) {
      setError(err.message || 'Failed to process like. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col items-center">
      {error && (
        <div className="text-red-500 text-sm mb-2">{error}</div>
      )}
      
      <button 
        onClick={handleLike}
        disabled={isLoading}
        className={`flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        aria-label={isLiked ? 'Unlike this post' : 'Like this post'}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-6 w-6 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-400'}`} 
          viewBox="0 0 20 20" 
          fill={isLiked ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth={isLiked ? 0 : 1.5}
        >
          <path 
            fillRule="evenodd" 
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
            clipRule="evenodd" 
          />
        </svg>
        <span className="font-medium">{isLiked ? 'Liked' : 'Like this post'}</span>
        <span className="bg-gray-100 px-2 py-1 rounded-full text-sm">{count}</span>
      </button>
    </div>
  );
} 