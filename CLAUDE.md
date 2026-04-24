# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a portfolio site optimized for visual impact with advanced 3D graphics, built with:
- **Frontend**: React 18 + React Router 6 (SPA) + TypeScript + Vite + TailwindCSS 3
- **Development Backend**: Express server with Vite integration (dev-only; not used in production)
- **Production**: Netlify static deployment + serverless functions (currently unused)
- **Package Manager**: pnpm
- **3D Graphics**: Three.js with React Three Fiber for interactive hero sections
- **UI Framework**: Radix UI components + custom TailwindCSS styling
- **External Services**: Web3Forms for contact form submissions

**Production Status**: Suitable for deployment to Netlify but note the limitations section below.

**Key Limitation**: Contact form leaks Web3Forms API key in frontend code (external service trust model); Express server only exists for local development.

## Development Commands

```bash
pnpm dev              # Start dev server (client + Express backend on port 8080) — LOCAL DEV ONLY
pnpm build            # Build client only (server build unused in production)
pnpm build:client     # Build only the React SPA
pnpm build:server     # Build Express server (for local testing; not used in production)
pnpm start            # Start production server locally (rarely needed)
pnpm typecheck        # Run TypeScript type checking
pnpm test             # Run Vitest (minimal tests: only utils.spec.ts exists)
pnpm format.fix       # Format all code with Prettier
```

**Important**: `pnpm build` only builds the client. In production, Netlify runs `npm run build:client` automatically.

## Project Structure

```
client/
├── pages/                    # Route components (Index, Work, About)
├── components/
│   ├── sections/            # Page sections (Hero, Projects, Skills, etc.)
│   ├── 3d/                  # Three.js/React Three Fiber components
│   │   ├── Hero3DText.tsx   # Main 3D text canvas
│   │   ├── Canvas3D.tsx     # Canvas wrapper
│   │   ├── ParticleField.tsx
│   │   ├── ScrollSceneGeometry.tsx
│   │   └── HeroGeometry.tsx
│   ├── ui/                  # Radix UI + TailwindCSS component library
│   ├── Navigation.tsx       # Header navigation
│   ├── Footer.tsx           # Footer component
│   ├── CustomCursor.tsx     # Custom cursor implementation
│   └── LoadingScreen.tsx    # Initial loading state
├── hooks/                   # Custom React hooks
├── lib/                     # Utilities
│   ├── utils.ts            # cn() for class merging with clsx + tailwind-merge
│   └── data.ts             # Portfolio project data, team info, testimonials
├── App.tsx                  # SPA routing definition
├── global.css              # TailwindCSS config + global styles
└── vite-env.d.ts           # Vite environment types

server/
├── index.ts                 # Express app creation (middleware, CORS, security)
├── node-build.ts            # Production server entry point
└── routes/
    └── demo.ts              # Example API route

shared/
└── api.ts                   # Shared TypeScript interfaces for client/server

Root:
├── vite.config.ts           # Client build config (dev server + express plugin)
├── vite.config.server.ts    # Server build config (Node.js target)
├── tsconfig.json            # TypeScript configuration (strict mode enabled)
├── tailwind.config.ts       # TailwindCSS customization
└── index.html               # HTML entry point
```

## Key Architecture Patterns

### Deployment: Dev vs. Production

**This is the single most important thing to understand about this codebase.**

| Aspect | Development | Production |
|--------|-------------|-----------|
| **Server** | Express (Node.js) | Netlify (Static + Serverless) |
| **Port** | `8080` | N/A (CDN) |
| **API Routes** | `/api/*` served by Express | Would be `/api/*` → `/.netlify/functions/api/*` (currently unused) |
| **Build** | `pnpm dev` (Vite + Express plugin) | `npm run build:client` (client-only) |
| **Where It Runs** | Local machine | Netlify platform |

**Critical**: The Express server in `server/` is **never used in production**. It exists only for local development. Production is a static SPA deployed to Netlify.

**Netlify Configuration** (`netlify.toml`):
```toml
[build]
command = "npm run build:client"  # Only builds frontend
functions = "netlify/functions"   # Serverless functions location (currently empty)
publish = "dist/spa"              # Publishes the SPA
```

