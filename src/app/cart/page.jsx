
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CartPage() {
    const { data: session, isPending } = useSession();

    const [cart, setCart] = useState([]);
    const [isCartLoading, setIsCartLoading] = useState(true);

    // Load cart from localStorage
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem("shopping-cart");

            if (savedCart) {
                const parsedCart = JSON.parse(savedCart);

                if (Array.isArray(parsedCart)) {
                    setCart(parsedCart);
                }
            }
        } catch (error) {
            console.error("Failed to load cart:", error);
        } finally {
            setIsCartLoading(false);
        }
    }, []);

    // Save cart to localStorage
    const saveCart = (updatedCart) => {
        setCart(updatedCart);

        localStorage.setItem(
            "shopping-cart",
            JSON.stringify(updatedCart)
        );
    };

    // Update quantity
    const updateQuantity = (id, amount) => {
        const updatedCart = cart
            .map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: item.quantity + amount,
                    }
                    : item
            )
            .filter((item) => item.quantity > 0);

        saveCart(updatedCart);
    };

    // Remove product

    const removeItem = (id) => {
        const removedProduct = cart.find(
            (item) => item.id === id
        );

        const updatedCart = cart.filter(
            (item) => item.id !== id
        );

        saveCart(updatedCart);

        toast.warn(`${removedProduct?.name} removed from cart!`);
    };

    // Clear cart
    const clearCart = () => {
        saveCart([]);
    };

    // Calculate subtotal
    const subtotal = cart.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    const shipping = cart.length > 0 ? 100 : 0;

    const total = subtotal + shipping;

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    // Authentication loading
    if (isPending) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                <p className="text-gray-500 animate-pulse">
                    Checking your account...
                </p>
            </div>
        );
    }

    // Not logged in
    if (!session?.user) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center px-4 bg-gray-50">
                <div className="max-w-md w-full text-center bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">

                    <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-orange-50 flex items-center justify-center">
                        <svg
                            className="w-9 h-9 text-orange-500"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 3h2l2.4 12.2a2 2 0 002 1.6h8.8a2 2 0 002-1.6L22 7H6"
                            />

                            <circle cx="10" cy="21" r="1" />
                            <circle cx="19" cy="21" r="1" />
                        </svg>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 mb-3">
                        Login to View Your Cart
                    </h1>

                    <p className="text-gray-500 text-sm leading-6 mb-6">
                        Please log in to your account to view your cart
                        and manage your shopping items.
                    </p>

                    <Link
                        href="/sign-in"
                        className="inline-flex items-center justify-center w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition"
                    >
                        Login to Continue
                    </Link>

                    <p className="text-sm text-gray-500 mt-5">
                        Don't have an account?{" "}
                        <Link
                            href="/sign-up"
                            className="text-orange-600 font-semibold hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        );
    }

    // Cart loading
    if (isCartLoading) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                <p className="text-gray-500 animate-pulse">
                    Loading your cart...
                </p>
            </div>
        );
    }

    return (

        <main className="min-h-screen bg-gray-50 py-10 px-4">
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <p className="text-sm text-gray-500 mb-2">
                        <Link href="/" className="hover:text-orange-500">
                            Home
                        </Link>
                        {" / "}Cart
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                My Shopping Cart
                            </h1>

                            <p className="text-gray-500 mt-2">
                                Welcome, {session.user.name || session.user.email}
                            </p>
                        </div>

                        {cart.length > 0 && (
                            <span className="bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold">
                                {totalItems} Items
                            </span>
                        )}
                    </div>
                </div>

                {/* Empty Cart */}
                {cart.length === 0 ? (
                    <div className="bg-white rounded-3xl p-10 text-center border border-gray-100 shadow-sm">

                        <div className="text-6xl mb-5">
                            🛒
                        </div>

                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            Your cart is empty
                        </h2>

                        <p className="text-gray-500 mb-6">
                            Looks like you haven't added anything to your cart yet.
                        </p>

                        <Link
                            href="/#products"
                            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">

                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">

                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 flex flex-col sm:flex-row gap-5 shadow-sm"
                                >
                                    {/* Product Image */}
                                    <div className="relative w-full sm:w-32 h-48 sm:h-32 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            sizes="(max-width: 640px) 100vw, 128px"
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1 flex flex-col justify-between">

                                        <div className="flex justify-between gap-3">
                                            <div>
                                                <p className="text-xs text-gray-400 mb-1">
                                                    {item.category || "Product"}
                                                </p>

                                                <h2 className="font-semibold text-gray-900">
                                                    {item.name}
                                                </h2>

                                                <p className="text-sm text-gray-500 mt-2">
                                                    ৳{item.price.toLocaleString("en-BD")} / item
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => removeItem(item.id)}
                                                className="text-sm text-red-500 hover:text-red-700 h-fit"
                                            >
                                                Remove
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between mt-5">

                                            {/* Quantity */}
                                            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">

                                                <button
                                                    type="button"
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="px-3 py-2 hover:bg-gray-100 transition"
                                                    aria-label="Decrease quantity"
                                                >
                                                    −
                                                </button>

                                                <span className="px-4 font-medium">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="px-3 py-2 hover:bg-gray-100 transition"
                                                    aria-label="Increase quantity"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <p className="font-bold text-gray-900">
                                                ৳
                                                {(item.price * item.quantity).toLocaleString("en-BD")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Continue Shopping */}
                            <div className="flex flex-wrap justify-between items-center gap-4 pt-3">

                                <Link
                                    href="/#products"
                                    className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700"
                                >
                                    ← Continue Shopping
                                </Link>

                                <button
                                    type="button"
                                    onClick={clearCart}
                                    className="text-sm text-red-500 hover:text-red-700 font-medium"
                                >
                                    Clear Cart
                                </button>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm lg:sticky lg:top-24">

                                <h2 className="text-xl font-bold text-gray-900 mb-6">
                                    Order Summary
                                </h2>

                                <div className="space-y-4 text-sm">

                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal ({totalItems} items)</span>

                                        <span>
                                            ৳{subtotal.toLocaleString("en-BD")}
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>

                                        <span>
                                            ৳{shipping.toLocaleString("en-BD")}
                                        </span>
                                    </div>

                                    <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-gray-900 text-lg">
                                        <span>Total</span>

                                        <span>
                                            ৳{total.toLocaleString("en-BD")}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        alert("Connect your checkout page here!")
                                    }
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 rounded-xl mt-6 transition"
                                >
                                    Proceed to Checkout
                                </button>

                                <p className="text-xs text-center text-gray-400 mt-4">
                                    Secure checkout · Easy shopping
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}