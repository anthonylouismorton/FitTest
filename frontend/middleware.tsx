import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth){
    console.log(request.nextUrl.pathname)
    console.log(request.nextauth.token)
    console.log()
    if(request.nextUrl.pathname.startsWith("/Respirator")
      && request.nextauth.token?.role !== "admin"){
      return NextResponse.rewrite(
        new URL("/admindenied", request.url)
      )}
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
    pages: {
      signIn: "/signIn"
    }
  }
);

export const config = { matcher: ['/Respirator/:path*']}

  