We didn't get that far with JavaScript but we did do enough for a basic starter homework:

*    Create a html page that loads a JavaScript file. In the JavaScript create 2 variables called name and email and set the values equal to your name and your email.
*    Add another script tag to the page to load another JavaScript file, and in this separate file, write JavaScript code that uses console.log to show the (global) name and email variables you created in the other script. 
*    As we saw in class, you can (for debugging purposes mostly as it isn't very nice looking) use "prompt" to popup a dialog like message box that asks the user a question and returns what the user typed in. See https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt for details. Add code to ask the user to enter their name and then print out (using console.log) or show using an Alert what they entered. (see also "confirm" which is similar to prompt and alert.)
*    Also as discussed in class, you should make sure to 'use strict'; at the top of your file for better modern behavior.
*    Make sure to set up a linter as we did in class (we will use jshint in class for now but eslint is a good option as well). (There may be some warnings we haven't discussed yet, like use function form of 'use strict' etc.. If you don't understand a warning, just ignore it for now. We will talk about the common ones in class.) You need to install the following for jshint to work in Visual Studio Code:
        *    node - https://nodejs.org/en/
        *    jshint - run the following in a command prompt or Visual Studio Code terminal - npm i -g jshint
        *    jshint plugin - in Visual Studio Code go to the extensions, and find and install the jshint extension