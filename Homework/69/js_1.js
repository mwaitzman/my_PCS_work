var myApp = myApp || {};

myApp.utils = (
	function (mod) {
		"use strict";

		const names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		mod.get_day_name = idx => names[idx];

		mod.get_day_number = name => {
			for (let i = 0; i < names.length; i++) {
				if (names[i] === name) return i;
			}
		};
		
		return mod;
	}(myApp.utils || {})
);