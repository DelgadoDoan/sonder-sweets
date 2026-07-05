import * as z from 'zod'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

export const SignUpFormSchema = z.object({
    name: z
        .string()
        .min(4, { error: 'Must have at least 4 characters.' })
        .trim(),
    phone: z
        .string()
        .min(1, { error: 'Phone number is required.' })
        .trim()
        .refine((val) => {
            const phoneNumber = parsePhoneNumberFromString(val, 'PH');
            return phoneNumber ? phoneNumber.isValid() : false;
        }, {
            error: 'Invalid phone number format.',
        }),
    email: z
      .string()
      .min(1, { error: 'Email is required.' })
      .trim()
      .pipe(z.email({ error: 'Invalid email address.' })),
    password: z
        .string()
        .min(8, { error: 'Must have least 8 characters.' })
        .regex(/[a-zA-Z]/, { error: 'Must contain at least one letter.' })
        .regex(/[0-9]/, { error: 'Must contain at least one number.' })
        .trim(),
})

export const SignInFormSchema = z.object({
    email: z
        .string()
        .min(1, { error: 'Email is required.' })
        .trim()
        .pipe(z.email({ error: 'Invalid email address.' })),
    password: z
        .string()
        .min(1, { error: 'Password is required.' })
        .trim(),
})

export type SignUpFormState =
    | {   
        errors?: {
            name?: string[]
            phone?: string[]
            email?: string[]
            password?: string[]
        }
        message?: string
    }
    | undefined

export type SignInFormState = 
    | {
        errors?: {
            form?: string[]
        }
    }
    | undefined