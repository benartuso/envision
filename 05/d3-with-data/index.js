/* Save the food array (NOT THE ENTIRE JSON) as an array. 
We'll learn how to read and parse JSON later. */

const food = [
        {"foodName":"grapefruit", "foodGroup":"fruit", "foodColor":"pink"},{"foodName":"orange", "foodGroup":"fruit", "foodColor":"orange"},{"foodName":"broccoli", "foodGroup":"vegetable", "foodColor":"green"},{"foodName":"bread", "foodGroup":"grain", "foodColor":"brown"},{"foodName":"cheese", "foodGroup":"dairy", "foodColor":"yellow"},{"foodName":"cream", "foodGroup":"dairy", "foodColor":"white"},
    ];

//Let's check out the food in the console. 
console.log(food);

//Look how nicely it's been parsed in, and converted to an array of Objects. 


//Now, we can pull out specific items like any array. 
const grapefruit = food[0];
console.log("The entire grapefruit object...");
console.log(grapefruit);
console.log("Or a specific propertry, grapefruit.foodGroup")
console.log(grapefruit.foodGroup);

//NOW, we'll use d3 to add a paragraph for each fruit!
/*We'll do this one step at a time for demonstration purposes, then show how you'd do it in the real world (aka, using method chaining!)*/

//First, grab the body of our HTML doc. 
const body = d3.select("body");

/* Now, the d3 data binding pattern for the first time! We'll build
it up piece by piece */

//Start with selecting all paragraphs in the body. 
let allParagraphs = body.selectAll("p");
console.log("Selecting all paragraphs: (empty, because no paragraphs!)");
console.log(allParagraphs);

//Check out the console - it's empty, as we'd expect. 

//Now, we'll BIND IT TO THE DATA, our 6-item "food" array. 
allParagraphs = allParagraphs.data(food);
console.log("After data binding:")
console.log(allParagraphs);

/*What do we see here? 

Two important selections to note. 

_enter (the enter selection)
    This contains "EnterNodes" for any observations which exist in our data, but don't yet in our selection. Since we currently have 0 paragraphs in our selection, but 6 items in our data, we have 6 EnterNodes to represent this difference. 
    
    If we had 4 paragraphs currently on the page, we would have 2 EnterNodes in our enter selection.
    
    
_exit (the exit selection) 
    This contains nothing right now. In general, it will contain an "ExitNode" for any observations which currenty exist in our selection, but don't have corresponding data items. This is how we facilitate the "exit" of when we have too many DOM elements for the data items we're trying to bind.
    
    Since we have 0 paragraphs in our selection, and 6 data items, we have 0 ExitNodes. 
    
    If we had 1, 2, 3, 4, 5, or 6 paragraphs in our selection, and 6 data items, WE WOULD STILL HAVE 0 ExitNodes. 
    
    If we had 8 paragraphs in our selection, and 6 data items, we would have 2 ExitNodes, meaning we'd need 2 paragraphs to exit for our data to be properly bound. 
    
*/

//JOIN the selection with the data array. Since there are currently zero paragraphs, and we have 6 data items, we'll end up appending 6 new paragraphs.
//For each enter node...append a paragraph! Note that we can append ANYTHING here
const afterAppend = allParagraphs.join("p");
console.log("After the enter selection:");
console.log(afterAppend);

//6 paragraphs!! woo!!


//We still have a selection of items, but now, they're paragraphs! We just can't see them, because they currently have no content. 

//Let's change that! Using our .text(), we can change the text property of the paragraph. 

const addText = afterAppend
                    .text("Some text for each paragraph.")
console.log(addText)

//Without having to write code six times, we've managed to return one paragraph for each of our data items. We're starting to get somewhere with this...

//...but really, we'd like to be able to change the attributes of these items based on the DATA.

//THIS IS WHERE THE MAGIC HAPPENS!! WOO

/*Let's change the text of each to be the fruit's name. 

When we write functions in d3, we can automatically pass in the parameter "d", which will return each individual data item - the data item that is BOUND to, or ASSOCIATED WITH, each paragraph that we're currently drawing to the string. 

When we pass over that "d", we can then change style attributes according to our data's values, something like d.foodName.
*/

addText
    .text((d) => d.foodName)

//Whoa. Crazy. We can use multiple attributes of d, though!

addText
    .text((d) => d.foodName + " is a " + d.foodGroup)

//We can also use it to change style items!

addText
    .style("color", (d) => d.foodColor)

//For visibility...

addText
    .style("font-size", '20px')
    .style("font-weight", "800")

//Not just d, but i! There is an additional parameter that we can pass in any part of our d3 function calls, called (i).

//This is the INDEX of the data, from 0 to data.length-1. 

addText
    .text((d,i) => "#" + i + ": " + d.foodName + " is a " + d.foodGroup)

