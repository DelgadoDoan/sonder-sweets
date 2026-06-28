"use server"

import Link from "next/link";
import { auth } from "@/src/lib/auth"
import { headers } from "next/headers"
import { LoginBtn, LogoutBtn, SignupBtn } from "./nav-buttons";
import NavAuth from "./nav-auth";

export default async function NavBar() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    return (
        <nav>
        <div>Brand and logo goes here</div>
        <ul>
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
            {session ? (
                <div>
                    <h1>Hello {session.user.name}!</h1>
                    <LogoutBtn />
                </div>
            ): (
                <div>
                    <LoginBtn />
                    <SignupBtn />
                </div>
            )}
        </ul>
        
        <NavAuth /> 
        </nav>
    );
}