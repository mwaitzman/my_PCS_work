For homework please do the following:

*	Create a web page with some content (so it has some height and something to see). Write JavaScript that uses setInterval to change the color of the page and text every so often (for the colors you can simply have an array of colors you cycle through, or if you want it to be a bit more sophisticated you can use RGB and cycle through 0-255 for each of r, g, and b (looping through hex is certainly possible but probably more difficult), or google how to pick a random number in JavaScript and create random colors each time, etc...).

*	Add a button to start and stop the color changing.


If you have more time


*	Add a table to the page, and add a row to the table (as we did for add contact) each time the colors change showing the time and the colors used. (for time you can create a date object and use toLocaleString() or toLocaleTimeString() to get a simple date time string e.g const now = new Date(); console.log(now.toLocaleString()); or you can pull information out of the date object yourself see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
	>	new Date() exhibits legacy undesirable, inconsistent behavior with two-digit year values; specifically, when a new Date() call is given a two-digit year value, that year value does not get treated as a literal year and used as-is but instead gets interpreted as a relative offset — in some cases as an offset from the year 1900, but in other cases, as an offset from the year 2000.
	
	for details on the date object)

*	If user clicks on a row in the table, stop the automatic changing and set the colors to the colors captured in that row.

	Note that rapidly flashing colors can be annoying/dangerous to some people that are sensitive to it, so when doing this homework, it is advisable not to make the colors change too frequently. Once a second (1000 milliseconds) (or 1 Hz) should be safe
