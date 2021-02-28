// PRIMITIVES DEMO, WEEK 3

//Our first JavaScript file, very exciting! 
//Just like CSS, this file is linked into our corresponding HTML document, called "primitives.html" in this case. 


/* Before we start talking about datatypes specifically, I'd like to reiterate the two main methods of variable assignment we'll be using. 

For Envision, we'll use "let" to declare variables that we need to modify or reassign in our code. 

We'll use "const" to declare constants, which the JavaScript interpreter will prevent us from changing. 

A lot of older code examples will use "var" for both of these purposes, but that has fallen out of favor and largely been replaced by these two. If you're curious why, here's a great article: https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/

Let's see this in action below. */

//----------1: ASSIGNING VARIABLES VIA LET--------------

let ourFirstBoolean = false;

//Log it to the console so we can see what's up!
console.log(ourFirstBoolean);

//From now on, so that you can easily keep track of this code as it runs, we'll add additional console.logs so that you can save your place. We hope this'll be more convenient than checking the line numbers! 


//That'll go like this: (these little \n are for line breaks just to make it cleaner to read!)
console.log("\n\nOur first descriptive message! Printing ourFirstBoolean below.", ourFirstBoolean);





/*-------------1: YOUR TURN------------------------- 
Since we declared using let, we can change the value of ourFirstBoolean any time we want. Change ourFirstBoolean to true, through assigning it like this!

ourFirstBoolean = true;

Then check the console output to see if it updated.
---------------------------------------------------*/

//Put your work on the next line.

console.log("\n\nourFirstBoolean should now print out as true below, not false!", ourFirstBoolean);



/*Great work! Notice that when we change the variable's contents, we don't use the let keyword again, only the first time! Otherwise, it throws an error, see below!

UNCOMMENT the line below by deleting the slashes. Your whole file crashes, and the error "Identifier 'ourFirstBoolean' has already been declared' appears! re-comment that line once you're done so you can keep moving ahead.
*/

//let ourFirstBoolean = false; 









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
we also INITIALIZED it, or gave it an initial value. (let thisVariable=5).

You can also declare a variable WITHOUT initializing it.

By default, it will be set to undefined.*/

let notInitialized;
console.log("Since this variable isn't initialized, it is: ", notInitialized);

/*Undefined is one of seven primitive JavaScript data types that we'll discuss in the next section.

Not initializing your variables can cause a lot of errors, because 'undefined' values don't play well with others!*/

console.log("Trying to do math with non-initialized values gives us:", 2 + notInitialized);

/*However, it isn't nearly as bad as trying to use a variable that HASN'T EVEN BEEN DECLARED! That will throw an error that will wreck our script.*/



/*-------------4: YOUR TURN------------

Try to console.log out a variable that you DIDN'T INITIALIZE OR DECLARE!

Something like this:

console.log(aTotallyFakeVariable);

Notice the error message!
*/

//Your work here: 


/*To avoid either of these scenarios - either accidentally injecting NaN values into your data manipulations, or accidentally killing your script with a variable you forgot to declare, make sure that you're DECLARING AND INITIALIZING ALL VALUES like we practiced doing in sections 1-3.*/
