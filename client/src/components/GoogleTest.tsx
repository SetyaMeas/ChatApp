import {
	GoogleLogin,
	GoogleOAuthProvider,
	useGoogleLogin,
} from "@react-oauth/google";
import { useRef } from "react";

const clientId: string = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;
const api: string = import.meta.env.VITE_API as string;
async function fetchData(formData: object) {
	try {
		await fetch(`${api}/auth/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});
	} catch (error) {
		alert("error");
	}
}

const login = () =>
	useGoogleLogin({
		onSuccess: async (credentialResponse) => {
			alert("hi");
		},
	});

const GoogleTest = () => {
	return (
		<>
			<GoogleOAuthProvider clientId={clientId}>
				{/* <GoogleLogin
					onSuccess={async (credentialResponse) => {
						const jwtToken = credentialResponse.credential;
						// await fetchData({ token: jwtToken });
					}}
					onError={() => {
						alert("Login Failed");
					}}
				/> */}
				<CustomLoginButton />
			</GoogleOAuthProvider>
		</>
	);
};
export default GoogleTest;

function CustomLoginButton() {
	const googleLogin = useGoogleLogin({
		onSuccess: (tokenResponse) => {
			console.log("Google login successful", tokenResponse);

			// You can now use the tokenResponse to authenticate the user in your app
		},

		onError: () => {
			console.error("Google login failed");

			// Handle login errors here
		},

		flow: "auth-code", // Use 'auth-code' for the authorization code flow
	});

	return <button onClick={() => googleLogin()}>Sign in with Google 🚀</button>;
}
