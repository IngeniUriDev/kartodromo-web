import Skeleton from './Skeleton'

//Simula el formulario de reservas mientras carga los servicios

export default function FormularioSkeleton() {
  return (
    <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-2xl p-8 shadow-2xl">
      {/* Título del formulario */}
      <Skeleton height="h-6" width="w-48" className="mb-6" />
      
      {/* Campo Actividad */}
      <Skeleton height="h-3" width="w-32" className="mb-2" />
      <Skeleton height="h-12" width="w-full" rounded="rounded-lg" className="mb-6" />
      
      {/* Fecha y Hora (en fila) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <Skeleton height="h-3" width="w-24" className="mb-2" />
          <Skeleton height="h-12" width="w-full" rounded="rounded-lg" />
        </div>
        <div>
          <Skeleton height="h-3" width="w-20" className="mb-2" />
          <Skeleton height="h-12" width="w-full" rounded="rounded-lg" />
        </div>
      </div>
      
      {/* Número de personas */}
      <Skeleton height="h-3" width="w-40" className="mb-2" />
      <Skeleton height="h-12" width="w-full" rounded="rounded-lg" className="mb-6" />
      
      {/* Nombre completo */}
      <Skeleton height="h-3" width="w-36" className="mb-2" />
      <Skeleton height="h-12" width="w-full" rounded="rounded-lg" className="mb-6" />
      
      {/* Teléfono */}
      <Skeleton height="h-3" width="w-24" className="mb-2" />
      <Skeleton height="h-12" width="w-full" rounded="rounded-lg" className="mb-6" />
      
      {/* Botón de enviar */}
      <Skeleton height="h-14" width="w-full" rounded="rounded-lg" />
    </div>
  )
}