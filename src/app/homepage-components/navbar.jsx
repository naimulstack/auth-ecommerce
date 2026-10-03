"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setIsMenuOpen(false);
          router.push("/sign-in");
        },
      },
    });
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 py-4">

        {/* Top Navbar */}
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" onClick={closeMenu}>
            <div className="flex items-center gap-2">

              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center font-bold text-xl text-white">
                J
              </div>

              <h1 className="text-xl font-bold text-gray-900">
                Jihan<span className="text-orange-500">Dev</span>
              </h1>

            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">

            <li>
              <Link
                href="/"
                className="text-gray-700 hover:text-orange-500 transition"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/products"
                className="text-gray-700 hover:text-orange-500 transition"
              >
                Products
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-orange-500 transition"
              >
                Contact
              </Link>
            </li>

            <li>
              <Link
                href="/cart"
                className="text-gray-700 hover:text-orange-500 transition"
              >
                Add To Cart
              </Link>
            </li>

            <li>
              <Link
                href="/profile"
                className="text-gray-700 hover:text-orange-500 transition"
              >
                Profile
              </Link>
            </li>

          </ul>

          {/* Desktop Authentication */}
          <div className="hidden md:flex items-center gap-3">

            {session?.user ? (
              <Button
                onClick={handleSignOut}
                className="bg-orange-500 text-white hover:bg-orange-600"
              >
                Log Out
              </Button>
            ) : (
              <>
                <Link href="/sign-in">
                  <button className="px-4 py-2 rounded-lg border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition">
                    Sign In
                  </button>
                </Link>

                <Link href="/sign-up">
                  <button className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition">
                    Sign Up
                  </button>
                </Link>
              </>
            )}

          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:text-orange-500 hover:border-orange-500 transition"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              // X icon
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger icon
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-100">

            <div className="flex flex-col gap-2">

              <Link
                href="/"
                onClick={closeMenu}
                className="px-4 py-3 rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition"
              >
                Home
              </Link>

              <Link
                href="/products"
                onClick={closeMenu}
                className="px-4 py-3 rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition"
              >
                Products
              </Link>

              <Link
                href="/contact"
                onClick={closeMenu}
                className="px-4 py-3 rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition"
              >
                Contact
              </Link>

              <Link
                href="/cart"
                onClick={closeMenu}
                className="px-4 py-3 rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition"
              >
                🛒 Add To Cart
              </Link>

              <Link
                href="/profile"
                onClick={closeMenu}
                className="px-4 py-3 rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition"
              >
                Profile
              </Link>

              {/* Mobile Auth */}
              <div className="border-t border-gray-100 mt-2 pt-4">

                {session?.user ? (
                  <button
                    onClick={handleSignOut}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition"
                  >
                    Log Out
                  </button>
                ) : (
                  <div className="flex flex-col gap-3">

                    <Link
                      href="/sign-in"
                      onClick={closeMenu}
                      className="w-full text-center border border-orange-500 text-orange-500 hover:bg-orange-50 py-3 rounded-xl font-semibold transition"
                    >
                      Sign In
                    </Link>

                    <Link
                      href="/sign-up"
                      onClick={closeMenu}
                      className="w-full text-center bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition"
                    >
                      Sign Up
                    </Link>

                  </div>
                )}

              </div>

            </div>

          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;