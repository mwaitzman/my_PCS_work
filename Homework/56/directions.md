For homework please do the following to your restaurant site:

*    Use position absolute to position something on your site. Recall that top, bottom, right, left will be based on nearest parent that isn't position: static - and that setting a parent to position: relative will have no effect on the parent (if you don't move that parent with top, bottom, left, right) but will make it non static so that any absolutely positioned children will position themselves in it based on parent boundaries.
*    Use media queries to make your site look better (or at least different) when screen width is smaller (say less than 800px) then when it is larger (greater the 800px)
*    Use some of the new selectors we saw last night to style something on your restaurant site. Some new selectors to use:
        *    immediate child selector: a > b
        *    immediate sibling selector: a + b
        *    even non immediate sibling selector: a ~ b
        *    not selector: a:not(b)
        *    pseudo elements
                * first-letter
                * first-line
                * first-child
                * last-child
                * first-of-type
                * last-of-type
