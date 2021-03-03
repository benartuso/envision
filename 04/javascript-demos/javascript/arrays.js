/* ARRAYS! */

/*---------01: Storing values in arrays -------

In visualizing data, we rarely (never) work with single, individual data items, or objects.

We will always be working with multiple copies of objects, each one representing a data point, and each having more or less the same properties. 

As such, in D3, we will work with ARRAYS of objects. This section will show us how to store many types of data in arrays, and access their individual values. 

*/

//The "literal" syntax used to define arrays uses square brackets, with individual array elements separated by commas. 

//These can be saved to a variable like any other type of data in JavaScript!

let stringsArray = ["Our", "first", "array", "of", "strings"]
let numsArray = [1, 2, 3, 4, 5]
let boolsArray = [true, false, false, true, true]
let objectsArray = [{name:"ben", age:22},
                    {name:"karishma", age:22},
                    {name:"meghan", age:19}]

//...And they can even have mixed types, though this isn't generally recommended!

let mixedArray = ["It", "is", true, "that", "this", "array", "contains", 3, "data", "types"]


//Let's see what we get when we log some of these to the console. 

console.log("Strings array: ", stringsArray);

//We get that cool arrow that we used to expand Objects, which we can use to expand the array and look at all the items. Nice!

//In the console, there is also an additional property built in to the array, called "length." Can we access that? 

console.log("stringsArray.length yields: ",stringsArray.length);

//Yes! This will be super useful in performing operations that involve dataset size, and looping over our entire dataset later. 

//1B: INDEXING ARRAYS

//We can use square brackets, followed by the number of the item's position in the array, to return only a certain value of the array. 
console.log("The 1-indexed item of stringsArray: ", stringsArray[1]);

//WHY does this return the SECOND word, not the FIRST? This is because javascript arrays are 0-indexed, which means instead of counting starting from 1 (1, 2, 3, 4, 5), they count starting from 0 (0, 1, 2, 3, 4). You can see this in the console.
console.log("The true first item, indexed with zero: ", stringsArray[0]);

//We can also CHANGE arrays by reassigning their individual values:
console.log("stringsArray before change", stringsArray);
stringsArray[1] = "SECOND";

console.log("stringsArray after change", stringsArray);


//And of course: since elements of arrays can be objects, we can access those objects' properties like so: 

let courses = [ 
                    //First array item    
                    {courseName:"Envision",
                        meetingDay:"Sunday",
                        meetingTime:"3-5PM",
                        programLead:"Ben",
                        programCoord:"Izzy"},
                    {courseName:"Node Lite",
                        meetingDay:"Sunday",
                        meetingTime:"5-7 PM",
                        programLead:"Carter",
                        programCoord:"Ben H."}
                      ]


console.log(courses[0].courseName + " meets at " + courses[0].meetingTime + " on " + courses[0].meetingDay +" and is taught by " + courses[0].programCoord + " and " + courses[0].programLead + ".");

//Now, by changing only these 0's to 1's (thus grabbing the second array element instead of the first:)


console.log(courses[1].courseName + " meets at " + courses[1].meetingTime + " on " + courses[1].meetingDay +" and is taught by " + courses[1].programCoord + " and " + courses[1].programLead + "."); //Sweet!



//--------------01: YOUR TURN!-------------//

/*Part a: 

Console.log out "the quick brown fox jumps over the lazy dog"
without typing any of those words or using any variables other than the array we provide below.
*/

let partA = ["quick",
             "fox", 
            {
                foxColor:"brown",
                dogDemeanor:"lazy"
            },
            {
                foxAction:"jumped",
                foxPosition:"over"
            }, 
             "the",
             "dog"
            ]

//Your answer below:
console.log()


/* Part b (bonus, if time! this one's tricky)

Once again, print "the quick fox jumped over the lazy dog", but you might need to think back to some methods from our lesson on objects! */

let partB = ["quick",
             "fox", 
            {
                brown:"a good color",
                lazy:"a perfectly fine way to be"
            },
            {
                jumped:"a past-tense verb",
                over:"a preposition"
            }, 
             "the",
             "dog"
            ]

//Your work here: totally fine if you don't finish this one!
console.log()








/*-------------02: ARRAY METHODS------------

There are special functions (methods) we can apply to modify our arrays.

*/

//SORTING: array.sort() sorts the array IN PLACE, meaning it modifies the original array. See below

let sortThis = ["banana", "carrot", "apple", "dorito"];

console.log("Array is stored in originally specified order:", sortThis);

//This happens in place:
sortThis.sort()

console.log("So for every instance after line 149, the array will now be sorted alphabetically." , sortThis);

