const utils = myApp.utils;

console.log(utils.get_day_name(1) === "Monday");
console.log(utils.get_day_number("Thursday") === 4);

console.log(utils.string_equals_case_insensitive("time", "tImE"));