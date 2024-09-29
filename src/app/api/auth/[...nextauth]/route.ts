import NextAuth from "next-auth";
import Microsoft from "next-auth/providers/azure-ad";

const authOptions = {
    providers: [
        Microsoft({
            clientId: process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID as string,
            clientSecret: process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_SECRET as string,
        }),
    ],
    // Add other options as needed
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };