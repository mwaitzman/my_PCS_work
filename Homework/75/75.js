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
	for (let iq = 0; iq < 20; iq++) {
		//trying to force js to copy rather than reference in case it's some weird JS stuff that's causing the indexing/id bug in the program
		const i = iq + 0;
		const man = {
			id: i * 2,
			first: random_name(),
			last: random_name(),
			gender: true,
		};

		const woman = {
			//BUGGED: `woman.id` is 2 rather than 1 higher than `man.id`???
			id: (i * 2) + 1,
			first: random_name(),
			last: random_name(),
			gender: false
		};

		people[i] = man;
		people[i+1] = woman;
	}

	for (let iq = 0; iq < 20; iq++) {
		const i = iq;
		const man = people[i * 2];
		const woman = people[(i * 2) + 1];
		//BUGGED: pairing is off?? WTF is wrong with the math??
		console.log(`${man.first} ${man.last} (male, person #${man.id}) is married to ${woman.first} ${woman.last} (#${woman.id})`);
	};
	console.log(people);
})();