//How about sorting numbers?
let sortNumbers = [10, 3, 5, 7, 2, 1];
console.log("Numbers before sort: ", sortNumbers);
sortNumbers.sort();
console.log("Numbers after sort: (see a problem?) ", sortNumbers);

//Ummmm...this isn't great. You need to make sure to be SUPER careful of this when working in D3. array.sort() sorts arrays of numbers AS IF THEY ARE STRINGS, so 10 comes before 3 because it starts with 1!

//Luckily, there's a way around this. YOu won't understand the FUNCTION syntax below for now, and that's okay! We'll get there soon! For now, just keep this in the back of your head for later.

//Sorting with a custom comparator function...
// If a is less than b,  place a before b.
sortNumbers.sort((a,b) => a - b);
console.log("Ascending sort (a - b): ",sortNumbers);

sortNumbers.sort((a,b) => b - a);
console.log("Descending sort (b - a): ",sortNumbers);

//Where this REALLY becomes useful (and again, we'll get to this later!) is sorting objects BY A PROPERTY. This is an extremely common use case in three, because you'll have a dataset that looks like this: 

let fruitData = [
    {
        fruit:"orange",
        weight:0.8,
        price:1.20,
        number:135
    },
    {
        fruit:"apple",
        weight:1.1,
        price:0.70,
        number:15
    },
    {
        fruit:"pear",
        weight:2.6,
        price:4.23,
        number:20
    }
]

fruitData.sort((a,b) => b.weight - a.weight);
console.log("Descending sort by weight: ", fruitData[0].fruit, fruitData[1].fruit, fruitData[2].fruit);

fruitData.sort((a,b) => b.price - a.price);
console.log("Descending sort by price: ", fruitData[0].fruit, fruitData[1].fruit, fruitData[2].fruit);

fruitData.sort((a,b) => b.number - a.number);
console.log("Descending sort by number: ", fruitData[0].fruit, fruitData[1].fruit, fruitData[2].fruit);



//PUSH: adding array elements
let pushArray = ['The', 'quick', 'brown', 'fox', 'jumped'];
console.log(pushArray);

pushArray.push("over");
pushArray.push("the");
pushArray.push("lazy");
pushArray.push("dog");

console.log(pushArray);


//There are also methods for removing the last or first element of an array: look up .pop() and .shift(). However, we feel that they are really self-explanatory and don't bear a lot of relevance to d3 data management, so won't be discussing them here.

//Slicing - if you specify only one number, it starts from that index and splices to the end. 
let nums = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
console.log("Index 2 through end",nums.slice(2));

console.log("but notice, this doesn't change the original array like sort does!", nums);

//With two arguments, you can slice from the first argument THROUGH (but not including!) the second argument
console.log("Indices 2, 3, and 4", nums.slice(2,5));



//Concatenation
let moreNums = ['sixth', 'seventh', 'eighth', 'ninth', 'tenth']

let evenMoreNums = ['eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth']

console.log("Concatenating 2 arrays: ", nums.concat(moreNums));

//We can CHAIN multiple of these methods together! This CHAINING syntax will become extremely important in using d3.
console.log("Concatenating THREE arrays: ",
           nums
            .concat(moreNums)
            .concat(evenMoreNums))


/*------02: YOUR TURN!---------

A few shorter exercises here, to test each of these methods!*/

//--Ex. A: Create an array called "names" with at least 5 names of you or people you know. 

////Create the array below this line:

////Console.log the array below this line.
console.log();


//--Ex. B: Sort the array alphabetically, printing it before and after to show the difference.

////print pre-sort:
console.log();
////Sort:

////print post-sort:
console.log();



//--EX. C: Add two additional names to the array, then re-sort it, printing before and after again. 

//Add names below: 

//print pre-sort below:
console.log();

//sort

//print post-sort
console.log();

//--EX D: Using sliceArray (NOT typing in a new array yourself), create a new variable called "miniSliceArray" that is equal to: ["carrot", "dorito", "eggplant", "falafel".]

//This should only require two lines of code! One for creating miniSliceArray from sliceArray, and one for logging it out.

let sliceArray = ["apple", "banana", "carrot", "dorito", "eggplant", "falafel", "grape", "halibut", "ice cream"];

//create miniSliceArray below:

//log miniSliceArray below:
console.log();



//--EX E: Using only sliceArray (and the .slice() and .concat() methods) create a new array called "myConcatArray" that contains the following, in the following order: 

//["banana", "carrot", "eggplant", "falafel", "halibut"]

//Do your slicing and concatting here:

//Log to check your work here:
console.log();




















