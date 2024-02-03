import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPages from "./pages/AuthPages";
import Cookies from "js-cookie";
import ContentPages from "./pages/ContentPages";
import { Navigate } from "react-router-dom";

const App = () => {
	const token: string | undefined = Cookies.get("token");
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/*"
					element={token ? <ContentPages /> : <Navigate to="/auth" />}
				/>
				<Route
					path="/auth/*"
					element={token ? <Navigate to="/" /> : <AuthPages />}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
