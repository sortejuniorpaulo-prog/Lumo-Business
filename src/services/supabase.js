import { isSupabaseConfigured } from '../config/env.js'

// Fase 0: apenas indica se a configuração existe. O cliente Supabase
// (@supabase/supabase-js) será instalado e criado quando houver operações reais.
export function getBackendStatus() {
  return { configured: isSupabaseConfigured }
}
