import { adminAuth } from "@/lib/redux/firebase/firebase-admin-config";
import { auth } from "firebase-admin";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
  const session = cookies().get("session")?.value || "";
  //Validate if the cookie exist in the request
  if (!session) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  //Use Firebase Admin to validate the session cookie
  const decodedClaims = await auth().verifySessionCookie(session, true);

  if (!decodedClaims) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  return NextResponse.json({ isLogged: true }, { status: 200 });
}

export async function POST(request: NextRequest, response: NextResponse) {
  const authorization = headers().get("Authorization");
  
  if (authorization?.startsWith("Bearer ")) {
    const idToken = authorization.split("Bearer ")[1];
    const decodedToken = await auth().verifyIdToken(idToken);

    if (decodedToken) {
      //Generate session cookie
      const expiresIn = 60 * 60 * 24 * 5 * 1000;
      const sessionCookie = await auth().createSessionCookie(idToken, {
        expiresIn,
      });
      const options = {
        name: "session",
        value: sessionCookie,
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
      };

      //Add the cookie to the browser
      cookies().set(options);
    }
  }

  return NextResponse.json({}, { status: 200 });
}

export async function DELETE(request: NextRequest, response: NextResponse) {
  const token = cookies().get("session")?.value || "";
  if (!token) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }
  await invalidateLogin(token);
  return NextResponse.json({}, { status: 200 });
}

// Create a separate file for this utility function if you prefer that way
export const invalidateLogin = async (token: string) => {
  const decodedClaims = await adminAuth.verifySessionCookie(
    token,
    true
  );
  await adminAuth.revokeRefreshTokens(decodedClaims.uid);
  cookies().delete("session");
  return;
};