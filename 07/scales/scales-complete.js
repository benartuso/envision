//Let's do this same exercise, but with multiple different data sources that we will switch between.

let data = [
    {course:'Node', type:'Technical', students:19},
    {course:'Wireframe', type:'Creative', students:15},
    {course:'Vector', type:'Creative', students:15},
    {course:'Envision', type:'Technical', students:13},
    {course:'Source Lite', type:'Technical', students:10},
    {course:'Source', type:'Technical', students:10},
    {course:'Node Lite', type:'Technical', students:12},
    {course:'Storyboard', type:'Creative', students:12},
    {course:'Convert', type:'Creative', students:7},
    {course:'Ignite', type:'Creative', students:10},
]

let data2 = [
    {course:'Source', type:'Technical', students:22},
    {course:'Wireframe', type:'Creative', students:12},
    {course:'Storyboard', type:'Creative', students:10},
    {course:'Node Pro', type:'Technical', students:15},
    {course:'Source Lite', type:'Technical', students:11},
    {course:'Node', type:'Technical', students:23},
    {course:'Node Lite', type:'Technical', students:15},
    {course:'Vector', type:'Creative', students:12},
    {course:'Convert B', type:'Creative', students:9},
    {course:'Convert A', type:'Creative', students:15},
]

let data3 = [
    {course:'Spark', type:'Creative', students:22},
    {course:'Wireframe', type:'Creative', students:8},
    {course:'Envision', type:'Technical', students:40},
    {course:'Hustle', type:'Creative', students:24},
    {course:'Source', type:'Technical', students:7},
    {course:'Node', type:'Technical', students:23},
    {course:'Convert', type:'Creative', students:15},
]



//Select the body
const body = d3.select("body");

//Append our svg canvas to the body.
const svg = body.append("svg")
            .attr("width", 900)
            .attr("height", 700)
            .style("border", "1px solid grey")

//Make our colordeterminer function:
const colorDeterminer = (type) => {
    if (type=='Creative') {
        return "#FF6E6A"
    } else if (type == 'Technical') {
        return "#8738E5"
    } 
}



/*START LESSON HERE! 

1. Notice how Envision in dataset 3 is now completely blown off the page, like we discussed in the slides. 

2. Let's start with an example of how scales work. We'll hard-code one right now, before we make it dependent on the data, to show domain, range, and how it works. Check out the console logs 

3. Implement the x scale into the data!

4. But, show how we can also make it relative to the extent of the data, if we want, by including it in our draw loop!

5: Use d3 scaleBand to configure the y scale for bars


*/

//2: TESTING OUT OUR FIRST SCALE 

//Our svg width is 800. We want to allow approximately 100 pixels for the text to render, so that leaves us with a drawable space from 0 to 600. 

//As such, 0 to 700 will be the RANGE, or OUTPUT, of our scale function. It's what we want to map to. 

//But what is our RANGE, or INPUT? What do we want to map FROM, in data space? Well, we can know by looking at our dataset that the highest value we'll ever encounter for "students" is 40. We can start off by hard-coding our data range from 0 to 40. 
let xScale = d3.scaleLinear()
               .domain([0,40])
               .range([0,700])
let yScale = d3.scaleBand()
                .range([700, 0])


//Testing it out...
console.log(xScale(20));


//350! Exactly what we'd expect for a linear scale. Now, we can go into the draw function and use this to determine the width property for our bars, and the x position for our text

//This is a constant scale across all the data, which will be beneficial in some cases. However, you may want the scale to adjust with the data. To do this, we can determine the maximum data value on the fly, then use THAT instead of 40 in our xScale. 

//Here's how you do the max: it's easy in d3!
console.log(d3.max(data, d=>d.students));


const transitionDraw = (dataset) => {
    //Now we'll perform our data joins here so that we can pass in any data as our "dataset" parameter and get an updated graph. 

    //Save the max:
    let thisDataMax = d3.max(dataset, d=>d.students)
    //We can just set our xscale here instead!
    xScale = d3.scaleLinear()
               .domain([0, thisDataMax])
               .range([0, 700])

    yScale = d3.scaleBand()
                .domain(dataset.map(d=>d.course))
                .range([0,700])
                .paddingInner(0.2)
                .paddingOuter(0.2);
    


    const rects = svg.selectAll(".course-rect")
        .data(dataset) // OUR PARAMETER! GENERIC! NOT 'data'
        .join("rect")
        .attr("class", "course-rect")
        .attr("y", (d => yScale(d.course)))
        .style("fill", d=>colorDeterminer(d.type))
        .transition().duration(500) //1: Take 500 miliseconds to transition from WHATEVER YOUR WIDTH IS RIGHT NOW to the width specified by the data.
        .attr("width", d => xScale(d.students))
        .attr("height", yScale.bandwidth())
        ;


    //Course name labels data join
    const courseText = svg.selectAll(".course-names")
                    .data(dataset)
                    .join("text")
                    .attr("class", "course-names")
                    .style("margin-left", "20px")
                    .attr("x", 5) // For a slight left pad!
                    .attr("y", ((d, i) => yScale(d.course) + 43))
                    //Before the text change, take opacity to 0 in 250ms.
                    .transition().duration(250)
                    .style("opacity", 0)
                    //Then change the text 'off-camera' in zero seconds - instantaneously
                    .transition().duration(0)
                    .text(d => d.course)
                    //Then transition us smoothly back to an opacity of 1.
                    .transition().duration(250)
                    .style("opacity", 1)
                    

    //Numerical labels data join
    const numbers = svg.selectAll(".numbers")
                .data(dataset)
                .join("text")
                .attr("class", "numbers")
                .text(d => d.students + " students")
                .attr("y", (d,i) => yScale(d.course) + 43)
                .transition().duration(500) // 2: Things after the transition will change
                .attr("x", d=> xScale(d.students) + 10)

}



const buttonsDiv = body.append("div");

const original = buttonsDiv.append("button")
    .text("Original dataset")
    .attr("id", "original-dataset");

const older = buttonsDiv.append("button")
    .text("Older dataset")
    .attr("id", "original-dataset");

const oldest = buttonsDiv.append("button")
    .text("Oldest dataset")
    .attr("id", "original-dataset");


original.on("click", () => transitionDraw(data))
older.on("click", () => transitionDraw(data2))
oldest.on("click", () => transitionDraw(data3))