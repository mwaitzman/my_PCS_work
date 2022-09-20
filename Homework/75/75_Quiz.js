// total time: whatever it was in class + < 15 minutes (editor process was spawned less than 15 minutes before final post-class-time changes were made, changes were made all in one process/session, time was not spent on it at right away (some spent on homework first))
(function() {


	const random_name = () => {
		// no one needs a first+last name longer than the meaning of life, the universe, and everything
		const max_name_length = 21;
		
		let name = String.fromCharCode(65+Math.floor(Math.random() * 26));
		for (let i = 0; i < Math.random() * max_name_length; i++) {
			name += String.fromCharCode(97+Math.floor(Math.random() * 26));
		}
		return name;
	}


	let people = [];

	for (let i = 0; i < 20; i++) {
		const man = {
			id: i * 2,
			first: random_name(),
			last: random_name(),
			gender: true,
		};

		const woman = {
			id: i * 2 + 1,
			first: random_name(),
			last: random_name(),
			gender: false
		};

		people[i * 2] = man;
		people[i * 2 + 1] = woman;
	}

	for (let i = 0; i < 20; i++) {

		const man = people[i * 2];
		const woman = people[i * 2 + 1];

		console.log(`${man.first} ${man.last} (male, person #${man.id}) is married to ${woman.first} ${woman.last} (#${woman.id})`);
	};

	console.log(people);
})();
