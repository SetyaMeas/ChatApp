import { Routes, Route, Navigate } from "react-router-dom";
import Register from "../components/Register";
import Login from "../components/Login";
import Auth from "../components/Auth";
import Cookies from "js-cookie";

const AuthPages = () => {
	const email: string | undefined = Cookies.get("email");

	return (
		<Routes>
			<Route path="/" element={<Auth />} />
			<Route
				path="/register"
				element={email ? <Register /> : <Navigate to="/auth" />}
			/>
			<Route path="/login" element={<Login />} />
		</Routes>
	);
};

export default AuthPages;
