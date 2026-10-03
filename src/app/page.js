"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const categories = [
  {
    name: "Men",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600",
  },
  {
    name: "Women",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600",
  },
  {
    name: "Shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
  },
  {
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
  },
];

const products = [
  {
    id: 1,
    name: "Classic White Sneakers",
    category: "Footwear",
    price: 2490,
    oldPrice: 3200,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
  },
  {
    id: 2,
    name: "Premium Leather Watch",
    category: "Accessories",
    price: 3590,
    oldPrice: 4500,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
  },
  {
    id: 3,
    name: "Minimal Backpack",
    category: "Bags",
    price: 1890,
    oldPrice: 2500,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
  },
  {
    id: 4,
    name: "Classic Sunglasses",
    category: "Accessories",
    price: 1290,
    oldPrice: 1800,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600",
  },
];

const HomePage = () => {
  const router = useRouter();

  const { data: session, isPending } = useSession();

  const [cart, setCart] = useState([]);
  const [addedProduct, setAddedProduct] = useState(null);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("shopping-cart");

      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    }
  }, []);

  // Add product to cart
  const handleAddToCart = (product) => {
    if (isPending) return;

    // Check login
    if (!session?.user) {
      toast.info("Please login first to add products to your cart!");
      router.push("/sign-in");
      return;
    }

    setCart((previousCart) => {
      const existingProduct = previousCart.find(
        (item) => item.id === product.id,
      );

      let updatedCart;

      if (existingProduct) {
        updatedCart = previousCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      } else {
        updatedCart = [
          ...previousCart,
          {
            ...product,
            quantity: 1,
          },
        ];
      }

      localStorage.setItem("shopping-cart", JSON.stringify(updatedCart));

      return updatedCart;
    });

    toast.success(`${product.name} added to cart!`);

    setAddedProduct(product.id);

    setTimeout(() => {
      setAddedProduct(null);
    }, 1500);
  };
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-5 pt-8 pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-[#f7eee6] min-h-[480px] grid md:grid-cols-2 items-center">
          <div className="p-8 md:p-16 z-10">
            <span className="inline-block bg-white px-4 py-2 rounded-full text-xs font-semibold tracking-widest text-orange-600 mb-6">
              NEW COLLECTION 2026
            </span>

            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              Style That
              <br />
              Speaks <span className="text-orange-500">You.</span>
            </h1>

            <p className="text-gray-600 mt-5 max-w-md leading-relaxed">
              Discover timeless fashion, everyday essentials, and premium
              products designed for your lifestyle.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="#products"
                className="bg-gray-900 text-white px-7 py-3.5 rounded-full font-semibold hover:bg-orange-500 transition"
              >
                Shop Collection →
              </a>

              <a
                href="#categories"
                className="border border-gray-400 px-7 py-3.5 rounded-full font-semibold hover:bg-white transition"
              >
                Explore More
              </a>
            </div>

            <div className="flex gap-8 mt-10">
              <div>
                <h3 className="text-2xl font-bold">10k+</h3>
                <p className="text-xs text-gray-500">Happy Customers</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold">500+</h3>
                <p className="text-xs text-gray-500">Products</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold">4.9★</h3>
                <p className="text-xs text-gray-500">Customer Rating</p>
              </div>
            </div>
          </div>

          <div className="relative h-[350px] md:h-full min-h-[350px]">
            <Image
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000"
              alt="Fashion collection"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-5 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-gray-100 py-8">
          {[
            ["🚚", "Free Shipping", "On orders over ৳3000"],
            ["↩️", "Easy Returns", "7 days return policy"],
            ["🔒", "Secure Payment", "100% protected"],
            ["🎧", "24/7 Support", "We are here to help"],
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-2xl">{item[0]}</span>

              <div>
                <h4 className="font-bold text-sm">{item[1]}</h4>
                <p className="text-xs text-gray-500 mt-1">{item[2]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="max-w-7xl mx-auto px-5 pb-20">
        <div className="flex justify-between items-end mb-8">
          <div>
            <p className="text-orange-500 text-sm font-bold tracking-widest">
              EXPLORE
            </p>

            <h2 className="text-3xl md:text-4xl font-black mt-2">
              Shop By Category
            </h2>
          </div>

          <a
            href="#products"
            className="text-sm font-semibold hover:text-orange-500"
          >
            View All →
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {categories.map((category) => (
            <a
              href="#products"
              key={category.name}
              className="group relative h-64 md:h-80 overflow-hidden rounded-2xl"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              <h3 className="absolute bottom-6 left-6 text-white text-xl font-bold">
                {category.name} →
              </h3>
            </a>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="products" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex justify-between items-center mb-10">
            <div className="text-center flex-1">
              <p className="text-orange-500 text-sm font-bold tracking-widest">
                HANDPICKED FOR YOU
              </p>

              <h2 className="text-3xl md:text-4xl font-black mt-2">
                Trending Products
              </h2>

              <p className="text-gray-500 mt-3">
                Discover our most loved products.
              </p>
            </div>

            {/* Cart Link */}
            <Link
              href="/cart"
              className="relative bg-white border border-gray-200 rounded-full px-4 py-3 hover:border-orange-500 transition"
            >
              <span className="text-lg">🛒</span>

              <span className="ml-2 text-sm font-semibold">Cart</span>

              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                  {totalCartItems}
                </span>
              )}
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden group shadow-sm hover:shadow-xl transition"
              >
                <div className="relative h-48 md:h-64 overflow-hidden bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />

                  <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    SALE
                  </span>

                  <button
                    type="button"
                    className="absolute top-3 right-3 bg-white w-9 h-9 rounded-full shadow hover:text-red-500"
                    aria-label="Add to wishlist"
                  >
                    ♡
                  </button>
                </div>

                <div className="p-4">
                  <p className="text-xs text-gray-400">{product.category}</p>

                  <h3 className="font-bold mt-1 text-sm md:text-base">
                    {product.name}
                  </h3>

                  <p className="text-yellow-500 text-sm mt-2">
                    ★★★★★{" "}
                    <span className="text-gray-500">({product.rating})</span>
                  </p>

                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    <span className="font-black text-lg">
                      ৳{product.price.toLocaleString("en-BD")}
                    </span>

                    <span className="text-gray-400 line-through text-sm">
                      ৳{product.oldPrice.toLocaleString("en-BD")}
                    </span>
                  </div>

                  {/* Add to Cart */}
                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    disabled={isPending}
                    className={`w-full mt-4 text-white py-3 rounded-xl text-sm font-semibold transition ${
                      addedProduct === product.id
                        ? "bg-green-600"
                        : "bg-gray-900 hover:bg-orange-500"
                    } disabled:opacity-50`}
                  >
                    {addedProduct === product.id
                      ? "✓ Added to Cart"
                      : isPending
                        ? "Please wait..."
                        : "+ Add to Cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* View Cart */}
          {totalCartItems > 0 && (
            <div className="text-center mt-10">
              <Link
                href="/cart"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-full font-semibold transition"
              >
                View Cart ({totalCartItems} items) →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Discount Banner */}
      <section className="max-w-7xl mx-auto px-5 py-20">
        <div className="bg-[#1d2939] rounded-3xl overflow-hidden grid md:grid-cols-2 items-center">
          <div className="p-8 md:p-14 text-white">
            <span className="text-orange-400 font-bold tracking-widest text-sm">
              LIMITED TIME OFFER
            </span>

            <h2 className="text-4xl md:text-5xl font-black mt-4 leading-tight">
              Upgrade Your
              <br />
              Everyday Style.
            </h2>

            <p className="text-gray-300 mt-4">
              Get up to 40% off on selected collections.
            </p>

            <a
              href="#products"
              className="inline-block bg-orange-500 hover:bg-orange-600 px-7 py-3.5 rounded-full mt-7 font-semibold transition"
            >
              Shop the Sale →
            </a>
          </div>

          <div className="relative h-72 md:h-96">
            <Image
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000"
              alt="Fashion store collection"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-3xl mx-auto px-5 pb-20 text-center">
        <h2 className="text-3xl font-black">Get 10% Off Your First Order</h2>

        <p className="text-gray-500 mt-3">
          Subscribe to receive updates about new arrivals and exclusive offers.
        </p>

        <form className="flex gap-2 mt-7 max-w-lg mx-auto">
          <input
            type="email"
            required
            placeholder="Enter your email address"
            className="min-w-0 flex-1 border border-gray-200 rounded-full px-5 py-3 outline-none focus:border-orange-500"
          />

          <button
            type="submit"
            className="bg-gray-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-500 transition"
          >
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
};

export default HomePage;
