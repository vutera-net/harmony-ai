import { NextRequest, NextResponse } from "next/server";

const SSO_URL = process.env.NEXT_PUBLIC_SSO_URL || "http://localhost:3000";

/**
 * Proxy /api/auth/me requests to the SSO service
 * Includes cookies for authenticated requests
 */
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth_token")?.value;

    // If no token, return unauthorized
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    // Forward request to SSO service with token
    const response = await fetch(`${SSO_URL}/api/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // Handle SSO service errors
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to authenticate" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Auth proxy error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
