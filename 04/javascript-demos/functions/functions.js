/*-----01: FUNCTIONS --------/

JavaScript comes with many built-in methods, some of which we've already explored (like .push() for .sort() arrays).

However, we can't always rely on these to do all the work we need, especially in data manipulation. 

There will be many cases where we need to write a custom, repeatable action that will be applied to each of our data items, some elements of HTML on the page, etc. 

In fact, custom-written functions are CENTRAL to how we make and style visualizations in D3. You'll use them heavily in literally every d3 script you ever write!

Let's see how to define them, and what some simple ones are capable of.

*/

/*OLD-SCHOOL FUNCTION DECLARATIONS: 

We'll start with the more old-school method of declaring our own functions, which uses the "function" keyword and { } braces.

The syntax is as follows: 

const functionName = function(parameter) {
                        return what-you-want-to-return;
                    }

Let's break this down. What does each piece do? 

- const
    - Remember: we use this keyword to declare variables/objects when we intend never to change them. Functions are just a static, unchanging list of commands to execute, so we will ALWAYS use const to save our functions. 

- functionName
    - This can be whatever you want, but should be generally descriptive of what the function does or is used for. 
    
- function(parameter) 
    - The function keyword tells javascript that we're defining a funciton.
    - The parameter (or parameters! you can, and will, have many) is the data passed in to the function, that you want the function to operate on. 
    
- { ...stuff ...}
    - The entirety of the function's operations must be in one "statement block", which is just a fancy way of saying they need to be inside curly braces. 
    - 

- return stuff;
    - This is what you want the function to EVALUATE to. When you run a line of javascript that's 2 + 2, that EVALUATES to 4. When you run a line that's just a variable, it EVALUATES to that variable. When you run a line that's 2 > 5, it EVALUATES to false. 
    - This is how you return the results of your function to save them in a variable!
    
That was a lot—let's check it out in practice.*/ 


// isPotato: for our first example, let's write a function that returns true if its single parameter (possiblePotato) is the string "potato", and false if it's anything else. 

const isPotato = function(possiblePotato) {
    if (possiblePotato === "potato") {
        return true;
    } else {
        return false;
    }
};

//Testing it out:
let anExamplePotato = "potato";
let notAPotato = "onion";

const potatoResult = isPotato(anExamplePotato);
const notPotatoResult = isPotato(notAPotato);

console.log("Result of running on 'potato'", potatoResult);
console.log("Result of running on 'onion'", notPotatoResult);

//Great. We could also just log them out to the console directly, because console.log prints whatever is RETURNED by a statement (or what the statement EVALUATES to.)

console.log("Result of running on 'beef'", isPotato("beef"));

//A quick aside on string matching: 

console.log("\n\n\nresult of running on 'Potato'", isPotato("Potato"));

//Hm...this is pretty undesirable. Luckily, JavaScript provides us some helpful methods to normalize the cases of strings, and functions are the perfect place to use them. 

const fixedIsPotato = function(possiblePotato) {
    possiblePotato = possiblePotato.toLowerCase();
    if (possiblePotato === "potato") {
        return true;
    } else {
        return false;
    }
    
};

console.log("Trying on potato, Potato, POTATO, and pOtAtO: ", fixedIsPotato("potato"), fixedIsPotato("Potato"), fixedIsPotato("POTATO"),  fixedIsPotato("pOtAtO"));

console.log("\n\nNice! The original does much worse: ", isPotato("potato"), isPotato("Potato"), isPotato("POTATO"),  isPotato("pOtAtO"))



//Functions can take in more than one parameter. In fact, they can take in as many as you need, you just have to specify them in the function constructor!


const wordRepeater = function(word1, word2, reps1, reps2) {
    
    let resultArray = [];
    
    for (i = 0; i < reps1; i++) {
        resultArray.push(word1);
    }
    
    for (i = 0; i < reps2; i++) {
        resultArray.push(word2);
    }
    return resultArray;
}

console.log(wordRepeater("envision", "forge", 13, 5));



//Variable Scope: variables declared inside a function can only be used inside the function! For example: 

const scopeExample = function() {
    let insideFunctionVar = "only available inside these braces";
    console.log(insideFunctionVar);
}

//When scopeExample is run, we can log out insideFunctionVar just fine, as long as it's being done from INSIDE / WITHIN the function. 
scopeExample();

