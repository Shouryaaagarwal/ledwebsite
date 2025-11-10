// "use client";
// import React, { useState } from "react";
// import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/Navbar";
// import { cn } from "@/lib/utils";
// import Image from "next/image";

// export function NavbarDemo() {
//   return (
//     <div className="relative w-full">
//       <Navbar className="top-2" />
//     </div>
//   );
// }

// function Navbar({ className }: { className?: string }) {
//   const [active, setActive] = useState<string | null>(null);
  
//   return (
//     <div
//       className={cn("fixed top-4 inset-x-0 max-w-7xl mx-auto z-50 px-6", className)}
//     >
//       <div className="flex items-center mt-6 justify-between">
//         {/* Logo on the left */}
//         <div className="flex items-center">
//           <Image
//             src="/logo.png"
//             alt="Hey Humanz Logo"
//             width={40}
//             height={40}
//             className="mr-3"
//           />
//           <span className={`text-xl font-bold text-black ${cn("font-sans")}`}>
//             HEY HUMANZ
//           </span>
//         </div>
        
//         {/* Navigation Menu in the center */}
//         <div className="flex-1 flex justify-center">
//           <Menu setActive={setActive}>
//             <MenuItem setActive={setActive} active={active} item="Shop">
//               <div className="flex flex-col space-y-4 text-sm">
//                 <HoveredLink href="/shop/led-screens">LED Screens</HoveredLink>
//                 <HoveredLink href="/shop/projectors">Projectors</HoveredLink>
//                 <HoveredLink href="/shop/video-walls">Video Walls</HoveredLink>
//                 <HoveredLink href="/shop/accessories">Accessories</HoveredLink>
//               </div>
//             </MenuItem>
            
//             <MenuItem setActive={setActive} active={active} item="Rent">
//               <div className="flex flex-col space-y-4 text-sm">
//                 <HoveredLink href="/rent/equipment">Rental Equipment</HoveredLink>
//                 <HoveredLink href="/rent/pricing">Pricing & Packages</HoveredLink>
//                 <HoveredLink href="/rent/events">Event Solutions</HoveredLink>
//                 <HoveredLink href="/rent/support">Technical Support</HoveredLink>
//               </div>
//             </MenuItem>
            
//             <MenuItem setActive={setActive} active={active} item="Create Ads">
//               <div className="flex flex-col space-y-4 text-sm">
//                 <HoveredLink href="/create-ads/client">For Clients</HoveredLink>
//                 <HoveredLink href="/create-ads/creator">For Creators</HoveredLink>
//                 <HoveredLink href="/create-ads/portfolio">Portfolio</HoveredLink>
//                 <HoveredLink href="/create-ads/pricing">Project Pricing</HoveredLink>
//               </div>
//             </MenuItem>
            
//             <MenuItem setActive={setActive} active={active} item="Company">
//               <div className="flex flex-col space-y-4 text-sm">
//                 <HoveredLink href="/about">About Us</HoveredLink>
//                 <HoveredLink href="/contact">Contact</HoveredLink>
//                 <HoveredLink href="/support">Support</HoveredLink>
//                 <HoveredLink href="/careers">Careers</HoveredLink>
//               </div>
//             </MenuItem>
//           </Menu>
//         </div>
        
//         {/* Placeholder for right side balance */}
//         <div className="w-40"></div>
//       </div>
//     </div>
//   );
// }

// export { HoveredLink };


// "use client";
// import React, { useState } from "react";
// import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/Navbar";
// import { cn } from "@/lib/utils";
// import Image from "next/image";
// import { Poppins } from "next/font/google";

// // Load Poppins font
// const poppins = Poppins({
//   weight: ["400", "500", "600", "700", "800"],
//   subsets: ["latin"],
//   display: "swap",
// });

// export function NavbarDemo() {
//   return (
//     <div className="relative w-full">
//       <Navbar className="top-2" />
//     </div>
//   );
// }

