import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { resolveLocation } from '@/utils/domainResolver';

export function proxy(request: NextRequest) {
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || '';
  const searchParams = request.nextUrl.searchParams;
  const locationParam = searchParams.get('location') || searchParams.get('city') || request.cookies.get('site_location')?.value;

  const locConfig = resolveLocation(host, locationParam);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-current-domain', locConfig.domain);
  requestHeaders.set('x-location-slug', locConfig.slug);
  requestHeaders.set('x-location-name', locConfig.name);
  requestHeaders.set('x-location-name-en', locConfig.nameEn);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set('x-current-domain', locConfig.domain);
  response.headers.set('x-location-slug', locConfig.slug);
  response.headers.set('x-location-name', locConfig.name);

  if (locationParam) {
    response.cookies.set('site_location', locConfig.slug, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: 'lax',
    });
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
