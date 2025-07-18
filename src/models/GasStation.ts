import { Optional } from "@/utils/optional-type";

// Função para gerar UUID no browser
function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback para browsers mais antigos
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export type GasStationProps = {
  id: string;
  name: string;
  email: string;

  address: {
    route: string;
    street_number: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
    placeId: string;
    formatted: string;
    coordinates: [number, number];
  };

  filialNumber: string;
  phone: string;
  mobile: string;
  whatsapp: string;
  comercialHours: string;
  holidaysHours: string;

  location: {
    type: "Point";
    coordinates: [number, number];
  };

  images: string[];

  conveniences: string[];
  oilChanges: string[];
  services: string[];
  brands: string[];
  apps: string[];

  createdAt: Date;
  updatedAt: Date;
}

export type GasStationDTO = Omit<GasStationProps, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

type Props = Omit<
  Optional<GasStationProps, "id" | "createdAt" | "updatedAt">,
  "location"
>;

export class GasStationModel {
  private props: GasStationProps;

  private constructor(props: GasStationProps) {
    this.props = props
  }

  static create(data: Props): GasStationModel {
    const now = new Date();
    return new GasStationModel({
      ...data,
      id: data.id || generateUUID(),
      location: {
        type: "Point",
        // Manter consistência: coordinates já está em [lng, lat]
        coordinates: data.address.coordinates
      },
      createdAt: data.createdAt || now,
      updatedAt: data.updatedAt || now,
    });
  }

  set images(urls: string[]) {
    this.props.images = urls;
  }
  
  set _id(id: string) {
    this.props.id = id;
  }

  get id() { return this.props.id; }
  get name(): string { return this.props.name; }
  get email(): string { return this.props.email; }
  get address(): GasStationProps['address'] { return { ...this.props.address }; }
  get filialNumber(): string { return this.props.filialNumber; }
  get phone(): string { return this.props.phone; }
  get mobile(): string { return this.props.mobile; }
  get whatsapp(): string { return this.props.whatsapp; }
  get comercialHours(): string { return this.props.comercialHours; }
  get holidaysHours(): string { return this.props.holidaysHours; }
  get location(): GasStationProps['location'] { return { ...this.props.location }; }

  get images(): string[] { return [...this.props.images]; }

  get apps(): string[] { return [...this.props.apps]; }
  get services(): string[] { return [...this.props.services]; }
  get brands(): string[] { return [...this.props.brands]; }
  get oilChanges(): string[] { return [...this.props.oilChanges]; }
  get conveniences(): string[] { return [...this.props.conveniences]; }

  get createdAt(): Date { return new Date(this.props.createdAt);}
  get updatedAt(): Date { return new Date(this.props.updatedAt); }

  toJson(): any {
    return {
      id: this.props.id,
      name: this.props.name,
      email: this.props.email,
      address: { ...this.props.address },
      filial_number: this.props.filialNumber,
      phone: this.props.phone,
      mobile: this.props.mobile,
      whatsapp: this.props.whatsapp,
      comercial_hours: this.props.comercialHours,
      holidays_hours: this.props.holidaysHours,
      apps: this.props.apps,
      services: this.props.services,
      brands: this.props.brands,
      conveniences: this.props.conveniences,
      oil_changes: this.props.oilChanges,
      // Para PostGIS - formato correto: POINT(longitude latitude)
      location: `POINT(${this.props.address.coordinates[0]} ${this.props.address.coordinates[1]})`,
      images: this.props.images,
      created_at: this.props.createdAt.toISOString(),
      updated_at: this.props.updatedAt.toISOString(),
    };
  }
}
