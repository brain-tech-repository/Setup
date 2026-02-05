/**
 * Set a value in localStorage
 */
export const setLocal = (name: string, value: any): void => {
	localStorage.setItem(name, JSON.stringify(value));
};

/**
 * Get a value from localStorage
 */
export const getLocal = <T = any>(name: string): T | undefined => {
	const item = localStorage.getItem(name);
	return item ? (JSON.parse(item) as T) : undefined;
};

/**
 * Remove a specific key from localStorage
 */
export const removeLocal = (name: string): void => {
	localStorage.removeItem(name);
};

/**
 * Clear all localStorage items
 */
export const clearAllLocal = (): void => {
	localStorage.clear();
};
