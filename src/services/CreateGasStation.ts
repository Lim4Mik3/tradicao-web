import { httpClient } from "@/infra/httpClient";

export namespace CreateGasStation {
  export type Input = {
    name: string;
    filialNumber: string;
    enabled: boolean;
    addressPlaceId: string;
    photos?: Array<{ id: string; file: File }>;
    services?: string[];
    phone: string;
    comercialHours: string;
    holidaysHours: string;
    mobile: string;
    whatsapp: string;
    email: string;
    apps?: string[];
    brands?: string[];
    conveniences?: string[];
    oilChanges?: string[];
    managerId: string;
  };

  export type Output = {
    status: string;
    data?: {
      id: string;
      name: string;
      filialNumber: string;
    };
  };
}

export async function CreateGasStation(input: CreateGasStation.Input): Promise<{
  error: string | null;
  data: CreateGasStation.Output | null;
}> {
  try {
    const formData = new FormData();
    
    // Campos simples
    formData.append("name", input.name);
    formData.append("filialNumber", input.filialNumber);
    formData.append("enabled", String(input.enabled));
    formData.append("placeId", input.addressPlaceId);
    formData.append("phone", input.phone);
    formData.append("comercialHours", input.comercialHours);
    formData.append("holidaysHours", input.holidaysHours);
    formData.append("mobile", input.mobile);
    formData.append("whatsapp", input.whatsapp);
    formData.append("email", input.email);
    formData.append("managerId", input.managerId);

    // Arrays opcionais
    if (input.photos) {
      input.photos.forEach((image) => {
        formData.append("photos", image.file);
      });
    }

    if (input.services) {
      formData.append("services", JSON.stringify(input.services));
    }
    if (input.apps) {
      formData.append("apps", JSON.stringify(input.apps));
    }
    if (input.brands) {
      formData.append("brands", JSON.stringify(input.brands));
    }
    if (input.conveniences) {
      formData.append("conveniences", JSON.stringify(input.conveniences));
    }
    if (input.oilChanges) {
      formData.append("oilChanges", JSON.stringify(input.oilChanges));
    }

    const response = await httpClient.post("/gas-station", formData);

    return { error: null, data: response.data };
  } catch (error) {
    console.error("Erro ao criar um posto de gasolina:", error);
    return { error: "Erro na requisição à API", data: null };
  }
}