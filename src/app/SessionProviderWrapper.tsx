   // src/app/SessionProviderWrapper.tsx
   "use client"; // Mark this as a Client Component

   import { SessionProvider } from "next-auth/react";

   const SessionProviderWrapper = ({ children }: { children: React.ReactNode }) => {

       return <SessionProvider>{children}</SessionProvider>;
   };

   export default SessionProviderWrapper;