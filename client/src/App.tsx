import Auth from "./components/Auth";
import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPages from "./pages/AuthPages";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Auth />} />
				<Route path="auth/*" element={<AuthPages />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
