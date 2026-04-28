// Client-side utilities
export { useAuth, useProtectedRoute, logout, login, register, getSSOLoginURL, getSSOLogoutURL } from "./lib/client";
export type { AuthUser } from "./lib/client";

// Context & Provider
export { AuthProvider, useAuthContext, ProtectedRoute } from "./lib/context";
export type { AuthUser as AuthContextUser } from "./lib/context";

// Middleware
export { createAuthMiddleware, hasValidToken, getTokenFromRequest, redirectToLogin } from "./lib/middleware";
