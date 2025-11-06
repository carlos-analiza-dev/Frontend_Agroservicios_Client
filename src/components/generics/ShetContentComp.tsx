"use client";

import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { navItems } from "@/helpers/data/sidebarData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

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

        <div className="flex flex-1 flex-col overflow-y-auto px-2 py-4">
          <Accordion type="multiple" className="space-y-2">
            {navItems.map((section) => (
              <AccordionItem key={section.category} value={section.category}>
                <AccordionTrigger>{section.category}</AccordionTrigger>
                <AccordionContent className="space-y-1 mt-1 pl-2">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileSidebarOpen(false)}
                        className={`flex items-center rounded-lg px-3 py-2 text-sm transition-colors ${
                          isActive
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.name}
                      </Link>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-auto p-4 border-t border-gray-100">
            <Separator className="my-4" />
            <button
              onClick={handleLogout}
              className="flex w-full items-center rounded-lg px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
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
