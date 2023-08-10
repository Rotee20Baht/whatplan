export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/addplace/:path*", "/place/edit/:path*", "/create/:path*"]
}

