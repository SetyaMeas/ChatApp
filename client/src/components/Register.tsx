import { FormEvent, useRef } from "react";
import Cookies from "js-cookie";
import { setCookie } from "../utils/cookies";

// interface UserInfo {
// 	email: string;
// 	email_verified: boolean;
// 	family_name: string;
// 	given_name: string;
// 	locale: string;
// 	name: string;
// 	picture: string;
// 	sub: string;
// }

const Register = () => {
	const api: string = import.meta.env.VITE_API as string;

	const pwd = useRef<HTMLInputElement>(null);
	const username = useRef<HTMLInputElement>(null);

	async function handleSubmit(e: FormEvent): Promise<void> {
		e.preventDefault();

		const pwdValue: string = pwd.current?.value as string | "";
		const usernameValue: string = username.current?.value as string | "";

		if (usernameValue.trim().length < 6) {
			alert("username must be more than 6 letters");
			return;
		} else if (pwdValue.trim().length < 6) {
			alert("password must be more than 6 letters");
			return;
		}

		const email: string | undefined = Cookies.get("email");
		if (email) {
			const formData = {
				email: email,
				pwd: pwdValue,
				username: usernameValue,
			};

			try {
				const res = await fetch(`${api}/auth/register`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				});

				if (res.status === 200) {
					interface Data {
						user: {
							userId: number;
							username: string;
							email: string;
							pwd: string;
						};
						token: string;
					}
					const data: Data = await res.json();
					console.log(data);

					setCookie("token", data.token);
				} else {
					if (res.status === 400) {
						interface Data {
							msg: string;
						}
						const data: Data = await res.json();
						alert(data.msg);
					} else if (res.status >= 500) {
						alert("Something went wrong");
					}
				}
			} catch (error) {
				alert("Something went wrong");
			}
		} else {
			window.location.pathname = "/auth";
		}
	}
	return (
		<>
			<form
				onSubmit={(event: FormEvent) => handleSubmit(event)}
				className="flex flex-col items-center gap-[15px] w-[300px] py-[18px] border-2 border-black"
			>
				<input
					className="w-[90%] px-[6px] py-[3px] text-[18px] border-[2px] border-black rounded-md outline-none"
					ref={username}
					type="text"
					placeholder="Enter username"
				/>
				<input
					className="w-[90%] px-[6px] py-[3px] text-[18px] border-[2px] border-black rounded-md outline-none"
					ref={pwd}
					type="password"
					placeholder="Enter password"
				/>

				<button className="w-[90%] px-[15px] h-[36px] bg-[#0835fe] text-[white] text-[18px] rounded-sm hover:opacity-90">
					register
				</button>

				<p>
					already have account? &#183;{" "}
					<a href="login" className="text-[blue]">
						Login
					</a>
				</p>
			</form>
		</>
	);
};

export default Register;