// function Navbar({ className }: { className?: string }) {
//   const [active, setActive] = useState<string | null>(null);
  
//   return (
//     <div
//       className={cn("fixed top-4 inset-x-0 max-w-7xl mx-auto z-50 px-6", poppins.className, className)}
//     >
//       <div className="flex items-center mt-[-60px] justify-between">
//         {/* Logo on the left */}
//         <div className="flex items-center">
//           <Image
//             src="/whitelogo.jpg"
//             alt="Hey Humanz Logo"
//             width={220}
//             height={220}
//             className="mr-3"
//           />
         
//         </div>
        
//         {/* Navigation Menu in the center */}
//         <div className="flex-1  flex justify-center">
//           <Menu setActive={setActive}>
//             <MenuItem setActive={setActive} active={active} item="Shop">
//               <div className="flex flex-col space-y-4 text-sm">
//                 <HoveredLink href="/shop/led-screens">LED Screens</HoveredLink>
//                 <HoveredLink href="/shop/projectors">Projectors</HoveredLink>
//                 <HoveredLink href="/shop/video-walls">Video Walls</HoveredLink>
//                 <HoveredLink href="/shop/accessories">Accessories</HoveredLink>
//               </div>
//             </MenuItem>
            
//             <MenuItem setActive={setActive} active={active} item="Rent">
//               <div className="flex flex-col space-y-4 text-sm">
//                 <HoveredLink href="/rent/equipment">Rental Equipment</HoveredLink>
//                 <HoveredLink href="/rent/pricing">Pricing & Packages</HoveredLink>
//                 <HoveredLink href="/rent/events">Event Solutions</HoveredLink>
//                 <HoveredLink href="/rent/support">Technical Support</HoveredLink>
//               </div>
//             </MenuItem>
            
//             <MenuItem setActive={setActive} active={active} item="Create Ads">
//               <div className="flex flex-col space-y-4 text-sm">
//                 <HoveredLink href="/create-ads/client">For Clients</HoveredLink>
//                 <HoveredLink href="/create-ads/creator">For Creators</HoveredLink>
//                 <HoveredLink href="/create-ads/portfolio">Portfolio</HoveredLink>
//                 <HoveredLink href="/create-ads/pricing">Project Pricing</HoveredLink>
//               </div>
//             </MenuItem>
            
//             <MenuItem setActive={setActive} active={active} item="Company">
//               <div className="flex flex-col space-y-4 text-sm">
//                 <HoveredLink href="/about">About Us</HoveredLink>
//                 <HoveredLink href="/contact">Contact</HoveredLink>
//                 <HoveredLink href="/support">Support</HoveredLink>
//                 <HoveredLink href="/careers">Careers</HoveredLink>
//               </div>
//             </MenuItem>
//           </Menu>
//         </div>
        
//         {/* Placeholder for right side balance */}
//         <div className="w-40"></div>
//       </div>
//     </div>
//   );
// }

// export { HoveredLink };


// "use client";
// import React, { useState, useEffect } from "react";
// import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/Navbar";
// import { cn } from "@/lib/utils";
// import Image from "next/image";
// import { Poppins } from "next/font/google";

// // Load Poppins font
// const poppins = Poppins({
//   weight: ["400", "500", "600", "700", "800"],
//   subsets: ["latin"],
//   display: "swap",
// });

// export function NavbarDemo() {
//   return (
//     <div className="relative w-full">
//       <Navbar className="top-2" />
//     </div>
//   );
// }

// function Navbar({ className }: { className?: string }) {
//   const [active, setActive] = useState<string | null>(null);
//   const [scrolled, setScrolled] = useState(false);

