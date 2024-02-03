import { useGoogleLogin } from "@react-oauth/google";
import { setCookie } from "../utils/cookies";

interface UserInfo {
	email: string;
	email_verified: boolean;
	family_name: string;
	given_name: string;
	locale: string;
	name: string;
	picture: string;
	sub: string;
}

function CustomLoginButton() {
	const googleLogin = useGoogleLogin({
		onSuccess: async (tokenResponse) => {
			const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
				method: "GET",
				headers: {
					Authorization: `Bearer ${tokenResponse.access_token}`,
				},
			});
			const userInfo: UserInfo = await res.json();

			setCookie("email", userInfo.email);
			window.location.pathname = "/auth/register";
		},
		onError: () => {
			alert("Invalid email");
		},
	});
	return (
		<button
			onClick={() => googleLogin()}
			className="w-[120px] px-[15px] h-[36px] bg-[black] text-[white] text-[18px] rounded-sm hover:opacity-90"
		>
			register
		</button>
	);
}

const GmailVerify = () => {
	return (
		<div>
			<CustomLoginButton />
		</div>
	);
};

export default GmailVerify;
