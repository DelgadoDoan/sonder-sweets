"use server"

import { auth } from "@/src/lib/auth"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { SignUpFormSchema, SignInFormSchema, SignUpFormState, SignInFormState } from '@/src/lib/validation'
import * as z from 'zod'

export async function signUp(formState: SignUpFormState, formData: FormData) {
    const validated = SignUpFormSchema.safeParse({
        name: formData.get("name"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        password: formData.get('password'),
    })
    
    if (!validated.success) {
        return {
            errors: z.flattenError(validated.error).fieldErrors,
        }
    }

    const { name, phone, email, password } = validated.data
    
    await auth.api.signUpEmail({
        body: {
            name,
            phone: phone || '',
            email: email || '',
            password,
        },
    })

    redirect("/")
}

export async function signIn(
    formState: SignInFormState,
    formData: FormData
) {


    const validated = SignInFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!validated.success) {
        return {
            errors: {
                form: ["Incorrect username or password."],
            },
        }
    }

    const { email, password } = validated.data

    try {
        await auth.api.signInEmail({
            body: {
                email,
                password,
            },
        });

        redirect("/");
    } catch {
        return {
            errors: {
                form: ["Incorrect username or password."],
            },
        };
    }
}

export async function signOut() {
    await auth.api.signOut({
        headers: await headers(),
    })

    redirect("/")
}