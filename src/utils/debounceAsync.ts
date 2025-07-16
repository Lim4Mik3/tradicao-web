// filepath: /home/lim4-mik3/rede-tradicao/postos-tradicao/src/utils/debounce.ts

/**
 * Função debounce otimizada para uso com AsyncSelect
 * @param func Função que retorna uma Promise
 * @param delay Delay em milissegundos
 * @returns Função debounced que retorna Promise
 */
export function debounceAsync<T extends any[], R>(
  func: (...args: T) => Promise<R>,
  delay: number
): (...args: T) => Promise<R> {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: T): Promise<R> => {
    clearTimeout(timeoutId);
    
    return new Promise((resolve, reject) => {
      timeoutId = setTimeout(async () => {
        try {
          const result = await func(...args);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  };
}