**Serverless Functions**: The `netlify/functions/` directory is configured but empty. If you add backend logic, it must be rewritten as serverless functions (not Express routes).

---

### SPA Routing
- Routes defined in `client/App.tsx` using React Router 6
- Page components in `client/pages/` (Index = /, Work = /work, About = /about)
- No lazy-loading currently implemented (all routes eagerly loaded)

### 3D Rendering Pipeline
The portfolio uses React Three Fiber for interactive 3D graphics:
- **Hero3DText.tsx**: Canvas-based 3D text animation in hero section
- **ParticleField.tsx**: Particle system for visual effects
- **ScrollSceneGeometry.tsx**: Geometry that responds to scroll events
- Three.js handles rendering, GSAP handles animations

### Styling System
- **TailwindCSS 3**: Primary styling approach
- **`cn()` utility**: Combines `clsx` + `tailwind-merge` for class merging with priority (in `client/lib/`)
- **Global styles**: Theme tokens and design system in `client/global.css`
- **Responsive**: Mobile-first approach using Tailwind breakpoints

### Server Architecture

The Express server is **development-only**. Here's how it works locally:

- **Single port (8080)**: Both frontend and backend share the same Vite dev server
- **Express plugin**: Loaded into Vite via `vite.config.ts` (see `expressPlugin()` function)
- **API prefix**: Routes prefixed with `/api/` (e.g., `/api/ping`, `/api/demo`)
- **Health check**: `GET /health` returns status and timestamp
- **Security headers**: CORS, HSTS, X-Frame-Options, X-Content-Type-Options configured in `server/index.ts`
- **Error handling**: All endpoints wrapped in try-catch; errors return generic 500 responses with no detail leakage
- **Development-only**: This setup is never deployed; do not depend on it for production logic

**Note**: In production, this server doesn't exist. All API calls use external services (currently only Web3Forms).

### Type Safety
- **Path aliases**: `@/*` → client, `@shared/*` → shared folder (configured in `tsconfig.json` and both vite configs)
- **Strict TypeScript**: `noUnusedLocals`, `noUnusedParameters`, `strictNullChecks` enabled
- **Zod**: Installed as dependency but NOT currently used (reserved for future form/API validation)
- **API types**: Shared between client and server via `shared/api.ts` (e.g., `DemoResponse` type)

### Component Library
- **Radix UI**: Headless component primitives (Dialog, Select, Tabs, etc.)
- **Pre-built UI components**: Located in `client/components/ui/`
- **Customizable**: Each Radix component wrapped with TailwindCSS styling

## External Service Dependencies

### Web3Forms (Contact Form)

**Critical**: This is the only backend service currently in use.

