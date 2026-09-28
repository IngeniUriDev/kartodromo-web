'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldAlert, Award } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: '¿Qué edad y estatura mínima se requiere para conducir los Go-Karts?',
      a: 'La estatura mínima para karts de adulto (270cc) es de 1.45 metros por razones de seguridad en el alcance a los pedales y volante. Para niños contamos con karts junior adaptados y velocidad controlada a partir de 1.20 metros acompañados por un tutor.',
    },
    {
      q: '¿Es necesario llevar casco propio o vestimenta especial?',
      a: 'Nosotros te proporcionamos casco integral higienizado y cofia protectora desechable sin costo adicional. Se recomienda llevar ropa cómoda y es OBLIGATORIO calzado cerrado (tenis o botas; prohibido el uso de sandalias, crocs o tacones). Si tienes casco propio de moto o automovilismo certificado DOT/ECE, puedes utilizarlo.',
    },
    {
      q: '¿Cómo funciona la compra de pases en línea y los boletos con QR?',
      a: 'Al comprar tu pase en esta web, se genera al instante tu Boleto Digital Oficial con código QR y número de orden. Puedes guardarlo en tu teléfono o mostrarlo directamente al llegar a taquilla / pits para ingresar a la pista sin demoras ni filas.',
    },
    {
      q: '¿Qué pasa si llueve el día de mi visita?',
      a: 'Si las condiciones climáticas impiden el rodaje seguro en pista, tu boleto o reserva tiene vigencia de hasta 30 días para reprogramar tu turno sin penalización alguna.',
    },
    {
      q: '¿Puedo llevar mi propia motocicleta para el Motódromo?',
      a: 'Sí, el Motódromo está diseñado específicamente para que ruedes con tu moto. Requerimos equipo completo: casco certificado, chamarra con protecciones, guantes y calzado adecuado. La pista cuenta con escapatorias de grava y personal de auxilio.',
    },
  ];

  return (
    <section className="py-24 bg-zinc-950/90 text-white border-t border-zinc-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-bold tracking-wider uppercase mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-red-500" /> Dudas Comunes
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            PREGUNTAS <span className="text-red-500">FRECUENTES</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Todo lo que necesitas saber antes de ponerte al volante en La Sabaneta.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-white hover:text-red-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-red-500 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''
                      }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-zinc-400 text-sm sm:text-base leading-relaxed border-t border-zinc-800/50 pt-4 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Banner de Seguridad FIA */}
        <div className="mt-12 bg-gradient-to-r from-red-950/40 via-zinc-900 to-zinc-900 border border-red-900/50 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-500/40 text-red-500 flex items-center justify-center flex-shrink-0">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <Award className="w-4 h-4 text-amber-400" /> Compromiso de Seguridad Máxima
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Todos los karts cuentan con bumpers perimetrales de absorción de impactos, cinturones de 4 puntos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
