import './Header.css';
import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
	return (
		<header>
			<h1>PCS Express MongoDB React SocketIo Blog</h1>

			<nav>
				<NavLink to="/">home</NavLink> | <NavLink to="/addPost">add post</NavLink>
			</nav>
		</header>
	)
}
