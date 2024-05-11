import Link from "next/link";

export default function Navbar() {
    return <nav id="navbar" className="text-lg flex h-14 gap-12 items-center justify-end px-8 py-2 text-primary font-bold">
        <Link href={"/"}>Home</Link>
        <Link href={"/my-workouts"}>My Workouts</Link>
        <Link href={"/browse"}>Browse</Link>
    </nav>
}