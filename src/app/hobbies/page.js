import Link from 'next/link';

export const metadata = {
  title: 'Hobbies | Zaid Madanat',
  description: 'Explore my hobbies, interests, and reviews outside of work',
};

// Example hobbies for initial UI
const hobbies = [
  {
    id: 1,
    name: 'Reading',
    description: 'I love reading books on technology, philosophy, and fiction. Reading helps me gain new perspectives and expand my knowledge.',
    rating: 4.5,
    recentItems: [
      { 
        name: 'Atomic Habits', 
        author: 'James Clear', 
        rating: 5,
        review: 'An excellent book on building good habits and breaking bad ones. The concept of 1% improvements daily resonated with me.',
        link: '/blog/atomic-habits-review'
      },
      { 
        name: 'The Almanack of Naval Ravikant', 
        author: 'Eric Jorgenson', 
        rating: 4.5,
        review: 'A collection of wisdom and insights from Naval Ravikant on wealth, happiness, and life.',
        link: null
      },
      { 
        name: 'Project Hail Mary', 
        author: 'Andy Weir', 
        rating: 4,
        review: 'A captivating sci-fi novel with a perfect blend of science and storytelling.',
        link: null
      }
    ]
  },
  {
    id: 2,
    name: 'Photography',
    description: 'I enjoy capturing moments through photography, especially landscapes and urban scenes. It helps me notice details I might otherwise miss.',
    rating: 4,
    recentItems: [
      { 
        name: 'City Nightscapes', 
        date: 'April 2023', 
        rating: 4.5,
        review: 'A series of night photography in downtown featuring light trails and building reflections.',
        link: '/blog/night-photography-tips'
      },
      { 
        name: 'Spring Hike Collection', 
        date: 'March 2023', 
        rating: 4,
        review: 'Photos from my recent hikes, showcasing the beauty of spring blooms and landscapes.',
        link: null
      }
    ]
  },
  {
    id: 3,
    name: 'Cooking',
    description: 'Cooking is both relaxing and rewarding. I enjoy experimenting with recipes from different cuisines and creating fusion dishes.',
    rating: 3.5,
    recentItems: [
      { 
        name: 'Homemade Pasta', 
        date: 'May 2023', 
        rating: 4,
        review: 'Made fresh pasta from scratch for the first time. The texture was amazing compared to store-bought.',
        link: '/blog/homemade-pasta-recipe'
      },
      { 
        name: 'Korean-Mexican Fusion Tacos', 
        date: 'April 2023', 
        rating: 5,
        review: 'Combined Korean bulgogi with Mexican taco elements. The flavors complemented each other perfectly.',
        link: null
      }
    ]
  }
];

// Star rating component
function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <svg key={`full-${i}`} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      
      {hasHalfStar && (
        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half-gradient">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path fill="url(#half-gradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
      
      {[...Array(emptyStars)].map((_, i) => (
        <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      
      <span className="ml-2 text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function HobbiesPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Hobbies & Interests</h1>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          Beyond work and coding, here are some activities I enjoy and my thoughts on recent books, movies, and more.
        </p>
        
        <div className="space-y-16">
          {hobbies.map(hobby => (
            <section key={hobby.id} className="bg-white rounded-xl shadow-md p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2 md:mb-0">{hobby.name}</h2>
                <StarRating rating={hobby.rating} />
              </div>
              
              <p className="text-gray-600 mb-8">{hobby.description}</p>
              
              <h3 className="text-xl font-semibold mb-6 border-b pb-2">Recent {hobby.name} Reviews</h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hobby.recentItems.map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                    <h4 className="font-bold text-lg mb-1">{item.name}</h4>
                    {item.author && <p className="text-gray-500 text-sm mb-3">by {item.author}</p>}
                    {item.date && <p className="text-gray-500 text-sm mb-3">{item.date}</p>}
                    
                    <StarRating rating={item.rating} />
                    
                    <p className="text-gray-600 mt-4 mb-4">{item.review}</p>
                    
                    {item.link && (
                      <Link 
                        href={item.link}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Read Full Review →
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
} 