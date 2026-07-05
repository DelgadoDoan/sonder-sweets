"use client";

import { useActionState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Modal from "./ui/modal";
import { GoogleBtn } from "@/src/components/nav-buttons";
import { signUp, signIn } from "@/src/actions/auth";

export default function NavAuth() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const authMode = searchParams.get("auth");

  const closePortal = () => router.push("?", { scroll: false });

  const switchTo = (mode: "signin" | "signup") =>
    router.push(`?auth=${mode}`, { scroll: false });

  return (
    <>
      <Modal isOpen={authMode === "signin"} onClose={closePortal}>
        {authMode === "signin" && <SignInForm switchTo={switchTo} />}
      </Modal>

      <Modal isOpen={authMode === "signup"} onClose={closePortal}>
        {authMode === "signup" && <SignUpForm switchTo={switchTo} />}
      </Modal>
    </>
  );
}

function SignInForm({
  switchTo,
}: {
  switchTo: (mode: "signin" | "signup") => void;
}) {
  const [state, signInAction, pending] = useActionState(signIn, undefined);

  return (
    <>
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
        Welcome Back!
      </h2>

      <form action={signInAction} className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="signin-email"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="signin-email"
            name="email"
            type="email"
            placeholder="juan.delacruz@example.com"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:border-gray-500 focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="signin-password"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="signin-password"
            name="password"
            type="password"
            placeholder="Enter your password"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:border-gray-500 focus:outline-none"
          />

          {state?.errors?.form?.[0] && (
            <p className="mt-1 text-sm text-red-500">
              {state.errors.form[0]}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-[#3d2b1f] py-3 text-sm font-semibold text-white hover:bg-[#2e2016] hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "Signing In..." : "Sign In"}
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
        <button
          type="button"
          onClick={() => switchTo("signup")}
          className="font-medium text-gray-900 underline hover:cursor-pointer"
        >
          Sign up here
        </button>
      </p>
    </>
  );
}

function SignUpForm({
  switchTo,
}: {
  switchTo: (mode: "signin" | "signup") => void;
}) {
  const [state, signUpAction, pending] = useActionState(signUp, undefined);

  return (
    <>
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
        Create an Account
      </h2>

      <form action={signUpAction} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
  <div>
    <label
      htmlFor="signup-name"
      className="mb-1 block text-sm font-medium text-gray-700"
    >
      Full Name
    </label>

    <input
      id="signup-name"
      name="name"
      type="text"
      placeholder="Juan Dela Cruz"
      className={`w-full rounded-lg border px-4 py-3 text-sm placeholder-gray-400 focus:outline-none ${
        state?.errors?.name
          ? "border-red-500 focus:border-red-500"
          : "border-gray-300 focus:border-gray-500"
      }`}
    />

    {state?.errors?.name?.[0] && (
      <p className="mt-1 text-sm text-red-500">
        {state.errors.name[0]}
      </p>
    )}
  </div>

  <div>
    <label
      htmlFor="signup-phone"
      className="mb-1 block text-sm font-medium text-gray-700"
    >
      Mobile Number
    </label>

    <input
      id="signup-phone"
      name="phone"
      type="tel"
      placeholder="+63XXXXXXXXXX"
      className={`w-full rounded-lg border px-4 py-3 text-sm placeholder-gray-400 focus:outline-none ${
        state?.errors?.phone
          ? "border-red-500 focus:border-red-500"
          : "border-gray-300 focus:border-gray-500"
      }`}
    />

    {state?.errors?.phone?.[0] && (
      <p className="mt-1 text-sm text-red-500">
        {state.errors.phone[0]}
      </p>
    )}
  </div>
</div>

        <div>
            <label
              htmlFor="signup-email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <input
              id="signup-email"
              name="email"
              placeholder="juan.delacruz@example.com"
            className={`w-full rounded-lg border px-4 py-3 text-sm placeholder-gray-400 focus:outline-none ${
              state?.errors?.email
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-gray-500"
            }`}
          />
          {state?.errors?.email?.[0] && (
            <p className="mt-1 text-sm text-red-500">
              {state.errors.email[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="signup-password"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Password
          </label>

          <input
            id="signup-password"
            name="password"
            type="password"
            placeholder="At least 8 characters"
            className={`w-full rounded-lg border px-4 py-3 text-sm placeholder-gray-400 focus:outline-none ${
              state?.errors?.password
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-gray-500"
            }`}
          />
          {state?.errors?.password?.[0] && (
            <p className="mt-1 text-sm text-red-500">
              {state.errors.password[0]}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-[#3d2b1f] py-3 text-sm font-semibold text-white hover:bg-[#2e2016] hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "Signing Up..." : "Sign Up"}
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
        <button
          type="button"
          onClick={() => switchTo("signin")}
          className="font-medium text-gray-900 underline hover:cursor-pointer"
        >
          Sign in here
        </button>
      </p>
    </>
  );
}