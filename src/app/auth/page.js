"use client"
import { useState } from "react"
import FormItem from "@/components/FormItem";
import { signIn } from "next-auth/react";

const AuthForm = ({title, handleSubmit, showSignUp, setShowSignUp}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return <form className="bg-background2 max-w-sm p-6 pt-8 m-auto rounded-sm" onSubmit={(e) => {
        handleSubmit(e, { username, password });
        setUsername("");
        setPassword("");
    }}>
        <h1 className="text-white font-bold text-center text-2xl mb-8">{title}</h1>

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

    const handleSignIn = async (e, data) => {
        e.preventDefault();

        const res = await signIn("credentials", {
            ...data,
            callbackUrl: "/my-workouts"
        });

        console.log(res);
    }

    const handleSignUp = async (e, data) => {
        e.preventDefault();

        const res = await fetch("/api/register", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"}
        });

    }

    return <section id="auth" className="mt-16">
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