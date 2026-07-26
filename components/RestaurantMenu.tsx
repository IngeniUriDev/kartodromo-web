export default function RestaurantMenu() {
  // 🧠 Estructura de datos: Un array de categorías, cada una con sus platos
  const menu = [
    {
      categoria: "Individuales",
      icono: "🍔",
      platos: [
        { nombre: "Quesadilla", desc: "Queso, Pollo, Quitlacoche, Hongos.", precio: "$35.00" },
        { nombre: "Tlacollo", desc: "Queso, Pollo, Quitlacoche, Hongos.", precio: "$35.00" },
        { nombre: "Sopes", desc: "Queso, Pollo, Quitlacoche, Hongos,Chorizo Rojo, Chorizo Verde, Cecina Natural, Cecina adobada.", precio: "$40.00" },
        { nombre: "Taco", desc: "Chorizo Rojo, Chorizo Verde, Cecina Natural, Cecina adobada, Cebollas y Nopales", precio: "$40.00" },
      ]
    },
    {
      categoria: "Paquetes",
      icono: "🥩",
      platos: [
        { nombre: "Piloto", desc: "Chorizo Rojo, Chorizo Verde, Cecina Natural, Cecina adobada, Cebollas y Nopales (para 2 personas).", precio: "$350.00" },
        { nombre: "Pits 1", desc: "Chorizo Rojo, Chorizo Verde, Cecina Natural, Cecina adobada, Cebollas y Nopales (para 4 personas).", precio: "$550.00" },
        { nombre: "Pits 2", desc: "Chorizo Rojo, Chorizo Verde, Cecina Natural, Cecina adobada, Cebollas y Nopales (para 8 personas).", precio: "$800.00" },
      ]
    },
    {
      categoria: "Bebidas",
      icono: "🍺",
      platos: [
        { nombre: "Cerveza 355 ml.", desc: "Corona, Victoria, Indio, Tecate, Modelo.", precio: "$50.00" },
        { nombre: "Cerveza 1.2 L.", desc: "Corona, Victoria, Indio, Tecate, Modelo.", precio: "$120.00" },
        { nombre: "Refrescos", desc: "Coca-Cola, Sprite, Agua mineral.", precio: "$30.00" },
        { nombre: "Mojito", desc: "Ron, hierbabuena, lima y soda.", precio: "$60.00" },
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