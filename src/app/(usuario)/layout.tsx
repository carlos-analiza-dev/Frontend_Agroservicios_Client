"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/providers/store/useAuthStore";
import { toast } from "react-toastify";
import SidebarAdmin from "@/components/generics/SidebarAdmin";
import ShetContentComp from "@/components/generics/ShetContentComp";
import NavBar from "@/components/generics/NavBar";
import { FullScreenLoader } from "@/components/generics/FullScreenLoader";
import { useFavoritos } from "@/hooks/favoritos/useFavoritos";
import { useCartStore } from "@/providers/store/useCartStore";
import { isTokenExpired } from "@/helpers/funciones/tokenExpired";
import { SessionExpiredModal } from "@/components/generics/SessionExpiredModal";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { logout, cliente, token } = useAuthStore();
  const { limpiarFavoritos } = useFavoritos();
  const { clearCart } = useCartStore();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);

  const handleLogout = async () => {
    try {
      setMobileSidebarOpen(false);
      setLoading(true);

      await logout();
      limpiarFavoritos();
      clearCart();
      router.push("/");

      toast.success("Sesión cerrada correctamente");
    } catch (error) {
      toast.error("Ocurrió un error al cerrar la sesión");
    } finally {
      setLoading(false);
    }
  };

  const checkTokenExpiration = () => {
    if (token && isTokenExpired(token)) {
      setShowSessionModal(true);
      return true;
    }
    return false;
  };

  const handleSessionExpired = async () => {
    setShowSessionModal(false);
    setLoading(true);

    try {
      await logout();
      toast.info("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
      router.push("/");
    } catch (error) {
      toast.error("Error al cerrar sesión expirada");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      if (!token) {
        toast.warning("Por favor, inicia sesión para continuar.");
        router.push("/");
        return;
      }

      if (checkTokenExpiration()) {
        return;
      }
    };

    checkUser();
  }, [cliente, logout, router]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (token) {
        checkTokenExpiration();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [token]);

  useEffect(() => {
    if (token) {
      checkTokenExpiration();
    }
  }, [token]);

  if (loading) {
    return <FullScreenLoader />;
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <SidebarAdmin handleLogout={handleLogout} />

      <ShetContentComp
        setMobileSidebarOpen={setMobileSidebarOpen}
        handleLogout={handleLogout}
        mobileSidebarOpen={mobileSidebarOpen}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <NavBar
          setMobileSidebarOpen={setMobileSidebarOpen}
          handleLogout={handleLogout}
        />

        <main className="flex-1 overflow-y-auto bg-gray-50 md:p-6">
          <div className="h-full">{children}</div>
        </main>
      </div>

      <SessionExpiredModal
        isOpen={showSessionModal}
        onClose={handleSessionExpired}
      />
    </div>
  );
}
