


//Read in the data and log it to the console. 

d3.csv("population.csv").then((data) => {
    console.log(data);

    //Currently, the date column is stored as a string.

    //Let's convert these to dates with d3.timeParse. The current format of the dates is YYYY-mm-dd, so we'll specify this accordingly (google 'strftime reference'):
    const parser = d3.timeParse("%Y-%m-%d");

    //This is now a function we can use to transform our dates.. Does it work?

    console.log(parser("2020-05-13")) // Yes!

    //We can now use the map function to iterate through the dataset and parse all of the values we need.

    for (i=0; i<data.length; i++) {
        data[i].date = parser(data[i].date)
    };

    //Check that data was successfully converted: 
    console.log(data);

    //Nice.

    //Margin convention: Create a margin object to save the four margins around our graph. Then, we'll translate our entire graph over so that the margins can be used for padding and inclusion of axes! 

    //Because we're including the axes, we'll make the left and bottom a bit larger margin. 

    const margin = {top: 50, right:20, bottom:90, left:90}

    //Now determine the width and height by subtracting out the margins. 

    //Outer dimensions are hard-coded
    const outerWidth = 800;
    const outerHeight = 600;

    const width = outerWidth - margin.left - margin.right;
    const height = outerHeight - margin.top - margin.bottom;

    //We'll make a time scale...
    let dateMin = d3.min(data, d=>d.date)
    let dateMax = d3.max(data, d=>d.date)

    let valMax = d3.max(data, d=>d.value)
    console.log(dateMin, dateMax)
    const xScale = d3.scaleTime()
                    .domain([dateMin, dateMax])
                    .range([0, width])

    const yScale = d3.scaleLinear()
                     .domain([0,valMax])
                     .range([height, 0])

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);


    //Now we're ready to start drawing (almost.) 
    //Do our setup..

    //Notice what's different: we're adding our visualization within a GROUP, that we position inside the SVG using our margins. 
    const svg = d3.select("body").append("svg")
        .attr("id", "line-graph")
        .attr("height", outerHeight)
        .attr("width", outerWidth)
        .style("border", "1px solid black")
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Create our axes using more groups. 
    svg.append("g")
        .call(xAxis)
        .attr("transform", `translate(0,${height})`)
    
    svg.append("g")
        .call(yAxis)

    //Now, we will make our line. Line is one of many D3 "layouts" that help us make some more difficult graphical forms that can't be accomplished with just plain old SVG primitive shapes. 

    //We will give the d3.line() call an x value and a y value, and these will be determined based on our scales and data.
    
    //We are appending a PATH, which is how SVG handles any irregular shapes, and the specific coordinates of that path are calculated by the d3.line() function. It's very useful for this, and we'll set the "d" attribute of the path (fully describes the path, like x y and width and height for rectangles, but all together)

    const line = d3.line()
                    .x(d => xScale(d.date))
                    .y(d=>yScale(d.value))

    svg.append("path")
        .datum(data) //DATUM! ONE! Not data - only passing in one here, because we're only making one line. 
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("stroke-width", 1.5)
        //"d" determines everything, is made using our line generator
        .attr("d", line)
    
})