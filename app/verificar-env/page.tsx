export default function VerificarEnv() {
  return (
    <div className="p-10 bg-black text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">🔍 Verificando Variables de Entorno</h1>
      
      <div className="space-y-4">
        <div>
          <p className="text-zinc-400">NEXT_PUBLIC_SUPABASE_URL:</p>
          <p className="text-green-400 font-mono">{process.env.NEXT_PUBLIC_SUPABASE_URL || '❌ NO ENCONTRADA'}</p>
        </div>
        
        <div>
          <p className="text-zinc-400">NEXT_PUBLIC_SUPABASE_ANON_KEY:</p>
          <p className="text-green-400 font-mono">
            {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY 
              ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 20) + '...' 
              : '❌ NO ENCONTRADA'}
          </p>
        </div>
      </div>
    </div>
  )
}