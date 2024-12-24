import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://svmcviaxtxxpuynxwtkv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2bWN2aWF4dHh4cHV5bnh3dGt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ4NjI1MTQsImV4cCI6MjA1MDQzODUxNH0._tOMn9T34WeRjB9Q7JlnVJoLyhHHY6hoW3fQaSkgubI'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase