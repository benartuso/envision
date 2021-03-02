// PRIMITIVES DEMO, WEEK 3

//Our first JavaScript file, very exciting! 
//Just like CSS, this file is linked into our corresponding HTML document, called "primitives.html" in this case. 


/* Before we start talking about datatypes specifically, I'd like to reiterate the two main methods of variable assignment we'll be using. 

For Envision, we'll use "let" to declare variables that we need to modify or reassign in our code. 

We'll use "const" to declare constants, which the JavaScript interpreter will prevent us from changing. 

A lot of older code examples will use "var" for both of these purposes, but that has fallen out of favor and largely been replaced by these two. If you're curious why, here's a great article: https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/

Let's see this in action below. */

//----------1: ASSIGNING VARIABLES VIA LET--------------

//JavaScript is a dynamically typed language. We don't need to tell the interpreter that something is an int, a boolean, a string, a number, etc.

let ourFirstLet = "string";
let ourSecondLet = false;
let ourThirdLet = 4;
let ourFourthLet = undefined;

//These all work fine! No need to specify the type. 
//Let's print them all to the console: 
console.log(ourFirstLet, ourSecondLet, ourThirdLet, ourFourthLet);

//From now on, so that you can easily keep track of this code as it runs, we'll add additional console.logs so that you can save your place. We hope this'll be more convenient than checking the line numbers! 


//That'll go like this: (these little \n are for line breaks just to make it cleaner to read!)
console.log("\n\nOur first descriptive message! Printing these four variables again.", ourFirstLet, ourSecondLet, ourThirdLet, ourFourthLet);

//It's easy to change any of these variables! Just reassign it, using the equals sign. That'll look something like this: 
console.log("\n\nFirst let before the change equals: ", ourFirstLet)
ourFirstLet = "what's up?";
console.log("\n\nFirst let after the change equals: ", ourFirstLet)

//Changing it back, for the exercise later/
ourFirstLet="string";

//One thing to AVOID is trying to RE-DECLARE the variable!
//We only use the let (or const, or var) keyword the FIRST time, when we're creating the variable originally. using it afterwards, like in the commented-out line below, wil throw an error. 

/* DON'T DO THIS: 

let initializationExample = "the first value"; // Works fine, initial assignment
let initializationExample = "the second value"; //Crashes!

"uncaught syntaxerror: identifier 'initializationExample' has already been declared."


/*-------------1: YOUR TURN------------------------- 
Since we declared using let, we can change the value of any of these variables at any time we want. Change ourFirstLet, ourSecondLet, and ourThirdLet to be different values, but of the same data type! (don't worry about ourFourthLet, though.)
---------------------------------------------------*/

//Put your work on the next line.


//This statement will print out your updated values:
console.log("\n\nThese three values should now print out completely differently than 'string' false 4, something should've changed in each!", ourFirstLet, ourSecondLet, ourThirdLet);



/*Great work! Notice that when we change the variable's contents, we don't use the let keyword again, only the first time! Otherwise, it throws an error. 

If you have time while others finish up, try it out for yourself and see how it crashes the script!*/

//Try initializing the same variable with let to two different values, and see all the bad things that happen below:




/*----------2: DECLARING CONSTANTS WITH CONST ---------------

Remember: the const keyword is used to store values (of any type!) that will NEVER change. Let's assign one below, of type Number.
*/

const constantNumber = 1234;
console.log("\n\nWe can log out constants just like let vars, see:", constantNumber);


/*----------------------2: YOUR TURN-------------

Try to reassign the constant to 4321, or any other number, on the line below. Notice the error message, and that this crashes your script again!

MAKE SURE TO COMMENT OUT OR DELETE THE LINE WHEN YOU'RE DONE, SO THAT YOU CAN MOVE ON!
*/

console.log("\n\nYou should see 'Uncaught TypeError: Assignment to constant variable' below this console log!");

//Put your work on the next line. Comment it out with '//' when you're done!








/*--------------3: JAVASCRIPT IS DYNAMICALLY TYPED! ----------

Dynamic typing means that, unlike in Java, you don't have to declare a variable to be an "int" when it's born and keep it that same type forever. You can change it around as you please, from a Number, to a string, to a boolean, and back again.

*/
let changer = "I'm initialized as a string!";
console.log("\n\nWe'll start out this variable as a string, like this:", changer);


changer = true;
console.log("...but it can easily become a boolean...", changer);



changer = 136234.356;
console.log("...or a Number...", changer)



changer = {className:'envision', numberOfStudents:10, quality:100000,
          subject:'data visualization', awesome:true};
console.log("or even an Object with lots of properties, which we'll learn about in a bit!", changer)




/*--------------------3: YOUR TURN------------

We'll initialize the variable yourChanger below, as a Number. Change it to two other types, and check that the change worked via the console logs! 
*/

let yourChanger = 5400;
console.log('\n\nInitial value of yourChanger:', yourChanger);

//Now change it for the first time...

console.log('\nyourChanger after one mutation:', yourChanger);

//And change it one more time!

console.log('\nyourChanger after the second mutation:', yourChanger)




/*------------4: UNDEFINED ----------

So far, when we DECLARED a variable (through something like let thisVariable;
we also INITIALIZED it, or gave it an initial value.

You can also declare a variable WITHOUT initializing it.

By default, it will be set to undefined.*/

let initialized = 1357;
console.log("Initialized variables have values of whatever they're assigned: ", initialized)

let notInitialized;
console.log("Uninitialized variables have types of: ", notInitialized);

/*Undefined is one of seven primitive JavaScript data types that we'll discuss in the next section.

Not initializing your variables can cause a lot of errors, because 'undefined' values don't play well with others!*/

let four;

let eight = 2*four;

console.log("Trying to do math with non-initialized values gives us: ", eight);

//When really, this should've been done through giving the variable a VALUE of four, either initially or later on. 

//TWO valid ways of doing this: 
let realFour = 4;
let realEight = 2*realFour;
console.log("We can give four a value when we declare it: 2*4 = ", realEight);

//Or, we can declare without initializing, then give it a value later. 
//Declare
let otherRealFour;
//Give a value, changing from undefined to 4
otherRealFour = 4;
//Now do 8;
let otherRealEight=2*otherRealFour;
console.log("We can also declare without initializing, then give it a value later. 2*4 = ", otherRealEight);


/*However, it isn't nearly as bad as trying to use a variable that HASN'T EVEN BEEN DECLARED! That will throw an error that will wreck our script.

For instance: if you were to uncomment the following code:
*/

//console.log(aNonExistentVariable);

//..the interpreter would throw an error message.

//If intsead you did...
let anExistentVariable; //Initialize to undefined
//THEN:
console.log(anExistentVariable);

//...you'd be fine, as you are here.




/*-------------4: YOUR TURN------------

Try to console.log out a variable that you DIDN'T INITIALIZE OR DECLARE!

Something like this:

console.log(aTotallyFakeVariable);

Notice the error message!

THEN, make the error go away through adding a variable declaration ABOVE your console.log, like we just did in the demo.
*/

//Your work here: 


/*To avoid either of these scenarios - either accidentally injecting NaN values into your data manipulations, or accidentally killing your script with a variable you forgot to declare, make sure that you're DECLARING AND INITIALIZING ALL VALUES like we practiced doing in sections 1-3.*/
