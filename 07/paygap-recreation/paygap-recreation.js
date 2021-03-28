/* Recreating the gender pay gap visualization from the Wall Street Journal */

//How is this data stored? We've used CSVs before, but now we'll actually see a quite clever way of storing data that can be extremely convenient for use with D3, especially when switching datasets: it is stored AS VARIABLES IN OTHER JS FILES!

//These variables have what's called GLOBAL SCOPE. We can access them below even though they're stored in other documents! See below:
console.log(wageData);

//This data is, conveniently enough, sorted for us already. As such, we can dive into creating our vis. 

//1: Append an SVG to the HTML body. Let's make it have a height of 600 and width of 800 pixels. 

//We'll give it an outline just to make sure that it's there. 
const HEIGHT = 1000
const WIDTH = 800
const colors = {male:'#00C4AA', female:'#8800F9'}
const RADIUS = 3;
const OPACITY = 0.2;
const AXIS_BUMP = 60;
svg = d3.select("body")
        .append("svg")
        .attr("height", HEIGHT)
        .attr("width", WIDTH)
        .style("display", "block")
        .style("margin", "40 auto")
        .style("border", "1px solid black")

//Now, we'll add our circles how we did it last week, WITHOUT any scales. This will involve saving constant "fudge factors" for the vertical and horizontal axes. 
const X_STRETCH = 2;
const Y_SCALE = 0.01;


const femaleCircle = svg.selectAll(".female-circle")
    .data(wageData)
    .join("circle")
    .attr("class", "female-circle")
    .style("fill", colors.female)
    .style("fill-opacity", OPACITY)
    .attr("cx", (d, i) => i*X_STRETCH)
    .attr("cy", (d, i) => d.median_female*Y_SCALE)
    .attr("r", RADIUS)
    .style("stroke-width", "0.5");


/*This way of doing this is:
  - An enormous pain in the ass 
  - Is extremely difficult to get just right
  - Is upside down!
  */

//We can fix the upside-down bit accordingly: 
femaleCircle.attr("cy", d=> HEIGHT - d.median_female*Y_SCALE )


//But this is still so messy and hard to standardize! There's a better way. 

/*SCALES 

D3 scales are tiny functions that allow you to map from one range of values (the DOMAIN) to another (the RANGE).

This allows us to easily and flexibly convert from the range of our data (around 17k to around 215k, here) to the range of our visuals (0 pixels to 1000 pixels.)

*/

//Let's define a LINEAR SCALE that maps values from the data range mentioned here to our vertical pixel range, 0 through 215000.

let yScale = d3.scaleLinear()
                .domain([0, 215000]) //Map FROM this to...
                .range([0 + AXIS_BUMP, HEIGHT - AXIS_BUMP]); //This. 

//Now we can use this scale to convert values. A salary value of 105000 yields a pixel value of...


console.log(yScale(105000));

//..488. Remember, these are functions - you can  use them as such!

//Let's make an xScale now, that will map from the length of our data (our i indices...) to pixel values. 
let xScale = d3.scaleLinear()
                .domain([0, wageData.length])
                .range([AXIS_BUMP, WIDTH - AXIS_BUMP]);

//Now we can instead use these scales to set our cx and cy in a way that is guaranteed to capture the full range of the data, like the original visual. 

femaleCircle.attr("cx", (d,i) => xScale(i));




femaleCircle.attr("cy", (d,i) => yScale(d.median_female));

//Uh-oh!! We used the wrong range. We don't want to map from 0, 215k to 0, HEIGHT. 

//We want to map from 0, 215k to HEIGHT, 0! Since higher values mean lower data points. 

yScale.range([HEIGHT - AXIS_BUMP, AXIS_BUMP])
femaleCircle.attr("cy", (d, i) => yScale(d.median_female));

//The good news is that we can reuse this same axis to plot our 'male' cirlces, and our lines indicating the gender gap. It makes this quite easy, actually!

let maleCircle = svg.selectAll(".male-circle")
                .data(wageData)
                .join("circle")
                .attr("class", "male-circle")
                .attr("r", RADIUS)
                .style("fill-opacity", OPACITY)
                .attr("cx", (d, i) => xScale(i))
                .attr("cy", (d, i) => yScale(d.median_male))
                .style("fill", colors.male);

