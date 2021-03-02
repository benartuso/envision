/*------01: COMPARATIVE OPERATORS -----------

Many times while writing JavaScript code, you will want to compare two pieces of data to assess how they relate to each other. 

Some easy examples of this are: 
  - Is the variable var1 a string?
  - Is the variable var2 greater than the value var3?
  - Is the variable x the same things as the variable y?
  - Are both x and y greater than 10? 
  - Is x greater than 10 AND y is greater than 20?
  - Is at least one of x or y greater than 10?
  
JavaScript provides us with the ability to use LOGICAL OPERATORS (such as >, <, ==, ===, <=, >=, etc.) to test if these CONDITIONS are true or false.

We learned about the "boolean" JavaScript data type earlier. When making these comparisons and evaluations, JavaScript will return a boolean (true or false) with the result of the comparison. 

We can then use the result of the comparison to determine what code is run and what code is skipped, as we'll see later on.

For now, let's show the range of comparative operators available to us, and some example use cases for each.'*/

//---A: Checking for EQUALITY: ==

/*Important: the reason that we use double equals signs (==) is because the single equals sign (=) is reserved for ASSIGNMENT, like saying x = 13. 

This changes the value of x to 13.

If we wanted to check if x IS EQUAL TO 13, we would do x == 13.*/

//Initialize x:
let x = 13;

console.log("Trying to compare x to 13 with the wrong operator (=): Does x = 13?", x=13);

//This isn't what we want! When we assign a variable a value, instead of returning true like we want in this case (for x == 13), it just returns the value it was assigned, 13. 

console.log("The right way: (==) does x == 13?", x==13);

//Sweet. A few more exampels:
console.log("\n\nDoes 4 equal 4?",4==4);

console.log("Does 'hello' equal 'hello'?", 'hello' == 'hello');

//What about case sensitivity? 
console.log("JavaScript is case sensitive. Does 'hello' equal 'Hello'?", 'hello'=='Hello');

//Something tricky: does '2' == 2?
console.log("Does string '2' == Number 2?", '2'==2);

//Hmmm...that's not necessarily a result we want. Is there a way around this? 

//---B: Checking for equality of VALUE AND TYPE: ===

/*Now we have THREE equals signs????!?! Why?

Somewhat frustratingly, '==' will first try to convert what you're comparing to the same type, THEN see if they compare. 

=== doesn't do this, and will only return true if they're the same type AND the same value.*/

//An additional example:
console.log("True is coerced to a Number here, so true==1 yields: ",true==1);
console.log("With triple equals, this doesn't happen. true===1 is:",true===1);


//---C: Non-equality: != and !==

//As you could've guessed, != and !== do the opposite of "==" and "===".
console.log("'2' != 2: ", '2'!=2);
console.log("'2' !== 2: ", '2'!==2);

console.log("hello world != hello world", 'hello world' != 'hello world');
console.log("hello world != Hello World", 'hello world' != 'Hello World');

//---D: Inequalities: <, >, <=, >=, <=, >=
//These behave as expected. 
console.log("2 > 2: ", 2>2)
console.log("2 >= 2: ", 2>=2)
console.log("2 <= 2: ", 2<=2)
console.log("2 < 2: ", 2<2)



/*------01: YOUR TURN -----------

Using ONLY THE VARIABLES WE'VE DEFINED FOR YOU, produce 5 STATEMENTS that evaluate to true and 5 STATEMENTS that evaluate to false. 

In these, use all of the following operators at least ONCE. 
    - ==
    - ===
    - !=
    - !==
    - >
    - <
    - >=
    - <=

We'll provide you with the console logs! Don't just do the easy ones! Find cases where you're not 100% sure what'll happen, and test them out.
*/

const sTrue = 'true';
const sFalse = 'false';
const zero = 0;
const one = 1;
const sZero = '0';
const sOne = '1';
const sZeroZero = '000000000';
const text = 'some text';
const moreText = 'someMoreText';
const negTen = -10;

//Produce your 5 true statements in the console logs below.
console.log();
console.log();
console.log();
console.log();
console.log();

//Produce your 5 false statements in the console logs below.
console.log()
console.log()
console.log()
console.log()
console.log()





