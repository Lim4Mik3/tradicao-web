export interface AddressApiResponse {
  description: string;
  main_text: string;
  secondary_text: string;
  place_id: string;
  location: {
    lat: number;
    lng: number;
  };
}

export interface AddressOption {
  label: string;
  value: string;
}

const ADDRESS_API_URL = 'https://womxpc6qt2kswpfzrozzon6kzq0qvums.lambda-url.us-east-1.on.aws/';

export class AddressService {
  static async searchAddresses(inputValue: string): Promise<AddressOption[]> {
    if (!inputValue || inputValue.length < 3) {
      return [];
    }

    try {
      const encodedInput = encodeURIComponent(inputValue.replace(/\s+/g, '+'));
      const response = await fetch(`${ADDRESS_API_URL}?input=${encodedInput}`);

      if (!response.ok) {
        return [];
      }

      const data: AddressApiResponse[] = await response.json();
      
      if (!Array.isArray(data)) {
        return [];
      }

      return data.map((item) => ({
        label: item.description,
        value: item
      }));
    } catch (error) {
      return [];
    }
  }
}
