# 🏎️ Kartódromo Web - La Sabaneta

Plataforma web moderna, responsiva y de alto rendimiento para la gestión de reservas de un centro de entretenimiento (Kartódromo, Motódromo, Gotcha y Restaurante). 

El sistema incluye un formulario de reservas público con **validación de cupos en tiempo real** y un **Panel de Administración seguro** con control de acceso basado en roles (RBAC).

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

---

## ✨ Características Principales

### 👤 Para el Cliente
- 📱 **Diseño 100% Responsivo:** Optimizado para móviles, tablets y escritorio.
- 📅 **Reservas Inteligentes:** Formulario que valida la capacidad máxima del servicio en tiempo real, evitando sobreventas.
- 💬 **Contacto Directo:** Botón flotante de WhatsApp para atención inmediata.
- 🎨 **UX/UI Premium:** Animaciones suaves (Framer Motion), notificaciones tipo Toast y esqueletos de carga (Skeletons).

### 🛠️ Para el Administrador
- 🔐 **Autenticación Segura:** Login gestionado con Supabase Auth.
- 👑 **Control de Roles (RBAC):** Diferenciación entre permisos de `admin` (gestión total) y `empleado` (solo lectura).
- 📊 **Gestión de Reservas:** Visualización en tabla, filtrado por fecha y cambio de estado (Confirmar/Cancelar) con actualización optimista.
- 🛡️ **Seguridad:** Políticas de Row Level Security (RLS) configuradas en la base de datos.

---

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Base de Datos y Auth:** [Supabase](https://supabase.com/) (PostgreSQL)
- **Animaciones:** [Framer Motion](https://www.framer.com/motion/)
- **Notificaciones:** [React Hot Toast](https://react-hot-toast.com/)

---

## 📦 Instalación y Configuración Local

Sigue estos pasos para ejecutar el proyecto en tu máquina de desarrollo:

### 1. Clonar el repositorio
```bash
git clone https://github.com/IngeniUriDev/kartodromo-web.git
cd kartodromo-web