/*------02: COMBINING COMPARISONS: LOGICAL OPERATORS ----------

JavaScript provides three primary operators that allow you to assess logical statements across multiple conditions. 

These are: and (&&), or (||), and not (!).

&& and || apply to two boolean statements, while ! applies to one. 

&& evaluates to true ONLY if both conditions it is applied to are true. 

|| evaluates to true if at least one of its two conditions are true. 

! evaluates to true only if the condition it's applied to is false. 

Let's check these out! 

-------------------------------------------------------*/

//&& evaluates to true only when both sides are true.
console.log("true && true: ", true && true);
console.log("true && false: ", true && false);
console.log("false && true: ", false && true);
console.log("false && false: ", false && false);


//|| evaluates to true only when at least one side is true.
console.log("true || true: ", true || true);
console.log("true || false: ", true || false);
console.log("false || true: ", false || true);
console.log("false || false: ", false || false);

//! evaluates to true when its operand is false, and false when its operand is true. 
console.log("!true: ", !true)
console.log("!false: ", !false)


//The use cases stated above are obviously pretty trivial. The real power in these comess from their ability to compare the types of statements we discussed in section 1!

console.log("'2'==2 && '2'===2: ", '2'==2 && '2'===2);
console.log("'2'==2 || '2'===2: ", '2'==2 || '2'===2);

//We can use parentheses to structure the order of these expressions.

console.log("!(true && false)", !(true && false))
console.log("!true && false", !true && false);

//And it can get pretty crazy.

console.log((1 == (-1 < 5)) && !(0 === (2 >= 3 )))



//---------02: YOUR TURN! -----------------

//FIRST: use each of the three operators discussed above to produce at least one true and at least one false. You can compare any variables or literals you like EXCEPT true and false.

console.log("For example, this is fine: ", (2>1)&&(1<150.3));
console.log("...but this is a bit boring and trivial:", true && true);

//Your six statements below: (ADD A COMMA AFTER THE PROMPT, ELSE YOU'LL GET AN ERROR)
console.log("true with &&: ");
console.log("false with &&: ");
console.log("true with || ");
console.log("false with || ");
console.log("true with !: ");
console.log("false with !: ");







/*---03: PUTTING THESE OPERATORS TO WORK: IF, ELSE IF, ELSE

The main function of programmatically generating these boolean statements is to use them for making DECISIONS about what section of your code to run. 

Using if, else if, and else statements, we can perform many of these "checks" through comparing variable / data values.
*/

/*3A: Plain old "if"

if (boolean expression) {
    block of code to execute.
}
*/

if (true) {
    console.log("This runs, since the boolean expression eval'd to true.")
};

if (false) {
    console.log("THIS DOESN'T RUN, SINCE IT'S FALSE!")
};

console.log("...but this line, AFTER the false block, DOES run. If statements only affect what's inside the curly braces, the so-called 'statement block.'")

//For a more realistic example, take the following chunk of code that will only print out the statement if the two variables entered into it multiply together to 24.

let n1 = 4;
let n2 = 6;

if (n1*n2==24) {
    console.log(n1 + " and " + n2 + " do multiply to 24!")
}

//If we run it again with numbers that don't multiply to 24, nothing happens.
n1 = 4;
n2 = 5;
if (n1*n2==24) {
    console.log(n1 + " and " + n2 + " do multiply to 24!")
}

//SO...what if we also want something to happen if the condition is FALSE? If the condition is TRUE, we do one thing, and if it's FALSE, we do another! enter....

/*3B: if, else!

By adding an addition keyword, we can add actions that we'd like to occur if the condition specified to "if" is FALSE.

Our new syntax: 

if (condition) {
    do this stuff if the condition is true.
} else {
    do this stuff if the condition is false.
}

*/

//Using this to update our 24-checker:

n1 = 8;
n2 = 3;
if (n1*n2==24) {
    console.log(n1 + " and " + n2 + " do multiply to 24!");
} else {
    console.log(n1 + " and " + n2 + " do not multiply to 24.");
}
console.log("This code outside of curly braces is run no matter whether the condition is true or false.")

//And with false?
n1 = 7;
n2 = 5;
if (n1*n2==24) {
    console.log(n1 + " and " + n2 + " do multiply to 24!");
} else {
    console.log(n1 + " and " + n2 + " do not multiply to 24.");
}
console.log("This code outside of curly braces is run no matter whether the condition is true or false.")

