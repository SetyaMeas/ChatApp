import GmailVerify from "./GmailVerify";

interface AuthButtonProp {
	text: string;
	bgColor: string;
	route: string;
}
const AuthButton = ({ text, bgColor, route }: AuthButtonProp) => {
	const stype = {
		backgroundColor: bgColor,
	};
	return (
		<button
			style={stype}
			className="w-[120px] text-[18px] py-[3px] px-[6px] rounded-[3px] hover:opacity-90 text-white"
		>
			<a href={route}>{text}</a>
		</button>
	);
};

const Auth = () => {
	return (
		<div className="border flex gap-[15px]">
			<GmailVerify />
			<AuthButton text="login" bgColor="#092df7" route="/auth/login" />
		</div>
	);
};

export default Auth;
