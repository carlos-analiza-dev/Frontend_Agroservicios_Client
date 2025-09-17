"use client";
import { useEffect } from "react";

import { FullScreenLoader } from "@/components/generics/FullScreenLoader";
import { useAuthStore } from "./store/useAuthStore";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { status, checkStatus, token, cliente, hasHydrated } = useAuthStore();

  useEffect(() => {
    if (!hasHydrated) return;

    if (token && cliente) return;

    checkStatus();
  }, [checkStatus, token, cliente, hasHydrated]);

  if (!hasHydrated || status === "checking") {
    return <FullScreenLoader />;
  }

  return <>{children}</>;
}
