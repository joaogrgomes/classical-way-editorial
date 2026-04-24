export default function middleware(request: Request) {
  const host = request.headers.get('host') || ''

  // Only gate requests coming from the custom domain
  if (!host.includes('theclassicalway.com.br')) {
    return
  }

  const { pathname } = new URL(request.url)

  // Allow login page and auth endpoint through unconditionally
  if (
    pathname === '/login' ||
    pathname === '/login.html' ||
    pathname.startsWith('/api/')
  ) {
    return
  }

  const cookieHeader = request.headers.get('cookie') || ''
  const match = cookieHeader.match(/(?:^|;\s*)tcway_auth=([^;]*)/)
  const cookieValue = match ? decodeURIComponent(match[1]) : null
  const gatePassword = process.env.GATE_PASSWORD

  // Fail open if env var is not configured, to prevent lockout
  if (!gatePassword || cookieValue === gatePassword) {
    return
  }

  return Response.redirect(new URL('/login', request.url))
}

export const config = {
  matcher: ['/:path*'],
}
