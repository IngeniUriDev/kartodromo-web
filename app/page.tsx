import Link from 'next/link';
import Services from '../components/Services';
import PackagesSection from '../components/PackagesSection';
import Location from '../components/Location';
import RestaurantMenu from '../components/RestaurantMenu';
import Gallery from '../components/Gallery';
import FaqSection from '../components/FaqSection';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import { ShoppingBag, Calendar, Gauge, ShieldCheck, Trophy, ChevronRight, Zap } from 'lucide-react';

export default function Home() {
  return (
    <>
      {/* SECCIÓN HERO - MOTORSPORT DARK MODE */}
      <main id="inicio" className="relative min-h-[92vh] bg-black text-white flex flex-col items-center justify-center px-4 pt-28 pb-20 overflow-hidden">

        {/* Fondo con patrones y degradados dinámicos */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/40 via-zinc-950/90 to-black pointer-events-none" />

        {/* Líneas de carreras decorativas */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        {/* Resplandor central rojo racing */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">

          {/* Badge Estado de Pista */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-bold uppercase tracking-wider text-zinc-300 mb-6 shadow-xl backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-emerald-500 -ml-4" />
            <span className="text-white">Pista Abierta</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400">La Marquesa, Edo. Méx.</span>
          </div>

          {/* Título Principal de Impacto */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-6">
            <span className="block text-white">SIENTE LA</span>
            <span className="block bg-gradient-to-r from-red-500 via-red-600 to-amber-500 bg-clip-text text-transparent">
              VELOCIDAD PURA
            </span>
          </h1>

          {/* Subtítulo descriptivo */}
          <p className="text-zinc-300 text-base sm:text-xl max-w-2xl mb-10 leading-relaxed font-light">
            El circuito de Go-Karts, Motódromo y Gotcha más emocionante de la región.
            Pista reglamentaria con telemetría en vivo, karts de alto rendimiento y restaurante de asados en pits.
          </p>

          {/* Botones de Acción (CTAs principales) */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14">
            <Link
              href="/comprar"
              className="w-full sm:w-auto bg-gradient-to-r from-red-600 via-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-base px-8 py-4 rounded-2xl shadow-xl shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 border border-red-500/30"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Comprar Pases Online</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>

            <Link
              href="/reservar"
              className="w-full sm:w-auto bg-zinc-900/90 hover:bg-zinc-800 text-white font-bold text-base px-8 py-4 rounded-2xl border border-zinc-700/80 hover:border-zinc-500 transition-all flex items-center justify-center gap-3 shadow-lg"
            >
              <Calendar className="w-5 h-5 text-red-500" />
              <span>Reservar Horario</span>
            </Link>
          </div>

          {/* Métricas y Stats de Pista */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 w-full max-w-4xl pt-8 border-t border-zinc-800/80">
            <div className="flex flex-col items-center p-3 rounded-2xl bg-zinc-950/60 border border-zinc-900">
              <div className="flex items-center gap-2 text-red-500 mb-1">
                <Gauge className="w-5 h-5" />
                <span className="text-2xl sm:text-3xl font-black text-white">850m</span>
              </div>
              <span className="text-xs text-zinc-400 font-medium">Longitud de Pista</span>
            </div>

            <div className="flex flex-col items-center p-3 rounded-2xl bg-zinc-950/60 border border-zinc-900">
              <div className="flex items-center gap-2 text-amber-500 mb-1">
                <Zap className="w-5 h-5" />
                <span className="text-2xl sm:text-3xl font-black text-white">270cc</span>
              </div>
              <span className="text-xs text-zinc-400 font-medium">Karts Honda 4T</span>
            </div>

            <div className="flex flex-col items-center p-3 rounded-2xl bg-zinc-950/60 border border-zinc-900">
              <div className="flex items-center gap-2 text-emerald-500 mb-1">
                <Trophy className="w-5 h-5" />
                <span className="text-2xl sm:text-3xl font-black text-white">Compite</span>
              </div>
              <span className="text-xs text-zinc-400 font-medium">Personal de apoyo</span>
            </div>

            <div className="flex flex-col items-center p-3 rounded-2xl bg-zinc-950/60 border border-zinc-900">
              <div className="flex items-center gap-2 text-purple-500 mb-1">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-2xl sm:text-3xl font-black text-white">100%</span>
              </div>
              <span className="text-xs text-zinc-400 font-medium">Seguridad y Cascos</span>
            </div>
          </div>

        </div>

      </main>

      {/* SECCIONES DEL SITIO */}
      <Services />
      <PackagesSection />
      <Gallery />
      <FaqSection />
      <Location />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}