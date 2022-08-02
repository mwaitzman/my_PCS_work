For homework, some practice with objects and home grown "modules" to prevent as much as possible (both functions and variables) from being in the global namespace and top level scope.
As discussed we will see easier/better ways to do this with modern JavaScript (ES6 modules and webpack) but doing it this way helps us understand the language that much better - and allows us to understand older code we will see that uses these techniques.

1.	Write a dayOfweek module / Immediately Invoked Function Expression (IIFE) that is similar to the monthName module we wrote in class. The module should return an object that has 2 functions:

    1.	getDayName that takes a number and returns the name of the appropriate day e.g. 0 = Sunday (or you could make it 1 based instead of 0 if you like, that would actually probably be more useful.)
    2.	getDayNumber that takes a day name and returns the day number


Since both functions need access to an array of day names, the module should have a PRIVATE array of day names that both functions use (as closures they will have access)

There should be no globals / top level scope variables at all besides the one object returned by the module (which has the 2 functions in it).

2.	Write an Interest calculator module/IIFE that exposes functions allowing you to set the interest rate and the number of years, and lets you call a calculateInterest function passing in a principal amount and it will return the total amount of interest you would pay at the given rate and number of years. Interest rate and number of years should be PRIVATE module data, and nothing should be in the global namespace besides the one object returned which exposes only the 3 functions -  calculateInterest, setRate and setYears (not terribly useful but hey, it's practice).
