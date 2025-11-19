"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [checkingPermissions, setCheckingPermissions] = useState(true);

  // Obtener las URLs a las que el cliente tiene permiso de "ver"
  const permisosVer =
    cliente?.clientePermisos
      ?.filter((permiso) => permiso.ver === true)
      ?.map((permiso) => permiso.permiso.url) || [];

  // Verificar si la ruta actual tiene permisos
  const hasPermissionForCurrentRoute = () => {
    // Si no hay cliente cargado aún, esperar
    if (!cliente) return true;

    // Rutas que siempre están permitidas para todos los usuarios
    const allowedRoutes = [
      "/not-found",
      "/unauthorized",
      "/panel", // <- Agregar /panel aquí
    ];

    // Si la ruta actual está en las rutas permitidas, no redirigir
    if (allowedRoutes.includes(pathname)) {
      return true;
    }

    // Verificar si la ruta actual está en los permisos del cliente
    return permisosVer.includes(pathname);
  };

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

  // Efecto para verificar permisos de la ruta actual
  useEffect(() => {
    const checkRoutePermissions = () => {
      // Solo verificar si ya tenemos los datos del cliente
      if (cliente) {
        if (!hasPermissionForCurrentRoute()) {
          router.push("/not-found");
        }
        setCheckingPermissions(false);
      }
    };

    checkRoutePermissions();
  }, [cliente, pathname, router]);

  // Mostrar loader mientras verificamos permisos
  if (loading || checkingPermissions) {
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
