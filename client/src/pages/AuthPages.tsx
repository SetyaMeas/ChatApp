import { Routes, Route } from "react-router-dom";
import Register from "../components/Register";
import Login from "../components/Login";
import Auth from "../components/Auth";

const AuthPages = () => {
	return (
		<Routes>
			<Route path="/" element={<Auth />} />
			<Route path="/register" element={<Register />} />
			<Route path="/login" element={<Login />} />
		</Routes>
	);
};

export default AuthPages;
