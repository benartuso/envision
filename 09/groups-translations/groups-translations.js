//SVG TRANSFORMS.

//There is an additional SVG attribute, called "transform", that we haven't discussed yet.

//These can do many things, such as warping and skewing the SVG object, but we frankly don't care about those right now. We care primarily about TRANSLATING the svg, which basically slides it from its existing position over to a new one. 

//The syntax is "translate(x, y)", where x and y can be positive or negative. 


//Let's draw an svg canvas. 

const svg = d3.select('body').append("svg")
                .attr("width", "500")
                .attr("height", "500")
                .style("border", "1px solid blue");

//Now let's append a rect onto it, in it's default position.

const rect = svg.append("rect")
    .attr("height", "40")
    .attr("width", "40")
    .attr("x", 0)
    .attr("y", 0)

//Now we can add a translation to shift it away from 0, 0. 

rect.attr("transform", "translate(100, 200)") //100 right, 200 down.

//Notice that the x and y position are still 0! the translation changes the starting point, we can still move x and y around to change relative to that starting point. 

rect.attr("x", 0)
    .attr("y", 0)

//Nothing changes. 

//Changing x and y to 10, 15 will take us to a true position of (110, 215)

rect.attr("x", 10)
    .attr("y", 15)

//Finally, translations DO NOT STACK. it is something that you set once and can change.

//There is no adding "another" translation, setting another translation of 100,200 will just have it stay the same. 

rect.attr("transform", "translate(100,200)")

//Translations can also be negative. WE'll start with a circle of non-zero coordinates...

const circle = svg.append("circle")
    .attr("cy", 75)
    .attr("cx", 100)
    .attr("r", 25)

//Translating backwards and up

circle.attr("transform", "translate(-20, -40)")

//Most commonly (especially in the margin convention), you will want to translate based on the values of saved variables, such as your margin.left and margin.top. 

const margin = {top:25, bottom:20, left:40, right:40}

//We use string comprehension to do this. 

circle.attr("transform", "translate(" + margin.left + "," + margin.top+")")

//That is exactly equivalent to: 

circle.attr("transform", "translate(40, 25)")


/*NOW: SVG GROUPS

The SVG "g", or "group" element, specifies an invisible container that can contain an arbitrary number of child SVG elements. g's aren't like divs — they aren't physical objects in the box model, they don't take up area on the screen, can't have a border, etc. 

So why do we use them? 

They are useful in performing the SAME TRANSLATION to a group of objects, primarily! They're also incredibly useful in organizing our visuals by keeping like things together. 

Usually, our visual will have a group that contains our various graphical elements that make up our data-representing chart, a group that contain the lines and text for our x axis, and a group that contains the lines and text for our y axis. 

The real benefit of groups is that all properties applied to a group are inherited by that group's children (unless overridden by properties directly applied to the children, as we'll see below).

*/

//Clearing our canvas...
rect.remove()
circle.remove()

//Making a group

const group = svg.append("g")
                //.style("fill", 'black')
                //.attr("width", "200")
                //.attr("height", "200")
                //.style("border", "1px solid orange")

//NOTICE: THE ABOVE ATTRIBUTES DON'T REALLY DO ANYTHING!'

group.append("rect")
    .attr("width", "100")
    .attr("height", "100")

group.append("circle")
    .attr("r", "20")
    .attr("cx", 200)
    .attr("cy", 300)

group.append("text")
    .attr("x", 250)
    .attr("y", 300)
    .text("HELLLOOO")


//And here's an object (the blue one) NOT in the group.
svg.append("rect")
    .attr("x", 300)
    .attr("y", 0)
    .attr("width", 100)
    .attr("height", 50)

//Now, we can translate all of these together. That's what we'll do for the margin convention! 

group.attr("transform", "translate(20, 50)")


//YAY! We can style within groups, too. 

group.style("fill", "green")