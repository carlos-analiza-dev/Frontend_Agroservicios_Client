import {
  CalidadHuevo,
  TipoProduccionGanadera,
  UnidadProduccionLeche,
} from "./crear-produccion-finca.interface";

export interface ProduccionGanaderaInterface {
  produccionFincaId?: string;
  tiposProduccion?: TipoProduccionGanadera[];

  produccionLecheCantidad?: number;
  produccionLecheUnidad?: UnidadProduccionLeche;
  vacasOrdeño?: number;
  vacasSecas?: number;
  terneros?: number;
  fechaPromedioSecado?: string;

  cabezasEngordeBovino?: number;
  kilosSacrificioBovino?: number;

  cerdosEngorde?: number;
  pesoPromedioCerdo?: number;
  edadSacrificioPorcino?: string;

  mortalidadLoteAves?: number;

  huevosPorDia?: number;
  gallinasPonedoras?: number;
  calidadHuevo?: CalidadHuevo;

  animalesEngordeCaprino?: number;
  pesoPromedioCaprino?: number;
  edadSacrificioCaprino?: string;

  animalesDisponibles?: number;
  pesoPromedioCabeza?: number;

  otroProductoNombre?: string;
  otroProductoUnidadMedida?: string;
  otroProductoProduccionMensual?: number;
}
