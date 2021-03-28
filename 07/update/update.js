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


/* We're going to do everything we just did to create our visualization and bind it to the data, with one key difference:

This time, we're going to do all of that drawing in a function of our data. 

We'll call the function draw(dataset), and we can pass in different datasets to redraw the items on the page. 
*/

/*First, let's do the actions that we can complete OUTSIDE of our draw function. These actions are things that we will need to do only once:

*/

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

//Now, pretty much everything else (our data joins) will be DEPENDENT ON OUR PARTICULAR CHOICE OF DATASET. As such, we'll wall that stuff off in our draw(dataset) function. 


let draw = (dataset) => {
    //Now we'll perform our data joins here so that we can pass in any data as our "dataset" parameter and get an updated graph. 




    const rects = svg.selectAll(".course-rect")
        .data(dataset) // OUR PARAMETER! GENERIC! NOT 'data'
        .join("rect")
        .attr("width", 80)
        .attr("height", 40)
        .attr("class", "course-rect")
        .attr("y", (d, i) => i*70 + 15)
        .attr("width", d => d.students*30)
        .style("fill", d=>colorDeterminer(d.type));


    //Course name labels data join
    const courseText = svg.selectAll(".course-names")
                    .data(dataset)
                    .join("text")
                    .attr("class", "course-names")
                    .style("margin-left", "20px")
                    .text(d => d.course)
                    .attr("x", 5) // For a slight left pad!
                    .attr("y", (d, i) => i*70 + 43)

    //Numerical labels data join
    const numbers = svg.selectAll(".numbers")
                .data(dataset)
                .join("text")
                .attr("class", "numbers")
                .text(d => d.students + " students")
                .attr("y", (d,i) => i*70 + 43)
                .attr("x", d=> d.students*30 + 10)

}

//We'll call the function on "data" down here so we can check our progress as we go.
//draw(data);

//But...we can change the dataset! And call many sequential "draw" functions, on different datasets - and if we have our d3 code set up properly, everything should be fine. 
//draw(data2);

//draw(data3);

/*Let's examine some things that can go very badly if we don't have our draw function set up properly. 

This is where we start to see everything we've worked on so far - meticulous setup of our data joins, using function parameters, using selectAll('.class-name') followed by .attr("class", "class-name") pay off. 

TWO BIGGEST CAUSES OF ERROR HERE: 
    - Passing in a specific dataset name in your data joins rather than the generic dataset parameter of your function
    - Not assigning the class you want to your newly joined objects.

*/ 

//Now, making this toggleable is actually pretty easy!

//We'll add 3 buttons, one for each dataset. 
//Add a div first, to organize them 

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


//Now we'll add event listeners to each. (We could've very easily done this in-line on our initial method chains)

original.on("click", () => draw(data))
older.on("click", () => draw(data2))
oldest.on("click", () => draw(data3))


//Pretty cool, right?? It's about to get cooler!

/*D3 TRANSITIONS!

D3 gives us awesome functionality to animate the transitions between datasets in a way that makes them look as slick, professional, and eyecatching as possible.

To show this, we're going to use a new and improved draw function.

We'll start with the exact same draw function, adding some key additions along the way to facilitate transitions.

1: Animating the transition in bar width between datasets.

2: Adding a matching transition in text x position between datasets. 

3: Add an opacity transition so that the shift in course labels doesn't feel so abrupt.
*/

const transitionDraw = (dataset) => {
    //Now we'll perform our data joins here so that we can pass in any data as our "dataset" parameter and get an updated graph. 




    const rects = svg.selectAll(".course-rect")
        .data(dataset) // OUR PARAMETER! GENERIC! NOT 'data'
        .join("rect")
        .attr("height", 40)
        .attr("class", "course-rect")
        .attr("y", (d, i) => i*70 + 15)
        .style("fill", d=>colorDeterminer(d.type))
        .transition().duration(500) //1: Take 500 miliseconds to transition from WHATEVER YOUR WIDTH IS RIGHT NOW to the width specified by the data.
        .attr("width", d => d.students*30)
        ;


    //Course name labels data join
    const courseText = svg.selectAll(".course-names")
                    .data(dataset)
                    .join("text")
                    .attr("class", "course-names")
                    .style("margin-left", "20px")
                    .attr("x", 5) // For a slight left pad!
                    .attr("y", (d, i) => i*70 + 43)
                    //Before the text change, take opacity to 0 in 250ms.
                    .transition().duration(500)
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
                .attr("y", (d,i) => i*70 + 43)
                .transition().duration(500) // 2: Things after the transition will change
                .attr("x", d=> d.students*30 + 10)

}


original.on("click", () => transitionDraw(data))
older.on("click", () => transitionDraw(data2))
oldest.on("click", () => transitionDraw(data3))