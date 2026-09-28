import Link from "next/link";
import { Trophy, Crosshair, Utensils, PartyPopper, Bike, Flag, ArrowRight } from "lucide-react";

export default function Services() {
  const servicios = [
    {
      id: "karts",
      titulo: "Kartódromo",
      subtitulo: "Karts Honda 270cc",
      descripcion: "Go-karts de alta velocidad para niños, jóvenes y adultos. Circuito técnico con curvas peraltadas y telemetría digital.",
      icono: Trophy,
      badge: "Más Popular",
      color: "from-red-600/20 via-red-950/40 to-transparent",
      borde: "hover:border-red-500",
      cta: "Comprar Turno",
      link: "/comprar?tipo=karts",
    },
    {
      id: "motos",
      titulo: "Motódromo",
      subtitulo: "Pista Asfaltada",
      descripcion: "Acceso exclusivo para motociclistas y práctica de carreras deportivas en un circuito seguro con escapatorias de grava.",
      icono: Bike,
      badge: "Velocidad Pura",
      color: "from-amber-600/20 via-amber-950/40 to-transparent",
      borde: "hover:border-amber-500",
      cta: "Ver Tarifas",
      link: "/comprar?tipo=motos",
    },
    {
      id: "gotcha",
      titulo: "Campo Gotcha",
      subtitulo: "Escenario Táctico",
      descripcion: "Zona de combate paintball con trincheras, búnkers y obstáculos urbanos. Equipo completo de protección y marcadoras de precisión.",
      icono: Crosshair,
      badge: "Grupos y Retos",
      color: "from-emerald-600/20 via-emerald-950/40 to-transparent",
      borde: "hover:border-emerald-500",
      cta: "Reservar Gotcha",
      link: "/reservar",
    },
    {
      id: "restaurante",
      titulo: "Restaurante & Grill",
      subtitulo: "Zona de Pits",
      descripcion: "Menú parrillero mexicano, quesadillas, sopes, cortes y bebidas heladas con terraza panorámica hacia la pista de carreras.",
      icono: Utensils,
      badge: "Familiar",
      color: "from-orange-600/20 via-orange-950/40 to-transparent",
      borde: "hover:border-orange-500",
      cta: "Ver Menú",
      link: "/#restaurante",
    },
    {
      id: "eventos",
      titulo: "Eventos & Cumpleaños",
      subtitulo: "Paquetes Corporativos",
      descripcion: "Organiza torneos privados, cumpleaños o dinámicas de integración empresarial con podio de premiación, medallas y comida incluida.",
      icono: PartyPopper,
      badge: "Personalizable",
      color: "from-purple-600/20 via-purple-950/40 to-transparent",
      borde: "hover:border-purple-500",
      cta: "Cotizar Evento",
      link: "https://wa.me/527141087330?text=Hola!%20Me%20interesa%20cotizar%20un%20evento%20privado",
    },
  ];

  return (
    <section id="servicios" className="py-24 bg-zinc-950 text-white relative overflow-hidden">
      {/* Luz ambiental decorativa */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-red-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-800 text-red-400 text-xs font-bold tracking-wider uppercase mb-4">
            <Flag className="w-3.5 h-3.5" /> Adrenalina Total
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            NUESTRAS <span className="text-red-500">ATRACCIONES</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            El complejo de motor y entretenimiento más emocionante de La Marquesa. Diseñado para pilotos principiantes y avanzados.
          </p>
        </div>

        {/* Grid de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicios.map((servicio) => {
            const Icon = servicio.icono;

            return (
              <div
                key={servicio.id}
                className={`group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 p-7 transition-all duration-300 ${servicio.borde} hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-red-600/10 flex flex-col justify-between`}
              >
                {/* Gradiente sutil */}
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${servicio.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-14 h-14 rounded-xl bg-zinc-800/80 border border-zinc-700/80 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300">
                      {servicio.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-white mb-1 group-hover:text-red-400 transition-colors">
                    {servicio.titulo}
                  </h3>
                  <div className="text-xs font-bold uppercase tracking-wider text-red-500/90 mb-3">
                    {servicio.subtitulo}
                  </div>

                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {servicio.descripcion}
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  <Link
                    href={servicio.link}
                    className="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:text-red-400 transition-colors"
                  >
                    <span>{servicio.cta}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
