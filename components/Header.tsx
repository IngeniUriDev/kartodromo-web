'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingBag, Calendar, Menu, X } from 'lucide-react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/85 backdrop-blur-md border-b border-zinc-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* LOGO */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2 group">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-800 text-white font-black text-xl shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform">
                  S
                </span>
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-tight text-white leading-none">
                    KARTÓDROMO <span className="text-red-500">SABANETA</span>
                  </span>
                  <span className="text-[10px] font-semibold tracking-widest text-zinc-400 uppercase">
                    Racing & Entertainment
                  </span>
                </div>
              </Link>
            </div>

            {/* MENÚ DE ESCRITORIO */}
            <nav className="hidden lg:flex items-center space-x-7">
              <Link href="/#inicio" className="text-zinc-300 hover:text-white transition-colors font-medium text-sm">
                Inicio
              </Link>
              <Link href="/#servicios" className="text-zinc-300 hover:text-white transition-colors font-medium text-sm">
                Atracciones
              </Link>
              <Link href="/#paquetes" className="text-zinc-300 hover:text-white transition-colors font-medium text-sm">
                Pases y Precios
              </Link>
              <Link href="/#restaurante" className="text-zinc-300 hover:text-white transition-colors font-medium text-sm">
                Restaurante
              </Link>
              <Link href="/#galeria" className="text-zinc-300 hover:text-white transition-colors font-medium text-sm">
                Galería
              </Link>
              <Link href="/#ubicacion" className="text-zinc-300 hover:text-white transition-colors font-medium text-sm">
                Ubicación
              </Link>
            </nav>

            {/* CTAs DERECHA */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/comprar"
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-red-600/25 flex items-center gap-2 hover:scale-[1.02]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Comprar Pases</span>
              </Link>
              <Link
                href="/reservar"
                className="bg-zinc-800/80 hover:bg-zinc-700 text-white border border-zinc-700/80 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-red-500" />
                <span>Reservar Fecha</span>
              </Link>
            </div>

            {/* BOTÓN HAMBURGUESA - MÓVIL */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-zinc-300 hover:text-white p-2 rounded-lg bg-zinc-900 border border-zinc-800"
              aria-label="Abrir menú"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      {menuOpen && (
        <div className="lg:hidden fixed top-20 left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-zinc-800 z-40 px-5 py-6 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/#inicio"
              className="text-zinc-300 hover:text-white py-2 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              href="/#servicios"
              className="text-zinc-300 hover:text-white py-2 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Atracciones
            </Link>
            <Link
              href="/#paquetes"
              className="text-zinc-300 hover:text-white py-2 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Pases y Precios
            </Link>
            <Link
              href="/#restaurante"
              className="text-zinc-300 hover:text-white py-2 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Restaurante
            </Link>
            <Link
              href="/#ubicacion"
              className="text-zinc-300 hover:text-white py-2 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Ubicación
            </Link>

            <div className="pt-4 border-t border-zinc-800 flex flex-col gap-3">
              <Link
                href="/comprar"
                className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold text-center flex items-center justify-center gap-2 shadow-lg shadow-red-600/30"
                onClick={() => setMenuOpen(false)}
              >
                <ShoppingBag className="w-4 h-4" />
                Comprar Pases Online
              </Link>
              <Link
                href="/reservar"
                className="bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-xl font-bold text-center flex items-center justify-center gap-2 border border-zinc-700"
                onClick={() => setMenuOpen(false)}
              >
                <Calendar className="w-4 h-4 text-red-500" />
                Reservar Horario
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}