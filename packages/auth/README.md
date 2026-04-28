# @harmony/auth

Shared authentication library for Harmony AI ecosystem. Provides SSO integration, middleware, context providers, and client-side hooks.

## Architecture

```
┌──────────────────────────────────┐
│  id.vutera.net (SSO Service)     │
│  - JWT token generation          │
│  - User/Profile management       │
│  - Authentication logic          │
└──────────────────────────────────┘
             ▲    │
       JWT    │    │ /api/auth/me
       token  │    ▼
             │
    ┌────────┴────────┬──────────────┬──────────────┐
    │                 │              │              │
    ▼                 ▼              ▼              ▼
┌─────────┐  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│tuvi app │  │harmony app   │ │ menhan app   │ │ other apps   │
│@harmony/auth│@harmony/auth│ │@harmony/auth │ │              │
│- middleware │- middleware │ │- middleware  │ │              │
│- context    │- context    │ │- context     │ │              │
└─────────┘  └──────────────┘ └──────────────┘ └──────────────┘
```

## Features

✅ **Centralized SSO**: Single authentication service (id.vutera.net)  
✅ **JWT-Based**: Secure token generation & verification  
✅ **Cross-Subdomain**: Cookies scoped to `.vutera.net` domain  
✅ **Next.js Middleware**: Automatic route protection  
✅ **React Context**: Global auth state management  
✅ **Client Hooks**: useAuth, useProtectedRoute, etc.  
✅ **Type-Safe**: Full TypeScript support  

## Installation

```bash
pnpm add @harmony/auth
```

## Quick Start

### 1. Setup Middleware (Per App)

Create `middleware.ts` in your Next.js app root:

```typescript
import { createAuthMiddleware } from "@harmony/auth/middleware";

export const middleware = createAuthMiddleware({
  protectedRoutes: ["/private", "/dashboard"],
  publicRoutes: ["/", "/auth/login"],
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

### 2. Setup AuthProvider (Per App)

Wrap your app with AuthProvider in `layout.tsx`:

```typescript
import { AuthProvider } from "@harmony/auth/context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
```

### 3. Use Auth in Components

```typescript
"use client";

import { useAuthContext, ProtectedRoute } from "@harmony/auth/context";

export default function Dashboard() {
  const { user, logout } = useAuthContext();

  return (
    <ProtectedRoute>
      <h1>Welcome, {user?.name}</h1>
      <button onClick={logout}>Logout</button>
    </ProtectedRoute>
  );
}
```

## API Reference

### Middleware

```typescript
import { createAuthMiddleware } from "@harmony/auth/middleware";

const middleware = createAuthMiddleware({
  protectedRoutes: ["/private", "/dashboard"], // Require login
  publicRoutes: ["/", "/about"],               // Accessible without login
  loginUrl?: "http://localhost:4000/auth/login"; // Redirect URL
  tokenCookieName?: "auth_token";               // Cookie name
});
```

### Context & Hooks

```typescript
import { 
  AuthProvider, 
  useAuthContext, 
  ProtectedRoute 
} from "@harmony/auth/context";

// useAuthContext hook
const { user, loading, isAuthenticated, logout, refetch } = useAuthContext();

// ProtectedRoute component
<ProtectedRoute fallback={<Loading />}>
  <PrivateContent />
</ProtectedRoute>
```

### Client Hooks (Direct)

```typescript
import { useAuth, useProtectedRoute, logout } from "@harmony/auth/client";

// Simple auth hook
const { user, loading, logout } = useAuth();

// Route protection hook
const { user, isAuthenticated } = useProtectedRoute();

// Logout function
await logout();
```

### Authentication Functions

```typescript
import { login, register, getSSOLoginURL } from "@harmony/auth/client";

// Login
await login("user@example.com", "password");

// Register
await register("user@example.com", "password", "John Doe");

// Get SSO URL
const url = getSSOLoginURL("/dashboard", "email");
window.location.href = url;
```

## Environment Variables

All apps using `@harmony/auth` should have:

```bash
# .env.local
NEXT_PUBLIC_SSO_URL=http://localhost:4000        # Dev
# NEXT_PUBLIC_SSO_URL=https://id.vutera.net      # Prod
```

## Flow Diagrams

### Login Flow

```
User visits /private
       ↓
Middleware checks auth_token cookie
       ↓
No token found
       ↓
Redirect to id.vutera.net/auth/login?redirect=/private
       ↓
User enters credentials
       ↓
SSO verifies password, generates JWT
       ↓
JWT stored in auth_token cookie (httpOnly, .vutera.net domain)
       ↓
Redirect to /private
       ↓
Middleware finds token, allows access
       ↓
Page loads, useAuthContext fetches /api/auth/me
       ↓
App proxies request to id.vutera.net/api/auth/me
       ↓
User data displayed
```

### Session Expiration

```
JWT expires after 7 days
       ↓
User makes request
       ↓
Middleware finds expired cookie
       ↓
Redirect to id.vutera.net/auth/login
       ↓
User re-authenticates
```

## Security Best Practices

1. **HTTPS Only**: Set cookies with `secure: true` in production
2. **SameSite**: Cookies set with `sameSite: lax` to prevent CSRF
3. **HTTPOnly**: Tokens in HTTP-only cookies, never accessible to JS
4. **Token Expiration**: Tokens expire after 7 days
5. **Password Hashing**: Passwords hashed with bcryptjs (10 salt rounds)

## Troubleshooting

### "No token provided" on /private routes

Check:
1. User is logged in at id.vutera.net
2. Cookie domain is `.vutera.net` (production) or `localhost` (dev)
3. Browser allows cookies for the domain
4. Network tab shows `auth_token` cookie in request

### Cross-domain requests not working

Ensure:
1. SSO domain matches in `NEXT_PUBLIC_SSO_URL`
2. Cookie domain is `.vutera.net` (production)
3. Requests include `credentials: "include"`

### Middleware not protecting routes

Verify:
1. Middleware is in correct location (`middleware.ts` at root)
2. Route is in `protectedRoutes` array
3. Config matcher includes the route

## Examples

See example implementations:
- `/apps/tuvi/middleware.ts` - TuVi App (mostly public)
- `/apps/menhan/middleware.ts` - MenhAn App (mostly protected)
- `/apps/harmony/middleware.ts` - Harmony Hub (mixed)

## Contributing

Changes to auth should be coordinated across all apps. Test locally before deploying.

## License

Part of Harmony AI ecosystem.
