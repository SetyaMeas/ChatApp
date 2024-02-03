import { FormEvent, useRef } from "react";
import Cookies from "js-cookie";
import { setCookie } from "../utils/cookies";

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
					setCookie("token", data.token);
					Cookies.remove("email");

					window.location.pathname = "/";
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
				className="flex flex-col items-center gap-[15px] w-[300px] py-[39px] apply-shadow rounded-md border-[1px] border-[#dfdfdf]"
			>
				<p className="text-[24px] font-bold text-[#444444]">
					Create an account
				</p>

				<input
					className="w-[90%] h-[36px] px-[6px] text-[15px] outline-none border-b-[2px] border-[black]"
					ref={username}
					type="text"
					placeholder="Enter username"
				/>
				<input
					className="w-[90%] h-[36px] px-[6px] text-[15px] outline-none border-b-[2px] border-[black]"
					ref={pwd}
					type="text"
					placeholder="Enter password"
				/>

				<button className="w-[90%] h-[36px] bg-[black] text-[white] text-[15px] rounded-sm hover:opacity-90">
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
