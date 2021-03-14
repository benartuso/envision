/* ------ 01: SIMPLE DOM MANIPULATION ----

From this section onward, you'll hear a lot about manipulating the "DOM" using JavaScript. 

This stands for JavaScript's Document Object Model, which is a hierarchical structure containing all of the HTML elements currently on the page.

In this model, each HTML element is referred to as a "node," and these nodes are what we will manipulate using JavaScript.
*/

//In order to change / manipulate / interact with these elements, we must first "grab" them (using CSS-like selection methods) and save them in a variable. 

//Let's start by using the 'querySelector' method to grab that first h1 tag and log it out. 

const header = document.querySelector("h1");
console.log("Here's the h1 node: ", header);

//Note that querySelector will only grab the FIRST element on the page that fits the pattern specified. If we had multiple h1s, it would only grab the first-appearing one. If we wanted to select more, we'd use document.querySelectorAll!

//Changing attributes (such as text) of selected elements: 
header.textContent = "Look, we've changed the header to something completely different";

/*CHANGING STYLES: There are actually two ways of doing this! 

    - 1. We can add and remove styles directly on the element. In doing so, we access them through attributes like .style.backgroundColor, .style.paddingLeft, etc. — basically css properties, but switched from padding-left to paddingLeft
    
    - 2. We can add and remove classes with the ".classList" family of methods. There are four extremely helpful methods for this: 
        A: element.classList.add("class-name") - adds that class to the specified element
        B: element.classList.remove("class-name") - removes that class from the specified element
        C: element.classList.toggle("class-name") - adds if the class doesn't currently exist on that element, removes it if it does
        D: element.classList.contains("class-name") - boolean, true if that class is applied to that element, false if not.
        
    */

//Doing it the first way:
header.style.border = "1px solid black";
header.style.fontFamily = "Helvetica";
header.style.color = "purple";
header.style.fontSize ="38px"; //Pixel values need specified in quotes with px
header.style.padding="20px";


//Doing it the second way: (notice: we're referencing the styles included in the file "manipulating-html.css"). In that file is the class, .funky-div, that has some fun animation frames that we'll be applying to the div. 

//First, let's select the div. 
const theDiv = document.querySelector("#special-div");

//Let's make sure we did that right: 
console.log("Here's our div we'll style: ", theDiv);

//Cool. Now, let's use theDiv.classList.add("funky-div") to add the funky div class!
theDiv.classList.add("funky-div");

//Glad to see that worked! Now, we can turn it off the same way. 
theDiv.classList.remove("funky-div");


/* ADDING EVENT LISTENERS! 

Event listeners are constructs that you can apply to a DOM element which will wait for a certain action to occur, and then execute a callback function when that action happens. 

For this example, we'll be adding an event listener to our "button" that waits for the button to be clicked, then toggles the funky-div style once it has been clicked.
*/

//First, select the button. Since it's our only one, we can use the element-level selector. 

const button = document.querySelector("button");

//Check: 
console.log(button);

//Great! Now, let's add an event listener to the button that will console.log to indicate that the button has been clicked. Small steps like this are a great way to slowly build up your system part-by-part!

button.addEventListener("click", () => console.log("Been clicked!"));

//Awesome, so we've succesfully bound our event listener. Let's just change the function we're using slightly, so that it toggles "funky-div" on theDiv.

button.addEventListener("click", () => theDiv.classList.toggle("funky-div"));

//Yaaaay! INterestingly, the "been clicked" event listener is still active—we can actually add as many of these as we want, to do a bunch of different things! For example, we can randomly assign the font size of the first-paragraph with each click.:

const firstParagraph = document.querySelector("#first-paragraph");

button.addEventListener("click", () => firstParagraph.style.fontSize = Math.random()*100 +"px");

    
/*We can add other event listeners too, such as for hovering over with the mouse.

Let's also use this to demostrate that we can write functions externally, and then just name-drop them in the event listener for cleaner code. */

//Function to add hover when we mouse over the div:
const hoverOver = () => document.querySelector("#hover-div").classList.add("funky-div");

//Function to remove the hover when we mouse out from the div: 
const hoverOut = () => document.querySelector("#hover-div").classList.remove("funky-div");

const hover = document.querySelector("#hover-div");
console.log(hover)

//Take care of when the mouse goes into the div:
hover.addEventListener("mouseover", hoverOver);
hover.addEventListener("mouseout", hoverOut);



/* BONUS: COMMON ERRORS WITH EVENT LISTENERS! */

/*Error case 1: Passing functions with PARAMETERS into an event handler */

const noParameters = () => console.log(2*3);

//Now binding this to our event listener, we have no problems!
button1 = document.querySelector("#error-1");
button1.addEventListener("click", noParameters)

//Now, if we wanted to do the same thing, but pass in the 2 and 3 as parameters instead to make this a customizable multiplciation function, we'd try to do pretty much the exact same thing. 

const withParameters = (n1, n2) => console.log(n1*n2);

button1.removeEventListener("click", noParameters); //Removing the old stuff

//And adding the new....
button1.addEventListener("click", withParameters(2,8));

//THIS DOESN'T WORK, and it's super frustrating. We won't go into why, but all you need to know is: if your callback function is going to have parameters, you'll need to pass it in as an anonymous function inline, like this instead: 

button1.addEventListener("click", () => withParameters(2,123));
//Very stupid and frustrating, but good to know. 

//Let's write a function with NO parameters, that we'll pass into the button to demonstrate this error case. This will multiply two fixed numbers, and print the result to the screen when the button is clicked.



/*Error case 2: being led astray by google wrt the names of event listeners:

This one is pretty simple and doesn't require any code to explain. If you google events, you'll get a lot of things like "onmouseover", "onclick", "onmouseout". If you're applying these directly to elements when you create them in HTML, you use these, such as: 

<h1 onclick="stuff"></h1> this is fine, but if you're using the addEventListener method (as we will in this class / similarly for d3), then you need to DROP THE "ON." I messed this up at least 3x making this notebook, it should be just: 

element.addEventListener("click", stuff) or element.addEventListener("mouseover", stuff).

*/

/*Error case 3: meaning to select multiple of an item, but only selecting one. 

This is super common in d3 as well! 

Let's say we want to grab all of the divs with the error-3, and change their hover effect to make the text in all 3 temporarily disappear on hover.
*/

const div = document.querySelector(".error-3");
const allDivs = document.querySelectorAll(".error-3");

console.log(div, allDivs)