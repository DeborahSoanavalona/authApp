"use client";

import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { logOut } from "@/server/users"

export default function Logout() {
    const router = useRouter();

    const handleLogout = async () => {
        const {succes, message} = await logOut();
        await authClient.signOut();
        if (succes) {
            toast.success(message as string);
            router.push("/");
        } else {
            toast.error(message as string);
        }
    };

    return (
        <Button variant="outline" onClick={handleLogout}>
            Logout <LogOut className="size-4"/>
        </Button>
    );
}