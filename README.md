# 🚗 AutoGestión GT — Sistema de agencia de autos

Sistema web para administrar una agencia de vehículos, hecho con [Astro](https://astro.build).
Por ahora funciona **sin base de datos**: todo se guarda en el navegador (`localStorage`).

🌐 **Demo:** https://gersoncode-prog.github.io/sistemadeautos/

## 🔑 Usuarios de prueba

| Usuario    | Contraseña | Rol           | Permisos                                   |
| :--------- | :--------- | :------------ | :----------------------------------------- |
| `admin`    | `12345`    | Administrador | Todo: crear, editar, eliminar, anular      |
| `vendedor` | `12345`    | Vendedor      | Crear y editar; no puede eliminar ni anular |

## ✨ Módulos

- **Login** con validación, "recordarme" y protección de páginas (sin sesión no se puede entrar)
- **Dashboard**: indicadores, ventas de los últimos 6 meses, estado del inventario, últimas ventas
- **Vehículos**: inventario con búsqueda, filtros por estado/tipo, orden, agregar, editar y eliminar
- **Clientes**: búsqueda, agregar, editar y eliminar (no deja borrar clientes con ventas)
- **Ventas**: registrar venta (marca el auto como vendido), descuentos, comprobante imprimible y anulación

## 🎮 Comandos

| Comando           | Acción                                                     |
| :---------------- | :--------------------------------------------------------- |
| `npm install`     | Instala las dependencias                                   |
| `npm run dev`     | Servidor local en `http://localhost:4321/sistemadeautos/`  |
| `npm run build`   | Compila el sitio en `./dist/`                              |
| `npm run preview` | Muestra el sitio compilado                                 |

## 📁 Estructura

```
src/
├── lib/
│   ├── datos.ts      ← "base de datos" en localStorage + datos de ejemplo
│   ├── sesion.ts     ← usuarios, login y cierre de sesión
│   ├── ui.ts         ← avisos, confirmaciones y modales
│   ├── autoSvg.ts    ← dibujo del auto según su color
│   └── ruta.ts       ← rutas con el prefijo del sitio
├── layouts/Panel.astro   ← menú lateral + protección de sesión
├── pages/                ← login, dashboard, vehículos, clientes, ventas
└── styles/global.css
```

## 🔜 Siguiente paso

Cuando se conecte una base de datos real, solo hay que reemplazar las funciones de
`src/lib/datos.ts` (`obtener`, `guardar`, `insertarOActualizar`, `eliminar`) por llamadas a una API.
