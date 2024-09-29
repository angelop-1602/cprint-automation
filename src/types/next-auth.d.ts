// src/types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        role?: string; 
    }

    interface Session {
        user: {
            role: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }

    interface JWT {
        role: string;
    }
}

// Add this declaration for the Microsoft provider
declare module "next-auth/providers/microsoft" {
    import { OAuthConfig } from "next-auth/providers";

    export default function MicrosoftProvider<P>(options: OAuthConfig<P>): OAuthConfig<P>;
}