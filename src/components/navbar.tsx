"use server"

import Link from "next/link";
import Image from "next/image";
import { User, Heart, ShoppingBasket } from "lucide-react";
import { auth } from "@/src/lib/auth"
import { headers } from "next/headers"
import { LoginBtn, LogoutBtn } from "./nav-buttons";
import NavAuth from "./nav-auth";

export default async function NavBar() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    return (
        <nav className="flex items-center justify-between shadow-xl px-8">
            {/* Brand and logo */}
            <Link href="/" className="flex items-center">
                <Image src="/assets/logo.png" alt="Sweets" width={60} height={60} />
                <span className="font-['Cormorant_Garamond'] text-[#6B4F3A] text-xl">
                    Sonder Sweets
                </span>
            </Link>

            <ul className="flex items-center gap-6">
                {session ? (
                    // Authenticated: username, favorites, basket
                    <>
                        <li className="flex items-center gap-2 text-sm">
                            <User className="h-5 w-5" />
                            {session.user.name}
                        </li>
                        <li>
                            <Link href="/favorites">
                                <Heart className="h-5 w-5" />
                            </Link>
                        </li>
                        <li>
                            <Link href="/basket">
                                <ShoppingBasket className="h-5 w-5" />
                            </Link>
                        </li>
                        <li>
                            <LogoutBtn />
                        </li>
                    </>
                ) : (
                    // Unauthenticated: sign in only
                    <li className="flex items-center gap-2 text-sm">
                        <User className="h-5 w-5" />
                        <LoginBtn />
                    </li>
                )}
            </ul>

            <NavAuth />
        </nav>
    );
}