"use client"
import Back from "@/icons/Back";
import { useRouter } from "next/navigation";

export default function BackBtn () {
    const router = useRouter();

    return (
        <button type="button" onClick={() => router.back()} className="button w-10 h-10 text-white">
            <Back 
                dimensions={"w-8 h-full"}
            />
        </button>
    )
}
