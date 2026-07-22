'use client'; // Necesitamos esto porque usaremos useState para el Lightbox

import { useState } from 'react';
import Image from 'next/image';
import { X, ZoomIn } from 'lucide-react';

export default function Gallery() {
  // Estado para controlar si el Lightbox (visor de imagen grande) está abierto
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Array de fotos (usamos imágenes de Unsplash como ejemplo realista)
  const fotos = [
    { id: 1, src: "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?w=800&q=80", alt: "Go-Kart en la pista", categoria: "Kartódromo" },
    { id: 2, src: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80", alt: "Moto de enduro en acción", categoria: "Motódromo" },
    { id: 3, src: "https://images.unsplash.com/photo-1596728328189-21669461727e?w=800&q=80", alt: "Jugadores de Gotcha", categoria: "Gotcha" },
    { id: 4, src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80", alt: "Restaurante y parrilla", categoria: "Restaurante" },
    { id: 5, src: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=800&q=80", alt: "Podio de ganadores", categoria: "Kartódromo" },
    { id: 6, src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80", alt: "Ambiente del restaurante", categoria: "Restaurante" },
  ];

  return (
    <section id="galeria" className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Encabezado */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            VIVE LA <span className="text-red-500">EXPERIENCIA</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Un vistazo a la adrenalina, la diversión y los mejores momentos en La Sabaneta.
          </p>
        </div>

        {/* Grid de Fotos (Mosaico) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fotos.map((foto) => (
            <div
              key={foto.id}
              onClick={() => setSelectedImage(foto.src)} // Al hacer clic, abre el Lightbox
              className="group relative aspect-video overflow-hidden rounded-xl cursor-pointer border border-zinc-800"
            >
              {/* Componente Image de Next.js: Optimiza automáticamente la imagen */}
              <Image
                src={foto.src}
                alt={foto.alt}
                fill // Ocupa todo el espacio del contenedor padre
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Overlay oscuro que aparece al pasar el mouse */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                <ZoomIn size={32} className="text-red-500" />
                <span className="text-white font-bold text-lg">{foto.categoria}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX (Visor de imagen en pantalla completa) */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)} // Cierra al hacer clic fuera de la imagen
        >
          {/* Botón de cerrar */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white hover:text-red-500 transition-colors"
          >
            <X size={40} />
          </button>

          {/* Imagen grande */}
          <div className="relative w-full max-w-5xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage}
              alt="Vista ampliada"
              fill
              className="object-contain rounded-lg"
              priority // Carga esta imagen con prioridad si el lightbox está abierto
            />
          </div>
        </div>
      )}
    </section>
  );
}