"use server"

import { auth } from "@/src/lib/auth"
import { redirect } from "next/navigation"
import { headers } from "next/headers"

export async function signUp(formData: FormData) {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const password = formData.get("password") as string

    await auth.api.signUpEmail({
        body: {
            name,
            email,
            phone,
            password,
        },
    })

    redirect("/")
}

export async function signIn(formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    await auth.api.signInEmail({
        body: {
            email,
            password,
        },
    })

    redirect("/")
}

export async function signOut() {
    await auth.api.signOut({
        headers: await headers(),
    })

    redirect("/")
}