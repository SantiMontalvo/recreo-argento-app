---
name: project-recreo-argento
description: Stack, modelo de negocio, mecánica de votación, schema de Supabase y requisitos clave del proyecto RecreoArgento
metadata:
  type: project
---

# RecreoArgento

App de votación semanal temática argentina. Consigna nueva cada semana, usuarios votan opciones (o escriben las propias).

## Stack
- Next.js 16 (Turbopack), `output: 'export'` → desplegado en **GitHub Pages** via GitHub Actions
- Supabase (Postgres) como base de datos y cliente JS directo desde el cliente
- TailwindCSS, Lucide React

## Schema Supabase

### Tabla `votes`
```sql
id uuid (PK, gen_random_uuid)
name text NOT NULL          -- nombre del votante
email text NOT NULL
city text NOT NULL
candidate text NOT NULL     -- texto de la opción votada
vote_count integer NOT NULL CHECK > 0  -- cantidad de votos del pack
poll_id text NOT NULL       -- = weekConfig.weekId (ej: "semana-1")
created_at timestamptz DEFAULT now()
```

**Why:** Schema simplificado sin payment_id, week_id, option_id — las API routes de votación usaban columnas incorrectas.

### Tabla `daily_winners`
Columnas usadas en código: `week_id`, `option_id`, `option_text`, `vote_count`, `day`, `date`.

## Inserción de votos
Se hace **directamente desde el cliente** con el `supabase` client (clave anon pública).
El servicio está en `services/votes.ts` → función `createVote({ name, email, city, candidate, voteCount, pollId })`.

**Why:** `output: 'export'` no soporta API routes dinámicas en producción, por eso se llama Supabase directo desde `VoteModal.tsx`.

## Flujo de votación (sin MercadoPago)
1. Usuario elige opción en `VotingSection`
2. Se abre `VoteModal` → paso 1: elige cantidad de votos (packs)
3. Paso 2: llena nombre, mail, ciudad
4. Submit → `createVote()` → insert en Supabase
5. Paso 3: pantalla de éxito en el modal

## Estructura de semanas
Configuración en `config/week.config.ts` → `weekId`, `startDate`, `endDate`, opciones, packs.
Los datos de votación se leen en `app/page.tsx` (Server Component, baked en build time para static export).

## Notas importantes
- MercadoPago fue removido del flujo de votación (2026-09-29). Las routes `/api/payment/*` siguen en el código pero no se usan en el modal.
- La route `/app/api/votes/route.ts` fue eliminada (era redundante con `page.tsx` y rompía el build).
- `lib/supabase.ts` exporta `supabase` (client-side) y `createServerClient()` (server-side, usa service role key si existe).
