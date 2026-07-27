'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function AdminPage() {
  const [reservas, setReservas] = useState<any[]>([])
  const [cargando, setCargando] = useState(true)
  const [procesandoId, setProcesandoId] = useState<string | null>(null)

  // 1. Cargar reservas al iniciar la página
  useEffect(() => {
    cargarReservas()
  }, [])

  const cargarReservas = async () => {
    setCargando(true)
    // 🔥 TRUCO EXPERTO: Hacemos un JOIN con la tabla 'servicios' para mostrar el NOMBRE de la actividad, no solo el ID
    const { data, error } = await supabase
      .from('reservas')
      .select(`
        id,
        nombre_cliente,
        telefono,
        fecha,
        hora,
        numero_personas,
        estado,
        servicios (nombre)
      `)
      .order('fecha', { ascending: false })
      .order('hora', { ascending: true })

    if (!error && data) {
      setReservas(data)
    }
    setCargando(false)
  }

  // 2. Función para cambiar el estado de una reserva
  const cambiarEstado = async (id: string, nuevoEstado: string) => {
    setProcesandoId(id) // Muestra un indicador de carga en ese botón específico

    const { error } = await supabase
      .from('reservas')
      .update({ estado: nuevoEstado })
      .eq('id', id)

    if (!error) {
      // Actualizamos la interfaz inmediatamente sin recargar la página (UX rápida)
      setReservas(prev => 
        prev.map(reserva => 
          reserva.id === id ? { ...reserva, estado: nuevoEstado } : reserva
        )
      )
    } else {
      alert('Error al actualizar la reserva')
    }
    
    setProcesandoId(null)
  }

  // 3. Función auxiliar para el color del estado
  const getColorEstado = (estado: string) => {
    switch (estado) {
      case 'confirmada': return 'bg-green-500/20 text-green-400 border-green-500'
      case 'cancelada': return 'bg-red-500/20 text-red-400 border-red-500'
      default: return 'bg-yellow-500/20 text-yellow-400 border-yellow-500'
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">🛠️ Panel de Administración</h1>
          <button 
            onClick={cargarReservas}
            className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            🔄 Actualizar lista
          </button>
        </div>

        {cargando ? (
          <div className="text-center py-20 text-zinc-500">Cargando reservas...</div>
        ) : reservas.length === 0 ? (
          <div className="text-center py-20 text-zinc-500 bg-zinc-900 rounded-xl">
            No hay reservas registradas aún.
          </div>
        ) : (
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
            {/* Encabezado de la tabla (oculto en móviles muy pequeños) */}
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-zinc-800/50 text-zinc-400 text-sm font-bold uppercase tracking-wider">
              <div className="col-span-3">Cliente</div>
              <div className="col-span-2">Actividad</div>
              <div className="col-span-2">Fecha y Hora</div>
              <div className="col-span-1 text-center">Personas</div>
              <div className="col-span-2 text-center">Estado</div>
              <div className="col-span-2 text-center">Acciones</div>
            </div>

            {/* Lista de Reservas */}
            <div className="divide-y divide-zinc-800">
              {reservas.map((reserva) => (
                <div key={reserva.id} className="p-4 md:grid md:grid-cols-12 md:gap-4 md:items-center hover:bg-zinc-800/30 transition-colors">
                  
                  {/* Cliente */}
                  <div className="col-span-3 mb-2 md:mb-0">
                    <div className="font-bold text-white">{reserva.nombre_cliente}</div>
                    <div className="text-sm text-zinc-500">{reserva.telefono || 'Sin teléfono'}</div>
                  </div>

                  {/* Actividad */}
                  <div className="col-span-2 mb-2 md:mb-0">
                    <span className="text-red-400 font-medium">
                      {reserva.servicios?.nombre || 'Sin nombre'}
                    </span>
                  </div>

                  {/* Fecha y Hora */}
                  <div className="col-span-2 mb-2 md:mb-0 text-zinc-300">
                    <div>{reserva.fecha}</div>
                    <div className="text-sm text-zinc-500">{reserva.hora} hs</div>
                  </div>

                  {/* Personas */}
                  <div className="col-span-1 text-center mb-2 md:mb-0 text-zinc-300">
                    {reserva.numero_personas}
                  </div>

                  {/* Estado */}
                  <div className="col-span-2 text-center mb-3 md:mb-0">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getColorEstado(reserva.estado)}`}>
                      {reserva.estado.toUpperCase()}
                    </span>
                  </div>

                  {/* Botones de Acción */}
                  <div className="col-span-2 flex justify-center gap-2">
                    {reserva.estado !== 'confirmada' && (
                      <button
                        onClick={() => cambiarEstado(reserva.id, 'confirmada')}
                        disabled={procesandoId === reserva.id}
                        className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                      >
                        {procesandoId === reserva.id ? '...' : '✅'}
                      </button>
                    )}
                    
                    {reserva.estado !== 'cancelada' && (
                      <button
                        onClick={() => cambiarEstado(reserva.id, 'cancelada')}
                        disabled={procesandoId === reserva.id}
                        className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                      >
                        {procesandoId === reserva.id ? '...' : '❌'}
                      </button>
                    )}
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}