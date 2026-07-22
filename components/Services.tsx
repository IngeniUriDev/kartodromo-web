import {Trophy, Crosshair, Utensils, PartyPopper, Motorbike} from "lucide-react";


export default function Services() {
     const servicios = [
    {
      id: 1,
      titulo: "Kartódromo",
      descripcion: "Go-karts de alta velocidad para todas las edades. Pista profesional con curvas emocionantes.",
      icono: <Trophy />,
      color: "from-red-600 to-red-900", // Degradado rojo para el fondo
    },
    {
      id: 2,
      titulo: "Motódromo",
      descripcion: "Pista de tierra para motos de enduro y cross. Adrenalina pura sobre dos ruedas.",
      icono: <Motorbike />,
      color: "from-yellow-500 to-orange-700", // Degradado amarillo/naranja
    },
    {
      id: 3,
      titulo: "Gotcha",
      descripcion: "Zona de paintball con escenarios tácticos. Ideal para grupos, cumpleaños y empresas.",
      icono: <Crosshair />,
      color: "from-green-600 to-green-900", // Degradado verde militar
    },
    {
      id: 4,
      titulo: "Restaurante",
      descripcion: "Menú variado con hamburguesas, parrilla y bebidas. Perfecto para recargar energías.",
      icono: <Utensils />,
      color: "from-zinc-700 to-zinc-900", // Degradado gris oscuro
    },
    {
      id: 4,
      titulo: "Otros servicios",
      descripcion: "Menú variado con hamburguesas, parrilla y bebidas. Perfecto para recargar energías.",
      icono: <PartyPopper />,
      color: "from-zinc-700 to-zinc-900", // Degradado gris oscuro
    },
  ];

  return (
    // Sección completa con padding vertical (py-20) y fondo negro
    <section id="servicios" className="py-20 bg-black text-white">
      
      {/* Contenedor centrado con ancho máximo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TÍTULO DE SECCIÓN */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            NUESTROS <span className="text-red-500">SERVICIOS</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Más que una pista, somos un centro de entretenimiento completo. Elige tu aventura.
          </p>
        </div>

        {/* CONCEPTO CLAVE: .map() */}
        {/* Recorremos el array 'servicios' y por cada elemento creamos una tarjeta */}
        {/* 'key={servicio.id}' es obligatorio en React para identificar cada elemento de la lista */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicios.map((servicio) => {
            const Icono = servicio.icono;

            return (
            <div
              key={servicio.id}
              className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all duration-300 hover:border-red-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/20"
            >
              {/* Fondo con degradado que aparece al hacer hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${servicio.color} opacity-0 transition-opacity duration-300 group-hover:opacity-20`}></div>
              
              {/* Contenido de la tarjeta (por encima del fondo) */}
              <div className="relative z-10">
                {/* Ícono grande */}
                <div className="text-6xl mb-4 transform transition-transform duration-300 group-hover:scale-110">
                  {servicio.icono}
                </div>
                
                {/* Título */}
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-red-400 transition-colors">
                  {servicio.titulo}
                </h3>
                
                {/* Descripción */}
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {servicio.descripcion}
                </p>
                
                {/* Botón "Ver más" que aparece al hacer hover */}
                <div className="mt-4 text-red-500 font-semibold opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  Ver más →
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );

}
