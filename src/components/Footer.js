import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail, Home, BookOpen, Briefcase, Clock, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/zaidmadanat', icon: Github },
    { name: 'Twitter', href: 'https://twitter.com/zaidmadanat', icon: Twitter },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/zaidmadanat', icon: Linkedin },
    { name: 'Email', href: 'mailto:contact@zaidmadanat.com', icon: Mail },
  ];

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Blog', href: '/blog', icon: BookOpen },
    { name: 'Projects', href: '/projects', icon: Briefcase },
    { name: 'Timeline', href: '/timeline', icon: Clock },
    { name: 'Hobbies', href: '/hobbies', icon: Heart },
    { name: 'Contact', href: '/contact', icon: Mail },
  ];

  return (
    <footer className="border-t bg-background">
      <div className="container py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col">
            <Link href="/" className="text-xl font-bold">
              Zaid Madanat
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Personal website, blog and portfolio
            </p>
            <div className="mt-4 flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a 
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={link.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col md:items-end">
            <div className="flex flex-wrap gap-4 md:justify-end">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <link.icon className="mr-1 h-4 w-4" />
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {currentYear} Zaid Madanat. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 