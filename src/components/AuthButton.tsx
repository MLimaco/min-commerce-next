"use client"
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function AuthButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <>
        <Link href={"/profile"} className="text-xs border-1 rounded-lg px-6 h-8 flex items-center">{session.user?.name}</Link>
        <Button onClick={() => signOut()}>Cerrar sesión</Button>
      </>
    )
  }

  return(
  <Link href={"/login"} className="text-xs border-1 rounded-lg px-6 h-8 flex items-center">
    Iniciar sesión
  </Link>
  )
}