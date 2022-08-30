var myApp = myApp || {};

myApp.utils = (
	function (mod) {
		"use strict";

		mod.string_equals_case_insensitive = (str1, str2) => {
			return str1.toLowerCase() === str2.toLowerCase();
		};
		
		return mod;
	}(myApp.utils || {})
);