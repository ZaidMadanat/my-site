import Link from 'next/link';

export const metadata = {
  title: 'Projects | Zaid Madanat',
  description: 'Explore my portfolio of projects in web development, AI, and more',
};

// Example projects for initial UI
const dummyProjects = [
  {
    id: 1,
    title: 'Personal Website',
    description: 'My personal website and blog built with Next.js, Tailwind CSS, and ShadCN UI. Features a blog with commenting functionality, project showcase, and more.',
    technologies: ['Next.js', 'Tailwind CSS', 'PostgreSQL', 'Prisma'],
    image: '/placeholder.jpg',
    demoUrl: 'https://zaidmadanat.com',
    sourceUrl: 'https://github.com/yourusername/personal-website',
    featured: true,
    slug: 'personal-website'
  },
  {
    id: 2,
    title: 'AI Text Summarizer',
    description: 'A web application that uses AI to summarize long articles and documents, helping users save time and extract key information quickly.',
    technologies: ['React', 'Node.js', 'OpenAI API', 'Express'],
    image: '/placeholder.jpg',
    demoUrl: 'https://demo-url.com',
    sourceUrl: 'https://github.com/yourusername/ai-summarizer',
    featured: true,
    slug: 'ai-summarizer'
  },
  {
    id: 3,
    title: 'E-commerce Platform',
    description: 'A fully-featured e-commerce platform with user authentication, product catalog, shopping cart, and payment processing.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
    image: '/placeholder.jpg',
    demoUrl: 'https://demo-url.com',
    sourceUrl: 'https://github.com/yourusername/ecommerce-platform',
    featured: false,
    slug: 'ecommerce-platform'
  },
  {
    id: 4,
    title: 'Weather Dashboard',
    description: 'A weather dashboard that shows current conditions and forecasts for any location. Features include interactive maps and historical data.',
    technologies: ['JavaScript', 'OpenWeatherMap API', 'Chart.js'],
    image: '/placeholder.jpg',
    demoUrl: 'https://demo-url.com',
    sourceUrl: 'https://github.com/yourusername/weather-dashboard',
    featured: false,
    slug: 'weather-dashboard'
  }
];

export default function ProjectsPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Projects</h1>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          A showcase of my work and personal projects. Each project represents different challenges and learning experiences.
        </p>
        
        {/* Featured Projects */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 border-b pb-2">Featured Projects</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {dummyProjects.filter(project => project.featured).map(project => (
              <div 
                key={project.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full border border-gray-100"
              >
                <div className="h-64 bg-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-500">Project Image</span>
                  </div>
                </div>
                <div className="p-6 flex-grow">
                  <h3 className="font-bold text-2xl mb-2 text-gray-800">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map(tech => (
                      <span 
                        key={tech} 
                        className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6 pt-0 mt-auto">
                  <div className="flex gap-4">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-600 text-white rounded font-medium text-sm hover:bg-blue-700 transition-colors"
                      >
                        Live Demo
                      </a>
                    )}
                    {project.sourceUrl && (
                      <a
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded font-medium text-sm hover:bg-gray-50 transition-colors"
                      >
                        Source Code
                      </a>
                    )}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="px-4 py-2 border border-blue-600 text-blue-600 rounded font-medium text-sm hover:bg-blue-50 transition-colors ml-auto"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* All Projects */}
        <div>
          <h2 className="text-2xl font-bold mb-8 border-b pb-2">All Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dummyProjects.map(project => (
              <div 
                key={project.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-500">Project Image</span>
                  </div>
                </div>
                <div className="p-5 flex-grow">
                  <h3 className="font-bold text-xl mb-2 text-gray-800">{project.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map(tech => (
                      <span 
                        key={tech} 
                        className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs text-gray-500">+{project.technologies.length - 3} more</span>
                    )}
                  </div>
                </div>
                <div className="p-5 pt-0 mt-auto">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 