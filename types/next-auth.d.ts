import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string; // ✅ Add role here
    };
  }

  interface User {
    role?: string; // ✅ Add role here
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string; // ✅ Add role here
  }
}
