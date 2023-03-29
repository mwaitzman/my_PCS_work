import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Posts from './Posts';
import AddPost from './AddPost';
import PageNotFound from './PageNotFound';
import Header from './Header';
import Authentication from './Authentication';
import Error from './Error';
import { useState } from 'react';

function App() {
	const [error, setError] = useState();

	return (
		<BrowserRouter>
			<Header />
			<Authentication setError={setError} />
			<Error error={error} setError={setError}/>
			<Routes>
				<Route path="/" element={<Posts />} />
				<Route path="addPost" element={<AddPost setError={setError}/>} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