//   // ✅ Scroll effect for logo swap
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 690) {
//         setScrolled(true);
//       } else {
//         setScrolled(false);
//       }
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div
//       className={cn(
//         "fixed top-4 inset-x-0 max-w-7xl mx-auto z-50 px-6 transition-all duration-500",
//         poppins.className,
//         className
//       )}
//     >
//       <div className="flex items-center mt-[-60px] justify-between">
//         {/* Logo on the left */}
//         <div className="flex items-center">
//           <Image
//             src={scrolled ? "/blacklogo.jpg" : "/whitelogo.jpg"}
//             alt="Hey Humanz Logo"
//             width={250}
//             height={250}
//             className="mr-3 transition-all duration-500"
//           />
//         </div>

//         {/* Navigation Menu in the center */}
//         <div className="flex-1 flex justify-center">
//           <Menu setActive={setActive} darkMode={true}>
//             <MenuItem setActive={setActive} active={active} item="Shop">
//               <div className="flex flex-col space-y-4 text-sm">
//                 <HoveredLink href="/shop/led-screens">LED Screens</HoveredLink>
//                 <HoveredLink href="/shop/projectors">Projectors</HoveredLink>
//                 <HoveredLink href="/shop/video-walls">Video Walls</HoveredLink>
//                 <HoveredLink href="/shop/accessories">Accessories</HoveredLink>
//               </div>
//             </MenuItem>

//             <MenuItem setActive={setActive} active={active} item="Rent">
//               <div className="flex flex-col space-y-4 text-sm">
//                 <HoveredLink href="/rent/equipment">Rental Equipment</HoveredLink>
//                 <HoveredLink href="/rent/pricing">Pricing & Packages</HoveredLink>
//                 <HoveredLink href="/rent/events">Event Solutions</HoveredLink>
//                 <HoveredLink href="/rent/support">Technical Support</HoveredLink>
//               </div>
//             </MenuItem>

//             <MenuItem setActive={setActive} active={active} item="Create Ads">
//               <div className="flex flex-col space-y-4 text-sm">
//                 <HoveredLink href="/create-ads/client">For Clients</HoveredLink>
//                 <HoveredLink href="/create-ads/creator">For Creators</HoveredLink>
//                 <HoveredLink href="/create-ads/portfolio">Portfolio</HoveredLink>
//                 <HoveredLink href="/create-ads/pricing">Project Pricing</HoveredLink>
//               </div>
//             </MenuItem>

//             <MenuItem setActive={setActive} active={active} item="Company">
//               <div className="flex flex-col space-y-4 text-sm">
//                 <HoveredLink href="/about">About Us</HoveredLink>
//                 <HoveredLink href="/contact">Contact</HoveredLink>
//                 <HoveredLink href="/support">Support</HoveredLink>
//                 <HoveredLink href="/careers">Careers</HoveredLink>
//               </div>
//             </MenuItem>
//           </Menu>
//         </div>

//         {/* Placeholder for right side balance */}
//         <div className="w-40"></div>
//       </div>
//     </div>
//   );
// }

// export { HoveredLink };


// "use client";
// import  { useState, useEffect } from "react";
// import { HoveredLink, Menu, MenuItem } from "./ui/Navbar";
// import { cn } from "@/lib/utils";
// import Image from "next/image";
// import { Poppins } from "next/font/google";
// import { motion, AnimatePresence } from "framer-motion";
// import { Menu as MenuIcon, X } from "lucide-react";

// const poppins = Poppins({
//   weight: ["400", "500", "600", "700", "800"],
//   subsets: ["latin"],
//   display: "swap",
// });

// export function NavbarDemo() {
//   return (
//     <div className="relative w-full">
//       <Navbar className="top-2" />
//     </div>
//   );
// }

// function Navbar({ className }: { className?: string }) {
//   const [active, setActive] = useState<string | null>(null);
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   // ✅ Scroll effect for logo swap
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 100);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div
//       className={cn(
//         "fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-10 transition-all duration-500",
//         poppins.className,
//         className
//       )}
//     >
//       <div className="flex items-center justify-between -mt-5">
//         {/* ✅ Logo to extreme left */}
//         <div className="flex items-center bg-transparent ">
//           <Image
//             src={scrolled ? "/blacklogo.jpg" : "/whitelogo.jpg"}
//             alt="Hey Humanz Logo"
//             width={200}
//             height={200}
//             className="transition-all duration-500 w-36 sm:w-44 lg:w-56"
//           />
//         </div>