- **Service**: Web3Forms (https://web3forms.com) — free form-to-email relay service
- **Implementation**: `client/components/sections/ExperienceContact.tsx` (lines 32–62)
- **Access Key**: Hardcoded in component (`f9ed969f-b4af-49d9-a2e8-3590111d70fc`)
- **Endpoint**: `POST https://api.web3forms.com/submit`
- **Email Recipient**: `youssefabdelhakam99@gmail.com` (hardcoded in component)
- **Fallback**: If Web3Forms fails, form triggers `mailto:` link (graceful degradation)

**Security Note**: API key is exposed in frontend code. This is acceptable for Web3Forms (public service) but represents a trust model risk. If key rotation is needed, the component must be updated manually.

**When Modifying Contact Form**:
- Email validation is client-side regex only: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` (permissive; may accept invalid emails)
- No server-side validation (form submits directly to Web3Forms)
- Form state: `idle` → `sending` → `sent` → auto-reset after 3 seconds
- Do not change recipient email without updating component AND environment if vars are ever introduced

### Component Library
- **Radix UI**: Headless component primitives (Dialog, Select, Tabs, etc.)
- **Pre-built UI components**: Located in `client/components/ui/`
- **Customizable**: Each Radix component wrapped with TailwindCSS styling

## Development Workflow

### Adding a New Page
1. Create a new component in `client/pages/PageName.tsx`
2. Add route in `client/App.tsx`: `<Route path="/path" element={<PageName />} />`
3. Import components from `client/components/sections/` for sections
4. Use `cn()` for conditional Tailwind classes

### Adding API Endpoints

**Important**: New API endpoints are for local development only. They will not work in production without migrating to Netlify Functions.

1. Create route handler in `server/routes/`
2. Import in `server/index.ts` and register: `app.get("/api/endpoint", handler)`
3. Define shared types in `shared/api.ts` if needed
4. Wrap in try-catch with 500 error response (no error details leaked)

### Working with 3D Components
- Use React Three Fiber (`@react-three/fiber`) and Three.js
- GSAP (`gsap`) for animations
- Lenis for smooth scrolling integration
- Components are canvas-based; test in browser for performance

### Styling Guidelines
- Use Tailwind utility classes first
- Use `cn()` for conditional classes (from `client/lib/utils.ts`): `cn("base", { "conditional": condition })`
- Extract repeated patterns into reusable UI components in `client/components/ui/`
- Colors use CSS variables (e.g., `--primary`, `--foreground`, `--accent`) defined in `client/global.css`
- Custom typography: `font-syne` for headings, `font-sans` for body text (via Space Grotesk and Inter)
- Custom animations: `text-reveal` class with clip-path for text animations, custom cursor styles in `global.css`

---

### Working with 3D Components
- Use React Three Fiber (`@react-three/fiber`) and Three.js
- GSAP (`gsap`) for animations
- Lenis for smooth scrolling integration
- Components are canvas-based; test in browser for performance

### Styling Guidelines
- Use Tailwind utility classes first
- Use `cn()` for conditional classes (from `client/lib/utils.ts`): `cn("base", { "conditional": condition })`
- Extract repeated patterns into reusable UI components in `client/components/ui/`
- Colors use CSS variables (e.g., `--primary`, `--foreground`, `--accent`) defined in `client/global.css`
- Custom typography: `font-syne` for headings, `font-sans` for body text (via Space Grotesk and Inter)
- Custom animations: `text-reveal` class with clip-path for text animations, custom cursor styles in `global.css`

## Important Notes

### Environment Variables

**Frontend Variables** (prefixed `VITE_` to expose to browser):
- `VITE_CONTACT_PHONE`: Phone number displayed in header/contact section
- `VITE_LINKEDIN_URL`, `VITE_GITHUB_URL`, `VITE_TWITTER_URL`: Social media links in footer

**Backend Variables** (dev-only; ignored in production):
- `PORT`: Dev server port (default 3000; overridden by Vite's 8080)
- `NODE_ENV`: Auto-set by build tools; do not manually configure
- `PING_MESSAGE`: Response for `/api/ping` endpoint (dev testing)
- `ALLOWED_ORIGIN`: CORS origin (dev-only; unused in Netlify production)

**Unused**:
- `VITE_PUBLIC_BUILDER_KEY`: Placeholder for Builder.io integration; no active integration
- `VITE_CONTACT_EMAIL`: Hardcoded in component instead; not used as env var

**Important**: Environment variables are NOT automatically passed to Netlify. To set them in production, use Netlify Dashboard → Site Settings → Build & Deploy → Environment.

---

### Testing Strategy

**Current State**: Minimal test coverage.
- Only test file: `client/lib/utils.spec.ts` (32 lines; tests `cn()` utility only)
- No component tests, integration tests, or API route tests
- Vitest is configured but rarely exercised
- `pnpm test` runs Vitest in single-run mode (no watch mode)

**When Adding Tests**:
1. Create `*.test.ts` or `*.spec.ts` files colocated with source
2. Use Vitest (already configured; see existing test for imports)
3. Testing patterns:
   - **Utilities**: Unit tests (follow `utils.spec.ts` pattern)
   - **React Components**: No pattern yet; consider Vitest + `@testing-library/react` if needed
   - **API Routes**: Manual testing only (not applicable in production)
   - **3D Components**: Visual browser testing required (no automated tests possible)

**Limitation**: No CI/CD pipeline runs tests automatically; all testing is manual.

---

### Error Handling Patterns

**Server Endpoints** (Express):
```typescript
app.get("/api/endpoint", (req, res) => {
  try {
    // ... logic
    res.status(200).json({ data });
  } catch (error) {
    console.error("Endpoint error:", error);
    res.status(500).json({ 
      error: "Internal server error", 
      message: "Failed to process request" 
    });
  }
});
```
- All errors return generic `500` responses (no error detail leakage)
- Errors logged to console for debugging
- No validation error responses (e.g., 400 Bad Request)

**Client (React)**:
- Forms use `.catch()` on fetch; failures fallback to `mailto:` link
- Web3Forms API errors trigger `mailto:` fallback (no retry logic)
- Toast notifications available via `useToast()` hook
- No error boundaries currently implemented

**Gaps**:
- No centralized error logging or reporting
- No error boundary components for React
- No validation error responses from server
- Consider adding error boundaries around `Hero3DText.tsx`

---

### Custom Hooks

Located in `client/hooks/`:

- **`useMobile()`** (`use-mobile.tsx`): Media query hook for detecting mobile viewport; returns boolean. Use for responsive layouts.
- **`useToast()`** (`use-toast.ts`): Toast notification trigger; integrates with Sonner toast library. Usage: `const { toast } = useToast(); toast({ title: "...", description: "..." })`
- **`useLenis()`** (`useLenis.ts`): Lenis smooth scroll library integration; handles scroll animations and synchronization.

---

### Performance Considerations & Gotchas

**Known Issues**:
1. **Hero3DText.tsx**: Large Canvas component rendering 3D text. On slower devices or mobile, consider lazy-loading or progressive rendering.
2. **Particle systems** (`ParticleField.tsx`): May leak WebGL context if unmounted abruptly during route changes. Test cleanup on navigation.
3. **No code splitting**: All routes eagerly loaded. If bundle exceeds ~500KB, consider React.lazy() + Suspense.
4. **GSAP animations**: No frame rate throttling. Can overwhelm low-end mobile devices. Profile with Chrome DevTools throttling.
5. **Canvas rendering**: Renders immediately but content may load after; consider splash screen or skeleton loader.

**Optimization Techniques**:
- Use React Query caching (configured but unused; see QueryClient in `App.tsx`)
- Profile on mobile using Chrome DevTools (throttle CPU and network)
- Test on actual devices (simulator ≠ reality for GPU performance)
- Monitor Time to Interactive (TTI) and First Contentful Paint (FCP)

**Metrics to Monitor**:
- Bundle size: Currently ~300KB+ (unverified)
- Time to Interactive: Untracked
- Canvas render time: Profile with Chrome DevTools Performance tab

---

### Code Conventions

**Component Structure**:
- **Pages** (`client/pages/`): Full route components; typically contain useEffect for data loading; exported as default
- **Sections** (`client/components/sections/`): Reusable page sections (Hero, Projects, etc.); exported as default
- **UI** (`client/components/ui/`): Radix UI + Tailwind wrappers; primitive building blocks; typically exported as named export
- **3D** (`client/components/3d/`): Canvas/Three.js components; encapsulate WebGL context; use Canvas as wrapper
- **Utilities** (`client/lib/`): Pure functions and constants; avoid React hooks

**Naming Conventions**:
- **Files**: PascalCase for components (e.g., `Hero.tsx`), camelCase for utilities (e.g., `utils.ts`)
- **Variables**: camelCase
- **CSS classes**: kebab-case (Tailwind standard)
- **React component props**: camelCase

**State Management**:
- **Local component state**: `useState()` for form inputs, UI toggles, temporary state
- **Shared state**: None currently (React Query available but unused; no context providers)
- **Data**: Hardcoded in `client/lib/data.ts` (projects, team, testimonials); update manually to change content

**Comments**:
- Inline comments only for non-obvious logic (regex patterns, GSAP callbacks, workarounds)
- No file headers or docstrings
- Example: `ExperienceContact.tsx` has inline comment explaining Web3Forms API

---

### Other Important Notes

- **TypeScript strict mode enabled**: All code must pass type checking with `pnpm typecheck`
- **Hot reload in dev mode**: Both client and Express backend hot-reload during development (dev-only)
- **Production deployment**: Netlify automatically runs `npm run build:client`; Express server build is not deployed
- **Prettier formatting**: Auto-format with `pnpm format.fix` before committing
- **Portfolio data**: Project info, team members, testimonials stored in `client/lib/data.ts` (not a database); update manually
