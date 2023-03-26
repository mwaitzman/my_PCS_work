import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Posts from './Posts';
import AddPost from './AddPost';
import PageNotFound from './PageNotFound';
import Header from './Header';

function App() {
	return (
		<BrowserRouter>
			<Header user={{name: "mock username"}}/>
			<Routes>
				<Route path="/" element={<Posts />} />
				<Route path="addPost" element={<AddPost />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
