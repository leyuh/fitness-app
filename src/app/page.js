"use client"

import Image from "next/image";
import Link from "next/link";

import { useSession } from "next-auth/react";

const HomeBtn = ({ text, link }) => {
  return <Link
    href={link}
    className="button primary-gradient px-3 py-2"
  >
    {text}
  </Link>
}

export default function Home() {

  const { data: session, status } = useSession();

  return (
    <section id="home">
      <div className="flex flex-col mx-auto">
        <h1 className="max-w-xl text-3xl mt-40 text-white text-center font-bold mx-auto">Fitness App</h1>
        <p className="max-w-xl text-md mt-2 mb-4 text-gray-400 text-center mx-auto">a demo app by leyuh made with next, tailwind, and mongodb </p>
        <div className="flex gap-6 text-white text-lg font-bold max-w-xl justify-center items-center mx-auto">

          {status === "authenticated" && <>
            <HomeBtn 
              text="Create Workout"
              link="/my-workouts/new"
            />
            <HomeBtn 
              text="My Workouts"
              link="/my-workouts"
            />
          </>}
          <HomeBtn 
            text="Browse Workouts"
            link="/browse"
          />

        </div>
        {status === "unauthenticated" && <h1 className="text-white mt-4 text-center text-lg mx-auto max-w-xl">
          <Link href="/auth" className="underline">Sign in</Link> to create and save workouts.
        </h1>}
      </div>
    </section>
  );
}
