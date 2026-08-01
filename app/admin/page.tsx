'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import ReservasSkeleton from '../../components/ReservasSkeleton'

export default function AdminPage() {
  const [user, setUser] = useState<any>(null)
  const [rol, setRol] = useState<string>('')
  const [cargandoAuth, setCargandoAuth] = useState<boolean>(true)
  
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorLogin, setErrorLogin] = useState<string>('')
  const [cargando, setCargando] = useState<boolean>(false)

  const [reservas, setReservas] = useState<any[]>([])
  const [cargandoReservas, setCargandoReservas] = useState<boolean>(true)
  const [procesandoId, setProcesandoId] = useState<string | null>(null)
  const [filtroFecha, setFiltroFecha] = useState<string>('')

  useEffect(() => {
    verificarSesion()
  }, [])

  const verificarSesion = async () => {
    setCargandoAuth(true)
    const { data: { session } } = await supabase.auth.getSession()
    
    if (session?.user) {
      setUser(session.user)
      await verificarRol(session.user.id)
    } else {
      setUser(null)
      setRol('')
      setCargandoAuth(false)
    }
  }

  const verificarRol = async (userId: string) => {
    const { data, error } = await supabase
      .from('perfiles')
      .select('rol')
      .eq('id', userId)
      .single()

    if (data) {
      setRol(data.rol)
      cargarReservas()
    } else {
      console.error('Error al verificar rol:', error)
      setErrorLogin('No tienes permisos asignados. Contacta al administrador.')
      handleLogout()
    }
    setCargandoAuth(false)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorLogin('')
    setCargando(true)

    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setErrorLogin(' Email o contraseña incorrectos')
      setCargando(false)
    } else if (data.user) {
      setUser(data.user)
      await verificarRol(data.user.id)
      setCargando(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setRol('')
    setReservas([])
    setEmail('')
    setPassword('')
    setErrorLogin('')
    setCargandoAuth(false)
  }

  const cargarReservas = async () => {
    setCargandoReservas(true)
    let query = supabase
      .from('reservas')
      .select(`id, nombre_cliente, telefono, fecha, hora, numero_personas, estado, servicios (nombre)`)

    if (filtroFecha) {
      query = query.eq('fecha', filtroFecha)
    }

    const { data, error } = await query
      .order('fecha', { ascending: false })
      .order('hora', { ascending: true })

    if (!error && data) setReservas(data)
    setCargandoReservas(false)
  }

  useEffect(() => {
    if (user) cargarReservas()
  }, [filtroFecha, user])

  const cambiarEstado = async (id: string, nuevoEstado: string) => {
    if (rol !== 'admin') {
      alert('⚠️ Solo los administradores pueden cambiar el estado de las reservas.')
      return
    }

    setProcesandoId(id)
    const { error } = await supabase.from('reservas').update({ estado: nuevoEstado }).eq('id', id)

    if (!error) {
      setReservas(prev => prev.map(r => r.id === id ? { ...r, estado: nuevoEstado } : r))
    }
    setProcesandoId(null)
  }

  if (cargandoAuth) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p>Verificando sesión...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-md w-full shadow-2xl">
          <h1 className="text-2xl font-bold text-white mb-2 text-center">🔒 Acceso al Panel</h1>
          <p className="text-zinc-400 text-center mb-6 text-sm">Ingresa tus credenciales de administrador</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              className="w-full bg-zinc-800 border-2 border-zinc-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full bg-zinc-800 border-2 border-zinc-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"
              required
            />
            
            {errorLogin && (
              <p className="text-red-400 text-sm text-center bg-red-900/20 border border-red-500/50 rounded-lg p-3">
                {errorLogin}
              </p>
            )}
            
            <button 
              type="submit" 
              disabled={cargando}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors"
            >
              {cargando ? '⏳ Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-32 pb-6 px-6 md:pt-36 md:pb-10 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-6 flex flex-col md:flex-row justify-between items-center gap-4 sticky top-24 z-40 shadow-xl">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">🛠️ Panel de Administración</h1>
            <p className="text-zinc-400 text-sm mt-1">
              Sesión: <span className="text-white font-medium">{user.email}</span> | 
              Rol: <span className={`font-bold ${rol === 'admin' ? 'text-red-400' : 'text-blue-400'}`}>{rol.toUpperCase()}</span>
            </p>
          </div>
          
          <div className="flex gap-3 flex-wrap justify-center">
            <button onClick={cargarReservas} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-blue-600/30">
              🔄 Actualizar
            </button>
            <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-red-600/30">
              🚪 Cerrar Sesión
            </button>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label className="text-zinc-400 font-medium whitespace-nowrap">📅 Filtrar por fecha:</label>
            <input type="date" value={filtroFecha} onChange={(e) => setFiltroFecha(e.target.value)} className="bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-red-500 transition-colors w-full sm:w-auto" />
          </div>
          {filtroFecha && (
            <button onClick={() => setFiltroFecha('')} className="text-zinc-400 hover:text-white text-sm underline transition-colors">✖ Limpiar filtro</button>
          )}
          <div className="text-zinc-500 text-sm ml-auto">Mostrando: <span className="text-white font-bold">{reservas.length}</span> reserva(s)</div>
        </div>

        {cargandoReservas ? (
          <ReservasSkeleton />
        ) : reservas.length === 0 ? (
          <div className="text-center py-20 text-zinc-500 bg-zinc-900 rounded-xl">📭 No hay reservas {filtroFecha ? `para la fecha ${filtroFecha}` : 'registradas aún'}.</div>
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
                  <div className="col-span-2 mb-2 md:mb-0"><span className="text-red-400 font-medium">{reserva.servicios?.nombre || 'Sin nombre'}</span></div>
                  <div className="col-span-2 mb-2 md:mb-0 text-zinc-300"><div>{reserva.fecha}</div><div className="text-sm text-zinc-500">{reserva.hora} hs</div></div>
                  <div className="col-span-1 text-center mb-2 md:mb-0 text-zinc-300 font-bold">{reserva.numero_personas}</div>
                  <div className="col-span-2 text-center mb-3 md:mb-0">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${
                      reserva.estado === 'confirmada' ? 'bg-green-500/20 text-green-400 border-green-500' : 
                      reserva.estado === 'cancelada' ? 'bg-red-500/20 text-red-400 border-red-500' : 
                      'bg-yellow-500/20 text-yellow-400 border-yellow-500'
                    }`}>{reserva.estado.toUpperCase()}</span>
                  </div>
                  <div className="col-span-2 flex justify-center gap-2">
                    {rol === 'admin' && reserva.estado !== 'confirmada' && (
                      <button onClick={() => cambiarEstado(reserva.id, 'confirmada')} disabled={procesandoId === reserva.id} className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                        {procesandoId === reserva.id ? '⏳' : '✅'}
                      </button>
                    )}
                    {rol === 'admin' && reserva.estado !== 'cancelada' && (
                      <button onClick={() => cambiarEstado(reserva.id, 'cancelada')} disabled={procesandoId === reserva.id} className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                        {procesandoId === reserva.id ? '⏳' : '❌'}
                      </button>
                    )}
                    {rol !== 'admin' && (
                      <span className="text-zinc-600 text-xs italic">Solo lectura</span>
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