"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Modal from "./modal";
import { signUp, signIn } from "@/src/actions/auth"

export default function NavAuth() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const authMode = searchParams.get("auth");

  const closePortal = () => router.push("?", { scroll: false });
  const switchTo = (mode: "login" | "signup") => router.push(`?auth=${mode}`, { scroll: false });

  return (
    <>
      <Modal isOpen={authMode === "login"} onClose={closePortal}>
        <form action={signIn}>
          <h3>Log In</h3>
          <label>Email</label><br /><input name="email" type="email" placeholder="Enter your email" required /><br />
          <label>Password</label><br /><input name="password" type="password" placeholder="Enter your password" required /><br />
          <button type="submit">Login</button>
          <p>Don't have an account yet? <button type="button" onClick={() => switchTo("signup")}>Sign up here.</button></p>
        </form>
      </Modal>

      <Modal isOpen={authMode === "signup"} onClose={closePortal}>
        <form action={signUp}>
          <h3>Sign Up</h3>
          <label>Name</label><br /><input name="name" type="text" placeholder="Enter your name" required /><br />
          <label>Phone</label><br /><input name="phone" type="tel" placeholder="Enter your phone number" required /><br />
          <label>Email</label><br /><input name="email" type="email" placeholder="Enter your email" required /><br />
          <label>Password</label><br /><input name="password" type="password" placeholder="Create a password" required /><br />
          <button type="submit">Sign Up</button>
          <p>Already have an account? <button type="button" onClick={() => switchTo("login")}>Log in here.</button></p>
        </form>
      </Modal>
    </>
  );
}