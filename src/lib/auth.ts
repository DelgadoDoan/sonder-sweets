import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/src/db";
import { user, session, account, verification } from "@/src/db/schema";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user: user,          
            session: session,
            account: account,
            verification: verification,
        },
    }),
    emailAndPassword: { 
        enabled: true, 
    },
    plugins: [nextCookies()],
    user: {
        additionalFields: {
            phone: {type: 'string', required: false, fieldName: 'phone'},
        },
    },
    baseURL: process.env.BETTER_AUTH_URL, 
    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
});