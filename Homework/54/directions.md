For homework please do the following:

Write html and css to create a web page that looks (more or less) and behaves like the attached pictures.

1. The boxes are yellow with a black border and some text in the middle. (Don’t worry about centering the text perfectly vertically, that’s harder to do, just get close. Centering horizontally is easy.)

2. When space allows, the body is centered in the screen - with equal space on either side. HTML background - black, body background is white. When not enough space, body fills available width.
    
3. The boxes layout in the space available, and as the browser window is narrowed the boxes move down to the next line as needed. (11 yellow boxes in total. When browser window is wide enough they are laid out 3 rows of 3, then one row of 2. When browser window is made narrower and 3 boxes don’t fit per row, it drops down to 5 rows with 2 boxes in each and 1 row with 1. Finally if browser is made really narrow, it drops down to 11 rows with one box per row.) There is some space between the boxes. Horizontal scrollbar never appears.
    At the very end there is text that is always underneath all the boxes.

Wide browser looks like [this](box_assignment/wide.png)

Narrowed browser looks like this:


Narrowest browser look like this:


Hints:
We limited max width and centered body in a few examples in class – and that was part of a lab assignment as well. You can use the same technique here.

The layout can also be achieved (amongst other ways) using either of the techniques we used in our 2 column layout last class.

Floated block elements won’t go to new lines unless there is no room for them on the current line. Things that need to come after floated elements can use “clear”, to ensure they go to a new line below any floated element(s)
You can set the display property of an element to be inline or block – or inline-block which will cause a mix of the 2 behaviors. They will honor width and height, but won’t go to new lines unless no room on current line

Keep in mind that we haven’t yet covered newer techniques (flexbox, css grid) that would make achieving this kind of layout even simpler. We will cover them later on

Also please do continue to add new styles and techniques we have used in class to your restaurant site.

* Use background image and/or gradient in some way
* Add a favorite icon
* Use other new styles we may have seen in class as appropriate