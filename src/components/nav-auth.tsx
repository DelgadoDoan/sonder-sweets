"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Modal from "./ui/modal";
import { signUp, signIn } from "@/src/actions/auth";
import { GoogleBtn } from "@/src/components/nav-buttons"

export default function NavAuth() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const authMode = searchParams.get("auth");

  const closePortal = () => router.push("?", { scroll: false });
  const switchTo = (mode: "login" | "signup") => router.push(`?auth=${mode}`, { scroll: false });

  return (
    <>
      <Modal isOpen={authMode === "login"} onClose={closePortal}>
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
          Welcome Back!
        </h2>
 
        <form action={signIn} className="flex flex-col gap-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:border-gray-500 focus:outline-none"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:border-gray-500 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-[#3d2b1f] py-3 text-sm font-semibold text-white hover:bg-[#2e2016]"
          >
            Log In
          </button>
        </form>
 
        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">or</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>
 
        <GoogleBtn />
 
        <p className="mt-5 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <button type="button" onClick={() => switchTo("signup")} className="font-medium text-gray-900 underline">
            Sign up here
          </button>
        </p>
      </Modal>

      <Modal isOpen={authMode === "signup"} onClose={closePortal}>
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
          Create an Account
        </h2>

        <form action={signUp} className="flex flex-col gap-4">
          <input
            name="name"
            type="text"
            placeholder="Name"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:border-gray-500 focus:outline-none"
            required
          />
          <input
            name="phone"
            type="tel"
            placeholder="Phone Number"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:border-gray-500 focus:outline-none"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:border-gray-500 focus:outline-none"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:border-gray-500 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-[#3d2b1f] py-3 text-sm font-semibold text-white hover:bg-[#2e2016]"
          >
            Sign Up
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">or</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <GoogleBtn />

        <p className="mt-5 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <button type="button" onClick={() => switchTo("login")} className="font-medium text-gray-900 underline">
            Log in here
          </button>
        </p>
      </Modal>
    </>
  );
}