'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function ReservarPage() {
  const [loading, setLoading] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [servicios, setServicios] = useState<any[]>([])
  
  const [formData, setFormData] = useState({
    servicio_id: '',
    fecha: '',
    hora: '',
    numero_personas: 1,
    nombre_cliente: '',
    telefono: ''
  })

  // 🔥 NUEVO: Cargar servicios automáticamente desde la base de datos
  useEffect(() => {
    async function cargarServicios() {
      const { data, error } = await supabase
        .from('servicios')
        .select('*')
        .eq('activo', true)
      
      if (error) {
        console.error('Error al cargar servicios:', error)
      } else {
        setServicios(data || [])
      }
    }
    cargarServicios()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMensaje('')

    if (!formData.servicio_id || !formData.fecha || !formData.hora || !formData.nombre_cliente) {
      setMensaje('⚠️ Por favor completa todos los campos obligatorios.')
      setLoading(false)
      return
    }

    const { error } = await supabase
      .from('reservas')
      .insert([
        {
          servicio_id: formData.servicio_id,
          fecha: formData.fecha,
          hora: formData.hora,
          numero_personas: parseInt(formData.numero_personas.toString()),
          nombre_cliente: formData.nombre_cliente,
          telefono: formData.telefono,
          estado: 'pendiente'
        }
      ])

    if (error) {
      console.error('Error al reservar:', error)
      setMensaje('❌ Hubo un error al guardar la reserva. Revisa la consola.')
    } else {
      setMensaje('✅ ¡Reserva creada con éxito! Nos vemos en la pista.')
      setFormData({ servicio_id: '', fecha: '', hora: '', numero_personas: 1, nombre_cliente: '', telefono: '' })
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-red-950 py-20 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Título principal */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="text-red-500">RESERVA</span>
            <span className="text-white"> TU LUGAR</span>
          </h1>
          <p className="text-zinc-400 text-lg">
            Completa el formulario y asegura tu experiencia
          </p>
        </div>

        {/* Mensaje de éxito/error */}
        {mensaje && (
          <div className={`p-4 mb-6 rounded-lg text-center font-medium border-2 ${
            mensaje.includes('✅') 
              ? 'bg-green-900/30 border-green-500 text-green-400' 
              : 'bg-red-900/30 border-red-500 text-red-400'
          }`}>
            {mensaje}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-2xl p-8 shadow-2xl">
          
          {/* Actividad */}
          <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2">
              Actividad <span className="text-red-500">*</span>
            </label>
            <select 
              name="servicio_id" 
              value={formData.servicio_id} 
              onChange={handleChange} 
              className="w-full bg-zinc-800 border-2 border-zinc-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
              required
            >
              <option value="">Selecciona una actividad</option>
              {servicios.map((servicio) => (
                <option key={servicio.id} value={servicio.id}>
                  {servicio.nombre} - {servicio.descripcion}
                </option>
              ))}
            </select>
          </div>

          {/* Fecha y Hora */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-white text-sm font-bold mb-2">
                Fecha <span className="text-red-500">*</span>
              </label>
              <input 
                type="date" 
                name="fecha" 
                value={formData.fecha} 
                onChange={handleChange} 
                className="w-full bg-zinc-800 border-2 border-zinc-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                required 
              />
            </div>
            <div>
              <label className="block text-white text-sm font-bold mb-2">
                Hora <span className="text-red-500">*</span>
              </label>
              <input 
                type="time" 
                name="hora" 
                value={formData.hora} 
                onChange={handleChange} 
                className="w-full bg-zinc-800 border-2 border-zinc-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                required 
              />
            </div>
          </div>

          {/* Número de personas */}
          <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2">
              Número de personas <span className="text-red-500">*</span>
            </label>
            <input 
              type="number" 
              name="numero_personas" 
              min="1" 
              value={formData.numero_personas} 
              onChange={handleChange} 
              className="w-full bg-zinc-800 border-2 border-zinc-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
              required 
            />
          </div>

          {/* Nombre completo */}
          <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2">
              Nombre completo <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              name="nombre_cliente" 
              value={formData.nombre_cliente} 
              onChange={handleChange} 
              className="w-full bg-zinc-800 border-2 border-zinc-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
              placeholder="Ej: Juan Pérez"
              required 
            />
          </div>

          {/* Teléfono */}
          <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2">
              Teléfono <span className="text-zinc-500">(Opcional)</span>
            </label>
            <input 
              type="tel" 
              name="telefono" 
              value={formData.telefono} 
              onChange={handleChange} 
              className="w-full bg-zinc-800 border-2 border-zinc-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
              placeholder="Ej: 55 1234 5678"
            />
          </div>

          {/* Botón de enviar */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 rounded-lg transition-all transform hover:scale-[1.02] disabled:from-zinc-700 disabled:to-zinc-800 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-red-600/30"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Procesando...
              </span>
            ) : (
              '🏁 CONFIRMAR RESERVA'
            )}
          </button>

        </form>

        <Link 
          href="/" 
          className="inline-flex items-center text-zinc-400 hover:text-red-500 transition-colors mb-6 group"
        >
          <svg 
            className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver atras
        </Link>

        {/* Información adicional */}
        <div className="mt-8 text-center text-zinc-400 text-sm">
          <p>📍 La Sabaneta - Kartódromo, Motódromo y más</p>
          <p className="mt-1">La adrenalina te espera ️</p>
        </div>

      </div>
    </div>
  )
}