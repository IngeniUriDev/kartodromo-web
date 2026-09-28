import Link from "next/link";
import { ShieldCheck, Flag, Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800/80 py-16 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Logo y descripción */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-600 text-white font-black text-lg">
                S
              </span>
              <span className="text-xl font-black text-white tracking-tight">
                KARTÓDROMO <span className="text-red-500">SABANETA</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
              El complejo de velocidad y deportes extremos más completo del Estado de México. 
              Circuito reglamentario de Go-Karts, pista para motos deportivas, gotcha táctico y restaurante de carnes asadas en La Marquesa.
            </p>
            <div className="flex items-center gap-4 text-xs text-zinc-400 pt-2">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Medidas de seguridad FIA</span>
              <span className="flex items-center gap-1.5"><Flag className="w-4 h-4 text-amber-400" /> Cronometraje digital</span>
            </div>
          </div>

          {/* Links rápidos */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Atracciones & Pista</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/#inicio" className="hover:text-red-400 transition-colors">Inicio</Link></li>
              <li><Link href="/#servicios" className="hover:text-red-400 transition-colors">Karts & Motódromo</Link></li>
              <li><Link href="/#paquetes" className="hover:text-red-400 transition-colors">Pases y Promociones</Link></li>
              <li><Link href="/comprar" className="hover:text-red-400 transition-colors font-medium text-red-400">Comprar Pases Online</Link></li>
              <li><Link href="/reservar" className="hover:text-red-400 transition-colors">Reservar Fecha</Link></li>
              <li><Link href="/#restaurante" className="hover:text-red-400 transition-colors">Menú Restaurante</Link></li>
            </ul>
          </div>

          {/* Redes y Admin */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Contacto & Staff</h4>
            <div className="flex gap-3 mb-6">
              {/* Instagram */}
              <a 
                href="https://www.instagram.com/kartodromo_sabaneta" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-zinc-900 border border-zinc-800 p-2.5 rounded-xl hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600 hover:text-white transition-all"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              
              {/* Facebook */}
              <a 
                href="https://www.facebook.com/KARTYMOTOSABANETA" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-zinc-900 border border-zinc-800 p-2.5 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>

            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-200 bg-zinc-900/60 px-3 py-1.5 rounded-lg border border-zinc-800/80 transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-zinc-400" />
              <span>Acceso Administrador</span>
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-zinc-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>&copy; {new Date().getFullYear()} Kartódromo & Motódromo La Sabaneta. Todos los derechos reservados.</p>
          <p className="text-zinc-400">La Marquesa, Estado de México</p>
        </div>
      </div>
    </footer>
  );
}