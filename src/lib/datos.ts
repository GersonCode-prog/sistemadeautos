// ============================================================
//  DATOS — todo se guarda en localStorage (sin base de datos)
// ============================================================

export type EstadoVehiculo = 'Disponible' | 'Reservado' | 'Vendido';

export interface Vehiculo {
  id: string;
  marca: string;
  modelo: string;
  anio: number;
  color: string;        // color en hexadecimal, ej. #c0392b
  nombreColor: string;  // ej. "Rojo"
  precio: number;
  kilometraje: number;
  transmision: 'Automática' | 'Manual';
  combustible: 'Gasolina' | 'Diésel' | 'Híbrido' | 'Eléctrico';
  tipo: 'Sedán' | 'SUV' | 'Pickup' | 'Hatchback' | 'Deportivo';
  placa: string;
  estado: EstadoVehiculo;
  creado: string;
}

export interface Cliente {
  id: string;
  nombre: string;
  nit: string;
  telefono: string;
  correo: string;
  direccion: string;
  creado: string;
}

export interface Venta {
  id: string;
  folio: string;
  vehiculoId: string;
  clienteId: string;
  precio: number;
  descuento: number;
  total: number;
  metodoPago: 'Contado' | 'Financiado' | 'Transferencia';
  fecha: string;        // AAAA-MM-DD
  vendedor: string;
  estado: 'Completada' | 'Anulada';
}

type Colecciones = { vehiculos: Vehiculo; clientes: Cliente; ventas: Venta };
type NombreColeccion = keyof Colecciones;

const PREFIJO = 'autos_';

// ---------- Lectura y escritura ----------
export function obtener<K extends NombreColeccion>(nombre: K): Colecciones[K][] {
  sembrarSiHaceFalta();
  try {
    return JSON.parse(localStorage.getItem(PREFIJO + nombre) || '[]');
  } catch {
    return [];
  }
}

export function guardar<K extends NombreColeccion>(nombre: K, lista: Colecciones[K][]) {
  localStorage.setItem(PREFIJO + nombre, JSON.stringify(lista));
}

export function buscarPorId<K extends NombreColeccion>(nombre: K, id: string) {
  return obtener(nombre).find((x) => x.id === id);
}

export function insertarOActualizar<K extends NombreColeccion>(nombre: K, item: Colecciones[K]) {
  const lista = obtener(nombre);
  const i = lista.findIndex((x) => x.id === item.id);
  if (i >= 0) lista[i] = item;
  else lista.unshift(item);
  guardar(nombre, lista);
}

export function eliminar<K extends NombreColeccion>(nombre: K, id: string) {
  guardar(nombre, obtener(nombre).filter((x) => x.id !== id));
}

export const nuevoId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
export const hoy = () => new Date().toLocaleDateString('en-CA'); // AAAA-MM-DD en hora local

