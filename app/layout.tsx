import type { Metadata } from 'next'
import './globals.css'
import Header from '../components/Header'

//  Importar el proveedor de toasts
// Toaster es el componente que "renderiza" todas las notificaciones
// Debe estar presente UNA sola vez en toda la app (por eso va en layout.tsx)
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'La Sabaneta - Kartódromo y Motódromo',
  description: 'Go-karts, Motódromo, Gotcha y restaurante en Sabaneta',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-black text-white">
        <Header />
        
        {/* Toaster global */}
        {/* position: "top-right" = aparece arriba a la derecha */}
        {/* toastOptions = configura el estilo por defecto de todos los toasts */}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000, // 4 segundos visible
            style: {
              background: '#18181b', // Fondo oscuro (zinc-900)
              color: '#fff', // Texto blanco
              border: '1px solid #3f3f46', // Borde sutil
            },
            success: {
              iconTheme: {
                primary: '#22c55e', // Icono verde para éxito
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444', // Icono rojo para error
                secondary: '#fff',
              },
            },
          }}
        />
        
        {children}
      </body>
    </html>
  )
}