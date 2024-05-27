import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

const jwtKey = "jwt-key"

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const res = NextResponse.next()
  // Parse cookies from the request
  const cookies = req.cookies
  // Get the token from cookies
  const token = cookies.get("token")
  if (token) {
    try {
      // Verify the token
      //   @ts-ignore
      const decoded = jwt.verify(token, jwtKey)
      return res.json()
    } catch (error) {}
  } else {
    if (!pathname.startsWith("/signin") && !pathname.startsWith("/_next/")) {
      const response = NextResponse.redirect(
        req.nextUrl.origin +
          `/signin?message=${"enter valid credentials to continue"
            .toLowerCase()
            .replaceAll(" ", "-")}`
      )
      return response
    }
  }
}