//         {/* ✅ Desktop Menu - Centered perfectly */}
//         <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
//           <Menu 
//             setActive={setActive} 
//             darkMode={true} 
//             className="rounded-full bg-black/85 px-8 py-6  backdrop-blur-md"
//           >
//             <MenuItem setActive={setActive} active={active} item="Shop">
//               <div className="flex flex-col space-y-4 text-sm">
//                 <HoveredLink href="/shop/led-screens">LED Screens</HoveredLink>
//                 <HoveredLink href="/shop/projectors">Projectors</HoveredLink>
//                 <HoveredLink href="/shop/video-walls">Video Walls</HoveredLink>
//                 <HoveredLink href="/shop/accessories">Accessories</HoveredLink>
//               </div>
//             </MenuItem>

//             <MenuItem setActive={setActive} active={active} item="Rent">
//               <div className="flex flex-col space-y-4 text-sm">
//                 <HoveredLink href="/rent/equipment">Rental Equipment</HoveredLink>
//                 <HoveredLink href="/rent/pricing">Pricing & Packages</HoveredLink>
//                 <HoveredLink href="/rent/events">Event Solutions</HoveredLink>
//                 <HoveredLink href="/rent/support">Technical Support</HoveredLink>
//               </div>
//             </MenuItem>

//             <MenuItem setActive={setActive} active={active} item="Create Ads">
//               <div className="flex flex-col space-y-4 text-sm">
//                 <HoveredLink href="/create-ads/client">For Clients</HoveredLink>
//                 <HoveredLink href="/create-ads/creator">For Creators</HoveredLink>
//                 <HoveredLink href="/create-ads/portfolio">Portfolio</HoveredLink>
//                 <HoveredLink href="/create-ads/pricing">Project Pricing</HoveredLink>
//               </div>
//             </MenuItem>

//             <MenuItem setActive={setActive} active={active} item="Company">
//               <div className="flex flex-col space-y-4 text-sm">
//                 <HoveredLink href="/about">About Us</HoveredLink>
//                 <HoveredLink href="/contact">Contact</HoveredLink>
//                 <HoveredLink href="/support">Support</HoveredLink>
//                 <HoveredLink href="/careers">Careers</HoveredLink>
//               </div>
//             </MenuItem>
//           </Menu>
//         </div>

//         {/* ✅ Mobile Menu Toggle */}
//         <button
//           className={cn(
//             "md:hidden focus:outline-none z-50 p-2 rounded-full transition-all duration-500",
//             scrolled 
//               ? "bg-white/30 text-black" 
//               : "bg-transparent text-white"
//           )}
//           onClick={() => setMobileOpen(!mobileOpen)}
//         >
//           {mobileOpen ? <X size={32} /> : <MenuIcon size={32} />}
//         </button>
//       </div>

