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



//Functions can take in more than one parameter. In fact, they can take in arbitrarily many..

