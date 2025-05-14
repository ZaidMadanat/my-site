import Image from "next/image";
import Link from 'next/link';
import { ArrowRight, Github, Twitter, Linkedin } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Hello, I'm <span className="text-primary">Zaid Madanat</span>
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Welcome to my digital space where I share my journey, projects, and thoughts on technology, 
                  startups, AI, and more.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/projects">
                  <Button className="gap-1">
                    View My Projects
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/blog">
                  <Button variant="outline" className="gap-1">
                    Read My Blog
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <a
                  href="https://github.com/zaidmadanat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a
                  href="https://twitter.com/zaidmadanat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a
                  href="https://linkedin.com/in/zaidmadanat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative aspect-square w-full max-w-[400px] overflow-hidden rounded-full border-4 border-border bg-muted">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-muted-foreground">Your Photo</span>
                </div>
                {/* Uncomment when you have a photo
                <Image
                  src="/profile.jpg"
                  alt="Zaid Madanat"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
                */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-muted/40 py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              About Me
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              I'm passionate about technology, innovation, and creating meaningful digital experiences. 
              With expertise in [your skills], I love solving complex problems and bringing ideas to life.
            </p>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              When I'm not coding, you can find me [your hobbies/interests]. I believe in continuous 
              learning and sharing knowledge with the community.
            </p>
            <Link href="/contact">
              <Button variant="secondary" className="mt-4">
                Get In Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              Featured Projects
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Check out some of my recent work
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            <div className="group relative overflow-hidden rounded-lg border bg-background p-2 transition-all hover:shadow-md">
              <div className="flex h-[200px] flex-col justify-between rounded-md p-6 bg-muted">
                <div className="space-y-2">
                  <h3 className="font-bold">Project Name</h3>
                  <p className="text-sm text-muted-foreground">
                    Brief description of the project and what technologies were used.
                  </p>
                </div>
                <Link href="/projects/project-1" className="inline-flex items-center text-sm font-medium">
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12 flex justify-center">
            <Link href="/projects">
              <Button variant="outline">View All Projects</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="bg-muted/40 py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              Latest From The Blog
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Thoughts, ideas, and insights
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            <div className="group relative overflow-hidden rounded-lg border bg-background p-2 transition-all hover:shadow-md">
              <div className="flex h-full flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      Programming
                    </span>
                    <span className="text-xs text-muted-foreground">May 10, 2023</span>
                  </div>
                  <h3 className="font-bold">Blog Post Title</h3>
                  <p className="text-sm text-muted-foreground">
                    A brief excerpt from the blog post to give readers an idea of what the article is about.
                  </p>
                </div>
                <Link href="/blog/post-1" className="inline-flex items-center text-sm font-medium text-primary">
                  Read More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12 flex justify-center">
            <Link href="/blog">
              <Button variant="outline">View All Posts</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
