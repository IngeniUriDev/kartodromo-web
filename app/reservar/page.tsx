'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import Link from 'next/link'
import toast from 'react-hot-toast'
import FormularioSkeleton from '../../components/FormularioSkeleton'
import {motion} from 'framer-motion'

// configuraciones reutilizables para que el código no se ensucie
const containerVariants = {
  hidden: { opacity: 0, y: 30 }, // Empieza invisible y 30px más abajo
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: "easeOut",
      staggerChildren: 0.1 //  Hace que los hijos aparezcan uno tras otro con 0.1s de diferencia
    } 
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
}

export default function ReservarPage() {
  const [cargandoServicios, setCargandoServicios] = useState<boolean>(true)
  const [loading, setLoading] = useState(false)
  const [servicios, setServicios] = useState<any[]>([])
  
  // Nuevo estado para mostrar disponibilidad en tiempo real
  const [disponibilidad, setDisponibilidad] = useState<{
    disponibles: number
    ocupados: number
    capacidad: number
  } | null>(null)
  
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
  async function cargarServicios() {
    setCargandoServicios(true)
    console.log(' Cargando servicios desde Supabase...')
    
    const { data, error } = await supabase
      .from('servicios')
      .select('*')
      .eq('activo', true)
    
    if (error) {
      console.error('❌ Error al cargar servicios:', error)
      toast.error('Error al cargar las actividades')
    } else {
      console.log('✅ Servicios cargados:', data)
      setServicios(data || [])
    }
    setCargandoServicios(false)
  }
  cargarServicios()
}, [])

  // useEffect que se ejecuta cuando cambian servicio, fecha u hora
  // Esto nos permite calcular la disponibilidad en tiempo real
  useEffect(() => {
    if (formData.servicio_id && formData.fecha && formData.hora) {
      verificarDisponibilidad()
    } else {
      setDisponibilidad(null)
    }
  }, [formData.servicio_id, formData.fecha, formData.hora])

  // Función que consulta cuántas personas ya reservaron ese horario
  const verificarDisponibilidad = async () => {
    try {
      // 1. Obtener la capacidad máxima del servicio seleccionado
      const servicioSeleccionado = servicios.find(s => s.id === formData.servicio_id)
      if (!servicioSeleccionado) return

      const capacidadMaxima = servicioSeleccionado.capacidad_maxima

      // 2.  GLOSARIO: SUM() es una función de agregación que suma valores
      // Consultamos la suma de numero_personas de todas las reservas NO canceladas
      // en ese servicio, fecha y hora específicos
      const { data, error } = await supabase
        .from('reservas')
        .select('numero_personas')
        .eq('servicio_id', formData.servicio_id)
        .eq('fecha', formData.fecha)
        .eq('hora', formData.hora)
        .neq('estado', 'cancelada') // .neq = "not equal" (no igual a)

      if (error) {
        console.error('Error al verificar disponibilidad:', error)
        return
      }

      // 3. Calcular cuántos lugares están ocupados
      // reduce() recorre un array y acumula un valor
      const ocupados = data?.reduce((total, reserva) => total + reserva.numero_personas, 0) || 0
      const disponibles = capacidadMaxima - ocupados

      // 4. Guardar la información de disponibilidad
      setDisponibilidad({
        disponibles: Math.max(0, disponibles), // Nunca mostrar negativos
        ocupados,
        capacidad: capacidadMaxima
      })
    } catch (error) {
      console.error('Error en verificarDisponibilidad:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.name === 'numero_personas' ? Number(e.target.value) : e.target.value

    setFormData({
      ...formData,
      [e.target.name]: value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    toast.dismiss()

    // Validación de campos obligatorios
    if (!formData.servicio_id || !formData.fecha || !formData.hora || !formData.nombre_cliente) {
      toast.error('Por favor completa todos los campos obligatorios.', { icon: '⚠️' })
      setLoading(false)
      return
    }

    //Validación de cupos ANTES de guardar
    if (disponibilidad && formData.numero_personas > disponibilidad.disponibles) {
      toast.error(
        `Solo quedan ${disponibilidad.disponibles} lugares disponibles para este horario. Ajusta el número de personas o elige otro horario.`,
        { icon: '⚠️' }
      )
      setLoading(false)   
      return
    }

    // Guardar la reserva en la base de datos
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
      toast.error('Hubo un error al guardar la reservacion, intenta otra vez.')
    } else {
      toast.success('¡Reserva creada con éxito! Nos vemos en la pista.')
      // Limpiar el formulario
      setFormData({ servicio_id: '', fecha: '', hora: '', numero_personas: 1, nombre_cliente: '', telefono: '' })
      setDisponibilidad(null)
    }
    
    setLoading(false)
  }

  
  console.log('DEBUG - cargandoServicios:', cargandoServicios)
  console.log('DEBUG - servicios:', servicios)

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-red-950 py-20 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-2xl mx-auto">
        
        {/* Botón para volver al inicio (ahora animado) */}
        <motion.div variants={itemVariants}>
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
            Volver al Inicio
          </Link>
        </motion.div>

        {/* Título principal (animado) */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="text-red-500">RESERVA</span>
            <span className="text-white"> TU LUGAR</span>
          </h1>
          <p className="text-zinc-400 text-lg">
            Completa el formulario y asegura tu experiencia
          </p>
        </motion.div>

        {/* Panel de disponibilidad (animado) */}
        {disponibilidad && (
          <motion.div 
            className={`p-4 mb-6 rounded-lg border-2 ${
              disponibilidad.disponibles === 0 
                ? 'bg-red-900/30 border-red-500' 
                : disponibilidad.disponibles <= 3 
                  ? 'bg-yellow-900/30 border-yellow-500'
                  : 'bg-green-900/30 border-green-500'
            }`}
            variants={itemVariants}
          >
            {/* ... contenido del panel de disponibilidad ... */}
          </motion.div>
        )}

        {/* Formulario o Skeleton (animado) */}
                {/* Formulario o Skeleton (animado) */}
        <motion.div variants={itemVariants}>
          {cargandoServicios ? (
            <FormularioSkeleton />
          ) : (
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
                      {servicio.nombre} - {servicio.descripcion} (Cap: {servicio.capacidad_maxima})
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
                  max={disponibilidad?.disponibles || 100}
                  value={formData.numero_personas} 
                  onChange={handleChange} 
                  className="w-full bg-zinc-800 border-2 border-zinc-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                  required 
                />
                {disponibilidad && (
                  <p className="text-zinc-400 text-xs mt-1">
                    Máximo disponible: {disponibilidad.disponibles} personas
                  </p>
                )}
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
                disabled={loading || (disponibilidad?.disponibles === 0)}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-zinc-700 disabled:to-zinc-800 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition-all transform hover:scale-[1.02] disabled:transform-none shadow-lg shadow-red-600/30"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Procesando...
                  </span>
                ) : disponibilidad?.disponibles === 0 ? (
                  '🚫 Horario Agotado'
                ) : (
                  '🏁 CONFIRMAR RESERVA'
                )}
              </button>

            </form>
          )}
        </motion.div>

      </div>
    </motion.div>
  )
}