
"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

const products = [
  {
    id: 1,
    name: "Classic White Sneakers",
    category: "Footwear",
    price: 2490,
    oldPrice: 3200,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
  },
  {
    id: 2,
    name: "Premium Leather Watch",
    category: "Accessories",
    price: 3590,
    oldPrice: 4500,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
  },
  {
    id: 3,
    name: "Minimal Backpack",
    category: "Bags",
    price: 1890,
    oldPrice: 2500,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
  },
  {
    id: 4,
    name: "Classic Sunglasses",
    category: "Accessories",
    price: 1290,
    oldPrice: 1800,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600",
  },
  {
    id: 5,
    name: "Casual Fashion Jacket",
    category: "Men",
    price: 2890,
    oldPrice: 3500,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600",
  },
  {
    id: 6,
    name: "Elegant Women's Outfit",
    category: "Women",
    price: 3290,
    oldPrice: 4200,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600",
  },
  {
    id: 7,
    name: "Everyday Running Shoes",
    category: "Footwear",
    price: 2190,
    oldPrice: 2800,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600",
  },
  {
    id: 8,
    name: "Modern Wrist Watch",
    category: "Accessories",
    price: 3990,
    oldPrice: 5000,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600",
  },
];

const categories = [
  "All",
  "Men",
  "Women",
  "Footwear",
  "Accessories",
  "Bags",
];

export default function ProductsPage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchCategory =
        category === "All" || product.category === category;

      const matchSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [category, search, sort]);

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* Page Header */}
      <section className="bg-[#f7eee6] py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <p className="text-orange-500 font-bold text-sm tracking-widest">
            OUR COLLECTION
          </p>

          <h1 className="text-4xl md:text-5xl font-black mt-3">
            All Products
          </h1>

          <p className="text-gray-600 mt-4 max-w-xl mx-auto">
            Explore our latest collection of fashion, accessories,
            and everyday essentials.
          </p>

          <p className="text-sm text-gray-500 mt-5">
            Home <span className="mx-2">/</span>
            <span className="text-orange-500">Products</span>
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-5 py-12 md:py-16">

        {/* Search and Sorting */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8">

          <div>
            <h2 className="text-2xl font-black">
              Shop Our Products
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Showing {filteredProducts.length} products
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500 w-full sm:w-64"
            />

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500 bg-white"
            >
              <option value="default">Default Sorting</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>

          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-7">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition ${
                category === item
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">

            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 group hover:shadow-xl transition duration-300"
              >

                {/* Product Image */}
                <div className="relative h-48 sm:h-60 md:h-72 bg-gray-100 overflow-hidden">

                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />

                  <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    SALE
                  </span>

                  <button
                    type="button"
                    aria-label="Add to wishlist"
                    className="absolute top-3 right-3 bg-white w-9 h-9 rounded-full shadow flex items-center justify-center text-xl hover:text-red-500"
                  >
                    ♡
                  </button>
                </div>

                {/* Product Details */}
                <div className="p-3 md:p-4">

                  <p className="text-xs text-gray-400">
                    {product.category}
                  </p>

                  <h3 className="font-bold mt-1 text-sm md:text-base line-clamp-1">
                    {product.name}
                  </h3>

                  <p className="text-yellow-500 text-sm mt-2">
                    ★★★★★{" "}
                    <span className="text-gray-500">
                      ({product.rating})
                    </span>
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className="font-black text-base md:text-lg">
                      ৳{product.price.toLocaleString("en-BD")}
                    </span>

                    <span className="text-gray-400 line-through text-xs md:text-sm">
                      ৳{product.oldPrice.toLocaleString("en-BD")}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="w-full mt-4 bg-gray-900 text-white py-2.5 md:py-3 rounded-xl text-xs md:text-sm font-semibold hover:bg-orange-500 transition"
                  >
                    + Add to Cart
                  </button>

                </div>
              </div>
            ))}

          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-bold">
              No Products Found
            </h3>

            <p className="text-gray-500 mt-2">
              Try searching with another name or category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
                setSort("default");
              }}
              className="mt-5 bg-orange-500 text-white px-6 py-3 rounded-full font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}

      </section>

      {/* Bottom Banner */}
      <section className="max-w-7xl mx-auto px-5 pb-16">
        <div className="bg-[#f7eee6] rounded-3xl p-8 md:p-12 text-center">
          <p className="text-orange-500 font-bold text-sm tracking-widest">
            SPECIAL OFFER
          </p>

          <h2 className="text-2xl md:text-4xl font-black mt-3">
            Discover Your Everyday Style
          </h2>

          <p className="text-gray-600 mt-3">
            Find something you love from our latest collection.
          </p>
        </div>
      </section>

    </main>
  );
}