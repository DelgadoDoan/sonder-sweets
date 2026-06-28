"use client";

import { useRouter } from "next/navigation";
import { signOut } from "../actions/auth";
import { authClient } from "../lib/auth-client";

export function LoginBtn() {
    const router = useRouter();
    return <button onClick={() => router.push("?auth=login", { scroll: false })}>Log In</button>;
}

export function SignupBtn() {
    const router = useRouter();
    return <button onClick={() => router.push("?auth=signup", { scroll: false })}>Sign Up</button>;
}

export function LogoutBtn() {
    return <button onClick={signOut}>Log Out</button>;
}

export function GoogleBtn() {
    const handleGoogleLogin = async () => {
        try {
            const data = await authClient.signIn.social({
                callbackURL: '/',
                provider: 'google'
            });
            console.log('Google authentication data:', data);
        } catch (error) {
            console.error('Google authentication failed:', error);
        }
    }

    return (
        <button onClick={handleGoogleLogin}>
            Sign in with Google
        </button>
    );
}