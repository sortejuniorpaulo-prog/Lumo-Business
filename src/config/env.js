// Leitura centralizada das variáveis de ambiente (prefixo VITE_).
// Só a chave pública (anon) pode existir no frontend. Nunca usar chaves privilegiadas aqui.
const env = import.meta.env

export const appConfig = {
  supabaseUrl: env.VITE_SUPABASE_URL ?? '',
  supabaseAnonKey: env.VITE_SUPABASE_ANON_KEY ?? '',
}

export const isSupabaseConfigured = Boolean(appConfig.supabaseUrl && appConfig.supabaseAnonKey)
