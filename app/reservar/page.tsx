'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import Link from 'next/link'
import toast from 'react-hot-toast'
import FormularioSkeleton from '../../components/FormularioSkeleton'
import { motion, type Variants } from 'framer-motion'
import { Calendar, ArrowLeft } from 'lucide-react'

interface ServicioItem {
  id: string
  nombre: string
  descripcion: string
  capacidad_maxima: number
  activo: boolean
}

interface DisponibilidadData {
  disponibles: number
  ocupados: number
  capacidad: number
}

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: "easeOut",
      staggerChildren: 0.08
    } 
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } }
}

export default function ReservarPage() {
  const [cargandoServicios, setCargandoServicios] = useState<boolean>(true)
  const [loading, setLoading] = useState(false)
  const [servicios, setServicios] = useState<ServicioItem[]>([])
  
  const [disponibilidad, setDisponibilidad] = useState<DisponibilidadData | null>(null)
  
  const [formData, setFormData] = useState({
    servicio_id: '',
    fecha: '',
    hora: '',
    numero_personas: 1,
    nombre_cliente: '',
    telefono: ''
  })

  // Cargar servicios al iniciar
  useEffect(() => {
    let montado = true
    async function cargarServicios() {
      setCargandoServicios(true)
      
      const { data, error } = await supabase
        .from('servicios')
        .select('*')
        .eq('activo', true)
      
      if (!montado) return

      if (error || !data || data.length === 0) {
        setServicios([
          { id: '1', nombre: 'Go-Karts 270cc', descripcion: 'Turno individual de 10 min', capacidad_maxima: 12, activo: true },
          { id: '2', nombre: 'Motódromo', descripcion: 'Acceso a pista para motos deportivas', capacidad_maxima: 15, activo: true },
          { id: '3', nombre: 'Campo Gotcha', descripcion: 'Partida con careta y marcadora', capacidad_maxima: 20, activo: true },
        ])
      } else {
        setServicios(data)
      }
      setCargandoServicios(false)
    }

    cargarServicios()
    return () => { montado = false }
  }, [])

  // Verificar disponibilidad asíncrona con control de montaje
  useEffect(() => {
    let activo = true

    if (formData.servicio_id && formData.fecha && formData.hora) {
      const verificar = async () => {
        const servicioSeleccionado = servicios.find(s => s.id === formData.servicio_id)
        if (!servicioSeleccionado) return

        const capacidadMaxima = servicioSeleccionado.capacidad_maxima

        const { data, error } = await supabase
          .from('reservas')
          .select('numero_personas')
          .eq('servicio_id', formData.servicio_id)
          .eq('fecha', formData.fecha)
          .eq('hora', formData.hora)
          .neq('estado', 'cancelada')

        if (!activo) return

        if (!error && data) {
          const ocupados = data.reduce((total, reserva) => total + (reserva.numero_personas || 0), 0)
          setDisponibilidad({
            disponibles: Math.max(0, capacidadMaxima - ocupados),
            ocupados,
            capacidad: capacidadMaxima
          })
        }
      }

      verificar()
    }

    return () => {
      activo = false
    }
  }, [formData.servicio_id, formData.fecha, formData.hora, servicios])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.name === 'numero_personas' ? Number(e.target.value) : e.target.value

    setFormData(prev => ({
      ...prev,
      [e.target.name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    toast.dismiss()

    if (!formData.servicio_id || !formData.fecha || !formData.hora || !formData.nombre_cliente) {
      toast.error('Por favor completa todos los campos obligatorios.', { icon: '⚠️' })
      setLoading(false)
      return
    }

    if (disponibilidad && formData.numero_personas > disponibilidad.disponibles) {
      toast.error(
        `Solo quedan ${disponibilidad.disponibles} lugares disponibles para este horario.`,
        { icon: '⚠️' }
      )
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
          numero_personas: formData.numero_personas,
          nombre_cliente: formData.nombre_cliente,
          telefono: formData.telefono,
          estado: 'pendiente'
        }
      ])

    if (error) {
      console.error('Error al reservar:', error)
      toast.error('Hubo un error al guardar la reservación, intenta otra vez.')
    } else {
      toast.success('¡Reserva creada con éxito! Nos vemos en la pista.', { icon: '🏁' })
      setFormData({ servicio_id: '', fecha: '', hora: '', numero_personas: 1, nombre_cliente: '', telefono: '' })
      setDisponibilidad(null)
    }
    
    setLoading(false)
  }

  const hoyStr = new Date().toISOString().split('T')[0]

  return (
    <motion.div 
      className="min-h-screen bg-black text-white pt-28 pb-20 px-4 sm:px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-2xl mx-auto">
        
        {/* Botón para volver */}
        <motion.div variants={itemVariants}>
          <Link 
            href="/" 
            className="inline-flex items-center text-sm text-zinc-400 hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Volver al Inicio
          </Link>
        </motion.div>

        {/* Título principal */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-800 text-red-400 text-xs font-bold tracking-wider uppercase mb-3">
            <Calendar className="w-3.5 h-3.5" /> Agenda Tu Turno
          </div>
          <h1 className="text-3xl sm:text-5xl font-black mb-3">
            RESERVA <span className="text-red-500">TU HORARIO</span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base">
            Valida cupos en tiempo real y aparta tu lugar en el circuito.
          </p>
        </motion.div>

        {/* Panel de disponibilidad */}
        {disponibilidad && (
          <motion.div 
            className={`p-4 mb-6 rounded-2xl border ${
              disponibilidad.disponibles === 0 
                ? 'bg-red-950/30 border-red-500 text-red-300' 
                : disponibilidad.disponibles <= 3 
                  ? 'bg-amber-950/30 border-amber-500 text-amber-300'
                  : 'bg-emerald-950/30 border-emerald-500 text-emerald-300'
            }`}
            variants={itemVariants}
          >
            <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
              <span>Cupos Disponibles: {disponibilidad.disponibles} de {disponibilidad.capacidad}</span>
              <span>{disponibilidad.disponibles === 0 ? '🚫 Horario Lleno' : '✅ Horario Disponible'}</span>
            </div>
          </motion.div>
        )}

        {/* Formulario */}
        <motion.div variants={itemVariants}>
          {cargandoServicios ? (
            <FormularioSkeleton />
          ) : (
            <form onSubmit={handleSubmit} className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
              
              {/* Actividad */}
              <div>
                <label className="block text-white text-xs font-bold uppercase tracking-wider mb-2">
                  Actividad <span className="text-red-500">*</span>
                </label>
                <select 
                  name="servicio_id" 
                  value={formData.servicio_id} 
                  onChange={handleChange} 
                  className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-all"
                  required
                >
                  <option value="">Selecciona una actividad</option>
                  {servicios.map((servicio) => (
                    <option key={servicio.id} value={servicio.id}>
                      {servicio.nombre} - {servicio.descripcion} (Capacidad: {servicio.capacidad_maxima})
                    </option>
                  ))}
                </select>
              </div>

              {/* Fecha y Hora */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-xs font-bold uppercase tracking-wider mb-2">
                    Fecha <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="date" 
                    name="fecha" 
                    min={hoyStr}
                    value={formData.fecha} 
                    onChange={handleChange} 
                    className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-all"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-white text-xs font-bold uppercase tracking-wider mb-2">
                    Hora <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="time" 
                    name="hora" 
                    value={formData.hora} 
                    onChange={handleChange} 
                    className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-all"
                    required 
                  />
                </div>
              </div>

              {/* Número de personas */}
              <div>
                <label className="block text-white text-xs font-bold uppercase tracking-wider mb-2">
                  Número de personas <span className="text-red-500">*</span>
                </label>
                <input 
                  type="number" 
                  name="numero_personas" 
                  min="1" 
                  max={disponibilidad?.disponibles || 100}
                  value={formData.numero_personas} 
                  onChange={handleChange} 
                  className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-all"
                  required 
                />
                {disponibilidad && (
                  <p className="text-zinc-400 text-xs mt-1.5">
                    Máximo disponible para este horario: {disponibilidad.disponibles} personas
                  </p>
                )}
              </div>

              {/* Nombre completo */}
              <div>
                <label className="block text-white text-xs font-bold uppercase tracking-wider mb-2">
                  Nombre completo <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="nombre_cliente" 
                  value={formData.nombre_cliente} 
                  onChange={handleChange} 
                  className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-all"
                  placeholder="Ej: Juan Pérez"
                  required 
                />
              </div>

              {/* Teléfono */}
              <div>
                <label className="block text-white text-xs font-bold uppercase tracking-wider mb-2">
                  Teléfono / WhatsApp <span className="text-zinc-500">(Recomendado)</span>
                </label>
                <input 
                  type="tel" 
                  name="telefono" 
                  value={formData.telefono} 
                  onChange={handleChange} 
                  className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-all"
                  placeholder="Ej: 55 1234 5678"
                />
              </div>

              {/* Botón de enviar */}
              <button 
                type="submit" 
                disabled={loading || (disponibilidad?.disponibles === 0)}
                className="w-full bg-gradient-to-r from-red-600 via-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:from-zinc-800 disabled:to-zinc-800 disabled:cursor-not-allowed text-white font-black py-4 rounded-xl transition-all shadow-xl shadow-red-600/30 text-sm uppercase tracking-wider flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Confirmando Reserva...
                  </span>
                ) : disponibilidad?.disponibles === 0 ? (
                  '🚫 Horario Agotado'
                ) : (
                  '🏁 CONFIRMAR RESERVA'
                )}
              </button>

              <div className="text-center pt-2">
                <Link href="/comprar" className="text-xs text-red-400 hover:underline">
                  ¿Prefieres comprar y pagar tus pases en línea ahora? Haz clic aquí
                </Link>
              </div>

            </form>
          )}
        </motion.div>

      </div>
    </motion.div>
  )
}