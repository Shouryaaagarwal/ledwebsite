// "use client";

// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export function withRoleProtection(
//   Component: React.ComponentType,
//   allowedRoles: string[]
// ) {
//   return function RoleProtectedComponent(props: any) {
//     const { data: session, status } = useSession();
//     const router = useRouter();

//     useEffect(() => {
//       if (status === "loading") return; // Wait for session to load

//       if (!session) {
//         // No session, redirect to login
//         router.push("/auth/login");
//         return;
//       }

//       // Debug logging
//       console.log("Session user:", session.user);
//       console.log("User role:", session.user?.role);
//       console.log("Allowed roles:", allowedRoles);

//       // Check if user has required role
//       const userRole = session.user?.role;
      
//       if (!userRole || !allowedRoles.includes(userRole)) {
//         console.log("Access denied. Role:", userRole);
//         router.push("/unauthorized"); // Or redirect to home/dashboard
//       }
//     }, [session, status, router]);

//     // Show loading while checking session
//     if (status === "loading") {
//       return (
//         <div className="flex justify-center items-center min-h-screen">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//         </div>
//       );
//     }

//     // Check role synchronously before rendering
//     const userRole = session?.user?.role;
//     if (!userRole || !allowedRoles.includes(userRole)) {
//       return null; // or a loading state, will redirect in useEffect
//     }

//     return <Component {...props} />;
//   };
// }   


"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function withRoleProtection(
  Component: React.ComponentType,
  allowedRoles: string[]
) {
  return function RoleProtectedComponent(props: any) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "loading") return;

      // Only check authentication, not roles during development
      if (!session) {
        router.push("/auth/login");
        return;
      }

      // Development logging
      console.log("Development mode - All roles allowed");
      console.log("User role:", session.user?.role);
      console.log("Requested roles:", allowedRoles);
    }, [session, status, router]);

    // Show loading while checking session
    if (status === "loading") {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    // Only check if user is logged in, not their role
    if (!session) {
      return null;
    }

    return <Component {...props} />;
  };
}