// ---------- Formatos ----------
export const formatoQ = (n: number) =>
  'Q ' + n.toLocaleString('es-GT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Sin decimales, para tarjetas de resumen: Q 255,000
export const formatoQCorto = (n: number) =>
  'Q ' + Math.round(n).toLocaleString('es-GT');

export const formatoNumero = (n: number) => n.toLocaleString('es-GT');

export const formatoFecha = (f: string) =>
  new Date(`${f}T12:00:00`).toLocaleDateString('es-GT', { day: '2-digit', month: 'short', year: 'numeric' });

// Evita que texto escrito por el usuario se interprete como HTML
export const escapar = (texto: unknown) =>
  String(texto ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

// ---------- Datos de ejemplo ----------
function sembrarSiHaceFalta() {
  if (localStorage.getItem(PREFIJO + 'sembrado')) return;
  localStorage.setItem(PREFIJO + 'sembrado', '1');

  const v = (marca: string, modelo: string, anio: number, color: string, nombreColor: string, precio: number,
    kilometraje: number, transmision: Vehiculo['transmision'], combustible: Vehiculo['combustible'],
    tipo: Vehiculo['tipo'], placa: string, estado: EstadoVehiculo): Vehiculo => ({
    id: nuevoId(), marca, modelo, anio, color, nombreColor, precio, kilometraje, transmision, combustible,
    tipo, placa, estado, creado: hoy(),
  });

  const vehiculos: Vehiculo[] = [
    v('Toyota', 'Corolla', 2022, '#e5e7eb', 'Blanco', 165000, 18500, 'Automática', 'Gasolina', 'Sedán', 'P-123ABC', 'Disponible'),
    v('Toyota', 'Hilux', 2021, '#1f2937', 'Negro', 285000, 42000, 'Manual', 'Diésel', 'Pickup', 'P-456DEF', 'Disponible'),
    v('Honda', 'CR-V', 2023, '#9ca3af', 'Gris', 315000, 8000, 'Automática', 'Gasolina', 'SUV', 'P-789GHI', 'Reservado'),
    v('Mazda', 'CX-5', 2022, '#b91c1c', 'Rojo', 268000, 21000, 'Automática', 'Gasolina', 'SUV', 'P-321JKL', 'Disponible'),
    v('Nissan', 'Sentra', 2020, '#1d4ed8', 'Azul', 128000, 55000, 'Automática', 'Gasolina', 'Sedán', 'P-654MNO', 'Disponible'),
    v('Kia', 'Picanto', 2023, '#f59e0b', 'Amarillo', 98000, 5000, 'Manual', 'Gasolina', 'Hatchback', 'P-987PQR', 'Disponible'),
    v('Hyundai', 'Tucson', 2021, '#065f46', 'Verde', 235000, 37000, 'Automática', 'Diésel', 'SUV', 'P-147STU', 'Vendido'),
    v('Ford', 'Mustang', 2019, '#dc2626', 'Rojo', 395000, 30000, 'Automática', 'Gasolina', 'Deportivo', 'P-258VWX', 'Vendido'),
    v('Toyota', 'RAV4 Hybrid', 2024, '#14649b', 'Azul', 389000, 2000, 'Automática', 'Híbrido', 'SUV', 'P-369YZA', 'Disponible'),
    v('Mitsubishi', 'L200', 2022, '#e5e7eb', 'Blanco', 255000, 28000, 'Manual', 'Diésel', 'Pickup', 'P-741BCD', 'Vendido'),
  ];

  const c = (nombre: string, nit: string, telefono: string, correo: string, direccion: string): Cliente => ({
    id: nuevoId(), nombre, nit, telefono, correo, direccion, creado: hoy(),
  });
  const clientes: Cliente[] = [
    c('María López', '1234567-8', '5512-3456', 'maria.lopez@correo.com', 'Zona 10, Ciudad de Guatemala'),
    c('José Pérez', '2345678-9', '4123-7890', 'jose.perez@correo.com', 'Mixco, Guatemala'),
    c('Ana García', '3456789-0', '3098-1122', 'ana.garcia@correo.com', 'Antigua Guatemala, Sacatepéquez'),
    c('Luis Hernández', 'CF', '5876-5432', 'luis.h@correo.com', 'Quetzaltenango'),
    c('Sofía Ramírez', '4567890-1', '4455-6677', 'sofia.r@correo.com', 'Villa Nueva, Guatemala'),
  ];

  // Ventas de ejemplo en los últimos meses (para que el dashboard tenga datos)
  const fechaHace = (dias: number) => {
    const d = new Date();
    d.setDate(d.getDate() - dias);
    return d.toLocaleDateString('en-CA');
  };
  const vendidos = vehiculos.filter((x) => x.estado === 'Vendido');
  const ventas: Venta[] = vendidos.map((veh, i) => {
    const descuento = i === 1 ? 10000 : 0;
    return {
      id: nuevoId(),
      folio: `V-${String(i + 1).padStart(4, '0')}`,
      vehiculoId: veh.id,
      clienteId: clientes[i].id,
      precio: veh.precio,
      descuento,
      total: veh.precio - descuento,
      metodoPago: (['Contado', 'Financiado', 'Transferencia'] as const)[i % 3],
      fecha: fechaHace([75, 40, 8][i] ?? 1),
      vendedor: 'Administrador',
      estado: 'Completada',
    };
  });

  guardar('vehiculos', vehiculos);
  guardar('clientes', clientes);
  guardar('ventas', ventas);
}

// Borra todo y vuelve a cargar los datos de ejemplo
export function restablecerDatos() {
  ['vehiculos', 'clientes', 'ventas', 'sembrado'].forEach((k) => localStorage.removeItem(PREFIJO + k));
  sembrarSiHaceFalta();
}

export function siguienteFolio() {
  const numeros = obtener('ventas').map((v) => Number(v.folio.replace(/\D/g, '')) || 0);
  return `V-${String(Math.max(0, ...numeros) + 1).padStart(4, '0')}`;
}
