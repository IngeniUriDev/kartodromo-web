'use client' // 👈 ¡IMPORTANTE! Esto le dice a Next.js que este componente necesita interactividad (useState, onClick, etc.)

import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function ReservarPage() {
  // 1. Estados para controlar la interfaz
  const [loading, setLoading] = useState(false)
  const [mensaje, setMensaje] = useState('')

  // 2. Estado para guardar lo que el usuario escribe en el formulario
  const [formData, setFormData] = useState({
    servicio_id: '', 
    fecha: '',
    hora: '',
    numero_personas: 1,
    nombre_cliente: '',
    telefono: ''
  })

  // 3. Función que actualiza el estado cuando el usuario escribe
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // 4. Función que se ejecuta al hacer clic en "Confirmar Reserva"
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Evita que la página se recargue al enviar
    setLoading(true)
    setMensaje('')

    // Validación básica
    if (!formData.servicio_id || !formData.fecha || !formData.hora || !formData.nombre_cliente) {
      setMensaje('⚠️ Por favor completa todos los campos obligatorios.')
      setLoading(false)
      return
    }

    // 🚀 AQUÍ OCURRE LA MAGIA: Enviamos los datos a Supabase (Como enviar un mensaje a un Topic de Kafka)
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
          estado: 'pendiente' // Estado inicial por defecto
        }
      ])

    // 5. Manejamos la respuesta de la base de datos
    if (error) {
      console.error('Error al reservar:', error)
      setMensaje('❌ Hubo un error al guardar la reserva. Revisa la consola.')
    } else {
      setMensaje('✅ ¡Reserva creada con éxito! Nos vemos en la pista.')
      // Limpiamos el formulario para una nueva reserva
      setFormData({ servicio_id: '', fecha: '', hora: '', numero_personas: 1, nombre_cliente: '', telefono: '' })
    }
    
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🏎️ Reserva tu lugar</h1>
      
      {/* Mostrar mensaje de éxito o error */}
      {mensaje && (
        <div className={`p-4 mb-4 rounded-lg text-center font-medium ${mensaje.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {mensaje}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-md">
        
        {/* Campo: Actividad */}
        <div>
          <label className="block text-sm font-medium mb-1">Actividad *</label>
          <select 
            name="servicio_id" 
            value={formData.servicio_id} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500"
            required
          >
            <option value="">Selecciona una actividad</option>
            {/* ⚠️ NOTA: En un siguiente paso, llenaremos esto automáticamente desde la BD. 
                Por ahora, ve a Supabase > Table Editor > servicios, copia los "id" (UUID) 
                de cada servicio y pégalos aquí en los "value". */}
            <option value="2ed52812-24da-4fd9-925d-6a50cfbd33c9">Kartódromo</option>
            <option value="b24dccbe-10ae-4aac-b356-4d85513a47de">Motódromo</option>
            <option value="b6e79d87-4a81-4aac-9c04-49b52e8e1cdc">Gotcha</option>
          </select>
        </div>

        {/* Campos: Fecha y Hora */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Fecha *</label>
            <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Hora *</label>
            <input type="time" name="hora" value={formData.hora} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
          </div>
        </div>

        {/* Campo: Personas */}
        <div>
          <label className="block text-sm font-medium mb-1">Número de personas *</label>
          <input type="number" name="numero_personas" min="1" value={formData.numero_personas} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
        </div>

        {/* Campo: Nombre */}
        <div>
          <label className="block text-sm font-medium mb-1">Nombre completo *</label>
          <input type="text" name="nombre_cliente" value={formData.nombre_cliente} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" placeholder="Ej: Juan Pérez" required />
        </div>

        {/* Campo: Teléfono */}
        <div>
          <label className="block text-sm font-medium mb-1">Teléfono (Opcional)</label>
          <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" placeholder="Ej: 55 1234 5678" />
        </div>

        {/* Botón de Enviar */}
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? '⏳ Guardando en la base de datos...' : '🏁 Confirmar Reserva'}
        </button>
      </form>
    </div>
  )
}