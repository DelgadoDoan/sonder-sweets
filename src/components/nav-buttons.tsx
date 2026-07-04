"use client";

import { useRouter } from "next/navigation";
import { signOut } from "../actions/auth";
import { authClient } from "../lib/auth-client";
import Button from "./ui/button";

export function LoginBtn() {
  const router = useRouter();
  return (
    <Button 
      className="w-auto border-none py-0 font-normal hover:bg-transparent" 
      onClick={() => router.push("?auth=login", { scroll: false })}
    >
      Log In
    </Button>
  );
}

export function SignupBtn() {
  const router = useRouter();
  return (
    <Button 
      className="w-auto border-none py-0 font-normal hover:bg-transparent" 
      onClick={() => router.push("?auth=signup", { scroll: false })}
    >
      Sign Up
    </Button>
  );
}

export function LogoutBtn() {
  return (
    <Button 
      className="w-auto border-none py-0 font-normal hover:bg-transparent" 
      onClick={signOut}
    >
      Log Out
    </Button>
  );
}

export function GoogleBtn() {
  const handleGoogleLogin = async () => {
    try {
      const data = await authClient.signIn.social({
        callbackURL: "/",
        provider: "google",
      });
      console.log("Google authentication data:", data);
    } catch (error) {
      console.error("Google authentication failed:", error);
    }
  };

  return (
    <Button onClick={handleGoogleLogin}>
      <GoogleIcon />
      Sign in with Google
    </Button>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.66-.22-2.45H12v4.63h6.47a5.53 5.53 0 01-2.4 3.63v3h3.87c2.27-2.09 3.58-5.17 3.58-8.81z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.94-2.92l-3.87-3c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.28v3.11A12 12 0 0012 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.27a7.2 7.2 0 010-4.54V6.62H1.28a12 12 0 000 10.76l3.99-3.11z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.35.6 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 001.28 6.62l3.99 3.11C6.22 6.88 8.87 4.77 12 4.77z"
      />
    </svg>
  );
}