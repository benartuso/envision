/*-----------1: CREATING OBJECTS WITH OBJECT LITERALS -----------

You can create and store objects in variables, just like any of the primitive values we talked about earlier, through using their "literal" text representation.

For objects, there are three main rules:
    1. The entire object is surrounded in {} braces
    2. Properties and values are linked like property:"value" or property:0, property:false, etc.
    3. Property-value pairs are separated with commas. (NOT semicolons, like CSS.)
    
*/

//Here, we'll create a simple forge object, like in the slides.: 
let ourObject = { //braces to open and close
    name:"Forge",
    formerName:"HackCville", //we use modified camelCase since hyphens aren't allowed
    isNonprofit:true,
    courses:['Node', 'Envision', 'Source', 'Ignite', 'Vector'], //this is an ARRAY, which can store multiple strings, numbers, objects, etc.— we'll talk about these next week
    founded:2012 //You can store a number as a property;
};

//Logging it to the console to explore:
console.log("\n\nOur first object", ourObject);

//Notice the cool little triangle drop down that allows you to more closely examine the properties of an object! You even get a little more info about the courses array, showing that there are 5 courses.

/*-----------1: YOUR TURN  -----------

Create your own object, with at least five properties of at least two different types (i.e., not all strings) to represent a real-life phenomenon. Console.log it, and examine it in the browser.

*/

//Create your object below this line: 

//Console.log it to the browser below this line: 




/*-----------2: NESTED OBJECTS (objects as properties of objects)--------

As we've already shown, ANY datatype can be a value of an object's property. We've shown this with strings, arrays, booleans, numbers already, but OBJECTS can be property values too! This is extremely valuable in representing real-world phenomena, which are often very inter-linked and complex

For instance, here's what an object trying to represent Ben's dad would look like. Since many of the relatives listed here are themselves people, they're objects too!

*/

let bensDad = {
    firstName:"John",
    birthYear:1960,
    homeState:"PA",
    isGoodDude:true,
    spouse: {
        name:"Melissa",
        homeState:"PA",
        hasPet:true,
        pet:{
            name:"Ozzie",
            breed:"Cocker Spaniel",
            age:3
        },
    },
    daughter: {
        name:"Meghan",
        isAnnoying:true,
        howAnnoying:"VERY"
    }
}

//The browser gives us a bunch of little triangle arrows this time that let us explore the entire object. Check it out: 
console.log("The object of some objects: ", bensDad)


/*-----------2: YOUR TURN  -----------

Create your own object, either the same or different from part 1's Your Turn, and make sure that this one has at least one property that is an object.

*/

//Create your nested object below this line: 

//Console.log it to the browser below this line: 





/*---------3: ACCESSING OBJECT PROPERTIES -----

There are a few different ways of returning the value of a property of an  object */

//Dot notation
console.log("Returning Ben's dad's name with dot notation:", bensDad.firstName)

//Or, with bracket notation! (pandas wizards, this might all seem a bit familiar)
console.log("Returning Ben's dad's name with bracket notation: ", bensDad['firstName']);

//For the nested objects we talked about earlier, you can continue to CHAIN on these accessors. See below:
console.log("Getting Ben's dad's daughter's anonnying-ness level:", bensDad.daughter.howAnnoying);

console.log("Getting Ben's Dad's Spouse's Dog's name: ", bensDad['spouse']['pet']['name'])

//Pretty cool!

//Properties that don't yet exist will be returned as undefined. 
console.log("Dad's star sign? idek: ", bensDad['starSign']);


//There are also functions to look at all the property names, or all the property values, of an object. 

console.log("Getting all properties with Object.keys()", Object.keys(bensDad));

console.log("Or all the values waith Object.values()", Object.values(bensDad));

console.log("Or both, with Object.entries()", Object.entries(bensDad));

/*-----------3: YOUR TURN  -----------

Using the object you've built, use accessors to console log out a coherent sentence about it! Like this:*/

//My example:
console.log("Ben's dad's name is " + bensDad.firstName + " and he was born in " + bensDad.birthYear + " in the state of " + bensDad.homeState);


//Your code here!
