//Note: Du Bois' color palette, taken from the loc.gov copy of the visual
const colorPalette = {
    rent:"black",
    food:'#9D7C97',
    clothes:'#D98777',
    taxes:'#B1AAA5',
    other:'#CAB9A6'

}

//Now, we'll use our SVG skillz to recreate this visualization all in one swoop, rather than by hand!

/*First, we need to go get our data. To do so, we'll use the following syntax.

d3.csv(filepath).then((data) => {
    AND THEN THIS FUNCTION WILL EXECUTE ONCE WE GET OUR CSV DATA.
    
    Literally everything we do for this document must be within these curly braces! This is one giant "callback" function that runs after our csv is retrieved.

    This will store our data in the 'data' variable, and we can do whatever we wish with it.
})

*/

d3.csv('du-bois.csv').then((data) => {

    //What does our data look like? 
    console.log(data);

    //PREPROCESSING
    //As we exepcted, we have an ARRAY OF OBJECTS. Each income group is here represeted as a single object in the array. 

    //Notice that all of the numeric properties: average, clothes, food, other, rent, and taxes, are errantly represented as strings. Before we visualize, we'll need to convert these into numbers! 

    //We could do this with a forEach loop, but we'll use it as a chance to practice the .map function. Reminder, with map we're applying the function to ever item (d) in our dataset.

    data.map((d) => {
        d.average = +d.average;
        d.rent = +d.rent;
        d.clothes = +d.clothes;
        d.food = +d.food;
        d.other = +d.other;
        d.taxes = +d.taxes;
    });

    console.log("These are now represented as numbers. ", data);

    //BUILDING OUR CANVAS:  Let's select the body and append on an svg canvas, so that we can add our svg rectangles to it. We'll also give it a height and width, and throw a border on it just so we can see what's up.
    
    const svg = d3.select("body").append("svg")
                    .attr("id", "du-bois")
                    .attr("height", "600px")
                    .attr("width", "800px")
                    .style("border", "1px solid grey")
                    .style("margin", "20px")
                    
    //Great! We now have a canvas onto which we can start appending our bar graph. For now, we're going to deal with scaling to axes by hand, but we'll cover how to include axis scales next week. 

    //The first thing we'd like to visualize is the black bars in the visual, the first bars in the stack. This is the RENT variable. 

    //We'll go through this step by step. First, we'll select everything of the class ".rent" in the current svg canvas. There will be done!

    let rentRects = svg.selectAll(".rent");

    console.log("No .rent rectangles on the canvas: ", rentRects);

    //Now, we'll JOIN it to the data. Since we currently have zero rectangles, but 7 data items, the .join("rect") call will create 7 rectangles.
    rentRects = rentRects.data(data)
        .join("rect")

    console.log("Seven rectangles created by the join ", rentRects);

    //LOOK AT THE __data__ property on these items in the selection! SOOOO cool

    /*So now let's do the following. 
    - Append rectangles (one for each data item in the enter selection)
    - Name them class .rent
    - Give them a fixed width and color. 
    */

    rentRects = rentRects
                    .attr("class", "rent")
                    .attr("x", 0) //Far left edge of the parent container
                    .attr("y", 150) // Down a bit so it's visible
                    .attr("height", 20)
                    .attr("width", 100)
                    .style("fill", "black") //So we can see them.

    /*Use the console to check these out. They're all there, but they're overlaid on top of each other, because we didn't tell them that their POSITION should differ based on the data. Let's change their y position based on the data. */

    //Using i-indexing here: the anonymous function takes two parameters, d and i. d is each item, and i is the index of each variable. 

    rentRects = rentRects.attr("y", (d, i) => i*50)

    /*Understand what this is doing? This function is setting the following: 
        - First rect, y=0
        - Second rect, y=50
        - Third rect, y=100
        - Fourth rect, y=150
        - Fifth rect, y=200
        - Sixth rect, y = 250
        - Seventh rect, y = 300
    */
   
    //Let's expand that 50 a bit to fill our whole container, and beef up the width a bit too to scale it to the graph. 

    rentRects = rentRects.attr("y", (d, i) => i*85)
                    .attr("height", 40)

    //This looks a little better. Let's bump it ALL down just a tad..., through adding an additional little bump factor to move each down. WE WILL MAKE THIS MORE ROBUST NEXT WEEK!

    rentRects = rentRects.attr("y", (d, i) => i*85 + 23)

    //TYING IT TO THE DATA: now, let's make each have a width that is proportional to the rent property, since that's what we're trying to visualize here!

    rentRects = rentRects.attr("width", (d) => d.rent);

    //Great, this is starting to take the general shape that we're looking for, and that we see in the graph! Let's scale it up a bit more, though.

    //Since these are out of 100, and our vis has width 800, let's scale them up by 8.
    rentRects = rentRects.attr("width", (d) => 8*d.rent);

    //Starting to look proportional, folks! We're pretty much done for this step now. 



    //Onward! Adding in FOOD: (I'll explain this as we go)

    let foodRects = svg.selectAll(".food")
                    .data(data)
                    .join("rect")
                    .attr("class", "food")
                    .attr("y", (d, i)=> i*85 + 23)
                    .attr("x", 0) //ALL are zero!
                    .attr("height", 40)
                    .attr("width", (d) => (8*d.food))
                    .style("fill", colorPalette.food)

    //Hmm, that's a bummer. They overlap. What do we do? 

    //We change the x position to start where THE LAST RECTS (for rent) ENDED!
    foodRects = foodRects.attr("x", (d) => d.rent*8)

    //Onward for clothes

    let clothesRects = svg.selectAll(".clothes")
                    .data(data)
                    .join("rect")
                    .attr("class", "clothes")
                    .attr("y", (d, i) => i*85+23)
                    .attr("x", (d)=>8*(d.food + d.rent))
                    .attr("height", 40)
                    .attr("width", (d) => (8*d.clothes))
                    .style("fill", colorPalette.clothes)


    //And taxes?
    taxesRects = svg.selectAll(".taxes")
                    .data(data)
                    .enter().append("rect")
                    .attr("class", "taxes")
                    .attr("y", (d, i) => i*85+23)
                    .attr("x", (d)=>8*(d.food + d.rent + d.clothes))
                    .attr("height", 40)
                    .attr("width", (d) => (8*d.taxes))
                    .style("fill", colorPalette.taxes)

    //Finishing up with 'other'. This SHOULD bring us all the way to the final bar!

    let otherRects = svg.selectAll(".other")
                    .data(data)
                    .join("rect")
                    .attr("class", "other")
                    .attr("y", (d, i) => i*85+23)
                    .attr("x", (d)=>8*(d.food + d.rent + d.clothes + d.taxes))
                    .attr("height", 40)
                    .attr("width", (d) => 8*(d.other))
                    .style("fill", colorPalette.other)



    //ADDING DIRECT TEXT LABELS: One of the thing that makes this visual so engaging and great to look at is the individual labeling of the bars ,which takes a lot of the guess-work out of guessing the percentages spent on each income category. 

    //Let's add some text to replicate that! 

    //Starting with rent: select all (currently nonexistent) items of the class "rent-text"
    let rentText = svg.selectAll(".rent-text")
                .data(data)
                .join("text")
                .text(d => d.rent + '%')
                .attr("y", (d,i) => i*85+23)
                .attr("x", d=>0)
                .style("font-family", "Helvetica");

    /*This leaves us with the following problems that we'd like to fix:
        - The numbers are not centered vertically within the bars. 
        - The numbers are not centered horizontally within the bars.
        - The zeros are showing, which isn't the case in the original video.
    
    Let's tackle each of these:
    
        */

    //Horizontal centering: halfway through 8*rent is just 4*rent, right?
    rentText.attr("x", d=>4*d.rent);

    //Okay, definite progress here! Only bummer is that currently we've set the LEFT anchor of the text to be at the halfway mark, leaving it slightly off center. I'm sure we'd rather have this be the CENTER, which we can fix through text-anchor:middle.

    rentText.style("text-anchor", "middle")

    //Sweet. NOw the zeros are causing a problem, but we'll come back to that later. 

    //Taking care of the vertical bump: remember: our vertical height is 40px! What happens if we shift it down by that amount? Since SVG text anchors on the bottom left corner. 
    rentText.style("fill", "white")
    rentText.attr("y", (d,i) => i*85+23 + 40)

    //Not quite what we're looking for, though - let's bump the font size and shift it up just a bit more.

    rentText.attr("y", (d,i) => i*85+23+28)
    rentText.style("font-size", 22)
    rentText.style("font-family", "Courier New")
    rentText.style("font-weight", 500);

    //You know, going forward, it sure would be nice to not have to keep remembering these 85, 23, and 28. Typically (best practice) we would've done this step from the beginning, but we didn't want to make things too confusing. 

    //Let's save them now to make things easier on us going forward. 
    const YSCALE=85;
    const YBUMP=23;
    const TEXT_YBUMP=28;
    const TEXT_SIZE=24;
    const XSCALE = 8;

    //Finally: How are we going to take care of those 0's? If you notice, there is one other item in the graphic (the 0.1% taxes on the 100-200 dollar earners) that isn't actually displayed in the graphic. 

    //To handle this, let's make sure that any values less than, say, 1, aren't displayed! 

    //Let's define a function that takes in any number and returns, as a string, either that number + %, or nothing if < 1. 

    const numberToPercent = (num) => num < 1 ? "" : num+"%"


    //And now we'll use this to modify our d.rent property, hopefully!
    rentText.text(d => numberToPercent(d.rent))


    //WOOOOOOOOOO!!!

    /*Let's do this for the other categories. 

    To make things a little bit easier on us, though, let's assign a CLASS to the text so that we don't have to assign these custom properties (courier new, font-size = 24, etc.) over and over. 

    */

    let foodText = svg.selectAll(".food-text")
                    .data(data).join("text")
                    .attr("class", "food-text bar-text") //Two classes, the specific and the general!
                    .text(d => numberToPercent(d.food))
                    .attr("y", (d,i) => i*YSCALE + YBUMP + TEXT_YBUMP)
                    .attr("x", d => XSCALE*(d.rent) + XSCALE/2*(d.food));
    
    let clothesText = svg.selectAll(".clothes-text")
                    .data(data).join("text")
                    .attr("class", "clothes-text bar-text") //Two classes, the specific and the general!
                    .text(d => numberToPercent(d.clothes))
                    .attr("y", (d,i) => i*YSCALE + YBUMP + TEXT_YBUMP)
                    .attr("x", d => XSCALE*(d.rent + d.food) + XSCALE/2*(d.clothes));

    let taxesText = svg.selectAll(".taxes-text")
                    .data(data).join("text")
                    .attr("class", "taxes-text bar-text") //Two classes, the specific and the general!
                    .text(d => numberToPercent(d.taxes))
                    .attr("y", (d,i) => i*YSCALE + YBUMP + TEXT_YBUMP)
                    .attr("x", d => XSCALE*(d.rent + d.food + d.clothes) + XSCALE/2*(d.taxes));
    
    //Hmmm...those 5.5s are a bit condensed. What can we do about this? Let's write another custom function to truncate: 

    const classByStringLength = (number) => {
        let stringNum = String(number);
        if (stringNum.length > 2) {
            return "small-bar-text"
        }
        else {
            return "bar-text"
        }
    }

    //Now apply:
    taxesText.attr("class", d => "taxes-text " + classByStringLength(d.taxes))

    console.log(String(data[3].taxes))    


    //And finally: 
    let otherText = svg.selectAll(".other-text")
        .data(data).join("text")
        .attr("class", "other-text bar-text") //Two classes, the specific and the general!
        .text(d => numberToPercent(d.other))
        .attr("y", (d,i) => i*YSCALE + YBUMP + TEXT_YBUMP)
        .attr("x", d => XSCALE*(d.rent + d.food + d.clothes + d.taxes) + XSCALE/2*(d.other));

    //Now, we can take away the outline of our svg container to make it prettier: 
    svg.style("border", "")





})