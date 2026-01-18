const DEV_BYPASS = process.env.NEXT_PUBLIC_DEV_BYPASS_AUTH === "true";
const TOKEN_KEY = "auth_token";

export function getToken(): string | null {
  if (DEV_BYPASS) {
    return "dev-bypass-token";
  }

  if (typeof window === "undefined") return null;

  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((row) => row.startsWith(`${TOKEN_KEY}=`));

  return tokenCookie ? tokenCookie.split("=")[1] : null;
}

export function clearToken(): void {
  if (typeof window === "undefined") return;

  document.cookie = `${TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

export function decodeToken(token: string): any {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

export function isAdmin(): boolean {
  // DEV BYPASS: Always return true untuk admin routes
  if (DEV_BYPASS) {
    return true;
  }

  const token = getToken();
  if (!token) return false;

  const payload = decodeToken(token);
  return payload?.tipe_user === "ADMIN";
}
