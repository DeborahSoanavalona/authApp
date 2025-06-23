import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'

export function createClient() {
  return createServerActionClient({ cookies })
}
