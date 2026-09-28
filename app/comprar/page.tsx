'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient';
import toast from 'react-hot-toast';
import { 
  ShoppingBag, 
  CreditCard, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Printer, 
  ArrowLeft, 
  Building2,
  Sparkles,
  Lock
} from 'lucide-react';

interface ProductoPase {
  id: string;
  nombre: string;
  precio: number;
  categoria: string;
  duracion: string;
  descripcion: string;
}

const PRODUCTOS: ProductoPase[] = [
  {
    id: 'sprint-kart',
    nombre: 'Pase Sprint Karts (10 Minutos)',
    precio: 250,
    categoria: 'Go-Karts 270cc',
    duracion: '10 min en pista',
    descripcion: 'Carrera individual con cronometraje por vuelta y equipo de protección completo.',
  },
  {
    id: 'gran-premio',
    nombre: 'Grand Prix Experience (Pole + Carrera)',
    precio: 480,
    categoria: 'Experiencia Pro',
    duracion: '17 min total',
    descripcion: '5 min de clasificación (Pole Position) + 12 min de carrera con podio y premiación.',
  },
  {
    id: 'track-day-motos',
    nombre: 'Pase Track Day Motos',
    precio: 380,
    categoria: 'Motódromo',
    duracion: 'Día completo en turno',
    descripcion: 'Rueda con tu moto propia en asfalto técnico con áreas de escape de grava.',
  },
  {
    id: 'combo-adrenalina',
    nombre: 'Combo Karting + Gotcha (100 Balas)',
    precio: 590,
    categoria: 'Doble Aventura',
    duracion: '2 horas aprox.',
    descripcion: '10 min en pista de Karts + partida de gotcha táctico con careta, chaleco y marcadora.',
  },
];

const HORARIOS_DISPONIBLES = [
  '10:30 AM',
  '11:30 AM',
  '12:30 PM',
  '01:30 PM',
  '03:00 PM',
  '04:30 PM',
  '06:00 PM',
  '07:00 PM',
];

