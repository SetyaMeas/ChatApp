import { Routes, Route } from "react-router-dom";
import Register from "../components/Register";
import Login from "../components/Login";

const AuthPages = () => {
	return (
		<Routes>
			<Route path="/register" element={<Register />} />
			<Route path="/login" element={<Login />} />
		</Routes>
	);
};

export default AuthPages;
