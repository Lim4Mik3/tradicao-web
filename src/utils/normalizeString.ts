// Remove acentuação e transforma em minúsculo
export function normalizeString(str: string): string {
  return str
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();
}
