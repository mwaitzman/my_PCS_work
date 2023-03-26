import './Header.css';
import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header({user}) {
	return (
		<header>
			<h1>PCS Express MongoDB React SocketIo Blog</h1>

			<nav>
				{
					user?.name ? (
						<>You are currently logged in as {user.name} | <NavLink to="/logout">logout</NavLink></>
					) : (<>
						<NavLink to="/login">login</NavLink> |  <NavLink to="/register">register</NavLink>
					</>)
				}
			</nav>

			<nav>
				<NavLink to="/">home</NavLink> | <NavLink to="/addPost">add post</NavLink>
			</nav>
		</header>
	)
}
