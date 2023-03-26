import './AddPost.css';
import React from 'react'
import useForm from './useForm';
import { useNavigate } from 'react-router-dom'

export default function AddPost() {
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
				credentials: "include",
				body: JSON.stringify(formData)
			});

			if (!response.ok) {
				throw new Error(`${response.statusCode} ${response.statusText}`);
			}

			navigate('/');
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<form onSubmit={onSubmit}>
			<label>
				Title:
				<input name="title" value={formData.title} onChange={setFormData} />
			</label>
			<label>Body:
				<textarea name="body" value={formData.body} onChange={setFormData}></textarea>
			</label>
			<button>add post</button>
		</form>
	)
}
