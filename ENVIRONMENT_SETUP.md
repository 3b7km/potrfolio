# Environment Setup Guide

This document explains how to set up environment variables for local development and production deployment.

## Local Development Setup

### 1. Create `.env.local` from template

```bash
# Copy the example file
cp .env.example .env.local
```

### 2. Fill in your values

```env
# Frontend Environment Variables
VITE_CONTACT_EMAIL=your-email@example.com
VITE_CONTACT_PHONE=+1-XXX-XXX-XXXX
VITE_LINKEDIN_URL=https://linkedin.com/in/your-profile
VITE_GITHUB_URL=https://github.com/your-username
VITE_TWITTER_URL=https://twitter.com/your-handle

# Backend Environment Variables (Dev Only)
PORT=3000
NODE_ENV=development
PING_MESSAGE=pong
ALLOWED_ORIGIN=http://localhost:3000
```

### 3. Important Notes

- **Never commit `.env.local`** — it contains sensitive data
- `.env.local` is gitignored automatically
- Frontend variables (`VITE_*`) are exposed in production builds
- Backend variables are dev-only (not used in Netlify production)

---

## Frontend Environment Variables

### `VITE_CONTACT_EMAIL`

- **Purpose**: Email recipient for contact form submissions
- **Type**: String (email format)
- **Used in**: `ExperienceContact.tsx`, `Hero.tsx`
- **Default**: `youssefabdelhakam99@gmail.com`

### `VITE_CONTACT_PHONE`

- **Purpose**: Phone number displayed in contact section
- **Type**: String (phone format)
- **Used in**: `Hero.tsx`, footer
- **Default**: `+201023329072`

### `VITE_LINKEDIN_URL`

- **Purpose**: LinkedIn profile link
- **Type**: String (URL)
- **Used in**: Footer, contact section
- **Default**: `https://linkedin.com/in/youssef-abdelhakm-gamal-3b7km/`

### `VITE_GITHUB_URL`

- **Purpose**: GitHub profile link
- **Type**: String (URL)
- **Used in**: Footer
- **Default**: `https://github.com`

### `VITE_TWITTER_URL`

- **Purpose**: Twitter/X profile link
- **Type**: String (URL)
- **Used in**: Footer
- **Default**: `https://twitter.com`

---

## Backend Environment Variables (Dev Only)

> **Note**: These variables only affect local development. Netlify ignores these in production.

### `PORT`

- **Purpose**: Dev server port
- **Type**: Number
- **Default**: `3000`
- **Note**: Vite overrides this to `8080` automatically

### `NODE_ENV`

- **Purpose**: Environment mode (development/production)
- **Type**: String (`development`, `production`)
- **Auto-set**: By build tools; don't manually configure
- **Netlify**: Automatically set to `production`

### `PING_MESSAGE`

- **Purpose**: Response text for `/api/ping` endpoint
- **Type**: String
- **Default**: `pong`
- **Used in**: API testing

### `ALLOWED_ORIGIN`

- **Purpose**: CORS allowed origin
- **Type**: String (URL)
- **Default**: `http://localhost:3000`
- **Used in**: Development CORS configuration
- **Note**: Netlify uses different security model; this is ignored

---

## Production Deployment

### Netlify Environment Variables

Environment variables are **NOT automatically passed** to Netlify. You must set them manually:

1. Go to **Netlify Dashboard**
2. Select your site → **Site Settings**
3. Navigate to **Build & Deploy** → **Environment**
4. Add environment variables:

   ```
   VITE_CONTACT_EMAIL = your-email@example.com
   VITE_CONTACT_PHONE = +1-XXX-XXX-XXXX
   VITE_LINKEDIN_URL = https://linkedin.com/in/...
   VITE_GITHUB_URL = https://github.com/...
   VITE_TWITTER_URL = https://twitter.com/...
   ```

5. **Trigger redeploy** for changes to take effect

### Important Production Notes

- ✅ **Frontend variables** (`VITE_*`) are embedded in the build (visible in browser)
- ❌ **Backend variables** are ignored (Netlify doesn't use Express server)
- ✅ **Netlify Functions** have their own environment configuration
- ✅ **Contact form** uses Web3Forms API (public service; API key exposure is acceptable)

---

## Testing Environment Variables

### Verify variables are loaded

```typescript
// In your component or during build
console.log(import.meta.env.VITE_CONTACT_EMAIL);
console.log(import.meta.env.VITE_CONTACT_PHONE);
```

### Run dev server

```bash
pnpm dev
```

Then check:

- Browser console for any errors
- Network tab for API calls
- Contact form submissions work

---

## Troubleshooting

### Variables not showing in component

**Problem**: `VITE_*` variables are `undefined`

**Solution**:

1. Verify variable name in `.env.local` (must start with `VITE_`)
2. Restart dev server after changing `.env.local`
3. Clear browser cache
4. Check spelling matches exactly

### Port 3000 already in use

**Problem**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solution**:

```bash
# Kill process using port 3000
# On macOS/Linux
lsof -ti:3000 | xargs kill -9

# On Windows (PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force
```

### Environment variables not updating on Netlify

**Problem**: Changes not reflecting in production

**Solution**:

1. Update variable in Netlify Dashboard
2. Trigger **Deploy** → **Trigger Deploy** (not just push)
3. Wait for build to complete
4. Clear CloudFlare cache if applicable
5. Check incognito window (clear browser cache)

---

## Security Best Practices

### Never commit secrets

```bash
# .gitignore should include:
.env.local
.env.*.local
node_modules/
dist/
```

### Frontend vs Backend secrets

- **Frontend** (`VITE_*`): Considered public; embed contact email, social links
- **Backend**: Never expose API keys, database URLs, authentication tokens

### Web3Forms API Key

- ✅ It's OK to expose (public form service)
- ✅ Web3Forms doesn't charge based on key usage
- ✅ If key rotation needed: update component only
- ⚠️ Future: Consider moving to backend proxy for better security

---

## Example `.env.local`

```env
# ============================================
# Portfolio Website Environment Variables
# ============================================

# Contact Information
VITE_CONTACT_EMAIL=youssef@yourdomain.com
VITE_CONTACT_PHONE=+1-555-123-4567

# Social Links
VITE_LINKEDIN_URL=https://linkedin.com/in/your-name
VITE_GITHUB_URL=https://github.com/your-username
VITE_TWITTER_URL=https://twitter.com/your-handle

# Development Server (Dev Only)
PORT=3000
NODE_ENV=development
PING_MESSAGE=pong
ALLOWED_ORIGIN=http://localhost:3000
```

---

## Next Steps

1. ✅ Create `.env.local` from `.env.example`
2. ✅ Fill in your contact information
3. ✅ Restart dev server: `pnpm dev`
4. ✅ Test contact form submissions
5. ✅ Verify links in footer are correct
6. ✅ For production: Set variables in Netlify Dashboard

---

**Last Updated**: 2026-04-24  
**Status**: Current
