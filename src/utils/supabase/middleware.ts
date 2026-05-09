import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          } catch (e) {
            // Request cookies are read-only in some environments
          }
          
          supabaseResponse = NextResponse.next({
            request,
          })
          
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          } catch (e) {
            // Fallback for response cookie setting
          }
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (
      !user &&
      (request.nextUrl.pathname.startsWith('/admin') || 
       request.nextUrl.pathname.startsWith('/dashboard'))
    ) {
      // no user, potentially respond by redirecting the user to the login page
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  } catch (error) {
    // If getUser fails (e.g. network error), we allow the request to continue
    // but protected routes will still be blocked by layout checks if needed.
    console.error("Middleware Auth Error:", error);
  }

  return supabaseResponse
}
