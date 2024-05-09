import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  async function middleware(req){
    const path = req.nextUrl.pathname;
    const session = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    const isAuth = !!session;

    if(path.startsWith("/login")){
      if(isAuth){
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      return NextResponse.next();
    }

    if(!isAuth){
      return NextResponse.redirect(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      }
    }
  }
)

export const config = {
  matcher: [
    "/dashboard/:path",
    "/upload/:path",
    "/text-recognition/:path",
    "/data-extraction/:path",
    "/verification/:path",
    "/receipts/:path",
    "/invoices/:path",
    "/card-statements/:path",
    "/settings/:path",
    "/help/:path",
    "/login"
  ]
}

// export default async function middleware(req: NextRequest) {
//   // Get the pathname of the request (e.g. /, /protected)
//   const path = req.nextUrl.pathname;

//   // If it's the root path, just render it
//   if (path === "/") {
//     return NextResponse.next();
//   }

//   const session = await getToken({
//     req,
//     secret: process.env.NEXTAUTH_SECRET,
//   });

//   if (!session && path === "/protected") {
//     return NextResponse.redirect(new URL("/login", req.url));
//   } else if (session && (path === "/login" || path === "/register")) {
//     return NextResponse.redirect(new URL("/dashboard", req.url));
//   }
//   return NextResponse.next();
// }
