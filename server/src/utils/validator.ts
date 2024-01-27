export const isValidEmail = (email: string): boolean => {
	const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

export const isValidString = (value: any): boolean => {
	const specialCharacter: RegExp = /[!~*|\":<>[\]{}`\\()';@&$+-]/;

	if (typeof value !== "string") {
		return false;
	} else if (value.toString().trim() === "") {
		return false;
	} else if (specialCharacter.test(value)) {
		return false;
	}
	return true;
};
