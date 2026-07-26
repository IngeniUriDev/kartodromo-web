import { supabase } from '../../lib/supabaseClient'

export default async function TestDB() {
  // Consultamos los servicios desde Supabase
  const { data: servicios, error } = await supabase
    .from('servicios')
    .select('*')
    .eq('activo', true)

  if (error) {
    return <div className="p-10 text-red-500">Error: {error.message}</div>
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">🧪 Prueba de Base de Datos</h1>
      <p className="mb-4">Servicios encontrados: {servicios?.length}</p>
      
      <div className="space-y-4">
        {servicios?.map((servicio) => (
          <div key={servicio.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-bold">{servicio.nombre}</h2>
            <p className="text-gray-600">{servicio.descripcion}</p>
            <p className="text-sm text-blue-500">Capacidad: {servicio.capacidad_maxima} personas</p>
          </div>
        ))}
      </div>
    </div>
  )
}