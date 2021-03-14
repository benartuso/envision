/* DOM MANIPULATION WITH D3 */

/*-------------01: Selecting existing elements with D3--------

D3 has it's own version of the document.querySelector, that uses a VERY similar pattern. 

Like querySelector, we can pass in CSS identifiers to help us select elements. 

There are two main methods for this: 
    - d3.select <- gets the FIRST item in the DOM that matches the pattern 
    - d3.selectAll <- gets ALL items in the DOM that match the pattern. 
    
*/

//We can start by selecting the first available paragraph with d3.select. 
console.log("Paragraph selected with D3:", d3.select("p"));

//With selectAll, we can get an array of ALL the paragraphs on the page. This will become EXTREMELY useful when we start binding data later in the course. 
console.log("Selecting ALL paragraphs:", d3.selectAll("p"));

//What can we do with this selection? Well, for starters, we can change text and attributes of the selected items in a MUCH more code-effective way. No need for loops just to change simple properties of multiple items. This is one of the main advantages of d3 over document.querySelector!

//So, let's save all those paragraphs to a variable:

const paragraphs = d3.selectAll("p");

//And see how easily we can change the text!
paragraphs.text("Changing the text of all five paragraphs at once!!");

//We can also add styling to all of the paragraphs. When adding any CSS property to an element, we just need to use the following syntax: 
     
      //selection.style("property-to-change", "value-to-change-to").

//We can use JavaScript's "method chaining" to attach these, one after the other, and take care of a ton of styling in only a few lines of code!

paragraphs.style("font-family", "Arial"); 

//See, that works on its own — but we can do even more, as much as we want!

paragraphs.style("font-family", "Helvetica")
    .text("Time for some different text!")
    .style("border", "1px solid blue")
    .style("margin", "10px")
    .style("padding", "10px")
    .style("font-weight", "500")
    .style("font-size", "1.5em");

/*See how easily they all change at once? This "chaining syntax" is a best practice, but it is EXACTLY equivalent in effect to the following: 

paragraphs.text("Time for some different text!");
paragraphs.style("border, "1px solid blue");
paragraphs.style("margin", "10px");
paragraphs.style("padding", "10px");
paragraphs.style("font-weight", "500");
paragraphs.style("font-size", "1.5em");

*/

//1B: CSS-esque selection by class and id

//As with CSS, we use the .class-name syntax and #id-name syntax to specifically target individual objects. Let's demo those out here to set the text back closer to what it originally was. 

//Class: 
d3.selectAll(".special-paragraph")
    .text("These paragraphs have the class 'special-paragraph'.")

//Id:
d3.selectAll("#best-paragraph-ever")
    .text("And this one is of the id 'best paragraph ever.'")

//And we can even use all the fancier selectors we learned with CSS Diner: How about using the DESCENDENT SELECTOR to select only spans that are INSIDE divs, but not spans that are outside divs?

d3.selectAll("div span")
    .style("font-weight", 900)
    .style("color", "navy")
    .style("font-size", "2em")



//1C: Adding classes!
d3.selectAll("#add-class")
    .attr("class", "purple-div")



//1D: Adding new items!

//First, we will select the entire HTML body (but this could also be done to individual divs:), then we will append a new h1, add its text, and give it the class purple-div

let body = d3.select("body");

body
    .append("h1")
    .text("We added this h1 purely with d3")
    .attr("class", "purple-div");

//We can also, say, append a link instead, specifying attributes through the .attr method. 

body.append("a")
    .text("This is a link we added with d3")
    .attr("href", "https://google.com")

//1E: And finally, adding event listeners.

//We'll make a new div that we'll append buttons to. 

let buttonDiv = body.append("div")
                    .attr("id", "button-div")

//Now we'll append three buttons to it. 

const tealButton = buttonDiv.append("button")
                    .attr("id", "teal-button")
                    .text("Change body color to teal")

const pinkButton = buttonDiv.append("button")
                    .attr("id", "pink-button")
                    .text("Change body color to pink")

const orangeButton = buttonDiv.append("button")
                    .attr("id", "orange-button")
                    .text("Change body color to orange")


//Now, adding event listeners:

tealButton.on("click", ()  => d3.select("body").style("background-color", "teal"))

pinkButton.on("click", ()  => d3.select("body").style("background-color", "pink"))

orangeButton.on("click", ()  => d3.select("body").style("background-color", "orange"))

