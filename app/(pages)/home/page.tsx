"use client";

import { Inter, Poppins } from "next/font/google";
import { NavbarDemo } from "@/components/NavbarDemo";
import Image from "next/image";

const inter = Inter({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  weight: ["700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <div className={`${inter.className} w-full bg-white min-h-screen`}>
      {/* ================= NAVBAR ================= */}
      <NavbarDemo />

      {/* ================= HERO SECTION WITH BACKGROUND IMAGE ================= */}
      <div className="relative h-screen w-full pt-20">
        {" "}
        {/* ADDED pt-20 HERE - This is the key fix */}
        {/* Background Image using Next.js Image component */}
        <div className="absolute inset-0">
          <Image
            src="/homepage2.jpg"
            alt="LED Advertising Background"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        {/* Dark Overlay with translucent effect */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h1
            className={`${poppins.className} font-extrabold text-5xl md:text-7xl text-white mb-6 leading-tight`}
          >
            Create. <span className="text-[#b9b6b6]">Display.</span> Shine.
          </h1>

          <p className="text-xl md:text-2xl text-[#E5E5E5] max-w-3xl mx-auto mb-8 leading-relaxed">
            Revolutionizing how brands and creators collaborate in visual
            advertising through cutting-edge LED solutions.
          </p>

          <div className="flex flex-col md:flex-row gap-6 items-center justify-center mt-8">
            <button className="bg-[#A538FO] hover:text-black hover:bg-white px-10 py-5 rounded-full font-semibold text-white text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-2 border-white">
              🛒 Shop LED Products
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white hover:text-black px-10 py-5 rounded-full font-semibold text-white text-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
              🎨 Create Advertisements
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="animate-bounce">
              <div className="w-3 h-3 bg-[#ada7a7] rounded-full mx-auto mb-1"></div>
              <div className="w-3 h-3 bg-[#E6D7FF] rounded-full mx-auto mb-1"></div>
              <div className="w-3 h-3 bg-[#F4EFFF] rounded-full mx-auto"></div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SERVICES SECTION ================= */}
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-20">
        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {/* Shop Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-4xl mb-4">🛒</div>
            <h3
              className={`${poppins.className} text-2xl font-bold text-black mb-4`}
            >
              Shop LED Products
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Browse, compare, and purchase high-quality LED screens,
              projectors, video walls, and accessories for your business needs.
            </p>
            <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Explore Products
            </button>
          </div>

          {/* Rent Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-4xl mb-4">🏠</div>
            <h3
              className={`${poppins.className} text-2xl font-bold text-black mb-4`}
            >
              Rent Equipment
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Flexible rental solutions for events and campaigns with
              duration-based pricing and full technical support.
            </p>
            <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
              View Rentals
            </button>
          </div>

          {/* Create Ads Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-4xl mb-4">🎨</div>
            <h3
              className={`${poppins.className} text-2xl font-bold text-black mb-4`}
            >
              Create Advertisements
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Connect with talented creators to develop custom advertising
              content that makes your brand shine.
            </p>
            <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Start Project
            </button>
          </div>
        </div>

        {/* ================= FEATURES SECTION ================= */}
        <div className="bg-linear-to-r from-gray-50 to-white rounded-3xl p-12 border border-gray-200 mb-20">
          <div className="text-center mb-12">
            <h2
              className={`${poppins.className} text-4xl font-bold text-black mb-4`}
            >
              Why Choose Hey Humanz?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We bring together the best of technology, creativity, and
              collaboration to transform your visual advertising experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-bold text-black mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">
                Quick shipping and setup for all your LED needs
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-bold text-black mb-2">Expert Support</h3>
              <p className="text-gray-600 text-sm">
                24/7 technical support and guidance
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="font-bold text-black mb-2">Creative Solutions</h3>
              <p className="text-gray-600 text-sm">
                Innovative approaches to visual advertising
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="font-bold text-black mb-2">Collaborative</h3>
              <p className="text-gray-600 text-sm">
                Connect with top creators worldwide
              </p>
            </div>
          </div>
        </div>

        {/* ================= TARGET USERS ================= */}
        <div className="bg-gray-900 rounded-3xl p-12 border border-gray-800">
          <h2
            className={`${poppins.className} text-3xl font-bold text-white text-center mb-12`}
          >
            Designed For Modern Professionals
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🏢</span>
              </div>
              <h3 className="font-semibold text-white mb-2">
                Business Clients
              </h3>
              <p className="text-gray-300 text-sm">
                Brands seeking LED displays and professional ad creation
                services
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">👩‍💻</span>
              </div>
              <h3 className="font-semibold text-white mb-2">
                Creative Professionals
              </h3>
              <p className="text-gray-300 text-sm">
                Designers and creators building portfolios and managing projects
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold text-white mb-2">End Customers</h3>
              <p className="text-gray-300 text-sm">
                Retail buyers and renters of LED screens and accessories
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="w-full bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div
                className={`${poppins.className} text-2xl font-bold text-white mb-4`}
              >
                HEY HUMANZ
              </div>
              <p className="text-gray-400 text-sm">
                Create. Display. Shine. — The future of LED advertising starts
                here.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    LED Products
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Equipment Rental
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Ad Creation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Hey Humanz. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
