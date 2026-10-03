
"use client";

import { useState } from "react";
import { signUp, authClient } from "@/lib/auth-client";
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

const Page = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Email Sign Up
    const onSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrorMessage("");

        const formData = new FormData(e.currentTarget);

        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const { data, error } = await signUp.email({
                name,
                email,
                password,
                callbackURL: "/",
            });

            if (error) {
                setErrorMessage(
                    error.message || "Unable to create your account."
                );
                return;
            }

            console.log("Sign up successful:", data);

        } catch (error) {
            setErrorMessage(
                "Something went wrong. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    // Google Sign Up
    const googleSignUp = async () => {
        setIsLoading(true);
        setErrorMessage("");

        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (error) {
            setErrorMessage(
                "Google sign-up failed. Please try again."
            );
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#faf8f6] flex items-center justify-center px-4 py-10">

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

                {/* Sign Up Card */}
                <div className="bg-white rounded-3xl shadow-[0_10px_50px_rgba(0,0,0,0.06)] border border-gray-100 p-6 sm:p-9">

                    {/* Heading */}
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
                                    d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2m16 0v-2a4 4 0 00-4-4h-1M12 7a4 4 0 11-8 0 4 4 0 018 0zm7 0v6m3-3h-6"
                                />
                            </svg>

                        </div>

                        <h1 className="text-3xl font-bold text-gray-900">
                            Create Account
                        </h1>

                        <p className="text-gray-500 text-sm mt-2">
                            Join ShopEase and start your shopping journey.
                        </p>

                    </div>

                    {/* Form */}
                    <Form
                        className="flex flex-col gap-5"
                        onSubmit={onSubmit}
                    >

                        {/* Name */}
                        <TextField
                            isRequired
                            name="name"
                            className="w-full"
                            validate={(value) => {
                                if (value.trim().length < 3) {
                                    return "Name must be at least 3 characters";
                                }

                                return null;
                            }}
                        >
                            <Label className="text-sm font-semibold text-gray-700">
                                Full Name
                            </Label>

                            <Input
                                name="name"
                                placeholder="John Doe"
                                className="w-full"
                            />

                            <FieldError />
                        </TextField>

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
                            validate={(value) => {
                                if (value.length < 8) {
                                    return "Password must be at least 8 characters";
                                }

                                if (!/[A-Z]/.test(value)) {
                                    return "Password must contain one uppercase letter";
                                }

                                if (!/[0-9]/.test(value)) {
                                    return "Password must contain one number";
                                }

                                return null;
                            }}
                        >
                            <div className="flex justify-between items-center">
                                <Label className="text-sm font-semibold text-gray-700">
                                    Password
                                </Label>
                            </div>

                            <div className="relative">

                                <Input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a password"
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
                                At least 8 characters, 1 uppercase letter and 1 number.
                            </Description>

                            <FieldError />
                        </TextField>

                        {/* Error Message */}
                        {errorMessage && (
                            <div
                                role="alert"
                                className="w-full bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3"
                            >
                                {errorMessage}
                            </div>
                        )}

                        {/* Create Account Button */}
                        <Button
                            type="submit"
                            isDisabled={isLoading}
                            className="w-full h-12 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg shadow-orange-100 transition"
                        >
                            {isLoading ? "Creating Account..." : "Create Account"}
                        </Button>

                        {/* Divider */}
                        <div className="flex items-center gap-3 w-full">
                            <div className="h-px bg-gray-200 flex-1" />
                            <span className="text-xs text-gray-400">
                                OR CONTINUE WITH
                            </span>
                            <div className="h-px bg-gray-200 flex-1" />
                        </div>

                        {/* Google Sign Up */}
                        <Button
                            type="button"
                            onPress={googleSignUp}
                            isDisabled={isLoading}
                            className="w-full h-12 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition"
                        >
                            <FcGoogle className="text-xl" />
                            Continue with Google
                        </Button>

                    </Form>

                    {/* Sign In Link */}
                    <div className="mt-7 text-center">
                        <p className="text-sm text-gray-500">
                            Already have an account?{" "}

                            <Link
                                href="/sign-in"
                                className="font-semibold text-orange-600 hover:text-orange-700"
                            >
                                Sign In
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
};

export default Page;