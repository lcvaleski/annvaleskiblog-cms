# AnnValeskiBlog CMS

Content Management System for AnnValeskiBlog

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- Supabase account
- Vercel account

### 1. Supabase Setup

1. Create a new Supabase project at [https://supabase.com](https://supabase.com)
2. In your Supabase dashboard, go to Settings → API
3. Copy your project URL and keys:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

4. Set up database tables (run in SQL editor):

```sql
-- Create blog posts table
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  excerpt TEXT,
  featured_image TEXT,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create newsletter subscribers table
CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- Create admin users table
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust as needed)
CREATE POLICY "Public can view published posts" ON blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "Admins can do everything" ON blog_posts
  FOR ALL USING (true);
```

### 2. Local Development Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/annvaleskiblog-cms.git
cd annvaleskiblog-cms
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file with your credentials:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Admin Credentials (for initial setup)
ADMIN_EMAIL=admin@annvaleskiblog.com
ADMIN_PASSWORD=your_secure_password_here
```

4. Generate NextAuth secret:
```bash
openssl rand -base64 32
```

5. Run development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

### 3. Vercel Deployment

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and import your repository
3. Add environment variables in Vercel dashboard:
   - All the variables from `.env.local`
   - Update `NEXTAUTH_URL` to your production URL (e.g., `https://annvaleskiblog-cms.vercel.app`)

4. Deploy!

## Project Structure

```
├── app/
│   ├── api/           # API routes
│   ├── auth/          # Authentication pages
│   ├── blog/          # Blog management
│   ├── dashboard/     # Admin dashboard
│   ├── components/    # Shared components
│   └── layout.tsx     # Root layout
├── lib/
│   └── supabase.ts    # Supabase client
└── public/            # Static assets
```

## Features

- ✅ Blog post management (CRUD operations)
- ✅ Rich text editor for content
- ✅ Image upload and management
- ✅ Newsletter subscriber management
- ✅ Admin authentication
- ✅ Responsive design
- ✅ SEO-friendly URLs

## Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Security Notes

- Always use strong passwords for admin accounts
- Keep your Supabase service role key secret
- Enable RLS (Row Level Security) on all tables
- Regularly update dependencies
- Use environment variables for sensitive data

## Support

For issues or questions, please open an issue on GitHub.

## License

MIT