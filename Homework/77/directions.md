For homework, we haven't spent that much time using jQuery, but I think we looked at it enough (especially with our work on our homegrown jQuery lite) to be able to use it in this homework.

*    Create a form that allows the user to enter their name and address. When the submit button is pressed, instead of the form being posted to the server, display the entered information back to the user in the page. 

*    Add a checkbox. Disable the form (or if you prefer just the submission of the form) until the checkbox is checked.


Use jQuery for all interactions with the DOM. (perhaps just for fun even creating the elements using jQuery in the JavaScript file instead of in the HTML if you want more practice). 
 
You can do this however you like (using jQuery though) and we've done most of this in some form or another already in class but here are some pointers.

Recall that to get a jQuery wrapper you can use any css selector (e.g id, class, type) and you use the selectors just like you do in css e.g. $('#theButton')

https://api.jquery.com/text/ might be useful for setting the text of DOM elements, https://api.jquery.com/val/ for getting and setting the value of inputs, .https://api.jquery.com/click/ for adding click listeners, https://api.jquery.com/submit/ for adding submit listeners, and you might consider using https://api.jquery.com/prop/ to disable DOM element(s) - x.prop('disabled', true/*false*/)

Adding elements if you choose to do as well can of course be done (among other ways) with https://api.jquery.com/append/  or https://api.jquery.com/appendTo/ as we did in class.