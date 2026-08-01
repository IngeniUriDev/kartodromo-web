// Componente reutilizable
// Un skeleton es una "caja" con animación que simula contenido cargando
// 'animate-pulse' de Tailwind crea el efecto de parpadeo suave

interface SkeletonProps {
  width?: string   // Ancho personalizado (ej: 'w-32')
  height?: string  // Alto personalizado (ej: 'h-4')
  rounded?: string // Bordes redondeados (ej: 'rounded-lg')
  className?: string // Clases adicionales
}

export default function Skeleton({ 
  width = 'w-full', 
  height = 'h-4', 
  rounded = 'rounded-md',
  className = '' 
}: SkeletonProps) {
  return (
    <div 
      className={`bg-zinc-800 animate-pulse ${width} ${height} ${rounded} ${className}`}
      role="status"
      aria-label="Cargando..."
    />
  )
}