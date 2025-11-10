"use client";
import useGetTotalAnimales from "@/hooks/dashboard/useGetTotalAnimales";
import useGetTotalFincas from "@/hooks/dashboard/useGetTotalFincas";
import CardTotales from "./ui/CardTotales";
import useGetTotalCitasCompletadas from "@/hooks/dashboard/useGetTotalCitasCompletadas";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProduccionGanadera from "./ui/ProduccionGanadera";

const PanelPageGanadero = () => {
  const { data: total_animales } = useGetTotalAnimales();
  const { data: total_fincas } = useGetTotalFincas();
  const { data: citas_completadas } = useGetTotalCitasCompletadas();

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Panel Ganadero
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <CardTotales
          titulo="Total de Animales Registrados"
          total={total_animales || 0}
          sub_titulo="Animales en total"
        />
        <CardTotales
          titulo="Total de Fincas"
          total={total_fincas || 0}
          sub_titulo="Fincas en total"
        />
        <CardTotales
          titulo="Total de Citas Completadas"
          total={citas_completadas || 0}
          sub_titulo="Citas en total"
        />
      </div>

      <div className="w-full">
        <Tabs defaultValue="ganaderia" className="w-full">
          <TabsList className="grid grid-cols-1 sm:grid-cols-3 w-full gap-2 mb-20 md:mb-8">
            <TabsTrigger value="ganaderia" className="text-sm sm:text-base">
              Ganadería
            </TabsTrigger>
            <TabsTrigger value="agricola" className="text-sm sm:text-base">
              Agrícola
            </TabsTrigger>
            <TabsTrigger value="opcion3" className="text-sm sm:text-base">
              Opción 3
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ganaderia">
            <ProduccionGanadera />
          </TabsContent>

          <TabsContent value="agricola">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl font-semibold">
                  Agrícola
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Change your password here. After saving, you&apos;ll be logged
                  out.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-current">Current password</Label>
                  <Input id="tabs-demo-current" type="password" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-new">New password</Label>
                  <Input id="tabs-demo-new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full sm:w-auto">Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="opcion3">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl font-semibold">
                  Opción 3
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Configura aquí los datos adicionales del sistema.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-extra">Extra setting</Label>
                  <Input id="tabs-demo-extra" placeholder="..." />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full sm:w-auto">Guardar</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PanelPageGanadero;
