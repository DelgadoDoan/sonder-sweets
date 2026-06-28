"use client";

import { useRouter } from "next/navigation";
import { signOut } from "../actions/auth";

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