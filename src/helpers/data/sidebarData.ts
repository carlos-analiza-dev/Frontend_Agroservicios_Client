import {
  BriefcaseMedical,
  Building2,
  FileText,
  FlaskConical,
  Heart,
  Layers3,
  Package,
  PackageCheck,
  PackageOpen,
  PackageXIcon,
  Pill,
  Scale,
  Shield,
  ShoppingBag,
  UserCog,
  Users,
} from "lucide-react";

export const navItems = [
  {
    category: "Actividades",
    items: [
      { name: "Servicios", href: "/servicios", icon: BriefcaseMedical },
      { name: "Productos", href: "/productos", icon: ShoppingBag },
      { name: "Citas", href: "/citas", icon: FileText },
    ],
  },
  {
    category: "Pedidos",
    items: [
      { name: "Pendientes", href: "/pedidos", icon: Package },
      { name: "Procesados", href: "/pedidos-procesados", icon: PackageCheck },
      { name: "Facturados", href: "/pedidos-facturados", icon: PackageOpen },
      { name: "Cancelados", href: "/pedidos-cancelados", icon: PackageXIcon },
    ],
  },
  {
    category: "Finca",
    items: [
      { name: "Fincas", href: "/fincas", icon: Building2 },
      { name: "Animales", href: "/animales", icon: Layers3 },
      { name: "Producción", href: "/produccion", icon: FlaskConical },
    ],
  },
  {
    category: "Salud Animal",
    items: [
      { name: "Historial Médico", href: "/historial-medico", icon: Heart },
      { name: "Vacunación", href: "/vacunacion", icon: Shield },
      { name: "Tratamientos", href: "/tratamientos", icon: Pill },
    ],
  },
  {
    category: "Cuenta",
    items: [{ name: "Perfil", href: "/perfil", icon: UserCog }],
  },
];