let lines = svg.selectAll(".gap-lines")
                .data(wageData)
                .join("line")
                .attr("class", "gap-lines")
                .attr("x2", (d,i) => xScale(i))
                .attr("x1", (d,i) => xScale(i))
                .attr("y1", (d) => yScale(d.median_male))
                .attr("y2", (d) => yScale(d.median_female))
                .attr("stroke", "grey")
                .style("stroke-opacity", 0.2)
                .style("stroke-width", 0.3);

svg.style("border", "")

//NOW: ADDING AXES

/*
Unlike scales, axes aren't functions. They're svg manipulation packages that'll conveniently add any ticks, gridlines, etc. we want.

We can put them on the top, bottom, left, or right of our svg box with d3.axisTop, d3.axisBottom, d3.axisLeft, d3.axisRight.

We pass our already created scales into them, and they use the scales to generate our elements. Very nifty!


*/

let yAxis = d3.axisLeft(yScale);

//Okay, so we've created our yAxis. However, we must add this into our svg now! WE just have to "call" the axis in order to make it appear on the page. 

//By doing this, we'll learn about one additional svg element, the group, or "g". "g" is just a bucket that we can place multiple things into - a "group" of different SVG elements - so that we can move them around with ease. More on these later. 

let yAxisGroup = svg.append("g")
    .call(yAxis)


//Hmmm...Why can't we see the axis ticks? 
//It's because there's no room to display them ! They're on the other (left) side of the axis, out of the range of our svg. 

//We can confirm this by using the svg "transformation / translate" attribute, which allows us to move an object around through translate(x, y);

yAxisGroup.attr("transform", "translate(50,0)")

//THIS IS A BIT OF A BUMMER! Let's go back up and change our scales to give a biiit more room for the axes to sit comfortably.

//Much better! Now, we can change the number of axis ticks to match the visual...

//Remove it first: (if you were coding this yourself you'd just tweak the code)

d3.select("g").remove();

//Fix the yaxis...
yAxis.ticks(5);

//And call it one more time
yAxisGroup = svg.append("g")
    .call(yAxis)
    .attr("transform", "translate(50, 0)")

//STYLING THE AXIS: 

//We can specify the tick size to be negative (WIDTH) so that instead of protruding out of the chart, they span across it.

//Removing the axis again to demonstrate...
d3.selectAll('g').remove();

yAxis.tickSize(-WIDTH);

yAxisGroup = svg.append("g")
                .call(yAxis)
                .attr("transform", "translate(50, 0)");

yAxisGroup.style("color", "grey")
    .style("opacity", "0.2")
    .style("stroke-width", 1);

//GETTING RID OF THOSE GRID LINES: INSPECT THE ELEMENT!

//We see that D3 gives this outer line the class "domain".

domainLines = d3.selectAll(".domain")
                .style("opacity", 0);

//ADDING INTERACTIVITY

//This visual is a little cluttered. Let's make it easy to see sub-trends in certain industries!

//Select our existing div called "filter-buttons"
const buttonDiv = d3.select("body").append("div")
    .attr("id", "filter-buttons")

//Let's use JavaScript to get a dataset of the unique job categories. 

uniques = []
for (i=0; i<wageData.length; i++) {
    if (uniques.includes(wageData[i].occupationgroup)) {
        continue
    } else {
        uniques.push(wageData[i].occupationgroup)
    }
}

console.log(uniques);

//Now we have another dataset that we can bind. Whoa!

const buttons = buttonDiv.selectAll("button")
            .data(uniques)
            .join("button")
            .text(d=>d);

//We'll style these puppies later. For now, let's make a function that, given a occupationgroup, will show only the circles in that occupation group. 



const highlightGroup = (group) => {
    //First turn everything to fully opaque. 
    maleCircle.style("opacity", d => d.occupationgroup==group ? 0.7 : OPACITY);
    femaleCircle.style("opacity", d =>d.occupationgroup==group ? 0.7 : OPACITY);

    maleCircle.style("fill-opacity", d => d.occupationgroup==group ? 0.7 : OPACITY);
    femaleCircle.style("fill-opacity", d =>d.occupationgroup==group ? 0.7 : OPACITY);

    lines.style("stroke-opacity", d => d.occupationgroup==group ? 0.7 : OPACITY);

}

buttons.on("click", function(){ 
    const thisNode = d3.select(this);
    highlightGroup(thisNode.text())
});

//highlightGroup('Computer and mathematical')