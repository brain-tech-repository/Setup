

/**
 * Get a value from localStorage
 */
export const setLocal = (name: string, value: any): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(name, JSON.stringify(value));
  }
};

export const getLocal = <T = any>(name: string): T | undefined => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(name);
    return item ? (JSON.parse(item) as T) : undefined;
  }
  return undefined; // SSR पर undefined
};

export const removeLocal = (name: string): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(name);
  }
};

export const clearAllLocal = (): void => {
  if (typeof window !== "undefined") {
    localStorage.clear();
  }
};
