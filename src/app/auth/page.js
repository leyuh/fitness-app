"use client"
import { useEffect, useState } from "react"
import FormItem from "@/components/FormItem";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const AuthForm = ({title, handleSubmit, showSignUp, setShowSignUp}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { data: session, status } = useSession();

    if (status === "authenticated") {
        return redirect("/my-workouts");
    }

    return <form className="bg-background2 bg-gradient max-w-md p-6 pt-8 m-auto rounded-sm shadow-md" onSubmit={(e) => {
        handleSubmit(e, { username, password });
        setUsername("");
        setPassword("");
    }}>
        <h1 className="text-white font-bold text-center text-2xl mb-6 mt-2">{title}</h1>

        <FormItem 
            title="Username"
            state={username}
            setState={setUsername}
        />
        <FormItem 
            title="Password"
            state={password}
            setState={setPassword}
            type="password"
        />

        <button
            type="submit"
            className="button bg-primary primary-gradient w-24 h-10 font-bold text-lg text-white mx-auto"
        >
            {title}
        </button>

        <span className="flex text-white justify-center gap-2"> 
            <p>
                {showSignUp ? "Already have an account?" : "Don't have an account?"} 
            </p>
            <button
                className="underline font-bold"
                type="button"
                onClick={() => {
                    setShowSignUp(prev => !prev);
                }}
            >
                {showSignUp ? "Sign In" : "Sign Up"}
            </button>
        </span>
    </form>
}

export default function Auth() {

    const [showSignUp, setShowSignUp] = useState(false);

    const router = useRouter();

    const handleSignIn = async (e, data) => {
        e.preventDefault();

        try {
            console.log(data);
            const res = await signIn("credentials", {
                ...data,
                redirect: false
            });
    
            if (res.error) {
                return;
            }

        } catch (err) {
            console.log(err);
        }
        
    }

    const handleSignUp = async (e, data) => {
        e.preventDefault();

        const res = await fetch("/api/register", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"}
        });

    }

    return <section id="auth" className="w-[95vw] mx-auto mt-16 md:w-full">
        {showSignUp ? (
            <AuthForm 
                title={"Sign Up"}
                handleSubmit={handleSignUp}
                showSignUp={showSignUp}
                setShowSignUp={setShowSignUp}
            />
        ) : (
            <AuthForm 
                title={"Sign In"}
                handleSubmit={handleSignIn}
                showSignUp={showSignUp}
                setShowSignUp={setShowSignUp}
            />
        )}
    </section>
}