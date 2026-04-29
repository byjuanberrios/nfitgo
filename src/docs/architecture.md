# Arquitectura del Proyecto NFITGO

## Visión General

NFITGO es una plataforma web construida con Next.js 16 (App Router) que permite a los usuarios descubrir, explorar y reservar clases de fitness en diferentes centros deportivos de Chile.

## Stack Tecnológico

### Core

- **Next.js 16.2.4** - Framework React full-stack
- **React 19.2.4** - Biblioteca UI
- **TypeScript 5** - Tipado estático
- **Tailwind CSS 4** - Framework de estilos

### Dependencias Principales

- **lucide-react 1.11.0** - Iconos como componentes
- **ESLint 9** - Linting con reglas de Next.js

### Herramientas de Desarrollo

- **pnpm** - Package manager
- **PostCSS** - Procesamiento de CSS

## Arquitectura de Directorios

### `src/app/` - Next.js App Router

Estructura de rutas basada en directorios:

```
app/
├── layout.tsx              # Root layout con AuthProvider
├── (auth)/                 # Grupo de rutas de auth
│   ├── layout.tsx         # Layout sin header
│   ├── login/page.tsx     # Página de login
│   └── registro/page.tsx  # Página de registro
├── (main)/                # Grupo de rutas principales
│   ├── layout.tsx         # Layout con Header
│   ├── page.tsx           # Home page
│   ├── class/[id]/        # Detalle de clase
│   ├── sport-center/[id]/ # Detalle de centro deportivo
│   ├── explore/           # Explorar clases
│   ├── profile/           # Perfil de usuario
│   │   ├── reservas/      # Mis reservas
│   │   ├── wallet/        # Historial de pagos
│   │   └── cuenta/        # Configuración de cuenta
│   └── booking/[classId]/ # Flujo de reserva
│       ├── page.tsx       # Formulario de reserva
│       └── exito/page.tsx # Confirmación
└── onboarding/            # Flujo de onboarding
```

**Patrones de routing:**

- **Route Groups**: `(auth)`, `(main)` para layouts diferentes
- **Dynamic Routes**: `[id]`, `[classId]` para párametros
- **Nested Routes**: Estructura jerárquica natural

### `src/components/` - Componentes React

Organización por feature y reusabilidad:

```
components/
├── icons/                 # Iconos como componentes
│   ├── Boxing.tsx
│   ├── Yoga.tsx
│   └── ...
├── onboarding/           # Componentes del flujo onboarding
│   ├── OnboardingStepper.tsx
│   ├── StepActivities.tsx
│   └── ...
├── shared/               # Componentes reutilizables
│   ├── Button.tsx
│   ├── ClassCard.tsx
│   ├── Tag.tsx
│   └── ...
├── CheckoutForm.tsx      # Formulario de pago
├── ExploreFilters.tsx    # Filtros de búsqueda
└── ...
```

**Convenciones:**

- **PascalCase** para nombres de archivos
- **Props interfaces** centralizadas en `src/types`
- **Client components** con `"use client"` cuando interactúan con el DOM

### `src/context/` - Estado Global

```
context/
└── AuthContext.tsx       # Gestión de autenticación
```

**Implementación:**

- Context API de React
- Persistencia en localStorage
- Estado: `user`, `isLoading`, `login()`, `logout()`
- Hook `useAuth()` para consumo

### `src/services/` - Lógica de Negocio

```
services/
├── index.ts              # Barrel exports
├── classes.ts            # Operaciones con clases
├── sportcenters.ts       # Operaciones con centros
├── bookings.ts           # Operaciones con reservas
└── categories.ts         # Operaciones con categorías
```

**Patrón:**

- Funciones async (preparadas para fetch real)
- Actualmente retornan datos mock de `src/data/`
- Filtros tipados con interfaces
- Manejo de errores básico

**Ejemplo:**

```typescript
export async function getClasses(
  filters: GetClassesFilters = {},
): Promise<ClassItem[]> {
  let result = classes; // Datos mock

  if (filters.category) {
    result = result.filter((c) => c.category === filters.category);
  }

  return result;
}
```

### `src/types/` - Definiciones de Tipos

```
types/
└── index.ts              # Todos los tipos centralizados
```

**Categorías:**

1. **Base**: `IconProps`
2. **Domain entities**: `SportCenterItem`, `ClassItem`, `Booking`, etc.
3. **Shared types**: `Billing`, `PlanItem`, `OnboardingActivity`
4. **Component props**: `ClassCardProps`, `BookingCardProps`, etc.
5. **Context types**: `AuthContextType`

**Beneficios:**

- Single source of truth
- Fácil descubrimiento
- Evita imports circulares
- Mejor autocompletado

### `src/data/` - Datos Mock

```
data/
├── classes.ts            # Clases de fitness
├── sportcenters.ts       # Centros deportivos
├── bookings.ts           # Reservas de usuario
└── categories.ts         # Categorías de actividades
```

