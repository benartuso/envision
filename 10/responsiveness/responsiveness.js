//Let's do this same exercise, but with multiple different data sources that we will switch between.

let data = [
    {course:'Node', type:'Technical', students:19},
    {course:'Wireframe', type:'Creative', students:15},
    {course:'Vector', type:'Creative', students:15},
    {course:'Envision', type:'Technical', students:13},
    {course:'Source Lite', type:'Technical', students:10},
    {course:'Source', type:'Technical', students:10},
    {course:'Node Lite', type:'Technical', students:8},
    {course:'Storyboard', type:'Creative', students:8},
    {course:'Convert', type:'Creative', students:8},
    {course:'Ignite', type:'Creative', students:6},
]

let data2 = [
    {course:'Source', type:'Technical', students:22},
    {course:'Wireframe', type:'Creative', students:12},
    {course:'Storyboard', type:'Creative', students:10},
    {course:'Node Pro', type:'Technical', students:15},
    {course:'Source Lite', type:'Technical', students:7},
    {course:'Node', type:'Technical', students:23},
    {course:'Node Lite', type:'Technical', students:15},
    {course:'Vector', type:'Creative', students:12},
    {course:'Convert B', type:'Creative', students:9},
    {course:'Convert A', type:'Creative', students:15},
]

let data3 = [
    {course:'Spark', type:'Creative', students:22},
    {course:'Wireframe', type:'Creative', students:8},
    {course:'Storyboard', type:'Creative', students:18},
    {course:'Hustle', type:'Creative', students:24},
    {course:'Source', type:'Technical', students:7},
    {course:'Node', type:'Technical', students:23},
    {course:'Convert', type:'Creative', students:15},
]

//First, select the html body. 
const body = d3.select("body")

//Make our margin convention. 
const margin = {left:100, top:50, right:100, bottom:50}

const outerHeight = 800;
const height = outerHeight-margin.top - margin.bottom;

//We can't specify our inner width yet! We'll see why in a second. 

//Append our svg. - setting our SVG to take up 100% of the parent container
const svg = body.append("svg")
                .attr("height", outerHeight)
                .attr("width", "100%")
                .style("border", "1px solid black");

//NOW - we have a luscious, full-page graph. However, in order to use our margin convention,  we need to get the height of our visual in PIXELS. 

//What does this return? 
console.log(svg.style("width"))

//We can parse this to an integer, and it will ignore the trailing "px".
console.log(parseInt(svg.style("width")))

//Save this as the outerWidth, because it is. 

let outerWidth = parseInt(svg.style("width"),10);
let width = outerWidth - margin.left - margin.right;
//Now we can do our margin convention through appending a group.

const canvas  = svg.append("g")
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    //.append("rect").attr("width", width)
                    //.attr("height", height)


//Now, check out what happens when you change the screen size.

//Let's copy-paste the old stuff...

const colorDeterminer = (type) => {
    if (type=='Creative') {
        return "#FF6E6A"
    } else if (type == 'Technical') {
        return "#8738E5"
    } 
}

//Set up scales: 
const x = d3.scaleLinear()
const y = d3.scaleBand()

let draw = (dataset) => {
    //Now we'll perform our data joins here so that we can pass in any data as our "dataset" parameter and get an updated graph. 

    width = parseInt(svg.style("width"))
    x.domain([0, d3.max(dataset, d=>d.students)]).range([0, width-300])
    y.domain(dataset.map(d=>d.course)).range([0, height])

    const rects = canvas.selectAll(".course-rect")
        .data(dataset, d=>d.course) // OUR PARAMETER! GENERIC! NOT 'data'
        .join("rect")
        .attr("class", "course-rect")
        .attr("height", 40)
        .attr("y", d=>y(d.course))
        .style("fill", d=>colorDeterminer(d.type))
        .transition().duration(500).delay((d,i) =>i*20)
        .attr("width", d => x(d.students));


    //Course name labels data join
    const courseText = canvas.selectAll(".course-names")
                    .data(dataset, d=>d.course)
                    .join("text")
                    .attr("class", "course-names")
                    .style("margin-left", "20px")
                    .attr("x", 5) // For a slight left pad!
                    .attr("y", d=>y(d.course)+30)
                    .transition().duration(250)
                    .style("opacity", 0)
                    .transition().duration(0)
                    .text(d => d.course)
                    .transition().duration(250)
                    .style("opacity", 1)

    //Numerical labels data join
    const numbers = canvas.selectAll(".numbers")
                .data(dataset, d=>d.course)
                .join("text")
                .attr("class", "numbers")
                .text(d => d.students + " students")
                .attr("y", d => y(d.course)+30)
                .transition().duration(500)
                .attr("x", d=>x(d.students) + 20)

}

const buttonDiv = body.append("div")
                      .attr("id", "button-div");

const oneButton = buttonDiv.append("button")
                    .attr("id", "one-button")
                    .text("Dataset 1, S21")
                    .on("click", () => draw(data))

const twoButton = buttonDiv.append("button")
                    .attr("id", "two-button")
                    .text("Dataset 2, Medium old forge")
                    .on("click", () => draw(data2))

const threeButton = buttonDiv.append("button")
                    .attr("id", "three-button")
                    .text("Dataset 3, supes old crusty Forge")
                    .on("click", () => draw(data3))

//Now, we want this visual to scale with changes in the window size. We have an event listener for this....

//window.addEventListener('resize', () => console.log("window just resized."))

//Actually, within this function, we can (at any point) get the pixel size of our svg again. 

window.addEventListener('resize', () => console.log(parseInt(svg.style("width"))))



//This means we can write a function where we make what changes need to happen every time the window changes size. 

const drawOnResize = () => {
    //So what do we need to change? 

    //Svg size will update automatically, and so will the canvas because of our translations. 

    //So, we just need to change our scales and then redraw our bars. 

    //Recalculate our width: 
    const newOuterHeight = parseInt(svg.style("width"))
    const newHeight = newOuterHeight - margin.left-margin.right;

    //Reset the range of our x scale:
    x.range([0, newHeight-300])

    //Now, change the widths of our x-dependent elements. 
    d3.selectAll(".course-rect").attr("width", d=>x(d.students))
    d3.selectAll(".numbers").attr("x", d=>10 + x(d.students))
    
}

window.addEventListener("resize", drawOnResize)