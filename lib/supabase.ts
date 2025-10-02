import { createClient } from '@supabase/supabase-js'

// Add debug logging for production
if (typeof window !== 'undefined') {
  console.log('Supabase ENV Check:', {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'MISSING',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'MISSING',
  })
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Validate required environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', {
    url: supabaseUrl,
    anonKey: supabaseAnonKey ? 'SET' : 'MISSING'
  })
  throw new Error('Missing required Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Only create admin client on server side
export const supabaseAdmin = typeof window === 'undefined' && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null

export interface SiteSettings {
  id?: string
  title: string
  subtitle: string
  created_at?: string
  updated_at?: string
}

export interface Post {
  id: string
  title: string
  content: string
  date: string
  published: boolean
  is_pinned?: boolean
  created_at?: string
  updated_at?: string
}