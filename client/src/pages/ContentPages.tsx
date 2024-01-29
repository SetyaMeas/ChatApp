import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";

const ContentPages = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
		</Routes>
	);
};

export default ContentPages;
