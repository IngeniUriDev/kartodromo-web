'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'

const ADMIN_PASSWORD = 'sabaneta2026'

export default function AdminPage() {
  const [estaLogueado, setEstaLogueado] = useState<boolean>(false)
  const [passwordIngresada, setPasswordIngresada] = useState<string>('')
  const [errorLogin, setErrorLogin] = useState<string>('')
  
  const [reservas, setReservas] = useState<any[]>([])
  const [cargando, setCargando] = useState<boolean>(true)
  const [procesandoId, setProcesandoId] = useState<string | null>(null)

  // 📚 GLOSARIO: Nuevo estado para el filtro de fecha
  // string: guardará un texto con formato 'YYYY-MM-DD' (ej: '2024-07-27')
  // '': empieza vacío, lo que significa "mostrar todas las reservas"
  const [filtroFecha, setFiltroFecha] = useState<string>('')

  useEffect(() => {
    const sesionGuardada = localStorage.getItem('admin_session')
    if (sesionGuardada === 'activa') {
      setEstaLogueado(true)
      cargarReservas()
    }
  }, [])

  // 📚 GLOSARIO: Ahora esta función lee el estado 'filtroFecha'
  const cargarReservas = async () => {
    setCargando(true)
    
    // 1. Iniciamos la consulta básica
    let query = supabase
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

    // 2. 📚 GLOSARIO: Condicionales en consultas (Query Building)
    // Si el usuario eligió una fecha, le decimos a Supabase: "Filtra solo esas"
    // .eq significa "equal" (igual a)
    if (filtroFecha) {
      query = query.eq('fecha', filtroFecha)
    }

    // 3. Ejecutamos la consulta y ordenamos los resultados
    const { data, error } = await query
      .order('fecha', { ascending: false })
      .order('hora', { ascending: true })

    if (!error && data) {
      setReservas(data)
    } else {
      console.error('Error al cargar:', error)
    }
    setCargando(false)
  }

  // Se ejecuta cada vez que cambia la fecha seleccionada
  useEffect(() => {
    if (estaLogueado) {
      cargarReservas()
    }
  }, [filtroFecha, estaLogueado])

  const cambiarEstado = async (id: string, nuevoEstado: string) => {
    setProcesandoId(id)
    const { error } = await supabase
      .from('reservas')
      .update({ estado: nuevoEstado })
      .eq('id', id)

    if (!error) {
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordIngresada === ADMIN_PASSWORD) {
      setEstaLogueado(true)
      setErrorLogin('')
      localStorage.setItem('admin_session', 'activa')
      cargarReservas()
    } else {
      setErrorLogin('❌ Contraseña incorrecta')
    }
  }

  const handleLogout = () => {
    setEstaLogueado(false)
    localStorage.removeItem('admin_session')
    setPasswordIngresada('')
    setFiltroFecha('') // Limpiamos el filtro al salir
    setReservas([])
  }

  const getColorEstado = (estado: string) => {
    switch (estado) {
      case 'confirmada': return 'bg-green-500/20 text-green-400 border-green-500'
      case 'cancelada': return 'bg-red-500/20 text-red-400 border-red-500'
      default: return 'bg-yellow-500/20 text-yellow-400 border-yellow-500'
    }
  }

  // Pantalla de Login
  if (!estaLogueado) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-md w-full shadow-2xl">
          <h1 className="text-2xl font-bold text-white mb-2 text-center">🔒 Acceso Restringido</h1>
          <p className="text-zinc-400 text-center mb-6 text-sm">Ingresa la contraseña de administrador</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={passwordIngresada}
              onChange={(e) => setPasswordIngresada(e.target.value)}
              placeholder="Contraseña"
              className="w-full bg-zinc-800 border-2 border-zinc-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"
              autoFocus
            />
            {errorLogin && <p className="text-red-400 text-sm text-center">{errorLogin}</p>}
            <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors">
              Ingresar
            </button>
          </form>
        </div>
      </div>
    )
  }

  // Panel de Administración
  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-32 pb-6 px-6 md:pt-36 md:pb-10 md:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER DEL PANEL */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-6 flex flex-col md:flex-row justify-between items-center gap-4 sticky top-24 z-40 shadow-xl">
          <h1 className="text-2xl md:text-3xl font-bold text-white">🛠️ Panel de Administración</h1>
          
          <div className="flex gap-3 flex-wrap justify-center">
            <button 
              onClick={cargarReservas}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-blue-600/30"
            >
              🔄 Actualizar
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-red-600/30"
            >
              🚪 Cerrar Sesión
            </button>
          </div>
        </div>

        {/* 📚 GLOSARIO: Barra de Filtros */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label className="text-zinc-400 font-medium whitespace-nowrap">📅 Filtrar por fecha:</label>
            <input 
              type="date" 
              value={filtroFecha}
              onChange={(e) => setFiltroFecha(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-red-500 transition-colors w-full sm:w-auto"
            />
          </div>
          
          {/* Botón para limpiar el filtro */}
          {filtroFecha && (
            <button 
              onClick={() => setFiltroFecha('')}
              className="text-zinc-400 hover:text-white text-sm underline transition-colors"
            >
              ✖ Limpiar filtro (Ver todas)
            </button>
          )}
          
          <div className="text-zinc-500 text-sm ml-auto">
            Mostrando: <span className="text-white font-bold">{reservas.length}</span> reserva(s)
          </div>
        </div>

        {/* TABLA DE RESERVAS */}
        {cargando ? (
          <div className="text-center py-20 text-zinc-500 bg-zinc-900 rounded-xl">
            <div className="animate-spin text-4xl mb-4">⏳</div>
            Cargando reservas...
          </div>
        ) : reservas.length === 0 ? (
          <div className="text-center py-20 text-zinc-500 bg-zinc-900 rounded-xl">
            📭 No hay reservas {filtroFecha ? `para la fecha ${filtroFecha}` : 'registradas aún'}.
          </div>
        ) : (
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden shadow-2xl">
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-zinc-800/50 text-zinc-400 text-sm font-bold uppercase tracking-wider border-b border-zinc-800">
              <div className="col-span-3">Cliente</div>
              <div className="col-span-2">Actividad</div>
              <div className="col-span-2">Fecha y Hora</div>
              <div className="col-span-1 text-center">Personas</div>
              <div className="col-span-2 text-center">Estado</div>
              <div className="col-span-2 text-center">Acciones</div>
            </div>

            <div className="divide-y divide-zinc-800">
              {reservas.map((reserva) => (
                <div key={reserva.id} className="p-4 md:grid md:grid-cols-12 md:gap-4 md:items-center hover:bg-zinc-800/30 transition-colors">
                  <div className="col-span-3 mb-2 md:mb-0">
                    <div className="font-bold text-white">{reserva.nombre_cliente}</div>
                    <div className="text-sm text-zinc-500">{reserva.telefono || 'Sin teléfono'}</div>
                  </div>

                  <div className="col-span-2 mb-2 md:mb-0">
                    <span className="text-red-400 font-medium">{reserva.servicios?.nombre || 'Sin nombre'}</span>
                  </div>

                  <div className="col-span-2 mb-2 md:mb-0 text-zinc-300">
                    <div>{reserva.fecha}</div>
                    <div className="text-sm text-zinc-500">{reserva.hora} hs</div>
                  </div>

                  <div className="col-span-1 text-center mb-2 md:mb-0 text-zinc-300 font-bold">
                    {reserva.numero_personas}
                  </div>

                  <div className="col-span-2 text-center mb-3 md:mb-0">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getColorEstado(reserva.estado)}`}>
                      {reserva.estado.toUpperCase()}
                    </span>
                  </div>

                  <div className="col-span-2 flex justify-center gap-2">
                    {reserva.estado !== 'confirmada' && (
                      <button
                        onClick={() => cambiarEstado(reserva.id, 'confirmada')}
                        disabled={procesandoId === reserva.id}
                        className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                      >
                        {procesandoId === reserva.id ? '⏳' : '✅'}
                      </button>
                    )}
                    {reserva.estado !== 'cancelada' && (
                      <button
                        onClick={() => cambiarEstado(reserva.id, 'cancelada')}
                        disabled={procesandoId === reserva.id}
                        className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                      >
                        {procesandoId === reserva.id ? '⏳' : '❌'}
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