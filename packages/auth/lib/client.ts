"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  profile: any | null;
  subscription: any | null;
}

const SSO_DOMAIN = process.env.NEXT_PUBLIC_SSO_URL || "http://localhost:4000";

/**
 * Hook to fetch current authenticated user
 * Returns null if not authenticated
 */
export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/auth/me", {
        credentials: "include",
      });

      if (!response.ok) {
        setUser(null);
        return;
      }

      const data = await response.json();
      setUser(data.user);
    } catch (err) {
      console.error("Failed to fetch user:", err);
      setError("Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return { user, loading, error, refetch: fetchUser, logout };
}

/**
 * Hook to ensure user is authenticated
 * Redirects to login if not authenticated
 */
export function useProtectedRoute() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      const currentPath = window.location.pathname;
      const redirectUrl = new URL(
        `/auth/login?redirect=${encodeURIComponent(currentPath)}`,
        SSO_DOMAIN
      );
      window.location.href = redirectUrl.toString();
    }
  }, [user, loading, router]);

  return { user, loading, isAuthenticated: !!user };
}

/**
 * Logout and redirect to login page
 */
export async function logout() {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    window.location.href = `${SSO_DOMAIN}/auth/login`;
  } catch (err) {
    console.error("Logout failed:", err);
  }
}

/**
 * Login user programmatically
 */
export async function login(email: string, password: string) {
  const response = await fetch(`${SSO_DOMAIN}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Login failed");
  }

  return response.json();
}

/**
 * Register new user programmatically
 */
export async function register(
  email: string,
  password: string,
  name?: string
) {
  const response = await fetch(`${SSO_DOMAIN}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password, name }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Registration failed");
  }

  return response.json();
}

// ... (keep existing imports and types)

/**
 * Get SSO redirect URL for login
 * Useful for OAuth or cross-domain navigation
 */
export function getSSOLoginURL(
  redirectTo?: string,
  provider?: "email" | "google" | "github"
): string {
  const url = new URL(`${SSO_DOMAIN}/auth/login`);
  if (redirectTo) {
    url.searchParams.set("redirect", redirectTo);
  }
  if (provider) {
    url.searchParams.set("provider", provider);
  }
  return url.toString();
}

/**
 * Get SSO redirect URL for logout
 * Ensures the session is cleared at the Identity Provider level
 */
export function getSSOLogoutURL(redirectTo?: string): string {
  const url = new URL(`${SSO_DOMAIN}/auth/logout`);
  if (redirectTo) {
    url.searchParams.set("redirect", redirectTo);
  }
  return url.toString();
}

/**
 * Extract JWT token from Authorization header or cookie
// ... (rest of the file)

/**
 * Extract JWT token from Authorization header or cookie
 * (Client-side helper)
 */
export function getAuthToken(): string | null {
  // JWT is typically stored in HTTP-only cookie on server
  // Client can access via /api/auth/me
  return null; // Can't access HTTP-only cookies from JS
}
