'use client';
import { signIn, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { redirect } from "next/navigation";

export default function SignInPage() {
    // Usa useSession en lugar de auth()
    const { data: session } = useSession();
    if (!!session) {
        redirect("/");
    }

    return (
        <main className="p-24 flex justify-center">
            <Card className="w-full max-w-sm mx-auto">
                <CardContent>
                    <section className="flex flex-col">
                        <Button size={"sm"} variant={"outline"} onClick={() => signIn("google")}>Continuar con Google</Button>
                    </section>
                </CardContent>
            </Card>
        </main>
    )
}