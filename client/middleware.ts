import { NextRequest, NextResponse, NextFetchEvent } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { clerkMiddleware, getAuth } from '@clerk/nextjs/server';

// Cấu hình i18n middleware
const intlMiddleware = createMiddleware({
    locales: ['en', 'vi'],
    defaultLocale: 'vi',
    localePrefix: 'always',
});

export async function middleware(req: NextRequest, event: NextFetchEvent) {
    const url = req.nextUrl.pathname;

    // Bỏ qua các đường dẫn API và admin để không bị ảnh hưởng bởi middleware i18n
    if (url.startsWith('/api') || url.startsWith('/admin')) {
        return NextResponse.next();
    }

    // Xử lý i18n cho các đường dẫn không phải API và không phải admin
    const intlResponse = intlMiddleware(req);
    if (intlResponse) return intlResponse;

    // Xử lý Clerk cho các đường dẫn yêu cầu xác thực
    const clerkResponse = await clerkMiddleware()(req, event);
    if (clerkResponse) return clerkResponse;

    // Kiểm tra quyền truy cập cho các đường dẫn admin
    if (url.startsWith('/admin')) {
        const { userId } = getAuth(req);
        if (!userId) {
            const signInUrl = new URL('/admin/sign-in', req.url);
            return NextResponse.redirect(signInUrl);
        }
    }

    return NextResponse.next();
}

// Cấu hình matcher để đảm bảo đúng các đường dẫn
export const config = {
    matcher: [
        '/((?!api|admin|_next/static|_next/image|favicon.ico|.*\\b(?:png|jpg|jpeg|gif|svg|css|js|webp|avif)\\b).*)',
    ],
};
