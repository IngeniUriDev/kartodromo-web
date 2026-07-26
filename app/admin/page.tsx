import { supabase } from '../../lib/supabaseClient'

export default async function AdminPage() {
  const { data: reservas, error } = await supabase
    .from('reservas')
    .select('*')
    .order('fecha', { ascending: false })

  if (error) {
    return <div className="p-10 text-red-500">Error al cargar: {error.message}</div>
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6">🛠️ Panel de Administración</h1>
      <p className="mb-4 text-zinc-400">Total de reservas: {reservas?.length}</p>
      
      <div className="bg-zinc-800 p-4 rounded-lg space-y-2">
        {reservas?.map((reserva) => (
          <div key={reserva.id} className="border-b border-zinc-700 py-2 flex justify-between">
            <span>{reserva.nombre_cliente}</span>
            <span className="text-zinc-400">{reserva.fecha} a las {reserva.hora}</span>
          </div>
        ))}
      </div>
    </div>
  )
}