//One last addition: what if there are other numbers we care about, besides 24?

/*--3C: IF, ELSE IF, ELSE. 

With the addition of ELSE IF, we can specify ADDITIONAL CONDITIONS, beyond just one! Very exciting! 

As soon as the first condition encountered is true, that statement block will be executed and the rest will be skipped. 

New syntax: 

if (condition 1) {
    If condition 1 is true, do stuff in here AND SKIP EVERYTHING ELSE (until after the else block)
} else if (condition 2) {
    If condition 1 is false and condition 2 is true, do the stuff in here and SKIP EVERYTHING ELSE until after the else block.
} else {
    If none of the above conditions in if or else if are true, do the stuff in here.
};

We can use as many else ifs as we want! We just used one here for brevity. 
*/

//Adding a condition to our 24-checker: if they don't multiply to 24, but do multiply to an EVEN number, let us know!

//Adding another condition, if they don't multiply to 24 or an even number, but either n1 or n2 is equal to 7, let us know!

n1 = 7;
n2 = 4;
if (n1*n2==24) {
    console.log(n1 + " and " + n2 + " do multiply to 24!");
} else if ((n1*n2)%2==0) {
    console.log(n1 + " and " + n2 + " don't multiply to 24, but DO multiply to an even number!");
} else if ((n1===7 || n2===7)) {
    console.log("They don't seem to multiply to 24 or any other even number, but we can see that one of them is equal to 7!")
} else {
    console.log(n1 + " and " + n2 + " don't multiply to 24 OR an even number.")
}
console.log("This code outside of curly braces is run no matter whether the condition is true or false.")

/* An important thing to note here is that as soon as one of the conditions (if, or else if) is met, all the other else-ifs and the else are skipped. Even though n1 was seven, the third condition wasn't printed because the second one was true, so the third one and the else were skipped right over! */



/*--3D: The ternary operator: a stupidly convenient if-else shortcut.

Javascript provides a quaint little operator that allows the execution of single-statement if-else functions without the brackets and the words if or else. 

This is called the 'ternary operator', and here's the syntax:

condition ? thing-to-do-if-true : thing-to-do-if-false
*/

//So, a shorthand rewrite of our original "do these multiply to 24" function can be done as such: 

n1 = 12;
n2 = 2;

console.log(n1*n2==24 ? "yes" : "no, they don't")


n1 = 15;
n2 = 2;

console.log(n1*n2==24 ? "yes" : "no, they don't")



/*-----------03: YOUR TURN!------------
    PART 1: Use the ternary operator to console.log "equal" if two values (val1 and val2) are strictly equal (===), and "not equal" otherwise. Test it out with two different pairs of values.
    
*/

//Your Part 1 code here:
let val1;
let val2;

/*PART 2: Using if / else if / else, write code to do the following, given three numbers num1, num2, and num3.

We will provide an additional variable, called "result", which will initially be undefined. 

   1. If all three numbers are positive (strictly greater than zero), set "result" to 3. 
   2. If only two are positive, set result to 2. 
   3. If only one is positive, set result to 1. 
   4. If none are positive, set result to 0.
   5. No matter what, console.log the value of result.

We will provide 4 different triads of num1, num2, num3, which should lead to a result of 0, 1, 2, and 3. To test that your code is working, uncomment only one of these at a time and see what gets logged to the console. Then recomment that line and uncomment the next one, etc.

This is the toughest thing we've done so far! We'll post solutions later, but be creative and give it your best shot for now!
*/

let result;
let num1, num2, num3;

//These settings should return a result of 0. 
num1 = -5; num2 = -3; num3 = -1;//UNCOMMENT ONE AT A TIME TO TEST

//These settings should return a result of 1. 
//num1 = -5; num2 = 3; num3 = -1; //UNCOMMENT ONE AT A TIME TO TEST

//These settings should return a result of 2. 
//num1 = -5; num2 = 3; num3 = 1;//UNCOMMENT ONE AT A TIME TO TEST

//These settings should return a result of 3.
//num1 = 5; num2 = 3; num3 = 1;//UNCOMMENT ONE AT A TIME TO TEST

console.log("\n\nFor this combination of num1, num2, num3, " + result + " were positive.")


