import { veterinariaAPI } from "@/helpers/api/veterinariaAPI";
import { CrearFinca } from "../interfaces/crear-finca.interface";

export const CreateFinca = async (data: CrearFinca) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/fincas-ganadero`;

  const response = await veterinariaAPI.post(url, data);
  return response;
};
