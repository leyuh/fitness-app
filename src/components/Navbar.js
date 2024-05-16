"use client"
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
    const { data: session, status } = useSession();

    return <nav id="navbar" className="text-lg flex h-16 gap-16 items-center justify-end px-8 py-2 text-white font-bold">
        {status === "authenticated" && (
            <button
                onClick={() => signOut()}
                className="text-white"
            >
                Sign Out
            </button>
        )}
        {status === "unauthenticated" && (
            <Link href={"/auth"}>Sign In</Link>
        )}
        <Link href={"/"}>Home</Link>
        <Link href={"/my-workouts"}>My Workouts</Link>
        <Link href={"/browse"}>Browse</Link>
    </nav>
}