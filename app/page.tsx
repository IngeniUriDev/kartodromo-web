import Header from '../components/Header';
import Services from '../components/Services';
import Location from '../components/Location';
import RestaurantMenu from '../components/RestaurantMenu';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

export default function Home() {
  return (
    <>
      {/* 1. El Header va primero y fijo arriba */}
      <Header />

      {/* 2. La Sección Hero (Inicio) */}
      <main id="inicio" className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-red-950 text-white flex flex-col items-center justify-center px-4 pt-20">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-center mb-4 tracking-tight leading-tight px-4">
          <span className="text-red-500">KART</span>ÓDROMO <br className="hidden sm:block" />
          <span className="text-yellow-400 mx-2">&</span>
          <br className="hidden sm:block" />
          <span className="text-red-500">MOTO</span>ÓDROMO
        </h1>
        <h2 className="text-2xl md:text-3xl font-light text-zinc-300 mb-6 text-center">
          SABANETA
        </h2>
        <p className="text-zinc-400 text-center max-w-xl mb-8 text-lg">
          Go-karts, Motódromo, Gotcha y restaurante. La adrenalina te espera.
        </p>
        <a
          href="https://wa.me/547141087330?text=Hola!%20Quiero%20reservar%20un%20turno"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-green-500/50 transition-all hover:scale-105 flex items-center gap-3"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
          Reservar por WhatsApp
        </a>
        <div className="absolute bottom-8 animate-bounce text-zinc-500">↓</div>
      </main>

      {/* 3. El resto de las secciones */}
      <Services />
      <Gallery />
      <RestaurantMenu />
      <Location />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}