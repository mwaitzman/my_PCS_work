import React, { useState } from 'react'
import useFormData from './useForm';

export default function LogIn({ setUsername, setError }) {
	const [formData, setFormData] = useFormData({
		username: '',
		password: ''
	});

	const [message, setMessage] = useState();

	async function onSubmit(e) {
		e.preventDefault();

		try {
			const response = await fetch('http://localhost:8080/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify(formData)
			});

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(errorText);
			}

			setUsername(formData.username);
		} catch (e) {
			setError(e.message);
		}
	}

	async function register() {
		try {
			const response = await fetch('http://localhost:8080/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify(formData)
			});

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(errorText);
			}

			setMessage('registration successful');
			setTimeout(() => setMessage(), 5000);
		} catch (e) {
			setError(e.message);
		}
	}

	return (
		<form onSubmit={onSubmit}>
			<input name="username" placeholder="username" required value={formData.username} onChange={setFormData}/>
			<input type="password" name="password" placeholder="password" required value={formData.password} onChange={setFormData} />
			<button>login</button>
			<button type="button" onClick={register}>register</button>
			<div>{message}</div>
		</form>
	)
}
