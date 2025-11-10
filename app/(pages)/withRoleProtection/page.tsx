"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function withRoleProtection(
  WrappedComponent: React.ComponentType,
  allowedRoles: string[],
  redirectPath: string = "/unauthorized"
) {
  return function RoleProtectedComponent(props: any) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "loading") return;

      if (!session) {
        router.push("/auth/signin");
        return;
      }

      const userRole = session.user?.role;
      
      if (!userRole || !allowedRoles.includes(userRole)) {
        router.push(redirectPath);
        return;
      }
    }, [session, status, router]);

    if (status === "loading") {
      return (
        <div className="w-full bg-white min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
            <p className="mt-4 text-gray-600">Checking permissions...</p>
          </div>
        </div>
      );
    }

    if (!session) {
      return null; // Will redirect in useEffect
    }

    const userRole = session.user?.role;
    if (!userRole || !allowedRoles.includes(userRole)) {
      return null; // Will redirect in useEffect
    }

    return <WrappedComponent {...props} />;
  };
}