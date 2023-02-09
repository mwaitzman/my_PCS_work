export default async function u() {
	let $users_list = document.getElementById('users_list');
let users = await fetch(`https://jsonplaceholder.typicode.com/users/`)
	.then(resp => resp.json())
;
$users_list.innerText = users;
}