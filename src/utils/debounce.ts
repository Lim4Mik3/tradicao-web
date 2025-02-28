export function debounce(func: (...args: any) => any, delay: number) {
  let timeoutId: NodeJS.Timeout;

  return (...args: any) => {
    clearTimeout(timeoutId);

    return new Promise((resolve) => {
      timeoutId = setTimeout(() => {
        resolve(func(...args));
      }, delay);
    });
  };
}