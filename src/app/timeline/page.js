import Link from 'next/link';

export const metadata = {
  title: 'Timeline | Zaid Madanat',
  description: 'Follow my journey and special moments day-to-day',
};

// Example timeline events for initial UI
const timelineEvents = [
  {
    id: 1,
    title: 'Launched My Personal Website',
    description: 'Finally launched my personal website after weeks of development. Built with Next.js and Tailwind CSS.',
    date: 'May 12, 2023',
    type: 'Project',
    link: '/blog/launching-my-website'
  },
  {
    id: 2,
    title: 'Started Learning Machine Learning',
    description: 'Began a comprehensive machine learning course on Coursera. Excited to apply this knowledge to future projects.',
    date: 'April 28, 2023',
    type: 'Learning',
    link: null
  },
  {
    id: 3,
    title: 'Attended Tech Conference',
    description: 'Attended the annual tech conference in San Francisco. Met incredible people and learned about cutting-edge technologies.',
    date: 'March 15, 2023',
    type: 'Event',
    link: '/blog/tech-conference-learnings'
  },
  {
    id: 4,
    title: 'First Contribution to Open Source',
    description: 'Made my first contribution to an open-source project on GitHub. Fixed a bug in a popular JavaScript library.',
    date: 'February 10, 2023',
    type: 'Project',
    link: 'https://github.com/example/repository/pull/123'
  },
  {
    id: 5,
    title: 'Finished Reading "Atomic Habits"',
    description: 'Completed reading "Atomic Habits" by James Clear. Implementing the 1% better every day philosophy.',
    date: 'January 25, 2023',
    type: 'Personal',
    link: '/blog/atomic-habits-review'
  }
];

// Define colors for different event types
const typeColors = {
  Project: 'bg-blue-500',
  Learning: 'bg-green-500',
  Event: 'bg-purple-500',
  Personal: 'bg-yellow-500'
};

export default function TimelinePage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Timeline</h1>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          A chronological journey of my special moments, achievements, and day-to-day activities.
        </p>
        
        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200"></div>
          
          {timelineEvents.map((event, index) => (
            <div 
              key={event.id} 
              className={`relative z-10 mb-12 ${index % 2 === 0 ? 'left-timeline' : 'right-timeline'}`}
            >
              <div className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div 
                    className={`p-6 bg-white rounded-lg shadow-md border border-gray-100 ${
                      index % 2 === 0 ? 'ml-auto' : 'mr-auto'
                    }`}
                  >
                    <span className={`inline-block px-3 py-1 text-xs text-white rounded-full mb-2 ${typeColors[event.type] || 'bg-gray-500'}`}>
                      {event.type}
                    </span>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <div className="flex items-center text-sm text-gray-500 justify-end">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {event.date}
                    </div>
                    {event.link && (
                      <div className="mt-4">
                        {event.link.startsWith('http') ? (
                          <a 
                            href={event.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Learn More →
                          </a>
                        ) : (
                          <Link 
                            href={event.link}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Learn More →
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Center Point */}
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className={`w-8 h-8 rounded-full border-4 border-white ${typeColors[event.type] || 'bg-gray-500'}`}></div>
                </div>
                
                {/* Empty Space */}
                <div className="w-5/12"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 