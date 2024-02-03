import Cookies from "js-cookie";

const Logout = () => {
	function handleLogout() {
		Cookies.remove("token");
		window.location.pathname = "/auth";
	}
	return (
		<div>
			<button
				onClick={handleLogout}
				className="w-[69px] h-[30px] text-[15px] text-white rounded-sm bg-[#dd0b0b]"
			>
				logout
			</button>
		</div>
	);
};

export default Logout;
