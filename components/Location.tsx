export default function Location() {
  return (
    <section id="ubicacion" className="py-20 bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            ¿DÓNDE <span className="text-red-500">ESTAMOS?</span>
          </h2>
          <p className="text-zinc-400 text-lg">Ven a vivir la experiencia.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Columna Izquierda: Información de contacto */}
          <div className="space-y-6 bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800">
            <div className="flex items-start gap-4">
              <div className="text-red-500 flex-shrink-0 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Dirección</h3>
                <p className="text-zinc-400">Av. Principal de la Sabaneta, Km 5.<br />Tu Ciudad, Tu País.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-red-500 flex-shrink-0 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Horarios</h3>
                <p className="text-zinc-400">
                  Viernes a Domingo: 10:00 AM - 8:00 PM<br />
                  Lunes a Jueves: Solo con reserva previa.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-red-500 flex-shrink-0 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Teléfono</h3>
                <p className="text-zinc-400">+54 9 11 0000-0000</p>
                <p className="text-sm text-zinc-500 mt-1">Llamadas y WhatsApp</p>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Mapa de Google + Botón de acción */}
          <div className="flex flex-col gap-4">
            {/* Contenedor del Mapa */}
            <div className="rounded-2xl overflow-hidden border border-zinc-800 h-80 lg:h-96 bg-zinc-900">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4701.875939190581!2d-99.3757394!3d19.307439699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cdf7acced4d44f%3A0x4ac92545ffacfd7f!2sKartodromo%20Sabaneta!5e1!3m2!1ses-419!2smx!4v1784748415862!5m2!1ses-419!2smx"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de ubicación"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              ></iframe>
            </div>

            {/* 👇 NUEVO: Botón para abrir en Google Maps */}
            <a 
              href="https://maps.app.goo.gl/TU_ENLACE_CORTO_AQUI" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-zinc-800 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 border border-zinc-700 hover:border-red-500 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:animate-bounce">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Abrir en Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}