import { FormEvent, useRef } from "react";

const Register = () => {
	const api: string = import.meta.env.VITE_API as string;

	const username = useRef<HTMLInputElement>(null);
	const pwd = useRef<HTMLInputElement>(null);

	async function handleSubmit(e: FormEvent): Promise<void> {
		e.preventDefault();

		const usernameValue: string = username.current?.value as string | "";
		const pwdValue: string = pwd.current?.value as string | "";

		if (usernameValue.trim() === "" || pwdValue.trim() === "") {
			alert("input box can not be empty");
			return;
		}
	}
	return (
		<form
			onSubmit={(event: FormEvent) => handleSubmit(event)}
			className="flex-justify-align-col gap-[15px] w-[300px] py-[60px] border-2 border-black"
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

			<button className="px-[15px] h-[36px] bg-[#0835fe] text-[white] text-[18px] rounded-sm hover:opacity-90">
				register
			</button>

			<p>
				already have account? &#183;{" "}
				<a href="login" className="text-[blue]">
					Login
				</a>
			</p>
		</form>
	);
};

export default Register;
