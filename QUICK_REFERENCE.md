# 🚀 Quick Reference Guide

## Before You Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env.local
# Edit .env.local with your values

# 3. Verify everything works
npm run typecheck
npm run test
npm run dev
```

## Common Commands

```bash
# Development
npm run dev              # Start dev server on localhost:8080

# Building
npm run build           # Build client (production)
npm run build:client    # Build only React SPA

# Quality checks
npm run typecheck       # TypeScript type checking
npm run test           # Run all tests
npm run format:fix     # Format code with Prettier

# Server (dev only)
npm run start          # Start production server locally
```

## Form Validation

### Using Zod Schemas

```typescript
import { ContactFormSchema } from "@/lib/validation";

// Validate data
const validation = ContactFormSchema.safeParse(formData);

if (!validation.success) {
  // Handle errors
  validation.error.errors.forEach((error) => {
    console.error(error.path[0], error.message);
  });
} else {
  // Data is valid
  console.log(validation.data);
}
```

## Testing

### Run all tests

```bash
npm run test
```

### Test structure

```
✓ client/lib/utils.spec.ts (5 tests)
✓ client/lib/validation.spec.ts (11 tests)

Total: 16 tests passing ✅
```

### Add new tests

```typescript
// Create file: component.spec.ts
import { describe, it, expect } from "vitest";

describe("MyComponent", () => {
  it("should do something", () => {
    expect(true).toBe(true);
  });
});
```

## Form Submission Flow

```
User Input
    ↓
Zod Validation ← Type-safe validation
    ↓
Rate Limit Check ← 5 submissions/hour
    ↓
Web3Forms API ← Submit to external service
    ↓
Success/Error State ← User feedback
    ↓
Fallback to mailto: ← If API fails
```

## Security Checklist

- ✅ Input validation with Zod
- ✅ XSS prevention (no HTML tags)
- ✅ Rate limiting (5/hour)
- ✅ Error handling (no sensitive data)
- ✅ CORS hardened
- ✅ Security headers set
- ✅ Environment variables (no secrets in code)

## Accessibility Checklist

When adding features:

- ✅ Add aria-label to buttons
- ✅ Add role="list" to lists
- ✅ Add role="alert" to errors
- ✅ Add aria-live for dynamic updates
- ✅ Add focus-visible to interactive elements
- ✅ Use semantic HTML (button, a, form, etc.)
- ✅ Test with Tab/Shift+Tab keyboard nav
- ✅ Test with screen reader (NVDA, JAWS)

## Performance Tips

- ✅ Use React.lazy() for new routes
- ✅ Add loading="lazy" to images
- ✅ Use Suspense for async boundaries
- ✅ Error boundaries around 3D components
- ✅ Avoid rendering expensive components
- ✅ Use useMemo for expensive calculations

## Deploy to Netlify

```bash
# 1. Push to GitHub
git add .
git commit -m "Improvements"
git push

# 2. Set environment variables:
# Dashboard → Site Settings → Build & Deploy → Environment
VITE_CONTACT_EMAIL=your-email@example.com
VITE_CONTACT_PHONE=+1-XXX-XXX-XXXX
VITE_LINKEDIN_URL=https://linkedin.com/in/...
VITE_GITHUB_URL=https://github.com/...
VITE_TWITTER_URL=https://twitter.com/...

# 3. Deploy auto-triggers on push
```

## Environment Variables

```env
# Frontend (.env.local)
VITE_CONTACT_EMAIL=your-email@example.com
VITE_CONTACT_PHONE=+1-555-1234
VITE_LINKEDIN_URL=https://linkedin.com/in/...
VITE_GITHUB_URL=https://github.com/...
VITE_TWITTER_URL=https://twitter.com/...

# Backend (dev only)
PORT=3000
NODE_ENV=development
```

## Troubleshooting

### Tests failing?

```bash
npm run test -- --reporter=verbose
```

### Type errors?

```bash
npm run typecheck
```

### Build failing?

```bash
npm run build:client
```

### Port in use?

```bash
# Kill process on port 8080
lsof -ti:8080 | xargs kill -9  # macOS/Linux
Get-Process -Id (Get-NetTCPConnection -LocalPort 8080).OwningProcess | Stop-Process  # Windows
```

## Important Files

```
client/
  ├── lib/
  │   ├── validation.ts        ← Zod schemas
  │   ├── validation.spec.ts   ← Tests
  │   └── utils.ts             ← Utilities
  ├── components/
  │   ├── sections/
  │   │   └── ExperienceContact.tsx  ← Form with validation
  │   ├── ErrorBoundary.tsx    ← Error handling
  │   └── Navigation.tsx       ← Accessible navigation
  └── App.tsx                  ← Routes with lazy loading

.env.example                   ← Template
tsconfig.json                  ← TypeScript config
package.json                   ← Dependencies
```

## Resources

- [Zod Documentation](https://zod.dev/)
- [React Documentation](https://react.dev/)
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev/)

## Next Steps

1. ✅ Understand validation schemas
2. ✅ Run tests to verify setup
3. ✅ Deploy to Netlify
4. ✅ Monitor form submissions
5. ✅ Consider: Backend Web3Forms proxy (future)
6. ✅ Consider: E2E tests (future)

---

**Last Updated**: 2026-04-24  
**Status**: Current ✅
