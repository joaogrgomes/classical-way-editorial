import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://svodiyvilnzryvkpbbsw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2b2RpeXZpbG56cnl2a3BiYnN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1ODAyOTAsImV4cCI6MjA5MTE1NjI5MH0.sxd7iZZBEmtFm_dgCCn2YwfzF0SbHrRfKtDBsyR66Xo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)