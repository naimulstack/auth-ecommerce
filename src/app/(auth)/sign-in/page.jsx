
"use client";

import { useState } from "react";
import { signIn, authClient } from "@/lib/auth-client";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Email and Password Sign In
  const onSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const { error } = await signIn.email({
        email,
        password,
        rememberMe: true,
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(
          error.message || "Invalid email or password."
        );
      }
    } catch (err) {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Google Sign In — onSubmit এর বাইরে
  const googleSignIn = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      setErrorMessage(
        "Google sign-in failed. Please try again."
      );
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#faf8f6] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Logo */}
        <Link
          href="/"
          className="flex justify-center items-center gap-2 mb-8"
        >
          <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white font-bold text-xl">
            J
          </div>

          <span className="text-2xl font-bold text-gray-900">
            Jihan<span className="text-orange-500">Dev</span>
          </span>
        </Link>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-[0_10px_50px_rgba(0,0,0,0.06)] border border-gray-100 p-6 sm:p-9">

          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-orange-50 flex items-center justify-center">
              <svg
                className="w-7 h-7 text-orange-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5m5 5H3"
                />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              Welcome Back!
            </h1>

            <p className="text-gray-500 text-sm mt-2">
              Sign in to continue your shopping journey.
            </p>
          </div>

          <Form
            className="flex flex-col gap-5"
            onSubmit={onSubmit}
          >
            {/* Email */}
            <TextField
              isRequired
              name="email"
              type="email"
              className="w-full"
            >
              <Label className="text-sm font-semibold text-gray-700">
                Email Address
              </Label>

              <Input
                name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full"
              />

              <FieldError />
            </TextField>

            {/* Password */}
            <TextField
              isRequired
              name="password"
              type={showPassword ? "text" : "password"}
              minLength={8}
              className="w-full"
            >
              <div className="flex justify-between items-center">
                <Label className="text-sm font-semibold text-gray-700">
                  Password
                </Label>

                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-orange-600 hover:text-orange-700"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full pr-16"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500 hover:text-orange-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <Description className="text-xs text-gray-400">
                Enter your account password.
              </Description>

              <FieldError />
            </TextField>

            {/* Error */}
            {errorMessage && (
              <div
                role="alert"
                className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3"
              >
                {errorMessage}
              </div>
            )}

            {/* Email Sign In */}
            <Button
              type="submit"
              isDisabled={isLoading}
              className="w-full h-12 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg shadow-orange-100 transition"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

            {/* Google Sign In */}
            <Button
              type="button"
              onPress={googleSignIn}
              isDisabled={isLoading}
              className="w-full h-12 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition"
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </Button>
          </Form>

          {/* Signup */}
          <div className="mt-7 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}

              <Link
                href="/sign-up"
                className="font-semibold text-orange-600 hover:text-orange-700"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          © 2026 JihanDev. All rights reserved.
        </p>
      </div>
    </main>
  );
}