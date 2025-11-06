import { ProduccionGanadera } from "@/api/produccion/interface/crear-produccion-finca.interface";
import { ProduccionGanaderaInterface } from "@/api/produccion/interface/crear-produccion-ganadera.interface";
import { Ganadera } from "@/api/produccion/interface/obter-producciones-userId.interface";

export function mapGanaderaToProduccionGanaderaInterface(
  ganadera: Ganadera
): ProduccionGanaderaInterface {
  const nullToUndefined = (
    value: number | null | undefined
  ): number | undefined => (value === null ? undefined : value);

  const stringNullToUndefined = (
    value: string | null | undefined
  ): string | undefined => (value === null ? undefined : value);

  return {
    tiposProduccion: ganadera.tiposProduccion,
    produccionLecheCantidad: nullToUndefined(ganadera.produccionLecheCantidad),
    produccionLecheUnidad: ganadera.produccionLecheUnidad || undefined,
    vacasOrdeño: nullToUndefined(ganadera.vacasOrdeño),
    vacasSecas: nullToUndefined(ganadera.vacasSecas),
    terneros: nullToUndefined(ganadera.terneros),
    fechaPromedioSecado: stringNullToUndefined(ganadera.fechaPromedioSecado),
    cabezasEngordeBovino: nullToUndefined(ganadera.cabezasEngordeBovino),
    kilosSacrificioBovino: ganadera.kilosSacrificioBovino
      ? Number(ganadera.kilosSacrificioBovino)
      : undefined,
    cerdosEngorde: nullToUndefined(ganadera.cerdosEngorde),
    pesoPromedioCerdo: nullToUndefined(ganadera.pesoPromedioCerdo),
    edadSacrificioPorcino: stringNullToUndefined(
      ganadera.edadSacrificioCaprino?.toString()
    ),
    mortalidadLoteAves: nullToUndefined(ganadera.mortalidadLoteAves),
    huevosPorDia: nullToUndefined(ganadera.huevosPorDia),
    gallinasPonedoras: nullToUndefined(ganadera.gallinasPonedoras),
    calidadHuevo: ganadera.calidadHuevo || undefined,
    animalesEngordeCaprino: nullToUndefined(ganadera.animalesEngordeCaprino),
    pesoPromedioCaprino: nullToUndefined(ganadera.pesoPromedioCaprino),
    edadSacrificioCaprino: stringNullToUndefined(
      ganadera.edadSacrificioCaprino?.toString()
    ),
    animalesDisponibles: nullToUndefined(ganadera.animalesDisponibles),
    pesoPromedioCabeza: nullToUndefined(ganadera.pesoPromedioCabeza),
    otroProductoNombre: ganadera.otroProductoNombre || undefined,
    otroProductoUnidadMedida: ganadera.otroProductoUnidadMedida || undefined,
    otroProductoProduccionMensual: ganadera.otroProductoProduccionMensual
      ? Number(ganadera.otroProductoProduccionMensual)
      : undefined,
  };
}
