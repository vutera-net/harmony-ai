# Middleware Template for Protected Routes

Add this to your Next.js app (`src/middleware.ts` or `middleware.ts`):

```typescript
import { createAuthMiddleware } from "@harmony/auth/middleware";

export const middleware = createAuthMiddleware({
  protectedRoutes: ["/private", "/dashboard", "/profile"],
  publicRoutes: ["/", "/auth/login", "/auth/register"],
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

## How it Works

1. **Protected Routes**: Routes in `protectedRoutes` array require valid authentication token
2. **Public Routes**: Routes in `publicRoutes` array are accessible without authentication
3. **Token Check**: Middleware checks for `auth_token` cookie
4. **Redirect**: If accessing protected route without token, user is redirected to `id.vutera.net/auth/login?redirect=<current-url>`
5. **Domain Scoping**: JWT cookies are scoped to `.vutera.net` domain, so they're automatically sent with requests to all subdomains

## Example Routes

```
/                    → Public (accessible without login)
/auth/login          → Public
/auth/register       → Public
/products            → Public (not in protectedRoutes)
/private             → Protected (requires login)
/dashboard           → Protected (requires login)
/profile             → Protected (requires login)
/api/*               → Skipped by middleware (handled by route handlers)
```

## Setup Steps

1. Copy middleware code to your app's root `middleware.ts`
2. Add `NEXT_PUBLIC_SSO_URL` to `.env.local`:
   ```
   NEXT_PUBLIC_SSO_URL=http://localhost:4000
   # Or in production:
   # NEXT_PUBLIC_SSO_URL=https://id.vutera.net
   ```
3. Optionally customize protected/public routes based on your app's needs
