For homework please do the following:

First, some practice passing functions (callbacks). Try Implementing the callbacks using arrow functions (maybe first do regular functions to get it working, then rewrite as arrow if you aren't yet used to the arrow syntax). Refer to the arrayFunctions.js file from last class for some examples of the arrow function syntax.

*    1 - Write your own version of the built in array "every" function (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
    Basic idea is to loop through the entire array checking if each element passes the supplied test (callback). If they all pass, return true, if any fail, return false. Very similar to the filter example we did in class, but instead of building up an array of the elements that pass to return, we are just looking to return false if any fail, otherwise return true.
    Note that for most efficient implementation, you can stop checking as soon as one fails. If even one fails, we already know the result is false, no need to continue checking the rest.
    Call it passing an array of letters (e.g. ['a', 'b', 'c'] or ['a', 'B', 'c']) and a function that tests whether all letters are uppercase. One way you can test to see if a letter is uppercase is like this: if (letter === letter.toUpperCase()) // its uppercase
    Call it again, this time passing a function that tests whether all are lowercase.
    Call the built in version of array.every with the same callbacks and verify that you get the same results.


           (2,3,4 are optional but recommended)

*    2 - Write your own version of the built in array "some" function (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
    Implementation should be very similar to every. Note that this time for most efficient implementation as soon as one passes you can stop checking the rest as we already have the answer.
    Call it passing an array of letters (e.g. ['a', 'B', 'c']) and a function that tests whether some letters are uppercase. One way you can test to see if a letter is uppercase is like this: if (letter === letter.toUpperCase()) // its uppercase
    Call it again, this time passing a function that tests whether some are lowercase.
    Call the built in version of array.some with the same callbacks and verify that you get the same results.

*    3  - Write a function called onlyIf that takes 3 parameters, an array, a 'test' and an 'action'. Call the action for each element of the array that passes the test - but not for those that don't - kind of like a combination of filter and forEach. T


*    4 - There is no built in onlyIf. Write code to accomplish the same things but this time using the built in array operators filter and forEach instead.


Next some closure practice (1 problem broken into 3 steps to make it bite sized):

*    5 - Write a function, multiply, that takes two numbers as parameters and returns the product. Call it several times and use console.log to show its producing correct results.

*    6 - Do the same as #1 above but this time write a function getMultiplier that RETURNS A FUNCTION EXPRESSION that can multiply 2 numbers. Call it to get the multiply function and then use the function you get to multiply some numbers. Use console.log to prove its producing correct results. (This is like the getBetterGreeter function in closures.js from class). 

*    7 - Do the same as #2 above but this time make the outer getMultiplier function take the first number and the returned function expression only take the second number but use the first number from the outer parent function. In other words you should be able to do something like the following:

          var multiplyByFive = getMultiplier(5);
          console.log(multiplyByFive(2)); // prints 10

          var multiplyBySix = getMultiplier(6);
          console.log(multiplyBySix(2)); // prints 12

          (This is like the getBestGreeter function in closure.js)

          Congratulations - you just successfully wrote and used a closure. This is a complex topic and we will continue to revisit it..Please do rewatch the screencast if you're unclear on anything, and do feel free to ask/email questions of either myself or the lab instructors.

As always, please use a linter with reasonable settings on your code to ensure you write quality code.