//To make any SVG elements, we need to first add an svg canvas. 

/*We could do this through the svg tag in our HTML markup, like 

<svg width = 800 height = 400></svg>

but most of the time we'll do it using D3 to append elements to the body.
*/

const body = d3.select("body");

console.log(body);

const svg = body.append("svg")
    .attr("height", "500")
    .attr("width", "800")
    .style("border", "1px solid grey");


//Now, we are able to add additional SVG elements into this container. 

//We can append RECTANGLES (rects), which we will use for creating bar charts, etc. 

const ourFirstRect = svg.append("rect")
    .attr("width", "100")
    .attr("height", "100")

//By default, you can see that this rectangle is placed with its top corner at the top left of the SVG box.

//This is the coordinate 0,0, and it is where all elements will appear unless you specifically set their coordinates to a different location. 

//We can use .attr("x") and .attr("y") to move around the square to various places on the coordinate plane. 
ourFirstRect.attr("x", "200")

ourFirstRect.attr("y", "200")

//To reiterate, higher x means the rectangle moves progressively to the right, and higher y means it moves down. 
//0,0 is in the top right corner. 

//COMMON ERROR ALERT! SVG will allow you to push your shapes right off the canvas, where they won't even display anymore. Don't do this!

ourFirstRect.attr("y", 1000)

//Fixing it: 

ourFirstRect.attr("y", 200)

//SVG elements have both fill (their background-color) and stroke (outline/border) properties. 

ourFirstRect.style("fill", "blue");
ourFirstRect.style("stroke", "red");

ourFirstRect.style("stroke-width", "5");


/*Other elements: CIRCLES
   - Properties here: 
    -  cx: x position of the circle center
    -  cy: y position of the circle center 
    -  r: radius of the circle
*/

const ourFirstCircle = svg.append("circle")
                        .attr("cx", 200)
                        .attr("cy", 200)
                        .attr("r", 50)

//Same properties 
ourFirstCircle.style("stroke", "green")
    .style("fill", "red")
    .style("stroke-width", "5px")

//Note the "overlap" here. 

//We can also add: LINES!

//x1: x position of the first endpoint of th eline
//x2: x position of the second endpoint of the line 
//y1 and y2 are the same way.  

//We determine the stroke-width the same way 

const ourFirstLine = svg.append("line")
    .attr("x1", "0")
    .attr("y1", "0")
    .attr("x2", "800")
    .attr("y2", "500")
    .style("stroke-width", "5px")
    .style("stroke", "black")

console.log(ourFirstLine)

//And finally, we can also add text. 

const ourText = svg.append("text")
        .text("hello svg world")
        .attr("x", "350")
        .attr("y", "200");


ourText.style("font-family", "Helvetica")
    .style("font-size", "42");





