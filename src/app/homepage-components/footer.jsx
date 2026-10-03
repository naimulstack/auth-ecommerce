import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <div>
            {/* Footer */}
            <footer id="footer" className="bg-gray-950 text-white py-12">
                <div className="max-w-7xl mx-auto px-5">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="col-span-2">
                            <h2 className="text-2xl font-black">
                                <div className="flex items-center gap-2">

                                    <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center font-bold text-xl text-white">
                                        J
                                    </div>

                                    <h1 className="text-xl font-bold text-white">
                                        Jihan<span className="text-orange-500">Dev</span>
                                    </h1>

                                </div>
                            </h2>

                            <p className="text-gray-400 mt-4 max-w-sm text-sm leading-6">
                                Discover your style with our curated collection of fashion and
                                lifestyle essentials.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-bold mb-4">Quick Links</h3>

                            <ul className="space-y-3 text-sm text-gray-400">
                                <li>
                                    <Link href="/" className="hover:text-orange-400">
                                        Home
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/products" className="hover:text-orange-400">
                                        Products
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/contact" className="hover:text-orange-400">
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold mb-4">Customer Care</h3>

                            <ul className="space-y-3 text-sm text-gray-400">
                                <li>Contact Us</li>
                                <li>Shipping Policy</li>
                                <li>Return Policy</li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
                        © 2026 JihanDev. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;