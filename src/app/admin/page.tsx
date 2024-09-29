// src/app/admin/page.tsx
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const AdminPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return; // Do nothing while loading
        if (!session || session.user?.role !== "admin") {
            router.push("/"); // Redirect to home if not admin
        }
    }, [session, status, router]);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            {/* Admin content goes here */}
        </div>
    );
};

export default AdminPage;