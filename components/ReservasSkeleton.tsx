import Skeleton from './Skeleton'

// Este componente simula la tabla completa de reservas
// mientras los datos reales se cargan desde Supabase

export default function ReservasSkeleton() {
  return (
    <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
      {/* Encabezado de tabla simulado */}
      <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-zinc-800/50 border-b border-zinc-800">
        <div className="col-span-3"><Skeleton height="h-3" width="w-20" /></div>
        <div className="col-span-2"><Skeleton height="h-3" width="w-16" /></div>
        <div className="col-span-2"><Skeleton height="h-3" width="w-24" /></div>
        <div className="col-span-1"><Skeleton height="h-3" width="w-12" /></div>
        <div className="col-span-2"><Skeleton height="h-3" width="w-16" /></div>
        <div className="col-span-2"><Skeleton height="h-3" width="w-20" /></div>
      </div>

      {/* Filas simuladas (3 filas para dar sensación de lista) */}
      <div className="divide-y divide-zinc-800">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 md:grid md:grid-cols-12 md:gap-4 md:items-center">
            <div className="col-span-3 mb-2 md:mb-0">
              <Skeleton height="h-4" width="w-32" className="mb-2" />
              <Skeleton height="h-3" width="w-24" />
            </div>
            <div className="col-span-2 mb-2 md:mb-0">
              <Skeleton height="h-4" width="w-24" />
            </div>
            <div className="col-span-2 mb-2 md:mb-0">
              <Skeleton height="h-4" width="w-20" className="mb-1" />
              <Skeleton height="h-3" width="w-16" />
            </div>
            <div className="col-span-1 text-center mb-2 md:mb-0">
              <Skeleton height="h-4" width="w-8" className="mx-auto" />
            </div>
            <div className="col-span-2 text-center mb-3 md:mb-0">
              <Skeleton height="h-6" width="w-20" rounded="rounded-full" className="mx-auto" />
            </div>
            <div className="col-span-2 flex justify-center gap-2">
              <Skeleton height="h-8" width="w-10" rounded="rounded-lg" />
              <Skeleton height="h-8" width="w-10" rounded="rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}