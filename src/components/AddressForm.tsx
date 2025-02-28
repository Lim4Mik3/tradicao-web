import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "./Input";
import { useGetAddressByCep } from "@/hooks/useGetAddressByCep";
import { cn } from "@/lib/utils";

type AddressStructure = {
  cep: string;
  address: string;
  state: string;
  city: string;
  number: string;
  neighborhood: string;
};

const regex = /^(\d{5})(\d{3})$/;

export function AddressForm() {
  const [address, setAddress] = useState<AddressStructure>({
    cep: "",
    address: "",
    state: "",
    city: "",
    number: "",
    neighborhood: "",
  });

  const cep = useGetAddressByCep({ cep: address.cep });

  useEffect(() => {
    if (cep.data && cep.data.data) {
      const address = cep.data.data;

      setAddress((prev) => ({
        ...prev,
        address: address.logradouro,
        city: address.localidade,
        neighborhood: address.bairro,
        state: address.estado || address.uf,
      }))
    }
  }, [cep.data])

  const handleChangeCEP = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    let cleanValue = value.replace(/\D/g, "");

    if (cleanValue.length > 8) {
      cleanValue = cleanValue.slice(0, 8);
    }

    let formattedValue = cleanValue;
    const match = cleanValue.match(regex);
    if (match) {
      formattedValue = `${match[1]}-${match[2]}`;
    }

    setAddress(prev => ({ ...prev, cep: formattedValue }));
  };

  const hasAllInformations = 
    address.address &&
    address.city &&
    address.state

  return (
    <div>
      <Input
        title="CEP da unidade"
        placeholder="Digite o CEP"
        onChange={handleChangeCEP}
        value={address.cep || ""}
        isLoading={cep.isFetching}
      />

      <div
        className="grid mt-4 grid-cols-2 gap-4"
      >
        <Input
          title="Endereço"
          placeholder="Digite seu endereço"
          value={address.address}
          readOnly
        />
        <Input
          title="Cidade"
          placeholder="Digite sua cidade"
          value={address.city}
          readOnly
        />
        <Input
          title="Bairro"
          placeholder="Digite seu bairro"
          value={address.neighborhood}
          readOnly
        />
        <Input
          title="Estado"
          placeholder="Digite seu estado"
          value={address.state}
          readOnly
        />
      </div>
    </div>
  );
}