**Uso temporal** hasta integración con backend:

- Datos estáticos en arrays
- Simulan respuestas de API
- Permiten desarrollo frontend paralelo

### `src/lib/` - Utilidades

```
lib/
└── dateUtils.ts          # Formateo de fechas
```

**Funciones:**

- `formatDate()` - Parsea fechas YYYY-MM-DD a {day, month}

### `src/parts/` - Layout Components

```
parts/
├── Header.tsx            # Header responsive
└── Footer.tsx            # Footer
```

**Header features:**

- Variantes: `transparent` | `solid`
- Menú desktop y mobile
- Integración con AuthContext
- Navegación condicional según auth

### `src/assets/` - Assets Estáticos

```
assets/
└── (vacío - usar public/)
```

**Nota**: Assets estáticos van en `public/` (Next.js convention)

## Flujo de Datos

### Autenticación

```
Login/Registro → AuthContext → localStorage → Header/Profile
```

1. Usuario inicia sesión
2. `AuthContext.login()` guarda en state y localStorage
3. Componentes consumen `useAuth()`
4. Persiste entre recargas

### Reserva de Clase

```
ClassCard → /booking/[classId] → CheckoutForm → /exito
```

1. Usuario hace click en clase
2. Página de booking recibe `classId`
3. CheckoutForm maneja pago (mock)
4. Redirección a página de éxito

### Exploración

```
Explore → Filters → getClasses() → ClassCard list
```

1. Filtros actualizan query params
2. `getClasses()` aplica filtros
3. Renderiza lista de clases

## Decisiones Técnicas

### Next.js App Router vs Pages Router

**Elegido**: App Router

**Razones:**

- Server Components por defecto
- Streaming y Suspense
- Nested layouts
- Mejor performance
- Future-proof

**Trade-offs:**

- Más nuevo (menos ejemplos)
- "use client" necesario para interacción

### Tailwind CSS vs CSS Modules

**Elegido**: Tailwind CSS

**Razones:**

- Desarrollo rápido
- Consistente
- No necesita archivos separados
- Tree-shaking automático
- Diseño responsive fácil

**Trade-offs:**

- HTML más verboso
- Curva de aprendizaje
- PurgeCSS necesario en producción

### Context API vs Redux/Zustand

**Elegido**: Context API

**Razones:**

- Simple para MVP
- No dependencias externas
- Suficiente para auth básico
- Built-in en React

**Trade-offs:**

- No optimizado para updates frecuentes
- Puede causar re-renders
- No tiene devtools

### TypeScript Strict Mode

**Habilitado**: Sí

**Razones:**

- Previene bugs en desarrollo
- Mejor DX (autocomplete)
- Documentación viva
- Refactoring seguro

**Trade-offs:**

- Más tiempo inicial
- Curva de aprendizaje
- A veces necesita type assertions

## Performance Considerations

### Optimizaciones Implementadas

1. **Server Components**: Por defecto en App Router
2. **Image Optimization**: Componente `next/image`
3. **Font Optimization**: `next/font` para Geist/Saira
4. **Code Splitting**: Por ruta automático
5. **Static Assets**: En directorio `public/`

### Pendientes

1. **Data Fetching**: Implementar caching con React cache
2. **Loading States**: Mejorar UX con Suspense
3. **Bundle Analysis**: Analizar tamaño final
4. **PWA**: Service worker para offline

## Seguridad

### Implementado

1. **Type Safety**: TypeScript strict
2. **XSS Prevention**: React auto-escapa
3. **Auth**: localStorage (temporal, para MVP)

### Pendientes

1. **API Routes**: Validación de inputs
2. **Auth**: JWT + httpOnly cookies
3. **Rate Limiting**: Para reservas
4. **CSP Headers**: Content Security Policy

## Escalabilidad

### Horizontal

- **Static Generation**: Para páginas de marketing
- **CDN**: Assets en Vercel/CloudFront
- **Database**: Separar de la app

### Vertical

- **Code Splitting**: Ya implementado
- **Lazy Loading**: Para componentes pesados
- **Memoization**: React.memo para listas

## Testing Strategy

### Pendiente de Implementar

1. **Unit Tests**: Jest + React Testing Library
2. **E2E Tests**: Playwright/Cypress
3. **Visual Tests**: Storybook + Chromatic
4. **Performance**: Lighthouse CI

## Despliegue

### Recomendado

**Vercel** (creadores de Next.js)

**Razones:**

- Optimizado para Next.js
- Edge Functions
- Analytics integrado
- Deploys automáticos
- Preview deployments

### Alternativas

- **AWS Amplify**: Full AWS stack
- **Netlify**: Buena integración
- **Docker**: Self-hosted

## Monitoreo

### Pendiente

1. **Error Tracking**: Sentry
2. **Performance**: Vercel Analytics
3. **User Analytics**: Mixpanel/Amplitude
4. **Uptime**: Better Uptime
