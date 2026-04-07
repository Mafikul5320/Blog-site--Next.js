import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { UserService } from './services/user.service'
import { userRole } from './constant/user.role';

export async function proxy(request: NextRequest) {
    const pathName = request.nextUrl.pathname;
    console.log(pathName)

    const session = await UserService.getSession();

    let isAuthenticated = false;
    let isAdmin = false;


    if (session) {
        isAuthenticated = true;
        isAdmin = session.user.role === userRole.ADMIN;
    };
    if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url))
    };
    if (isAdmin && pathName.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/admin-dashboard", request.url))
    };
    if (!isAdmin && pathName.startsWith("/admin-dashboard")) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }


    return NextResponse.next()
}

export const config = {
    matcher: [
        "/admin-dashboard",
        "/admin-dashboard/:path*",
        "/dashboard",
        "/dashboard/:path*",

    ],
}