import { api } from "./lib/api";
import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
export default async function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith('/')) {
        const response = await api.get(`/currentuser`, { headers: { cookie: req.headers.get('cookie') } });
        const data = response.data;
        if (data.statusCode === 200) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL('/login', req.url))
        }
    }
}
export const config: MiddlewareConfig = {
    matcher: ['/','/explore']
}

