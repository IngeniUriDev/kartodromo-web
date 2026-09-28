import { UtensilsCrossed, Sparkles } from "lucide-react";

export default function RestaurantMenu() {
  const menu = [
    {
      categoria: "Antojitos Tradicionales",
      icono: "🌮",
      platos: [
        { nombre: "Quesadilla Tradicional", desc: "Tortilla hecha a mano, queso Oaxaca, pollo, huitlacoche o champiñones.", precio: "$35.00" },
        { nombre: "Tlacoyo Campirano", desc: "Masa azul o blanca, relleno de haba, requesón o frijol con nopales y queso.", precio: "$35.00" },
        { nombre: "Sopes con Cecina o Chorizo", desc: "Chorizo rojo o verde de Toluca, cecina natural o adobada con frijoles refritos.", precio: "$45.00" },
        { nombre: "Taco Parrillero", desc: "Cecina de Yecapixtla, chorizo artesanal, cebollitas cambray y nopales asados.", precio: "$45.00" },
      ]
    },
    {
      categoria: "Parrilladas y Paquetes de Pits",
      icono: "🥩",
      platos: [
        { nombre: "Parrillada Piloto (2 Personas)", desc: "Cecina natural y adobada, chorizo verde y rojo, queso fundido, nopales y cebollas.", precio: "$380.00" },
        { nombre: "Parrillada Pits 1 (4 Personas)", desc: "1 kg de cortes mixtos, choricería artesanal, quesadillas al centro y guarnición campestre.", precio: "$620.00" },
        { nombre: "Parrillada Grand Prix (8 Personas)", desc: "Banquete completo para escuderías: carnes selectas, tortillas ilimitadas, salsas molcajeteadas.", precio: "$980.00" },
      ]
    },
    {
      categoria: "Bebidas y Refrescantes",
      icono: "🍺",
      platos: [
        { nombre: "Cerveza Nacional (355 ml)", desc: "Corona, Victoria, Modelo Especial, Negra Modelo, Pacífico.", precio: "$50.00" },
        { nombre: "Caguama Familiar (1.2 L)", desc: "Bien fría para compartir después de una carrera intensa.", precio: "$130.00" },
        { nombre: "Refrescos y Aguas de Sabor", desc: "Coca-Cola, Sprite, Sidral Mundet, agua mineral y aguas frescas del día.", precio: "$35.00" },
        { nombre: "Michelada / Ojo Rojo Especial", desc: "Preparado con salsas negras de la casa, limón recién exprimido y sal de grano.", precio: "$75.00" },
      ]
    }
  ];

  return (
    <section id="restaurante" className="py-24 bg-black text-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-950/60 border border-orange-800 text-orange-400 text-xs font-bold tracking-wider uppercase mb-4">
            <UtensilsCrossed className="w-3.5 h-3.5" /> Sabor de Pista
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            ZONA DE <span className="text-red-500">PITS & GRILL</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Recarga combustible con nuestra cocina típica y asados al carbón con vista panorámica al circuito.
          </p>
        </div>

        {/* Categorías */}
        <div className="space-y-16">
          {menu.map((seccion, index) => (
            <div key={index} className="bg-zinc-950/80 border border-zinc-850 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-8 border-b border-zinc-800 pb-4">
                <span className="text-3xl">{seccion.icono}</span>
                <h3 className="text-2xl font-black text-white">{seccion.categoria}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-7">
                {seccion.platos.map((plato, idx) => (
                  <div key={idx} className="group">
                    <div className="flex justify-between items-baseline mb-1.5">
                      <h4 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                        {plato.nombre}
                      </h4>
                      <span className="flex-grow border-b border-dashed border-zinc-800 mx-3 mb-1"></span>
                      <span className="text-lg font-black text-red-500">{plato.precio}</span>
                    </div>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                      {plato.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Nota */}
        <div className="mt-12 text-center bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800 text-sm text-zinc-300 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>¿Tienes alguna restricción alimentaria o evento especial? Avisa a nuestro mesero y con gusto adaptamos tu orden.</span>
        </div>
      </div>
    </section>
  );
}