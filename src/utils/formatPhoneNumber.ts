// Formata um número de telefone brasileiro para o padrão (XX) XXXXX-XXXX
export function formatPhoneNumber(phone: string | number): string {
  const digits = String(phone).replace(/\D/g, "");
  if (digits.length === 11) {
    // Celular: (XX) 9XXXX-XXXX
    return `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7,11)}`;
  } else if (digits.length === 10) {
    // Fixo: (XX) XXXX-XXXX
    return `(${digits.slice(0,2)}) ${digits.slice(2,6)}-${digits.slice(6,10)}`;
  }
  // Retorna o original se não bater o padrão
  return phone.toString();
}
