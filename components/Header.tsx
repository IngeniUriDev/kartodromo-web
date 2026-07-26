'use client'; // Esto le dice a Next.js que este componente es interactivo (usa JavaScript del lado del cliente)

import Link from 'next/link'; // Importamos Link para navegación interna

import { useState } from 'react'; // Importamos useState para manejar el menú móvil

export default function Header() {
  // useState crea una variable de estado 'menuOpen' y una función 'setMenuOpen' para cambiarla
  // menuOpen empieza en false (menú cerrado)
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* HEADER PRINCIPAL */}
      {/* 'fixed' lo mantiene fijo arriba aunque hagas scroll. 'top-0' lo pega al borde superior. */}
      {/* 'z-50' asegura que esté por encima de todo (z-index). */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-zinc-800">

        {/* Contenedor interno para centrar el contenido */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* LOGO */}
            <div className="flex-shrink-0">
              <a href="/" className="text-2xl font-black tracking-tighter">
                <span className="text-red-500">LA </span>

                <span className="text-white"> SABANETA</span>
              </a>
            </div>

            {/* MENÚ DE NAVEGACIÓN - ESCRITORIO */}
            {/* 'hidden md:flex' significa: oculto en móvil, visible como flex en pantallas medianas+ */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#inicio" className="text-zinc-300 hover:text-white hover:text-red-500 transition-colors font-medium">
                Inicio
              </a>
              <a href="#servicios" className="text-zinc-300 hover:text-white hover:text-red-500 transition-colors font-medium">
                Servicios
              </a>
              <a href="#restaurante" className="text-zinc-300 hover:text-white hover:text-red-500 transition-colors font-medium">
                Restaurante
              </a>
              <a href="#ubicacion" className="text-zinc-300 hover:text-white hover:text-red-500 transition-colors font-medium">
                Ubicación
              </a>
              <Link
                href="/reservar"
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold transition-colors"
              >
                Reservar
              </Link>
            </nav>

            {/* BOTÓN HAMBURGUESA - MÓVIL */}
            {/* 'md:hidden' significa: visible solo en móvil, oculto en pantallas medianas+ */}
            <button
              onClick={() => setMenuOpen(!menuOpen)} // Al hacer clic, cambia menuOpen de true a false (y viceversa)
              className="md:hidden text-white p-2"
            >
              {/* Ícono de hamburguesa (3 líneas) */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      {/* Solo se muestra cuando menuOpen es true. 'md:hidden' lo oculta en escritorio. */}
      {menuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-black/95 backdrop-blur-md border-b border-zinc-800 z-40">
          <nav className="flex flex-col px-4 py-4 space-y-3">
            <a
              href="#inicio"
              className="text-zinc-300 hover:text-white hover:text-red-500 transition-colors font-medium py-2"
              onClick={() => setMenuOpen(false)} // Cierra el menú al hacer clic
            >
              Inicio
            </a>
            <a
              href="#servicios"
              className="text-zinc-300 hover:text-white hover:text-red-500 transition-colors font-medium py-2"
              onClick={() => setMenuOpen(false)}
            >
              Servicios
            </a>
            <a
              href="#restaurante"
              className="text-zinc-300 hover:text-white hover:text-red-500 transition-colors font-medium py-2"
              onClick={() => setMenuOpen(false)}
            >
              Restaurante
            </a>
            <a
              href="#ubicacion"
              className="text-zinc-300 hover:text-white hover:text-red-500 transition-colors font-medium py-2"
              onClick={() => setMenuOpen(false)}
            >
              Ubicación
            </a>
            <a
              href="https://wa.me/5491100000000"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-bold text-center transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Reservar
            </a>
          </nav>
        </div>
      )}
    </>
  );
}