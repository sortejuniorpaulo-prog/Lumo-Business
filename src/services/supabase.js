import { createClient } from '@supabase/supabase-js'
import { appConfig, isSupabaseConfigured } from '../config/env.js'

export const supabase = isSupabaseConfigured
  ? createClient(appConfig.supabaseUrl, appConfig.supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null

export function getBackendStatus() {
  return {
    configured: isSupabaseConfigured,
    connected: Boolean(supabase),
  }
}
