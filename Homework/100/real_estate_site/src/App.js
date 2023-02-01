import './App.css';
import Buy_a_home from  "./buy_a_home";
import Sell_a_home from "./sell_a_home";
import Home from "./home";
import Navbar from "./navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
	return (
		<>
			<BrowserRouter>
					<Routes>
					{/* <Route path="/" element={<App />}> */}
						<Route index element={<Home />} />
						<Route path="/home" element={<Home />} />
						<Route path="/buy_a_home" element={<Buy_a_home />} />
						<Route path="/sell_a_home" element={<Sell_a_home />} />
						<Route path="*" element={
						<>
						<span style={{ color: 'red' }}>This page doesn't exist.</span>
						<a href="/home">Back to your home</a>
						</>
					} />
					</Routes>
					<Navbar/>
				</BrowserRouter>
		</>
	);
}
