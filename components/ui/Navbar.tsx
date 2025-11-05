// "use client";
// import React from "react";
// import { motion } from "framer-motion";
// import { cn } from "@/lib/utils";

// const transition = {
//   type: "spring" as const,
//   mass: 0.5,
//   damping: 11.5,
//   stiffness: 100,
//   restDelta: 0.001,
//   restSpeed: 0.001,
// };

// export const MenuItem = ({
//   setActive,
//   active,
//   item,
//   children,
// }: {
//   setActive: (item: string) => void;
//   active: string | null;
//   item: string;
//   children?: React.ReactNode;
// }) => {
//   return (
//     <div onMouseEnter={() => setActive(item)} className="relative">
//       <motion.p
//         transition={{ duration: 0.3 }}
//         className="cursor-pointer text-black hover:opacity-[0.9] font-medium"
//       >
//         {item}
//       </motion.p>
//       {active !== null && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.85, y: 10 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           transition={transition}
//         >
//           {active === item && (
//             <div className="absolute top-[calc(100%+1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
//               <motion.div
//                 transition={transition}
//                 layoutId="active"
//                 className="backdrop-blur-sm rounded-2xl overflow-hidden border border-black/20 shadow-xl"
//               >
//                 <motion.div
//                   layout
//                   className="w-max h-full p-4"
//                 >
//                   {children}
//                 </motion.div>
//               </motion.div>
//             </div>
//           )}
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export const Menu = ({
//   setActive,
//   children,
// }: {
//   setActive: (item: string | null) => void;
//   children: React.ReactNode;
// }) => {
//   return (
//     <nav
//       onMouseLeave={() => setActive(null)}
//       className="relative rounded-full border border-transparent bg-white shadow-input flex justify-center space-x-4 px-8 py-6"
//     >
//       {children}
//     </nav>
//   );
// };

// export const ProductItem = ({
//   title,
//   description,
//   href,
//   src,
// }: {
//   title: string;
//   description: string;
//   href: string;
//   src: string;
// }) => {
//   return (
//     <a href={href} className="flex space-x-2">
//       <img
//         src={src}
//         width={140}
//         height={70}
//         alt={title}
//         className="shrink-0 rounded-md shadow-2xl"
//       />
//       <div>
//         <h4 className="text-xl font-bold mb-1 text-black">
//           {title}
//         </h4>
//         <p className="text-neutral-700 text-sm max-w-40">
//           {description}
//         </p>
//       </div>
//     </a>
//   );
// };

// export const HoveredLink = ({ children, ...rest }: any) => {
//   return (
//     <a
//       {...rest}
//       className="text-neutral-700 hover:text-black transition-colors"
//     >
//       {children}
//     </a>
//   );
// }; 




// "use client";
// import React from "react";
// import { motion } from "framer-motion";
// import { cn } from "@/lib/utils";

// const transition = {
//   type: "spring" as const,
//   mass: 0.5,
//   damping: 11.5,
//   stiffness: 100,
//   restDelta: 0.001,
//   restSpeed: 0.001,
// };

// export const MenuItem = ({
//   setActive,
//   active,
//   item,
//   children,
//   isScrolled,
// }: {
//   setActive: (item: string) => void;
//   active: string | null;
//   item: string;
//   children?: React.ReactNode;
//   isScrolled?: boolean;
// }) => {
//   return (
//     <div onMouseEnter={() => setActive(item)} className="relative">
//       <motion.p
//         transition={{ duration: 0.3 }}
//         className={cn(
//           "cursor-pointer hover:opacity-[0.9] font-medium transition-colors duration-300",
//           isScrolled ? "text-black" : "text-white"
//         )}
//       >
//         {item}
//       </motion.p>
//       {active !== null && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.85, y: 10 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           transition={transition}
//         >
//           {active === item && (
//             <div className="absolute top-[calc(100%+1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
//               <motion.div
//                 transition={transition}
//                 layoutId="active"
//                 className="bg-white backdrop-blur-sm rounded-2xl overflow-hidden border border-black/20 shadow-xl"
//               >
//                 <motion.div
//                   layout
//                   className="w-max h-full p-4"
//                 >
//                   {children}
//                 </motion.div>
//               </motion.div>
//             </div>
//           )}
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export const Menu = ({
//   setActive,
//   children,
//   isScrolled,
// }: {
//   setActive: (item: string | null) => void;
//   children: React.ReactNode;
//   isScrolled?: boolean;
// }) => {
//   return (
//     <nav
//       onMouseLeave={() => setActive(null)}
//       className={cn(
//         "relative rounded-full border border-transparent shadow-input flex justify-center space-x-4 px-8 py-6 transition-all duration-300",
//         isScrolled 
//           ? "bg-white/80 backdrop-blur-sm" 
//           : "bg-black/20 backdrop-blur-sm"
//       )}
//     >
//       {children}
//     </nav>
//   );
// };

// export const ProductItem = ({
//   title,
//   description,
//   href,
//   src,
// }: {
//   title: string;
//   description: string;
//   href: string;
//   src: string;
// }) => {
//   return (
//     <a href={href} className="flex space-x-2">
//       <img
//         src={src}
//         width={140}
//         height={70}
//         alt={title}
//         className="shrink-0 rounded-md shadow-2xl"
//       />
//       <div>
//         <h4 className="text-xl font-bold mb-1 text-black">
//           {title}
//         </h4>
//         <p className="text-neutral-700 text-sm max-w-40">
//           {description}
//         </p>
//       </div>
//     </a>
//   );
// };

// export const HoveredLink = ({ children, ...rest }: any) => {
//   return (
//     <a
//       {...rest}
//       className="text-neutral-700 hover:text-black transition-colors"
//     >
//       {children}
//     </a>
//   );
// };   



"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-white hover:opacity-80 font-medium"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%+1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-black/70 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-xl"
              >
                <motion.div layout className="w-max h-full p-4 text-white">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
  darkMode,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
  darkMode?: boolean;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className={cn(
        "relative rounded-full border shadow-input flex justify-center space-x-4 px-8 py-6 transition-all duration-500 backdrop-blur-md",
        darkMode
          ? "bg-black/70 border-white/10 text-white"
          : "bg-white border-transparent text-black"
      )}
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <a href={href} className="flex space-x-2">
      <img
        src={src}
        width={140}
        height={70}
        alt={title}
        className="shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-white">{title}</h4>
        <p className="text-neutral-300 text-sm max-w-40">{description}</p>
      </div>
    </a>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <a
      {...rest}
      className="text-white hover:text-white transition-colors"
    >
      {children}
    </a>
  );
};
