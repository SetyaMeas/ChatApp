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
		} catch (error: any) {
			alert(error.msg);
		}
	}
	return (
		<form
			onSubmit={(event: FormEvent) => handleSubmit(event)}
			className="flex-justify-align-col gap-[15px] w-[300px] py-[60px] border-2 border-black"
		>
			<input
				className="w-[90%] px-[6px] py-[3px] text-[18px] border-[2px] border-black rounded-md outline-none"
				type="text"
				placeholder="Enter email"
				ref={email}
			/>
			<input
				className="w-[90%] px-[6px] py-[3px] text-[18px] border-[2px] border-black rounded-md outline-none"
				type="password"
				placeholder="Enter password"
				ref={pwd}
			/>
			<button className="px-[15px] h-[36px] bg-[#0835fe] text-[white] text-[18px] rounded-sm hover:opacity-90">
				login
			</button>
			<p>
				Don't have account? &#183;{" "}
				<a href="register" className="text-[blue]">
					Register
				</a>
			</p>
		</form>
	);
};

export default Login;
