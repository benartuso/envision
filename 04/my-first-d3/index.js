/*You can't use d3 methods until you've imported it into the project!
In index.html, right above the reference to this script, is usually a good
place to do so. */
d3.select("body");

//What is actually returned when we select the body?
console.log(d3.select("body"))

//It returns a D3 SELECTION. But we can select more specifically than this!
console.log(d3.select("h1"));

//Now, can we actually do anything with these selections? 
d3.select("body")
    .style("font-family", "Times")

//We can select more specifically, as well!
d3.select("#special")
    .style("color", "blue");

//Same with classes...
//d3.select(".less-special")
  //  .style("color", "red");

//We can also change the properties of things! 
d3.select("#forgotten-special")
    .attr("class", "less-special")

//Duplicating from above - try this again - WHY DOESN'T THIS WORK? 
d3.select(".less-special")
    .style("color", "red");

//We need to use selectAll for dealing with multiple DOM elements. 
d3.selectAll(".less-special")
    .style("color", "red");

//Sweet. We've successfully changed the class of an element.


/* "Shouldn't we have just done this stuff (changing classes and ids and styles)
in our initial css and html files? 

YES!

BUT, sometimes we need to change things DYNAMICALLY! */

//GOAL: change the font by clicking a button. 

//First step: add a button to the body!
//Normally would place these together in a div called "buttons", but for simplicity

//Notice, we can save the body selection as a variable for easier use! 
const body = d3.select("body")

//Now, add a button. Save the selector again as interButton.
const interButton = body.append("input");

//Use method chaining: add text, then change body font on click.
interButton
    .attr("type", "button")
    .attr("value", "Change to inter")
    .on("click", () => {
        d3.select("body").style("font-family", "Inter")
        }
    )


//EXERCISE
//But what if we wanted a button for many different fonts? 
const arialButton = body.append("input")
    .attr("type", "button")
    .attr("value", "Change to Arial")
    .on("click", () => {
        d3.select("body").style("font-family", "arial")
    });

const timesButton = body.append('input')
    .attr("type", "button")
    .attr("value", "Change to Times")
    .on("click", () => {
        d3.select("body").style("font-family", "Times")
    })

//We can style them a little, too 
d3.selectAll("input")
    .style("margin", "5px")
    .style("background-color", "white")
    .style("border-radius", "50px");