//       {/* ✅ Fullscreen Mobile Overlay Menu */}
//       <AnimatePresence>
//         {mobileOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.4 }}
//             className="fixed inset-0 bg-black/90 backdrop-blur-md z-40 flex flex-col items-center justify-center text-white"
//           >
//             <motion.div
//               initial={{ x: -50, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               exit={{ x: -50, opacity: 0 }}
//               transition={{ duration: 0.4 }}
//               className="space-y-6 w-full max-w-sm px-8"
//             >
//               {[
//                 {
//                   title: "Shop",
//                   links: [
//                     { name: "LED Screens", href: "/shop/led-screens" },
//                     { name: "Projectors", href: "/shop/projectors" },
//                     { name: "Video Walls", href: "/shop/video-walls" },
//                     { name: "Accessories", href: "/shop/accessories" },
//                   ],
//                 },
//                 {
//                   title: "Rent",
//                   links: [
//                     { name: "Rental Equipment", href: "/rent/equipment" },
//                     { name: "Pricing & Packages", href: "/rent/pricing" },
//                     { name: "Event Solutions", href: "/rent/events" },
//                     { name: "Technical Support", href: "/rent/support" },
//                   ],
//                 },
//                 {
//                   title: "Create Ads",
//                   links: [
//                     { name: "For Clients", href: "/create-ads/client" },
//                     { name: "For Creators", href: "/create-ads/creator" },
//                     { name: "Portfolio", href: "/create-ads/portfolio" },
//                     { name: "Project Pricing", href: "/create-ads/pricing" },
//                   ],
//                 },
//                 {
//                   title: "Company",
//                   links: [
//                     { name: "About Us", href: "/about" },
//                     { name: "Contact", href: "/contact" },
//                     { name: "Support", href: "/support" },
//                     { name: "Careers", href: "/careers" },
//                   ],
//                 },
//               ].map((section, idx) => (
//                 <details key={idx} className="group">
//                   <summary className="cursor-pointer font-semibold text-2xl hover:text-gray-300">
//                     {section.title}
//                   </summary>
//                   <motion.div
//                     initial={{ opacity: 0, x: -15 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -15 }}
//                     transition={{ duration: 0.3 }}
//                     className="pl-5 mt-3 space-y-2"
//                   >
//                     {section.links.map((link, i) => (
//                       <motion.a
//                         key={i}
//                         href={link.href}
//                         className="block text-lg text-gray-300 hover:text-white transition-transform transform hover:translate-x-2"
//                       >
//                         {link.name}
//                       </motion.a>
//                     ))}
//                   </motion.div>
//                 </details>
//               ))}
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export { HoveredLink }; 





"use client";
import  { useState, useEffect } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/Navbar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { Menu as MenuIcon, X } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export function NavbarDemo() {
  return (
    <div className="relative w-full">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();

  // ✅ Scroll effect for logo swap
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAuthAction = () => {
    if (session) {
      signOut();
    } else {
      signIn();
    }
  };

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-10 transition-all duration-500",
        poppins.className,
        className
      )}
    >
      <div className="flex items-center justify-between -mt-5">
        {/* ✅ Logo to extreme left */}
        <div className="flex items-center bg-transparent ">
          <Image
            src={scrolled ? "/blacklogo.jpg" : "/whitelogo.jpg"}
            alt="Hey Humanz Logo"
            width={200}
            height={200}
            className="transition-all duration-500 w-36 sm:w-44 lg:w-56"
          />
        </div>

        {/* ✅ Desktop Menu - Centered perfectly */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Menu 
            setActive={setActive} 
            darkMode={true} 
            className="rounded-full bg-black/85 px-8 py-6  backdrop-blur-md"
          >
            <MenuItem setActive={setActive} active={active} item="Shop">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/shop/led-screens">LED Screens</HoveredLink>
                <HoveredLink href="/shop/projectors">Projectors</HoveredLink>
                <HoveredLink href="/shop/video-walls">Video Walls</HoveredLink>
                <HoveredLink href="/shop/accessories">Accessories</HoveredLink>
              </div>
            </MenuItem>

            <MenuItem setActive={setActive} active={active} item="Rent">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/rent/equipment">Rental Equipment</HoveredLink>
                <HoveredLink href="/rent/pricing">Pricing & Packages</HoveredLink>
                <HoveredLink href="/rent/events">Event Solutions</HoveredLink>
                <HoveredLink href="/rent/support">Technical Support</HoveredLink>
              </div>
            </MenuItem>

            <MenuItem setActive={setActive} active={active} item="Create Ads">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/create-ads/client">For Clients</HoveredLink>
                <HoveredLink href="/create-ads/creator">For Creators</HoveredLink>
                <HoveredLink href="/create-ads/portfolio">Portfolio</HoveredLink>
                <HoveredLink href="/create-ads/pricing">Project Pricing</HoveredLink>
              </div>
            </MenuItem>

            <MenuItem setActive={setActive} active={active} item="Company">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/about">About Us</HoveredLink>
                <HoveredLink href="/contact">Contact</HoveredLink>
                <HoveredLink href="/support">Support</HoveredLink>
                <HoveredLink href="/careers">Careers</HoveredLink>
              </div>
            </MenuItem>
          </Menu>
        </div>

        {/* ✅ Auth Button - Top Right Corner */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleAuthAction}
            className={cn(
              "px-4 py-2 rounded-lg font-semibold transition-all duration-300",
              scrolled 
                ? "bg-black text-white hover:bg-gray-800" 
                : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
            )}
          >
            {session ? "Sign Out" : "Sign In"}
          </button>

          {/* ✅ Mobile Menu Toggle */}
          <button
            className={cn(
              "md:hidden focus:outline-none z-50 p-2 rounded-full transition-all duration-500",
              scrolled 
                ? "bg-white/30 text-black" 
                : "bg-transparent text-white"
            )}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={32} /> : <MenuIcon size={32} />}
          </button>
        </div>
      </div>

      {/* ✅ Fullscreen Mobile Overlay Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-40 flex flex-col items-center justify-center text-white"
          >
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6 w-full max-w-sm px-8"
            >
              {/* Auth Button in Mobile Menu */}
              <div className="text-center mb-4">
                <button
                  onClick={() => {
                    handleAuthAction();
                    setMobileOpen(false);
                  }}
                  className="px-6 py-3 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 backdrop-blur-sm transition-all"
                >
                  {session ? "Sign Out" : "Sign In"}
                </button>
                {session && (
                  <p className="text-sm text-gray-300 mt-2">
                    Signed in as {session.user?.email}
                  </p>
                )}
              </div>

              {[
                {
                  title: "Shop",
                  links: [
                    { name: "LED Screens", href: "/shop/led-screens" },
                    { name: "Projectors", href: "/shop/projectors" },
                    { name: "Video Walls", href: "/shop/video-walls" },
                    { name: "Accessories", href: "/shop/accessories" },
                  ],
                },
                {
                  title: "Rent",
                  links: [
                    { name: "Rental Equipment", href: "/rent/equipment" },
                    { name: "Pricing & Packages", href: "/rent/pricing" },
                    { name: "Event Solutions", href: "/rent/events" },
                    { name: "Technical Support", href: "/rent/support" },
                  ],
                },
                {
                  title: "Create Ads",
                  links: [
                    { name: "For Clients", href: "/create-ads/client" },
                    { name: "For Creators", href: "/create-ads/creator" },
                    { name: "Portfolio", href: "/create-ads/portfolio" },
                    { name: "Project Pricing", href: "/create-ads/pricing" },
                  ],
                },
                {
                  title: "Company",
                  links: [
                    { name: "About Us", href: "/about" },
                    { name: "Contact", href: "/contact" },
                    { name: "Support", href: "/support" },
                    { name: "Careers", href: "/careers" },
                  ],
                },
              ].map((section, idx) => (
                <details key={idx} className="group">
                  <summary className="cursor-pointer font-semibold text-2xl hover:text-gray-300">
                    {section.title}
                  </summary>
                  <motion.div
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.3 }}
                    className="pl-5 mt-3 space-y-2"
                  >
                    {section.links.map((link, i) => (
                      <motion.a
                        key={i}
                        href={link.href}
                        className="block text-lg text-gray-300 hover:text-white transition-transform transform hover:translate-x-2"
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.name}
                      </motion.a>
                    ))}
                  </motion.div>
                </details>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { HoveredLink };