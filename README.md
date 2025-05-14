# Zaid Madanat's Personal Website

A full-stack personal website and blog built with Next.js, Tailwind CSS, and PostgreSQL. This site serves as a showcase for my projects, blog posts, timeline of activities, and hobbies.

## Features

- **Sleek, Modern Design**: Clean and responsive UI built with Tailwind CSS
- **Blog System**: Full-featured blog with tagging, comments, and likes
- **Projects Showcase**: Highlight your best work with detailed project pages
- **Timeline**: Chronological display of important events and activities
- **Hobbies Section**: Share your interests with ratings and reviews
- **Contact Form**: Easy way for visitors to get in touch

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS, including Typography plugin
- **Deployment**: Ready for deployment on Vercel or other platforms

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/my-site.git
   cd my-site
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your database connection string:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/my_site"
   ```

4. Set up the database:
   ```bash
   npm run prisma:migrate
   npm run prisma:generate
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the site.

## Deployment

This site is designed to be easily deployed to Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure the environment variables
4. Deploy!

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with Next.js, Tailwind CSS, and Prisma
- Deployed on zaidmadanat.com
