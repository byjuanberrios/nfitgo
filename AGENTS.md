# NFITGO - Guía Rápida para IA

## 🎯 Descripción del Proyecto

Plataforma para descubrir y reservar clases de fitness en Chile. Construida con Next.js 16 (App Router) y TypeScript.

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 16.2.4 (App Router)
- **Lenguaje**: TypeScript 5 (strict mode)
- **Estilos**: Tailwind CSS v4
- **UI**: React 19 + Lucide React
- **Package Manager**: pnpm

## 📁 Estructura de Directorios Clave

```
src/
├── app/                   # Next.js App Router (rutas)
│   ├── (auth)/            # Login, registro (sin header)
│   ├── (main)/            # Home, explore, profile (con header)
│   ├── booking/[classId]/ # Flujo de reserva
│   └── onboarding/        # Flujo de onboarding
├── components/            # Componentes React
│   ├── shared/            # Componentes reutilizables (Button, Card, etc.)
│   ├── onboarding/        # Componentes específicos de onboarding
│   └── icons/             # Iconos como componentes
├── context/               # Estado global
│   └── AuthContext.tsx    # Autenticación + localStorage
├── services/              # Lógica de negocio
│   ├── classes.ts         # Operaciones con clases
│   ├── bookings.ts        # Operaciones con reservas
│   ├── sportcenters.ts    # Operaciones con centros
│   └── categories.ts      # Operaciones con categorías
├── types/                 # Definiciones de TypeScript
│   └── index.ts           # TODOS los tipos centralizados
└── data/                  # Datos mock (temporal)
```

## 🏗️ Patrones de Arquitectura

### 1. **Services Layer**

- Funciones async que retornan datos mock (preparadas para API real)
- Cada entidad tiene su propio archivo: `classes.ts`, `bookings.ts`, etc.
- **Importante**: Siempre usar services para lógica de negocio, nunca llamadas directas

```typescript
// Ejemplo de uso
import { getClasses } from "@/services/classes";
const classes = await getClasses({ category: "yoga" });
```

### 2. **Centralización de Tipos**

- **TODOS** los tipos están en `src/types/index.ts`
- Incluye: entidades del dominio, props de componentes, tipos de contexto
- **Nunca** crear archivos `.d.ts` separados

```typescript
// Importar siempre desde aquí
import type { ClassItem, ClassCardProps } from "@/types";
```

### 3. **Context API para Auth**

- `AuthContext` maneja estado de usuario global
- Persiste en localStorage
- Hook: `useAuth()`

```typescript
const { user, login, logout } = useAuth();
```

### 4. **Component Organization**

- **Shared**: Componentes genéricos reutilizables (`Button`, `ClassCard`, `Tag`)
- **Feature-specific**: Componentes que solo usa una feature (`CheckoutForm`)
- **Icons**: Cada icono es un componente React en `components/icons/`

## 📝 Convenciones de Código Críticas

### TypeScript

- **Strict mode** habilitado (obligatorio tipar todo)
- Interfaces para definiciones de tipos
- Type imports explícitos: `import type { Foo }`
- Path alias: `@/` mapea a `src/`

### Componentes React

- Functional components con TypeScript
- Props interfaces en `src/types/index.ts`
- `"use client"` obligatorio para componentes con interacción
- PascalCase para nombres de archivos y componentes

### Estilos (Tailwind CSS)

- Mobile-first (clases base para mobile, `lg:`/`md:` para desktop)
- Dark theme por defecto
- Colores custom en `globals.css`
- **No** usar archivos CSS separados (solo clases utilitarias)

## 🔄 Flujos de Datos Principales

### 1. **Autenticación**

```
Login/Registro → AuthContext → localStorage → Header/Profile
```

### 2. **Reserva de Clase**

```
ClassCard → /booking/[classId] → CheckoutForm → /exito
```

### 3. **Exploración**

```
Explore → Filters → getClasses() → ClassCard list
```

## 🎨 Decisiones Técnicas Clave

- **App Router** (no Pages Router): Server Components por defecto, mejor performance
- **Tailwind CSS**: Desarrollo rápido, no archivos CSS separados
- **Context API**: Suficiente para MVP (auth simple), no Redux/Zustand
- **Datos Mock**: Services retornan datos estáticos, fácil migrar a fetch real
- **localStorage**: Auth temporal para MVP (reemplazar por JWT + httpOnly cookies)

## 🚀 Scripts Disponibles

```bash
pnpm dev      # Servidor de desarrollo
pnpm build    # Build de producción
pnpm lint     # ESLint
```

## ⚠️ Limitaciones Actuales (MVP)

- Datos mock en frontend (no hay backend)
- Auth en localStorage (inseguro para producción)
- Sin API routes implementadas
- Sin tests automatizados
- Sin monitoreo/error tracking

## 💡 Tips para Desarrollo

1. **Siempre** definir tipos en `src/types/index.ts` primero
2. **Usar** services para cualquier operación de datos
3. **Reutilizar** componentes de `shared/` cuando sea posible
4. **Probar** flujo completo manualmente antes de commitear
5. **Ejecutar** `pnpm lint` siempre antes de commitear

## 📦 Dependencias Principales

- `next` 16.2.4
- `react` 19.2.4
- `typescript` 5
- `tailwindcss` 4
- `lucide-react` 1.11.0
- `eslint` 9
