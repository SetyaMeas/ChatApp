import Cookies from "js-cookie";

export function setCookie(key: string, value: any): void {
	const expirationTime: Date = new Date(new Date().getTime() + 120000); // 120 seconds
	Cookies.set(key, value, { expires: expirationTime });
}

export function removeCookie(key: string) {
	Cookies.remove(key);
}
