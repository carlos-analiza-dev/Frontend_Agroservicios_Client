import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { navItems } from "@/helpers/data/sidebarData";

interface Props {
  setMobileSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => Promise<void>;
  mobileSidebarOpen: boolean;
}

const SheetContentComp = ({
  setMobileSidebarOpen,
  handleLogout,
  mobileSidebarOpen,
}: Props) => {
  const pathname = usePathname();

  return (
    <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
      <SheetContent side="left" className="w-64 p-0">
        <SheetHeader className="border-b border-gray-200">
          <div className="flex h-16 items-center justify-between px-6">
            <SheetTitle className="text-xl font-bold text-gray-900">
              Agroservicios
            </SheetTitle>
          </div>
        </SheetHeader>

        <div className="flex flex-1 flex-col overflow-y-auto">
          <nav className="flex-1 space-y-1 px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileSidebarOpen(false)}
                className={`flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="p-4">
            <Separator className="my-4" />
            <button
              onClick={handleLogout}
              className="flex w-full items-center rounded-lg px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Cerrar sesión
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SheetContentComp;
