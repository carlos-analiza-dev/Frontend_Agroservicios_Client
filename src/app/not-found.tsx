"use client";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/providers/store/useAuthStore";
import { useRouter } from "next/navigation";
import React from "react";

const PageNotFound = () => {
  const { cliente, token } = useAuthStore();
  const router = useRouter();

  const handleNotFound = () => {
    if (cliente?.isActive && token) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center px-6">
        <h1 className="text-9xl font-extrabold text-gray-700 dark:text-gray-200">
          404
        </h1>
        <p className="text-2xl md:text-3xl font-semibold text-gray-600 dark:text-gray-400 mt-4">
          Oops! Página no encontrada.
        </p>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Lo sentimos, la página que buscas no existe o fue movida.
        </p>

        <Button
          onClick={handleNotFound}
          className="mt-6 inline-block px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-md transition"
        >
          {cliente?.isActive && token ? "Volver" : "Volver al inicio"}
        </Button>
      </div>
    </div>
  );
};

export default PageNotFound;