//Uncomment the line below — notice that it crashes our code, since insideFunctionVar only exists inside the function!

//console.log(insideFunctionVar);


//ARROW FUNCTION NOTATION! 
/* This is a new cool feature of ES6, the latest javascript standard, that allows you to write simple one-statement functions in a bit cleaner syntax. 

While the traditional function notation is; 

const yourFunction = function(p1, p2) { stuff you want to do...};

...arrow syntax is: 

const yourFunction = (p1, p2) => stuff-to-do;

for simpler function calls. (braces are still required for multi-line functions!)

*/

//Example: here's what a function to square a number would look like in traditional function syntax:

const square = function(n1) {
    return n1*n1;
}

console.log("Old-style square, squaring 3", square(3));
console.log("Old-style square, squaring 1", square(1));
console.log("Old-style square, squaring 8", square(8));


//Now the SAME FUNCTION in arrow syntax:

const modernSquare = (n1) => n1*n1;

console.log("Modern square, squaring 3", square(3));
console.log("Modern square, squaring 1", square(1));
console.log("Modern square, squaring 8", square(8));


//Longer functions (those that take up more than one line / use more than one statements) can still be written in arrow form, just with the brackets and return keyword placed back in. (remaking our wordRepeater below)

const arrowRepeater = (word1, word2, reps1, reps2) => {
    
    let resultArray = [];
    
    for (i = 0; i < reps1; i++) {
        resultArray.push(word1);
    }
    
    for (i = 0; i < reps2; i++) {
        resultArray.push(word2);
    }
    return resultArray;
}

console.log("\n\nTesting the new repeater, should print 2 envisions and 4 forges", arrowRepeater("envision", "forge", 2, 4));

//As you can see, the real strength in these is how they are able to shorten the types of one-liners we used in our square example. This will be absolutely HUGE in helping us write tight D3 code, as we'll see next week. 



/*--------------YOUR TURN!-------------

For each of the following parts, try to use the arrow notation. If you can't, that's totally fine!

*/


/*PART A (warm-up) */
//Write a function, called betweenTwoTen, that returns true if the parameter passed in is strictly greater than two AND strictly less than ten. It should return false otherwise.

//Your function implementation here:

//UNCOMMENT these to test your function!
//console.log("Should return false, returns: ", betweenTwoTen(-0.5))
//console.log("Should return true, returns: ", betweenTwoTen(2.0001))
//console.log("Should return false, returns: ", betweenTwoTen(10))

/*PART B: Write a function called "magicBirthday" that takes two parameters, "month" and "year." (Note: You may have done this in elementary school, but it is very cool and fun.)

Through a series of confusing mathematical steps, this function will take in your birthday month and day, such as magicBirthday(8,11) and always return the month and day in decimal form, such as magicBirthday(8,11) = 8.11. Here are the steps you should implement: 

  A: multiply MONTH by 7.
  B: subtract 1 from the result in A.
  C: multiply the result in B times 13. 
  D: Add DAY to the result from C.
  E: Add 3 to the result from D.
  F: Multiply the result from E * 11. 
  G: Subtract MONTH from F. 
  H: Subtract DAY from g. 
  I: Divide H by 10.
  J: Add 11 to I. 
  K: Divide J by 100.
  
*/

//Your implementation here:


//UNCOMMENT these to test your function!
//console.log("Should return 5.23", magicBirthday(5, 23));
//console.log("Should return 12.25", magicBirthday(12, 25));
//console.log("Should return 1.01", magicBirthday(1,1));

/*PART C: Literally the most common D3 use case 

Write a function called grabColor that, given an array of objects with properties that include the property "color", will return A NEW ARRAY OF JUST THE COLORS, in the same order that they were present in the object. For instance, */

let testArray = [
    {food:"banana", color:"yellow"},
    {food:"orange", color:"orange"},
    {food:"grapefruit", color:"pink"},
    {food:"blueberry", color:"blue"},
    {food:"strawberry", color:"red"}];

//..shoud return a 5-item array, like ["yellow", "orange", "pink", "blue", "red"]. We'll test your code with testArray below!

//We'll provide the skeleton this time, fill in the implementation here!
const grabColor = (inputArray) => {
    resultArray = [];
    //Do stuff in here!
    
    return resultArray;
} 

//And, testing!
console.log("Should return ['yellow', 'orange', 'pink', 'blue', 'red']", grabColor(testArray));




//END






























