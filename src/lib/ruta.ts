// Agrega el "base" del sitio a una ruta interna: ruta('/login') -> '/sistemadeautos/login'
export const ruta = (camino: string) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${camino}`;
};
