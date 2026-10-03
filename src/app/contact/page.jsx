"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Thank you! Your message has been submitted.");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* Hero Section */}
      <section className="bg-[#f7eee6] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-5 text-center">

          <p className="text-orange-500 font-bold text-sm tracking-widest">
            GET IN TOUCH
          </p>

          <h1 className="text-4xl md:text-5xl font-black mt-3">
            Contact Us
          </h1>

          <p className="text-gray-600 mt-4 max-w-xl mx-auto leading-relaxed">
            Have a question about our products or your order?
            We would love to hear from you.
          </p>

          <p className="text-sm text-gray-500 mt-5">
            Home <span className="mx-2">/</span>
            <span className="text-orange-500">Contact</span>
          </p>

        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-5 py-14 md:py-20">

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Left Side - Contact Information */}
          <div>

            <p className="text-orange-500 text-sm font-bold tracking-widest">
              CONTACT INFORMATION
            </p>

            <h2 className="text-3xl md:text-4xl font-black mt-3 leading-tight">
              Let's Start a
              <span className="text-orange-500"> Conversation.</span>
            </h2>

            <p className="text-gray-500 mt-5 leading-relaxed max-w-lg">
              Our friendly team is always ready to help.
              Reach out to us for product information,
              order assistance, or any other questions.
            </p>

            {/* Contact Cards */}
            <div className="space-y-5 mt-9">

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 hover:bg-orange-50 transition">

                <div className="w-12 h-12 shrink-0 rounded-xl bg-orange-100 flex items-center justify-center text-2xl">
                  📍
                </div>

                <div>
                  <h3 className="font-bold">Our Location</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Chattogram, Bangladesh
                  </p>
                </div>

              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 hover:bg-orange-50 transition">

                <div className="w-12 h-12 shrink-0 rounded-xl bg-orange-100 flex items-center justify-center text-2xl">
                  📧
                </div>

                <div>
                  <h3 className="font-bold">Email Address</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    support@example.com
                  </p>
                </div>

              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 hover:bg-orange-50 transition">

                <div className="w-12 h-12 shrink-0 rounded-xl bg-orange-100 flex items-center justify-center text-2xl">
                  📞
                </div>

                <div>
                  <h3 className="font-bold">Phone Number</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    +880 1XXX-XXXXXX
                  </p>
                </div>

              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 hover:bg-orange-50 transition">

                <div className="w-12 h-12 shrink-0 rounded-xl bg-orange-100 flex items-center justify-center text-2xl">
                  🕒
                </div>

                <div>
                  <h3 className="font-bold">Working Hours</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Saturday – Thursday
                  </p>
                  <p className="text-sm text-gray-500">
                    9:00 AM – 8:00 PM
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-9 shadow-lg shadow-gray-100">

            <h2 className="text-2xl font-black">
              Send Us a Message
            </h2>

            <p className="text-gray-500 text-sm mt-2 mb-7">
              Fill out the form below and we will get back to you.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold mb-2"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold mb-2"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-semibold mb-2"
                >
                  Subject
                </label>

                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-orange-500 bg-white transition"
                >
                  <option value="">Select a subject</option>
                  <option value="Order Inquiry">Order Inquiry</option>
                  <option value="Product Information">
                    Product Information
                  </option>
                  <option value="Shipping & Delivery">
                    Shipping & Delivery
                  </option>
                  <option value="Return & Refund">
                    Return & Refund
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold mb-2"
                >
                  Your Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Write your message here..."
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-orange-500 transition duration-300"
              >
                Send Message →
              </button>

            </form>

          </div>

        </div>
      </section>

      {/* Bottom Support Banner */}
      <section className="max-w-7xl mx-auto px-5 pb-16">

        <div className="bg-[#f7eee6] rounded-3xl p-8 md:p-12 text-center">

          <div className="text-4xl mb-4">💬</div>

          <h2 className="text-2xl md:text-3xl font-black">
            Need Immediate Assistance?
          </h2>

          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            Our support team is here to make your shopping experience
            smooth and enjoyable.
          </p>

          <a
            href="mailto:support@example.com"
            className="inline-block mt-6 bg-orange-500 text-white px-7 py-3.5 rounded-full font-semibold hover:bg-gray-900 transition"
          >
            Email Our Support
          </a>

        </div>

      </section>

    </main>
  );
}