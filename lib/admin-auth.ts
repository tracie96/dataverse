import { NextRequest } from "next/server";

export function verifyAdminToken(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  const authToken = authHeader?.replace("Bearer ", "");
  const expectedToken = process.env.ADMIN_AUTH_TOKEN;
  return Boolean(expectedToken && authToken === expectedToken);
}
