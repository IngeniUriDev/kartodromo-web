import { MapPin, Clock, Phone, Navigation } from "lucide-react";

export default function Location() {
  return (
    <section id="ubicacion" className="py-24 bg-zinc-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-800 text-red-400 text-xs font-bold tracking-wider uppercase mb-4">
            <MapPin className="w-3.5 h-3.5" /> Encuéntranos Fácilmente
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            ¿CÓMO <span className="text-red-500">LLEGAR?</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            A solo 25 minutos de Santa Fe (CDMX) y 20 minutos de Toluca, en el corazón verde de La Marquesa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Información de contacto */}
          <div className="lg:col-span-5 space-y-6 bg-zinc-900/60 p-8 rounded-2xl border border-zinc-800">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-950/80 border border-red-800/80 text-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Ubicación de la Pista</h3>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  Av. Principal de La Sabaneta, Km 5.<br />
                  Parque Nacional La Marquesa, Ocoyoacac, Estado de México.
                </p>
                <span className="inline-block mt-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-2.5 py-0.5 rounded-md">
                  Estacionamiento gratuito vigilado
                </span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-zinc-800 text-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Horarios de Operación</h3>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  <strong className="text-white">Viernes a Domingo y Días Festivos:</strong> 10:00 AM – 8:00 PM<br />
                  <strong className="text-white">Martes a Jueves:</strong> Solo grupos privados y eventos con reserva previa.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-zinc-800 text-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Atención y Reservaciones</h3>
                <p className="text-zinc-300 text-sm font-semibold">+52 (714) 108-7330</p>
                <p className="text-xs text-zinc-500 mt-0.5">Atención telefónica y WhatsApp todos los días</p>
              </div>
            </div>
          </div>

          {/* Mapa de Google */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="rounded-2xl overflow-hidden border border-zinc-800 h-80 lg:h-96 bg-zinc-900 shadow-2xl relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4701.875939190581!2d-99.3757394!3d19.307439699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cdf7acced4d44f%3A0x4ac92545ffacfd7f!2sKartodromo%20Sabaneta!5e1!3m2!1ses-419!2smx!4v1784748415862!5m2!1ses-419!2smx"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de ubicación Kartódromo Sabaneta"
                className="grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
              />
            </div>

            <a 
              href="https://www.google.com/maps/search/?api=1&query=Kartodromo+Sabaneta+La+Marquesa" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-zinc-900 hover:bg-red-600 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 border border-zinc-800 hover:border-red-500 group shadow-lg"
            >
              <Navigation className="w-5 h-5 group-hover:animate-pulse text-red-500 group-hover:text-white" />
              <span>Abrir Navegación en Google Maps / Waze</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}