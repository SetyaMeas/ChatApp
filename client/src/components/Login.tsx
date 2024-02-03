import { FormEvent, useRef } from "react";
import { setCookie } from "../utils/cookies";

interface LoginJsonRes {
	token: string;
	user: {
		email: string;
		pwd: string;
		userId: number;
		username: string;
	};
}

const Login = () => {
	const api: string = import.meta.env.VITE_API as string;

	const email = useRef<HTMLInputElement>(null);
	const pwd = useRef<HTMLInputElement>(null);

	async function handleSubmit(event: FormEvent) {
		event.preventDefault();

		const emailValue: string = email.current?.value as string | "";
		const pwdValue: string = pwd.current?.value as string | "";
		if (!emailValue.trim() || !pwdValue.trim()) {
			alert("fields can not be empty!");
			return;
		}

		const formData = {
			email: emailValue,
			pwd: pwdValue,
		};

		try {
			const res: Response = await fetch(`${api}/auth/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (res.status === 400) {
				alert("invalid input");
				return;
			} else if (res.status === 502) {
				alert("something went wrong");
				return;
			}

			const data: LoginJsonRes = await res.json();

			setCookie("token", data.token);
			window.location.pathname = "/";
		} catch (error: any) {
			alert(error.msg);
		}
	}
	return (
		<form
			onSubmit={(event: FormEvent) => handleSubmit(event)}
			className="apply-shadow flex-justify-align-col gap-[15px] w-[300px] py-[30px] border border-[#dedede] rounded-md"
		>
			<p className="text-[24px] font-bold text-[#444444]">Login</p>
			<input
				className="w-[90%] h-[36px] px-[6px] text-[15px] outline-none border-b-[2px] border-[#0835fe]"
				type="text"
				placeholder="Enter email"
				ref={email}
			/>
			<input
				className="w-[90%] h-[36px] px-[6px] text-[15px] outline-none border-b-[2px] border-[#0835fe]"
				type="password"
				placeholder="Enter password"
				ref={pwd}
			/>
			<button className="w-[90%] px-[15px] h-[36px] bg-[#0835fe] text-[white] text-[15px] rounded-sm hover:opacity-90">
				login
			</button>
			<p>
				Don't have account? &#183;{" "}
				<a href="/auth" className="text-[blue]">
					Auth
				</a>
			</p>
		</form>
	);
};

export default Login;
