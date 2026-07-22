export default function RestaurantMenu() {
  // 🧠 Estructura de datos: Un array de categorías, cada una con sus platos
  const menu = [
    {
      categoria: "Hamburguesas Artesanales",
      icono: "🍔",
      platos: [
        { nombre: "La Sabaneta Clásica", desc: "Carne 200g, cheddar fundido, bacon crocante y cebolla crispy.", precio: "$8.500" },
        { nombre: "Doble Adrenalina", desc: "Doble carne smash, doble cheddar, salsa secreta de la casa.", precio: "$11.200" },
        { nombre: "Veggie Racer", desc: "Medallón de lentejas y quinoa, palta, tomate y mayonesa de albahaca.", precio: "$7.800" },
      ]
    },
    {
      categoria: "Parrilla & Picadas",
      icono: "🥩",
      platos: [
        { nombre: "Picada La Sabaneta", desc: "Quesos, fiambres, salame, aceitunas y pan casero (para 2 personas).", precio: "$12.000" },
        { nombre: "Choripán de la Pista", desc: "Chorizo criollo, chimichurri casero y salsa criolla.", precio: "$4.500" },
        { nombre: "Empanadas de Carne (x6)", desc: "Cortadas a cuchillo, fritas o al horno.", precio: "$5.400" },
      ]
    },
    {
      categoria: "Bebidas & Tragos",
      icono: "🍺",
      platos: [
        { nombre: "Cerveza Artesanal (Pinta)", desc: "Rubia, Roja o IPA de cervecería local.", precio: "$3.200" },
        { nombre: "Gaseosas / Agua", desc: "Coca-Cola, Sprite, Agua mineral (500ml).", precio: "$1.500" },
        { nombre: "Mojito de la Casa", desc: "Ron, hierbabuena, lima y soda.", precio: "$4.800" },
      ]
    }
  ];

  return (
    <section id="restaurante" className="py-20 bg-zinc-950 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado de la sección */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            NUESTRO <span className="text-red-500">MENÚ</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Recarga energías con lo mejor de nuestra cocina. Sabores que combinan perfecto con la adrenalina.
          </p>
        </div>

        {/* Recorremos las categorías */}
        <div className="space-y-16">
          {menu.map((seccion, index) => (
            <div key={index}>
              {/* Título de la categoría */}
              <div className="flex items-center gap-3 mb-8 border-b border-zinc-800 pb-4">
                <span className="text-3xl">{seccion.icono}</span>
                <h3 className="text-2xl md:text-3xl font-bold text-white">{seccion.categoria}</h3>
              </div>

              {/* Lista de platos de esta categoría */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {seccion.platos.map((plato, idx) => (
                  <div key={idx} className="group">
                    <div className="flex justify-between items-baseline mb-2">
                      <h4 className="text-xl font-bold text-white group-hover:text-red-500 transition-colors">
                        {plato.nombre}
                      </h4>
                      {/* Línea punteada decorativa entre el nombre y el precio */}
                      <span className="flex-grow border-b border-dashed border-zinc-700 mx-4 mb-1"></span>
                      <span className="text-xl font-bold text-red-500">{plato.precio}</span>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {plato.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Nota al pie del menú */}
        <div className="mt-16 text-center bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
          <p className="text-zinc-300">
            🏁 <span className="font-bold text-white">¿Tienes alergias o restricciones?</span> Avísa a nuestro mezero y con gusto adaptamos tu plato.
          </p>
        </div>
      </div>
    </section>
  );
}