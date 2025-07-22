import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// checks if there's a session and a cookie for the user that logs in
export async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request);
 
	if (!sessionCookie) {
		return NextResponse.redirect(new URL("/", request.url));
	}
 
	return NextResponse.next();
}
 
export const config = {
	matcher: ["/dashboard"], 
};