import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

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

const GoogleTest = () => {
	return (
		<GoogleOAuthProvider clientId={clientId}>
			<GoogleLogin
				onSuccess={async (credentialResponse) => {
					const jwtToken = credentialResponse.credential;
					await fetchData({ token: jwtToken });
				}}
				onError={() => {
					alert("Login Failed");
				}}
			/>
		</GoogleOAuthProvider>
	);
};

export default GoogleTest;
