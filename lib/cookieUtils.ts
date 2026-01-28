import Cookies, { type CookieSetOptions } from "universal-cookie";

const cookies = new Cookies();

/**
 * Set a cookie
 */
export const setCookie = (
	name: string,
	value: any,
	options: CookieSetOptions = { path: "/" },
): void => {
	cookies.set(name, value, options);
};

/**
 * Get a cookie
 */
export const getCookie = <T = any>(name: string): T | undefined => {
	return cookies.get(name);
};

/**
 * Remove a cookie
 */
export const removeCookie = (
	name: string,
	options: CookieSetOptions = { path: "/" },
): void => {
	cookies.remove(name, options);
};

/**
 * Clear all cookies
 */
export const clearAllCookies = (): void => {
	const allCookies = cookies.getAll();
	Object.keys(allCookies).forEach((cookieName) => {
		cookies.remove(cookieName, { path: "/" });
	});
};