export default function ComprarPage() {
  const [productoSeleccionado, setProductoSeleccionado] = useState<ProductoPase>(PRODUCTOS[0]);
  const [fecha, setFecha] = useState<string>('');
  const [hora, setHora] = useState<string>(HORARIOS_DISPONIBLES[0]);
  const [cantidad, setCantidad] = useState<number>(1);
  const [nombre, setNombre] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [telefono, setTelefono] = useState<string>('');
  
  // Método de pago simulado
  const [metodoPago, setMetodoPago] = useState<'tarjeta' | 'spei' | 'oxxo'>('tarjeta');
  const [tarjetaNumero, setTarjetaNumero] = useState<string>('4152 •••• •••• 8920');
  const [tarjetaExp, setTarjetaExp] = useState<string>('08/29');
  const [tarjetaCvc, setTarjetaCvc] = useState<string>('•••');
  
  const [procesando, setProcesando] = useState<boolean>(false);
  const [ordenCompletada, setOrdenCompletada] = useState<{
    folio: string;
    fechaCompra: string;
    total: number;
    detalles: string;
    cliente: string;
    qrData: string;
  } | null>(null);

  const subtotal = productoSeleccionado.precio * cantidad;

  // Fecha mínima: hoy
  const hoyStr = new Date().toISOString().split('T')[0];

  const handleCompletarPago = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fecha) {
      toast.error('Por favor selecciona una fecha para tu turno.', { icon: '📅' });
      return;
    }
    if (!nombre.trim() || !email.trim()) {
      toast.error('Ingresa tu nombre y correo para recibir tu boleto.', { icon: '✉️' });
      return;
    }

    setProcesando(true);
    toast.loading('Validando pago seguro con pasarela...', { id: 'payment-toast' });

    // Simulación de respuesta de pasarela segura (Stripe / Mercado Pago sandbox)
    setTimeout(async () => {
      const folioGenerado = `SAB-${Date.now().toString().slice(-6)}`;
      const qrToken = `https://kartodromosabaneta.com/ticket?folio=${folioGenerado}&cliente=${encodeURIComponent(nombre)}`;

      // Intentar persistir en Supabase si la tabla existe
      try {
        await supabase.from('reservas').insert([
          {
            nombre_cliente: nombre,
            telefono: telefono || 'Compra Online',
            fecha: fecha,
            hora: hora,
            numero_personas: cantidad,
            estado: 'confirmada', // Como ya pagó, entra confirmada
          }
        ]);
      } catch (err) {
        console.warn('Nota de sincronización con base de datos:', err);
      }

      toast.dismiss('payment-toast');
      toast.success('¡Pago aprobado con éxito! Tu boleto está listo.', { icon: '🏁' });

      setOrdenCompletada({
        folio: folioGenerado,
        fechaCompra: new Date().toLocaleDateString('es-MX', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        total: subtotal,
        detalles: `${cantidad}x ${productoSeleccionado.nombre}`,
        cliente: nombre,
        qrData: qrToken,
      });

      setProcesando(false);
    }, 1800);
  };

  const handleImprimir = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Enlace Volver */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Inicio</span>
          </Link>
        </div>

        {/* Encabezado */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-800 text-red-400 text-xs font-bold tracking-wider uppercase mb-3">
            <Lock className="w-3.5 h-3.5 text-emerald-400" /> Checkout Seguro SSL 256-bit
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">
            COMPRA DE <span className="text-red-500">PASES ONLINE</span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base">
            Elige tu pase de pista, fecha y cantidad de pilotos. Generamos tu boleto digital con código QR inmediatamente.
          </p>
        </div>

        {!ordenCompletada ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* COLUMNA IZQUIERDA: Selector de Paquete y Horarios */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* 1. Selecciona la experiencia */}
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-7">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-black">
                    1
                  </span>
                  Selecciona tu Pase o Actividad
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PRODUCTOS.map((prod) => {
                    const isSelected = productoSeleccionado.id === prod.id;
                    return (
                      <div
                        key={prod.id}
                        onClick={() => setProductoSeleccionado(prod)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-red-950/30 border-red-500 shadow-lg shadow-red-600/10'
                            : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-red-400">
                            {prod.categoria}
                          </span>
                          <span className="text-lg font-black text-white">${prod.precio} MXN</span>
                        </div>
                        <h3 className="font-bold text-sm text-white mb-1">{prod.nombre}</h3>
                        <p className="text-xs text-zinc-400 leading-relaxed">{prod.duracion}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. Fecha, Turno y Personas */}
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-7">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-black">
                    2
                  </span>
                  Fecha, Horario y Cantidad de Pilotos
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1.5 uppercase">
                      Fecha del Turno <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      min={hoyStr}
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-red-500 transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1.5 uppercase">
                      Horario Estimado
                    </label>
                    <select
                      value={hora}
                      onChange={(e) => setHora(e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-red-500 transition-colors"
                    >
                      {HORARIOS_DISPONIBLES.map((h) => (
                        <option key={h} value={h}>
                          {h}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1.5 uppercase">
                      Pilotos / Pases
                    </label>
                    <div className="flex items-center border border-zinc-700 rounded-xl bg-zinc-800 overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                        className="px-3 py-2 text-white hover:bg-zinc-700 font-bold"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-bold text-sm">{cantidad}</span>
                      <button
                        type="button"
                        onClick={() => setCantidad(cantidad + 1)}
                        className="px-3 py-2 text-white hover:bg-zinc-700 font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-zinc-400 bg-zinc-950/70 p-3 rounded-xl border border-zinc-850 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Tu pase tiene validez para todo el día seleccionado dentro del horario de operación (10:00 AM a 8:00 PM).</span>
                </div>
              </div>

              {/* 3. Datos del Titular */}
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-7">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-black">
                    3
                  </span>
                  Datos del Titular del Boleto
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-zinc-300 mb-1.5 uppercase">
                      Nombre Completo <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Rodrigo Mendoza"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1.5 uppercase">
                      Correo Electrónico <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="correo@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1.5 uppercase">
                      Teléfono / WhatsApp
                    </label>
                    <input
                      type="tel"
                      placeholder="Ej. 55 1234 5678"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* COLUMNA DERECHA: Resumen y Pasarela de Pago */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-7 shadow-2xl relative sticky top-28">
                
                <h2 className="text-xl font-black text-white mb-5 flex items-center justify-between">
                  <span>Resumen de Compra</span>
                  <ShoppingBag className="w-5 h-5 text-red-500" />
                </h2>

                <div className="space-y-3 pb-5 border-b border-zinc-800 text-sm">
                  <div className="flex justify-between text-zinc-300">
                    <span className="font-semibold">{productoSeleccionado.nombre}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400 text-xs">
                    <span>Precio unitario:</span>
                    <span>${productoSeleccionado.precio} MXN</span>
                  </div>
                  <div className="flex justify-between text-zinc-400 text-xs">
                    <span>Cantidad:</span>
                    <span>{cantidad} {cantidad === 1 ? 'piloto' : 'pilotos'}</span>
                  </div>
                  {fecha && (
                    <div className="flex justify-between text-zinc-400 text-xs">
                      <span>Fecha reservada:</span>
                      <span className="text-zinc-200 font-semibold">{fecha} ({hora})</span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="py-4 flex justify-between items-baseline border-b border-zinc-800">
                  <span className="text-zinc-300 font-bold">Total a Pagar:</span>
                  <span className="text-3xl font-black text-white">${subtotal} <span className="text-xs font-semibold text-zinc-400">MXN</span></span>
                </div>

                {/* Métodos de Pago Simulados / Modo Prueba */}
                <div className="pt-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase text-zinc-400">Método de Pago</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                      Modo Sandbox Activo
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <button
                      type="button"
                      onClick={() => setMetodoPago('tarjeta')}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                        metodoPago === 'tarjeta'
                          ? 'bg-red-600 text-white border-red-500'
                          : 'bg-zinc-800/80 text-zinc-400 border-zinc-700 hover:text-white'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Tarjeta</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setMetodoPago('spei')}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                        metodoPago === 'spei'
                          ? 'bg-red-600 text-white border-red-500'
                          : 'bg-zinc-800/80 text-zinc-400 border-zinc-700 hover:text-white'
                      }`}
                    >
                      <Building2 className="w-4 h-4" />
                      <span>SPEI</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setMetodoPago('oxxo')}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                        metodoPago === 'oxxo'
                          ? 'bg-red-600 text-white border-red-500'
                          : 'bg-zinc-800/80 text-zinc-400 border-zinc-700 hover:text-white'
                      }`}
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>OXXO Pay</span>
                    </button>
                  </div>

                  {/* Formulario según método */}
                  {metodoPago === 'tarjeta' && (
                    <div className="space-y-3 bg-zinc-950/70 p-4 rounded-xl border border-zinc-800 text-xs">
                      <div>
                        <label className="text-zinc-400 block mb-1">Número de Tarjeta</label>
                        <input
                          type="text"
                          value={tarjetaNumero}
                          onChange={(e) => setTarjetaNumero(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-zinc-400 block mb-1">Vigencia</label>
                          <input
                            type="text"
                            value={tarjetaExp}
                            onChange={(e) => setTarjetaExp(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-zinc-400 block mb-1">CVC / CVV</label>
                          <input
                            type="text"
                            value={tarjetaCvc}
                            onChange={(e) => setTarjetaCvc(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {metodoPago === 'spei' && (
                    <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800 text-xs space-y-2">
                      <p className="text-zinc-300">CLABE Interbancaria de prueba:</p>
                      <p className="font-mono text-amber-400 font-bold">6461 8015 7044 1928 32</p>
                      <p className="text-zinc-400 text-[11px]">Banco: STP / Beneficiario: Kartódromo Sabaneta</p>
                    </div>
                  )}

                  {metodoPago === 'oxxo' && (
                    <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800 text-xs space-y-2 text-center">
                      <p className="text-zinc-300">Referencia OXXO Pay generada al pagar:</p>
                      <p className="font-mono text-red-400 font-bold text-sm tracking-widest">9328-4019-5821-39</p>
                      <p className="text-zinc-400 text-[11px]">Paga en cualquier tienda OXXO presentando el código de barras.</p>
                    </div>
                  )}

                  {/* Botón de Enviar Pago */}
                  <button
                    onClick={handleCompletarPago}
                    disabled={procesando}
                    className="mt-6 w-full py-4 rounded-xl bg-gradient-to-r from-red-600 via-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:from-zinc-800 disabled:to-zinc-800 text-white font-black text-base shadow-xl shadow-red-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                  >
                    {procesando ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Procesando Transacción Segura...
                      </span>
                    ) : (
                      <>
                        <ShieldCheck className="w-5 h-5" />
                        <span>Pagar ${subtotal} MXN y Generar Boletos</span>
                      </>
                    )}
                  </button>

                  <p className="mt-3 text-[11px] text-center text-zinc-400">
                    Transacción cifrada. Al completar recibes tu código QR con acceso directo a pits.
                  </p>
                </div>

              </div>
            </div>

          </div>
        ) : (
          /* PANTALLA DE ÉXITO: BOLETO DIGITAL CON QR */
          <div className="max-w-xl mx-auto animate-in zoom-in-95 duration-300">
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h2 className="text-3xl font-black text-white">¡Pase Confirmado!</h2>
              <p className="text-zinc-400 text-sm mt-1">
                Tu compra ha sido procesada. Guarda tu boleto digital o tómale una captura de pantalla.
              </p>
            </div>

            {/* TARJETA DEL BOLETO (PRINTABLE) */}
            <div 
              id="ticket-print"
              className="bg-zinc-900 border-2 border-red-500 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
            >
              {/* Marca de agua / decoración */}
              <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-bl-xl shadow-md">
                BOLETO OFICIAL • PAGADO
              </div>

              {/* Logo y Encabezado del Ticket */}
              <div className="border-b border-dashed border-zinc-700 pb-5 mb-5 flex items-center justify-between">
                <div>
                  <span className="text-xl font-black tracking-tight text-white">
                    KARTÓDROMO <span className="text-red-500">SABANETA</span>
                  </span>
                  <p className="text-[11px] text-zinc-400">Circuito La Marquesa, Edo. Méx.</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-zinc-400 block">Folio de Orden:</span>
                  <span className="font-mono font-black text-red-400 text-sm sm:text-base">{ordenCompletada.folio}</span>
                </div>
              </div>

              {/* Contenido del Ticket */}
              <div className="grid grid-cols-2 gap-4 mb-6 text-xs sm:text-sm">
                <div>
                  <span className="text-zinc-400 block text-[11px] uppercase">Titular:</span>
                  <span className="font-bold text-white">{ordenCompletada.cliente}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[11px] uppercase">Fecha de Emisión:</span>
                  <span className="font-bold text-white">{ordenCompletada.fechaCompra}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[11px] uppercase">Pase Adquirido:</span>
                  <span className="font-bold text-red-400">{ordenCompletada.detalles}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[11px] uppercase">Fecha de Visita:</span>
                  <span className="font-bold text-white">{fecha} ({hora})</span>
                </div>
                <div className="col-span-2 pt-2 border-t border-zinc-800 flex justify-between items-center">
                  <span className="text-zinc-300 font-semibold">Total Pagado:</span>
                  <span className="text-2xl font-black text-white">${ordenCompletada.total} MXN</span>
                </div>
              </div>

              {/* CÓDIGO QR GENERADO */}
              <div className="bg-white rounded-2xl p-6 text-black flex flex-col items-center justify-center text-center shadow-inner">
                {/* Generador SVG de código QR geométrico visual */}
                <div className="w-44 h-44 bg-white p-2 rounded-xl flex items-center justify-center border-4 border-black relative">
                  <svg className="w-full h-full" viewBox="0 0 100 100" fill="currentColor">
                    {/* Patrón de QR simulado de alta fidelidad */}
                    <rect x="0" y="0" width="28" height="28" fill="black" />
                    <rect x="4" y="4" width="20" height="20" fill="white" />
                    <rect x="8" y="8" width="12" height="12" fill="black" />
                    
                    <rect x="72" y="0" width="28" height="28" fill="black" />
                    <rect x="76" y="4" width="20" height="20" fill="white" />
                    <rect x="80" y="8" width="12" height="12" fill="black" />
                    
                    <rect x="0" y="72" width="28" height="28" fill="black" />
                    <rect x="4" y="76" width="20" height="20" fill="white" />
                    <rect x="8" y="80" width="12" height="12" fill="black" />
                    
                    {/* Puntos y bits */}
                    <rect x="36" y="8" width="8" height="8" fill="black" />
                    <rect x="48" y="8" width="8" height="8" fill="black" />
                    <rect x="36" y="24" width="8" height="8" fill="black" />
                    <rect x="48" y="36" width="8" height="8" fill="black" />
                    <rect x="8" y="44" width="8" height="8" fill="black" />
                    <rect x="24" y="48" width="8" height="8" fill="black" />
                    <rect x="36" y="48" width="8" height="8" fill="black" />
                    <rect x="56" y="56" width="8" height="8" fill="black" />
                    <rect x="68" y="44" width="8" height="8" fill="black" />
                    <rect x="80" y="56" width="8" height="8" fill="black" />
                    <rect x="44" y="68" width="8" height="8" fill="black" />
                    <rect x="60" y="72" width="8" height="8" fill="black" />
                    <rect x="40" y="84" width="8" height="8" fill="black" />
                    <rect x="64" y="84" width="8" height="8" fill="black" />
                    <rect x="84" y="84" width="8" height="8" fill="black" />
                  </svg>
                </div>
                <span className="font-mono font-bold text-xs mt-3 text-zinc-800">
                  {ordenCompletada.folio}
                </span>
                <span className="text-[11px] text-zinc-500 mt-0.5">
                  Presenta este QR al llegar a taquilla o pits
                </span>
              </div>

              <div className="mt-5 text-center text-xs text-zinc-500">
                Válido para la fecha especificada. Incluye seguro de pista y equipamiento reglamentario.
              </div>

            </div>

            {/* BOTONES DE ACCIÓN PARA EL TICKET */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleImprimir}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 border border-zinc-700 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir o Guardar PDF</span>
              </button>

              <a
                href={`https://wa.me/527141087330?text=Hola!%20Acabo%20de%20comprar%20mi%20pase%20con%20folio%20${ordenCompletada.folio}%20a%20nombre%20de%20${encodeURIComponent(ordenCompletada.cliente)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-600/20"
              >
                <span>Confirmar por WhatsApp</span>
              </a>
            </div>

            <div className="text-center mt-6">
              <button
                onClick={() => {
                  setOrdenCompletada(null);
                  setCantidad(1);
                }}
                className="text-sm text-zinc-400 hover:text-white underline"
              >
                Comprar otro pase
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
