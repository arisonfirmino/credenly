import "next-auth";

declare module "next-auth" {
  interface Session {
    customValue: string;
    user: {
      id: string;
      email: string;
    };
  }

  interface User {
    id: string;
    email: string;
  }
}
