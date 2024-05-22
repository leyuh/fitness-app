"use client"
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Menu from "@/icons/Menu";
import Cancel from "@/icons/Cancel";

const NavItem = ({ href, text, setShowNav }) => {
    const router = useRouter();
    return <button
        className="text-left"
        onClick={() => {
            setShowNav(false);
            router.push(href);
        }}
    >
        {text}
    </button>
}

export default function Navbar() {
    const { data: session, status } = useSession();
    const [showNav, setShowNav] = useState(false);


    return <>
        <button
            className="block md:hidden button text-white fixed right-0 mr-2 z-20"
            onClick={() => setShowNav(prev => !prev)}
        >
            {showNav ? (
                <Cancel 
                    dimensions={"w-8 h-8"}
                />
            ) : (
                <Menu 
                    dimensions={"w-8 h-8"}
                />
            )}
        </button>

        <nav id="navbar" className={`
            text-lg flex px-8 py-2 text-white font-bold rounded-sm z-10 transition-all
            md:flex-row md:justify-end md:gap-16 md:items-center md:bg-transparent md:w-full md:h-16 md:relative md:ml-0
            flex-col gap-8 text-left bg-background2 w-[60vw] ${!showNav ? "ml-[100vw]" : "ml-[40vw]"} h-full fixed justify-center
        `}>
            {status === "authenticated" && (
                <button
                    onClick={() => signOut()}
                    className="text-white text-left"
                >
                    Sign Out
                </button>
            )}
            {status === "unauthenticated" && (
                <NavItem 
                    href={"/auth"}
                    text={"Sign In"}
                    setShowNav={setShowNav}
                />
            )}
            <NavItem 
                href={"/"}
                text={"Home"}
                setShowNav={setShowNav}
            />
            {status === "authenticated" && (
                <NavItem 
                    href={"/my-workouts"}
                    text={"My Workouts"}
                    setShowNav={setShowNav}
                />
            )}
            <NavItem 
                href={"/browse"}
                text={"Browse"}
                setShowNav={setShowNav}
            />
        </nav>

        <div className="md:hidden block h-16"></div>
    </>
}