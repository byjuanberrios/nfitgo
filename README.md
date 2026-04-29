# NFITGO

Plataforma para descubrir y reservar clases de fitness en Chile.

## Stack Tecnológico

- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **UI**: Componentes React con Lucide React
- **Linting**: ESLint 9 con configuración de Next.js

## Arquitectura del Proyecto

### Estructura de Directorios

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Rutas de autenticación
│   ├── (main)/            # Rutas principales de la app
│   ├── api/               # API routes (vacío - pendiente de implementación)
│   └── layout.tsx         # Root layout
├── components/            # Componentes React
│   ├── icons/             # Iconos personalizados
│   ├── onboarding/        # Flujo de onboarding
│   └── shared/            # Componentes reutilizables
├── context/               # Contextos de React
├── data/                  # Datos mock (temporal)
├── lib/                   # Utilidades
├── parts/                 # Componentes de layout (Header, Footer)
├── services/              # Lógica de negocio y APIs
├── types/                 # Definiciones de TypeScript
└── assets/                # Assets estáticos
```

### Patrones de Arquitectura

1. **Componentes**: Organizados por feature y reutilizabilidad
   - `shared/`: Componentes genéricos reutilizables
   - `onboarding/`: Componentes específicos del flujo de onboarding
   - `icons/`: Iconos como componentes React

2. **Services**: Capa de lógica de negocio
   - Cada entidad tiene su propio servicio (classes, bookings, etc.)
   - Actualmente usando datos mock, preparado para integración API
   - Funciones async para simular llamadas reales

3. **Context**: Manejo de estado global
   - `AuthContext`: Gestión de autenticación y usuario
   - Persistencia en localStorage

4. **Tipos**: Centralizados en `src/types/index.ts`
   - Interfaces para todas las entidades del dominio
   - Props de componentes compartidas

## Convenciones de Código

### TypeScript

- **Strict mode** habilitado
- **Interfaces** para definiciones de tipos
- **Type imports** explícitos: `import type { Foo }`
- **Path aliases**: `@/` mapea a `src/`

### Componentes React

- **Functional components** con TypeScript
- **Props interfaces** en `src/types/index.ts`
- **Client components**: Usar `"use client"` cuando sea necesario
- **Naming**: PascalCase para componentes, camelCase para props

### Estilos

- **Tailwind CSS** con clases utilitarias
- **Responsive**: Mobile-first con breakpoints (`lg:`, `md:`)
- **Custom properties**: Colores definidos en `globals.css`
- **Dark theme** por defecto

### Estructura de Archivos

```typescript
// Importaciones agrupadas
import type { Foo } from "@/types";
import { useAuth } from "@/context";

// Componentes con props tipadas
interface Props {
  /* ... */
}
const Component = ({ foo }: Props) => {
  /* ... */
};

// Export default
export default Component;
```

## Guía de Contribución

### Setup del Proyecto

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Linting
pnpm lint
```

### Desarrollo

1. **Crear componentes** en `src/components/` según su propósito
2. **Definir tipos** en `src/types/index.ts` antes de implementar
3. **Usar services** para lógica de negocio, no llamadas directas
4. **Manejar estados** con Context API para estado global
5. **Persistir datos** en localStorage para desarrollo

### Antes de Commitear

- [ ] Ejecutar `pnpm lint` sin errores
- [ ] Tipos de TypeScript sin errores
- [ ] Componentes testeados manualmente
- [ ] Código comentado solo cuando sea complejo

## Decisiones de Diseño (ADRs)

### ADR-001: Next.js App Router

**Decisión**: Usar Next.js 16 con App Router
**Razón**: Mejor performance, streaming, nested layouts
**Impacto**: Estructura de directorios en `src/app/`

### ADR-002: Tailwind CSS v4

**Decisión**: Tailwind CSS para estilos
**Razón**: Desarrollo rápido, consistente, tree-shaking automático
**Impacto**: No se usan archivos CSS separados, solo clases utilitarias

### ADR-003: TypeScript Strict

**Decisión**: Habilitar strict mode en TypeScript
**Razón**: Prevenir errores en tiempo de desarrollo, mejor DX
**Impacto**: Todas las variables deben tener tipos explícitos

### ADR-004: Monorepo de Tipos

**Decisión**: Centralizar todos los tipos en `src/types/index.ts`
**Razón**: Fácil descubrimiento, evitar imports circulares
**Impacto**: Archivo grande pero mejor mantenibilidad

### ADR-005: Services con Datos Mock

**Decisión**: Implementar capa de services con datos mock
**Razón**: Desacoplar UI de backend, permitir desarrollo paralelo
**Impacto**: Funciones async que retornan datos estáticos, fácil migrar a fetch real

### ADR-006: Context API para Auth

**Decisión**: Usar Context API + localStorage para autenticación
**Razón**: Simple, no requiere dependencias externas para MVP
**Impacto**: Estado de usuario disponible globalmente, persiste en recargas

## Scripts Disponibles

- `pnpm dev` - Servidor de desarrollo
- `pnpm build` - Build de producción
- `pnpm start` - Iniciar servidor de producción
- `pnpm lint` - Ejecutar ESLint

## Arquitectura Detallada

Ver [`src/docs/architecture.md`](src/docs/architecture.md) para más detalles técnicos.
