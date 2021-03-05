/*--------01: LOOPS!------------

In working with data (especially with preparing it for visualization in D3), we will often need to move through our entire dataset, doing some action to each item. 

Loops allow us to do this, through repeating an action any number of times, each time on a different specific data item.

We are able to fully customize (through our code):
  - The number of times the action is performed
  - What slight change is made each time.
  
*/


/* The FOR loop: 

For loops are commonly used to do something a fixed, pre-determined number of times, such as iterating through a dataset. 

for loops take 3 main arguments separated by semicolons, as follows:

for (initial expression; condition expression; increment expression) { do stuff };

Let's break these down: 
  - Initial expression: This usually involves defining a variable (like "let i=0") that will be used to determine the number of times we run through the loop.
  - Condition expression: the loop will run until this condition is false. At the beginning of every iteration, it will check to see that this condition is still false and run if it is. Once it's false one time, the loop is over.
  - Increment expression: this expression is run with every loop iteration. 
  
It is common practice to initialize i = 0 as a counter variable, then add to it (i++) at every iteration, stopping when a certain i is reached i < target.

Example below:
*/

//Loop starts with zero, loop runs while i is less than 5, loop increases i by one every time.
for (i=0; i < 5; i++) { 
    console.log("At this iteration, i is ", i);
}

console.log("\n\n\n") //Just adding space here

//This is the most common way of doing things, but these expressions can be modified however you want. For example:

//Loop starts at 10, loop runs while i is greater than 10, loop DECREASES i by 1 every time.
for (i = 10; i>0; i--) {
    console.log("At this iteration, i is ", i);
}

//Or: loop starts at 2, loop runs while i is less than 1000000, i is squared every time. 

for (i = 2; i < 1000000; i = i**2) {
    console.log("Third loop example: i is ", i);
}


//What does this look like in practice, using data? 

let data = ["the", "quick", "brown", "fox", "jumped",
           "over", "the", "lazy", "dog"];

/* A bit of extra explanation for this one: 
  - i = 0; Start at zero, since the first item of an array is accessed through arrayName[0].
  - i < data.length; when i = the length of the dataset, the loop will no longer run. This is a good thing, since array[datasetLength] doesn't exist! array[datasetLength-1] is the last actual value.
  - i++: increment every time, so we're returning the first, then the second, then the third, etc. items of the array.
  
  Here we go!*/

for (i = 0; i < data.length; i++) {
    console.log(data[i]);
}


//Even more commonly, with objects:
let objectData = [
    {team:"Steelers",
     home:"Pittsburgh",
     wins:12,
     losses:4,
     ties:0,
     conference:"AFC",
    },
    {team:"Ravens",
     home:"Baltimore",
     wins:11,
     losses:5,
     ties:0,
     conference:"AFC",
    },
    {team:"Browns",
     home:"Cleveland",
     wins:11,
     losses:5,
     ties:0,
     conference:"AFC",
    },
    {team:"Buccaneers",
     home:"Tampa Bay",
     wins:12,
     losses:4,
     ties:0,
     conference:"NFC",
    },
    
]

console.log("\n\n\n") // Just making some space with a few line breaks.

for (i = 0; i < objectData.length; i++) {
    console.log("The " + objectData[i].home + " " + objectData[i].team + " are in the " + objectData[i].conference +" and finished 2020-2021 with a " + objectData[i].wins + "-" + objectData[i].losses + " record.")
}




//Skipping an iteration in a loop with "continue", vs. stopping the loop with "break";

for (i = 0; i < 5; i++) {
    if (i == 3) {
        continue; //This will skip the entire rest of the loop 
    } 
    console.log(i);
    console.log("iteration "+ i +" finishing now") //Notice, iteration 3 doesn't get here!
}
console.log("We have exited the loop!\n\n");

//While continue skips just the specific iteration, "break" exits the loop entirely. 

for (i=0; i<5; i++) {
    if (i==3) {
        break; 
    }
    console.log(i);
    console.log("iteration "+ i +" finishing now")
}
console.log("We have exited the loop!")




/*--------01: YOUR TURN!---------------*/

//PART A: Write a loop that prints out the following numbers:  0, 2, 4, 6, 8, 10

//Your part A work here

//PART B: Write a loop that prints out every element in the  "yourData" array. 
let yourData = [1.27, 1.398, -0.52, 0.23, 124.3, 5];

//Your part B work here


//PART C: Write a loop that prints out ONLY the items in the "yourData" array which are GREATER THAN 1.2. (Hint: there are two ways of doing this one! One uses if/else, the other uses if and continue...)

//Your part C work here

//PART D: Write a loop for the following array (peoplePets) that prints out a string of the following form: "PERSON has N_DOGS dogs and N_CATS cats, for a total of (N_DOGS + N_CATS) pets."  The total pets calculation should be made on the fly, in the loop!

let peoplePets = [{
    name:"Ben",
    dogs:2,
    cats:0,
}, {
    name:"Baylee",
    dogs:2,
    cats:3,
}, {
    name:"Karishma",
    dogs:1,
    cats:0
}, {
    name:"Nate",
    dogs:0,
    cats:5
}];

//Your part D work here

/*PART E, if time! 

This is to help you practice a really essential data prep task: calculating fields additional properties (think fields / columns) and adding them to your array of objects. This is a lot more labor-intensive in javascript than in python or r!

Your task: during your loop, CHANGE the peoplePets array such that each person object contains an additional, calculated field, totalPets.

Hint: you can add a nonexistent property to an object through:

object[newProperty] = 3; 

etc.
*/

//Your part E code here
for (i=0; i<peoplePets.length; i++) {
    peoplePets[i]['totalPets'] = peoplePets[i].dogs + peoplePets[i].cats;
}

//Check to see that it worked: 
console.log(peoplePets);


//END!
