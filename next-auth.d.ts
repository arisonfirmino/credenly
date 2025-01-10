import "next-auth";

declare module "next-auth" {
  interface Session {
    customValue: string;
    user: {
      id: string;
    };
  }

  interface User {
    id: string;
  }
}
