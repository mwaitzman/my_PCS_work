For homework, revisit the message box module we wrote in class and add the following capabilities:

*    Allow the caller to OPTIONALLY pass in an array of button strings (e.g. 'yes', 'no, 'maybe'). If the caller passes in no buttons, just add an OK button. If the caller does pass in an array of buttons, create a button for each.
*    Allow the caller to OPTIONALLY pass in a callback. When the user clicks a button, call the callback with the selected button (by index or by text, whichever you prefer). If no callback is passed in, obviously don't try to call a non-existent one.

So for example the following code might show a message box showing the text "Is this enough homework?" and 3 buttons, Yes, No, and Maybe. When the user clicks any one of those 3 buttons, the message box is dismissed and the callback prints out which button was clicked (and could of course do something useful instead of just printing it).
```js
pcs.messageBox.show('Is this enough homework?', ['Yes', 'No', 'Maybe'],
    usersChoice => console.log('You picked ' + usersChoice));
```

Keep in mind that the messagebox.html file is simply a test file, we don't really care about anything in it. The real thing we are developing here is the message box utility that can be used by any page that loads messageBox.js.