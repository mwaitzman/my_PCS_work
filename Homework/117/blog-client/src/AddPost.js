import './AddPost.css';
import React from 'react'
import useForm from './useForm';
import { useNavigate } from 'react-router-dom'

export default function AddPost({ setError }) {
	const [formData, setFormData] = useForm({
		title: '',
		body: ''
	});
	const navigate = useNavigate();

	async function onSubmit(e) {
		e.preventDefault();

		try {
			const response = await fetch('http://localhost:8080/posts', {
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

			navigate('/');
		} catch (e) {
			setError(e.message);
		}
	}

	return (
		<form id="addPost" onSubmit={onSubmit}>
			<label>
				Title:
				<input name="title" value={formData.title} onChange={setFormData} required />
			</label>
			<label>Body:
				<textarea name="body" value={formData.body} onChange={setFormData} required></textarea>
			</label>
			<button>add post</button>
		</form>
	)
}
