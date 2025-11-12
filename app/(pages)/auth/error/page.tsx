"use client";

import { Suspense } from "react";
import ErrorContent from "@/app/components/ErrorContent";

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorContent />
    </Suspense>
  );
}