//Let's do this same exercise, but with multiple different data sources that we will switch between.

let data = [
    {course:'Node', type:'Technical', students:19, subject:"Data Science"},
    {course:'Wireframe', type:'Creative', students:15, subject:"UX Design"},
    {course:'Vector', type:'Creative', students:15, subject:"Graphic Design"},
    {course:'Envision', type:'Technical', students:13, subject:"D3 Data Vis"},
    {course:'Source Lite', type:'Technical', students:10, 
    subject:"Intro to Web Dev"},
    {course:'Source', type:'Technical', students:10,
    subject:"Web Dev"},
    {course:'Node Lite', type:'Technical', students:12,
    subject:"Intro to Data Science"},
    {course:'Storyboard', type:'Creative', students:12,
    subject:"Videography"},
    {course:'Convert', type:'Creative', students:7,
    subject:"Digital Marketing"},
    {course:'Ignite', type:'Creative', students:10,
    subject:"Civic Entrepreneurship"},
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

//OA: Given a course name, let's convert it to this format. 
//We must 1) Lowercase and 2) add hyphens between words, then 3) add https://www.joinforge.co/

const urlMaker = (course) => {
    //Lowercase
    course = course.toLowerCase();

    //Replace space
    course = course.replace(" ", "-")

    return "https://www.joinforge.co/" + course
}

//And testing it out: 

console.log(urlMaker('Node Lite'));


/*LESSON CONTENT HERE*

0: PROLOGUE - on data processing. Let's say we wanted to add a clickable link to the forge website for each of these!

    -0A: Let's find a way to append a clickable link to the forge website for each item here. The form for these is 

    joinforge.co/source-lite.

    How can we process the existing data to get to this point? 

    -OB: Add an event listener to each bar and text.

1: Adding reactions to individual nodes. 

We'll start with an explainer (as an additional property of the data) to show WHAT the topic is actually about, on hover.

1A: Making the highlightThisBar function

*/




const draw = (dataset) => {
    //Now we'll perform our data joins here so that we can pass in any data as our "dataset" parameter and get an updated graph. 

    //Save the max:
    let thisDataMax = d3.max(dataset, d=>d.students)
    //We can just set our xscale here instead!
    let xScale = d3.scaleLinear()
               .domain([0, thisDataMax])
               .range([0, 700])

    let yScale = d3.scaleBand()
                .domain(dataset.map(d=>d.course))
                .range([0,700])
                .paddingInner(0.2)
                .paddingOuter(0.2);
    
    let courseGroups = svg.selectAll("g")
        .data(dataset)
        .join("g")
        .attr("transform", d=>"translate(0," + yScale(d.course)+")")
        .on("mouseover", function() {
            
            const thisGroup = d3.select(this);
            const thisBar = thisGroup.select("rect");
            const thisCourseName = thisGroup.select(".course-names");
            const thisNumber = thisGroup.select(".numbers")
            const thisData = thisGroup.data()[0];

            courseGroups
                .style("opacity", 0.2)
            courseGroups.selectAll("rect")
                .style("fill", "grey")
            thisGroup.style("opacity", 1)

            thisBar
                .style("fill", "#0C79E5");
            thisCourseName.text("("+thisData.subject+")")
            

        })
        .on("mouseout", function() {
            courseGroups
                .style("opacity", 1);
            
            courseGroups.selectAll("rect")
                .style("fill", d=> colorDeterminer(d.type))
            
            courseGroups.selectAll(".course-names")
                .text(d=>d.course)
            
        })
        

    courseGroups.append("rect")
        .attr("height", yScale.bandwidth())
        .style("fill", d=>colorDeterminer(d.type))
        .transition().duration(500)
        .attr("width", d=>xScale(d.students))

    courseGroups.append("text")
        .attr("x", 5)
        .attr("y", 35)
        .attr("class", "course-names")
        .text(d=>d.course)

    courseGroups.append("text")
        .text(d => d.students + " students")
        .attr("y", 35)
        .transition().duration(500)
        .attr("class", "numbers")
        .attr("x", d=> 5 + xScale(d.students))
  

    
    

        //.attr("transform", "translate(0,10)")
    
        


    // const rects = svg.selectAll(".course-rect")
    //     .data(dataset) // OUR PARAMETER! GENERIC! NOT 'data'
    //     .join("rect");
    
    // rects
    //     .attr("class", "course-rect")
    //     .attr("y", (d => yScale(d.course)))
    //     .style("fill", d=>colorDeterminer(d.type))
    //     .attr("height", yScale.bandwidth())
    //     .on("click", (e, d) => window.location.href=urlMaker(d.course))
    //     .on("mouseover", function() {
    //         const thisBar = d3.select(this)
    //         //Change all rects to low opacity, grey. 
    //         rects.style("opacity", 0.2)
    //             .style("fill", "grey")
            
    //         const thisData = thisBar.data()
            


            
    //     })
    //     .on("mouseout", function() {
    //         rects.style("opacity", 1)
    //              .style("fill", d=>colorDeterminer(d.type))
    //     })
    //     .transition().duration(500) //1: Take 500 miliseconds to transition from WHATEVER YOUR WIDTH IS RIGHT NOW to the width specified by the data.
    //     .attr("width", d => xScale(d.students))



    //     ;


    //Course name labels data join
    // const courseText = svg.selectAll(".course-names")
    //                 .data(dataset)
    //                 .join("text")
    //                 .attr("class", "course-names")
    //                 .style("margin-left", "20px")
    //                 .attr("x", 5) // For a slight left pad!
    //                 .attr("y", ((d, i) => yScale(d.course) + 43))
    //                 //Before the text change, take opacity to 0 in 250ms.
    //                 .transition().duration(250)
    //                 .style("opacity", 0)
    //                 //Then change the text 'off-camera' in zero seconds - instantaneously
    //                 .transition().duration(0)
    //                 .text(d => d.course)
    //                 //Then transition us smoothly back to an opacity of 1.
    //                 .transition().duration(250)
    //                 .style("opacity", 1)
                    

    //Numerical labels data join
    // const numbers = svg.selectAll(".numbers")
    //             .data(dataset)
    //             .join("text")
    //             .attr("class", "numbers")
    //             .text(d => d.students + " students")
    //             .attr("y", (d,i) => yScale(d.course) + 43)
    //             .transition().duration(500) // 2: Things after the transition will change
    //             .attr("x", d=> xScale(d.students) + 10)


}


draw(data)