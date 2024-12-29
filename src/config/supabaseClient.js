import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_ANON_KEY

// console.log('Supabase URL:', supabaseUrl)
// console.log('Supabase Key:', supabaseKey)

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or Supabase Key')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase