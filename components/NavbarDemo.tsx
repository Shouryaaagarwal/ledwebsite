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


"use client";
import React, { useState, useEffect } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/Navbar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Poppins } from "next/font/google";

// Load Poppins font
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

  // ✅ Scroll effect for logo swap
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 690) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed top-4 inset-x-0 max-w-7xl mx-auto z-50 px-6 transition-all duration-500",
        poppins.className,
        className
      )}
    >
      <div className="flex items-center mt-[-60px] justify-between">
        {/* Logo on the left */}
        <div className="flex items-center">
          <Image
            src={scrolled ? "/blacklogo.jpg" : "/whitelogo.jpg"}
            alt="Hey Humanz Logo"
            width={250}
            height={250}
            className="mr-3 transition-all duration-500"
          />
        </div>

        {/* Navigation Menu in the center */}
        <div className="flex-1 flex justify-center">
          <Menu setActive={setActive} darkMode={true}>
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

        {/* Placeholder for right side balance */}
        <div className="w-40"></div>
      </div>
    </div>
  );
}

export { HoveredLink };
