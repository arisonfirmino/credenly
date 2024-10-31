import "next-auth";

declare module "next-auth" {
  interface Session {
    customValue: string;
    user: {
      email: string;
    };
  }

  interface User {
    email: string;
  }
}
