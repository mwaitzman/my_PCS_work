import './Authentication.css';
import React, { useState } from 'react'
import LogOut from './LogOut';
import LogIn from './LogIn';

export default function Authentication({ setError }) {
	const [username, setUsername] = useState();

	const content = username
		? <LogOut username={username} setUsername={setUsername} setError={setError} />
		: <LogIn setUsername={setUsername} setError={setError} />;
	return (
		<div id="login-form">
			{content}
		</div>
	);
}
