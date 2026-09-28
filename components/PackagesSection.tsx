'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Trophy, Zap, Users, Flame, Check, ArrowRight, Shield } from 'lucide-react';

export default function PackagesSection() {
  const [tab, setTab] = useState<'individual' | 'grupos'>('individual');

  const pasesIndividuales = [
    {
      id: 'sprint-kart',
      nombre: 'Pase Sprint Karts',
      categoria: 'Go-Karts 270cc',
      precio: '$250',
      periodo: 'por persona',
      badge: 'Básico',
      descripcion: 'Prueba tu destreza al volante en una sesión rápida y llena de emoción.',
      caracteristicas: [
        '1 Carrera individual (10 minutos en pista)',
        'Karts Honda 270cc regulados',
        'Casco integral desinfectado y cofia',
        'Hoja de cronometraje y tiempos de vuelta',
        'Briefing de seguridad con banderas',
      ],
      destacado: false,
      cta: 'Comprar Turno',
    },
    {
      id: 'gran-premio',
      nombre: 'Grand Prix Experience',
      categoria: 'Experiencia Pro',
      precio: '$480',
      periodo: 'por persona',
      badge: 'El Más Vendido',
      descripcion: 'El formato de competencia real: clasificación por pole position y carrera final.',
      caracteristicas: [
        '5 minutos de práctica y clasificación (Pole)',
        '12 minutos de carrera final de parrilla',
        'Ceremonia de podio para los 3 primeros lugares',
        'Telemetría en tiempo real por vuelta',
        'Equipo completo de protección incluido',
      ],
      destacado: true,
      cta: 'Comprar Experiencia',
    },
    {
      id: 'track-day-motos',
      nombre: 'Pase Track Day Motos',
      categoria: 'Motódromo',
      precio: '$380',
      periodo: 'por moto / día',
      badge: 'Pilotos con Moto Propia',
      descripcion: 'Acceso a circuito pavimentado con curvas técnicas para pulir tu técnica de curveo.',
      caracteristicas: [
        'Acceso libre durante todo el turno',
        'Circuito con escapatorias de grava seguras',
        'Área de pits y sombras para ajustes mecánicos',
        'Personal de pista y primeros auxilios',
        'Ideal para cilindradas 150cc a 400cc',
      ],
      destacado: false,
      cta: 'Comprar Pase Moto',
    },
  ];

  const pasesGrupales = [
    {
      id: 'combo-adrenalina',
      nombre: 'Combo Karting + Gotcha',
      categoria: 'Doble Aventura',
      precio: '$590',
      periodo: 'por persona (mín. 4)',
      badge: 'Ahorro 25%',
      descripcion: 'La combinación favorita: competencia en la pista y combate táctico de paintball.',
      caracteristicas: [
        '10 minutos de Go-Karts en pista',
        'Gotcha con 100 cápsulas de pintura',
        'Careta térmica, chaleco y marcadora Tippmann',
        'Árbitro y dinámicas tácticas de juego',
        '1 Bebida hidratante por jugador',
      ],
      destacado: true,
      cta: 'Comprar Combo',
    },
    {
      id: 'torneo-empresarial',
      nombre: 'Torneo Pits & Amigos',
      categoria: 'Grupos (8 a 20 pers.)',
      precio: '$850',
      periodo: 'por persona',
      badge: 'Completo',
      descripcion: 'Ideal para celebraciones, despedidas y eventos de integración empresarial.',
      caracteristicas: [
        'Pista exclusiva reservada por 1 hora',
        'Torneo oficial con semifinales y final',
        'Trofeos y medallas para el podio',
        'Parrillada al carbón en restaurante de pits',
        'Fotografías digitales del evento',
      ],
      destacado: false,
      cta: 'Reservar Grupo',
    },
  ];

  const listaActual = tab === 'individual' ? pasesIndividuales : pasesGrupales;

  return (
    <section id="paquetes" className="py-24 bg-zinc-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-800 text-red-400 text-xs font-bold tracking-wider uppercase mb-4">
            <Zap className="w-3.5 h-3.5" /> Compra Online y Ahorra Tiempo
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            PASES Y <span className="text-red-500">TARIFAS</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Compra tus pases digitales con anticipación. Llega directo a los pits, escanea tu boleto QR y salta a la pista sin filas.
          </p>

          {/* Toggle de Pestañas */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-zinc-900 border border-zinc-800">
            <button
              onClick={() => setTab('individual')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                tab === 'individual'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Trophy className="w-4 h-4" />
              Pases Individuales
            </button>
            <button
              onClick={() => setTab('grupos')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                tab === 'grupos'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              Combos & Grupos
            </button>
          </div>
        </div>

        {/* Tarjetas de Precios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {listaActual.map((item) => (
            <div
              key={item.id}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                item.destacado
                  ? 'bg-gradient-to-b from-zinc-900 via-zinc-900/90 to-red-950/40 border-2 border-red-500 shadow-2xl shadow-red-600/20 scale-[1.02]'
                  : 'bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {item.destacado && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-red-600 text-white text-xs font-black uppercase tracking-wider shadow-md flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  {item.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                    {item.categoria}
                  </span>
                  {!item.destacado && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
                      {item.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-black text-white mb-2">{item.nombre}</h3>
                <p className="text-zinc-400 text-xs sm:text-sm mb-6 leading-relaxed">
                  {item.descripcion}
                </p>

                <div className="mb-6 flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                    {item.precio}
                  </span>
                  <span className="text-zinc-400 text-xs sm:text-sm">MXN / {item.periodo}</span>
                </div>

                <div className="space-y-3 mb-8 pt-6 border-t border-zinc-800/80">
                  <div className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                    ¿Qué incluye?
                  </div>
                  {item.caracteristicas.map((caract, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                      <div className="w-4 h-4 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{caract}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Link
                  href={`/comprar?plan=${item.id}`}
                  className={`w-full py-4 px-6 rounded-xl font-black text-sm text-center flex items-center justify-center gap-2 transition-all ${
                    item.destacado
                      ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/40 hover:scale-[1.02]'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 hover:border-zinc-600'
                  }`}
                >
                  <span>{item.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-zinc-400">
                  <Shield className="w-3 h-3 text-emerald-400" />
                  <span>Boleto digital inmediato con QR</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
