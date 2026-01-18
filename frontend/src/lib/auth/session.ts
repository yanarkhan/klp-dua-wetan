import { cookies } from "next/headers";

const DEV_BYPASS = process.env.NEXT_PUBLIC_DEV_BYPASS_AUTH === "true";

interface SessionUser {
  id_user: number;
  name: string;
  email: string;
  tipe_user: "WARGA" | "ADMIN";
}

interface Session {
  user: SessionUser;
}

export async function getServerSession(): Promise<Session | null> {
  // DEV ONLY: Mock admin session (bypass cookie entirely)
  if (DEV_BYPASS) {
    return {
      user: {
        id_user: 1,
        name: "Admin Development",
        email: "admin@dev.local",
        tipe_user: "ADMIN",
      },
    };
  }

  // PRODUCTION: Real cookie-based session
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );

    return {
      user: {
        id_user: payload.id_user,
        name: payload.name,
        email: payload.email,
        tipe_user: payload.tipe_user,
      },
    };
  } catch (error) {
    console.error("Failed to decode session:", error);
    return null;
  }
}

export async function requireAdmin(): Promise<SessionUser> {
  const session = await getServerSession();

  if (!session || session.user.tipe_user !== "ADMIN") {
    throw new Error("Unauthorized: Admin access required");
  }

  return session.user;
}
