/*-----------0: YOUR TURN---------

As a warmup, declare and console.log out a variable from four of the types we talked about
in the slides. 

If you're having trouble with declaring an undefined, remember how we did it in variable-assignment.js!

*/

let yourNumber; //Your work before the semicolon
let yourBoolean; //Your work before the semicolon
let yourString; //Your work before the semicolon
let yourUndefined; //Your work (or lack thereof, iykyk) before the semicolon

//Let's check to see if this worked! the "typeof" operator tells us what type each variable is.

console.log("Type of yourNumber: ", typeof yourNumber);
console.log("Type of yourBoolean: ", typeof yourBoolean);
console.log("Type of yourString: ", typeof yourString);
console.log("Type of yourUndefined: ", typeof yourUndefined);





/*------------1: MATH WITH NUMBER VARIABLES-----------

We can use all the mathematical operators you're familiar with (and maybe a few more!) to combine Number variables to produce new numbers as output*/

const six = 6;
const fortyTwo = 42;
const thirteen = 13;

console.log("\n\n\nAdding: 42 + 6 =", six+fortyTwo);
console.log("Subtracting: 42 - 6 =", fortyTwo - six);
console.log("Multiplication: 42 * 6 =", fortyTwo * six);
console.log("Division: 42 / 6 =", fortyTwo / six);
console.log("Exponentiation: 42 to the 6th =", fortyTwo ** six);
console.log("Finding remainders: The remainder when 42 is divided by 13 is =", fortyTwo % thirteen);

//Of course, we don't need to store them in variables at all to do this! We can just use the numbers themselves, called their "literal" values.
console.log("\n\nPlain numbers (literals) work fine too! 42+6=", 42+6);


/*---------1: YOUR TURN---------

Write your own console logs to find the answers to the following math questions. 
Put your work below each commented line, and check it in the console!
*/

//What is 3.26*15?

//What is the remainder when you divide 22 by 3?

//What is 4 cubed?

//BONUS: What's the square root of 81? (Hint: https://www.w3schools.com/jsref/jsref_sqrt.asp)






/*----------2: "MATH" WITH OTHER VARIABLE TYPES?----------

As we said, JavaScript is a very flexible and DYNAMICALLY TYPED language. One of the practical implications of this is that we can do mathematical operations with data of different types, which is not possible in a lot of more strictly typed languages. 

This can provide some pretty surprising results. */

//A cautionary tale on string vs Number variable types: When data is read into javascript from external sources, numeric variables are often mistakenly processed as strings. Here is what happens if that is the case: 

const stringFifty = '50';
const numberThree = 3; 

console.log("50 + 3 is: ", stringFifty + numberThree);

//Obviously, not the best of math here! What JavaScript is trying to perform is "string concatenation" rather than true mathematical addition. String concatenation is very useful in many other cases, where you want to print out a number that's calculated in your program:

console.log("We can concatenate 50 directly to this string, to print the number: " + stringFifty)

//Booleans also can have their types coerced, just like the type of numberThree was coerced from Number to String. true evaluates to 1, and false to 0, so we can get weird stuff like this:

console.log("True plus true equals: ", true+true);
console.log("False plus true equals: ", true+false);
console.log("(True + True) * 6 equals: ", (true+true)*6)

//This can actually be very useful, for instance, if you're iterating through a dataset and would like to keep a count of how many observations are true, in addition to many other use cases. 



/*-----------2:  YOUR TURN!----------

Use type coersion to your advantage to produce the following output without typing ANY NUMBERS!

*/

//The number 0
console.log(false+false) //Your code inside parentheses (hint: 1 false might not be enough!)

//The number 3
console.log(true+true+true) // Your code inside parentheses

//The string "Hellotruetrue",
console.log() // Your code inside parentheses

//The string "Hello2" (Hint: similar to the one before, but use parentheses to make the 2!)
console.log()



/*-------3: CONVERTING DATATYPES--------

Even if JavaScript reads in your values as the wrong type (usually string), there are some methods that can be used to explicitly facilitate that conversion.

*/

let stringFour = '4';
let stringFive = '5';
console.log("\n\nWithout parseInt, 4+5=", stringFour+ stringFive);

//NOw using the parseInt method: 
console.log("With parseInt, 4+5=", parseInt(stringFour) + parseInt(stringFive));

//A nice, quicker way to do this is by sticking a '+' in front of a string that you'd like to parse to a number:
console.log("Same thing, different syntax: 4+5=", +stringFour + +stringFive);

//Unfortunately, there is a slight difference in this case between float and int. Use parseFloat for decimals, parseInt for integers. 
console.log("Parsing 1.6 as an int rounds DOWN:", parseInt(1.6));
console.log("Parsing 1.6 as a float works fine:", parseFloat(1.6));


//And, you can use parseString to head back in the other direction!
let numberTen=10;
let numberFour=4;



console.log("\n\nThe numbers 10 + 4 (using String()) =:", numberTen+ numberFour);
console.log("The strings 10+4, put next to each other, =:", String(numberTen) + String(numberFour));


//Be careful about Booleans! See below:
console.log("\n\nBoolean() works great, where 0 is converted to false:", Boolean(0));
console.log("...and any other number is converted to true", Boolean(-1), Boolean(1234.5));

//BUT: Any non-empty string variable also coerces to true! 
console.log("\n\nCoercing 'true' to boolean yields ", Boolean("true"));
console.log("...but coercing 'false' to boolean yields ", Boolean("false"));


/* ----------------3: YOUR TURN!--------------
Produce the following results using no literals, only the variables provided! No typing true, or "a string", or 3, etc., at any point!
*/

let floatTwoPointSeven = 2.7;
let numberZero= 0;
let theNumberFour = 4;
let boolTrue = true;

//6.7

//2 (using floatTwoPointSeven)

//false

//"falsefalse" 

//3.7






