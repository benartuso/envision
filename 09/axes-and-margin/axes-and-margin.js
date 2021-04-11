//Let's start out by building a scatterplot the "wrong" or fudgy way, without utilizing the margin convention. 

//We'll start by reading in our data from a file hosted on my GitHub. 

d3.csv('https://raw.githubusercontent.com/benartuso/nodef19/master/data/03-vis-aesthetics/recent-grads.csv')
    .then((data) => {
        console.log(data);

//We want to make a scatterplot investigating the gender wage gap. To do so, we'll plot the fraction (from 0-1) of people in each major who are men. 

//We'll need to make this variable from the ShareWomen variable, and while we're at it, we should convert the other variables of interest to numerical variables as well. 

    for (i=0; i<data.length; i++) {
        data[i].ShareMen = 1 - +data[i].ShareWomen // Only binary sex categories recorded in this dataset 
        data[i].Total = +data[i].Total;
        data[i].Median  = +data[i].Median;
    };

    console.log(data);

    //Now we're ready to go. Let's make an SVG the old-fashioned way, hard-coding the widths and not allowing for any margins. We'll shoot for the TOTAL SVG DIMENSIONS to be 600 high by 800 wide in both cases. 

    const noMarginSvg = d3.select("body").append("svg")
                            .attr("id", "no-margin")
                            .attr("width", 800)
                            .attr("height", 600)
                            .style("border", "1px solid black");


    //Now, to make our scatter plot, we'll perform a data join. In order to set the x and y positions of each circle, we will first establish a scale. 

    let medianPayMax = d3.max(data, d=>d.Median)

    let peopleMax = d3.max(data, d=>d.Total)

    const xScale = d3.scaleLinear()
                    .domain([0, 1]) // Want to represent 0% to 100% men
                    .range([0, 800]) // Full width of our svg. 
                    
    const yScale = d3.scaleLinear()
                    .domain([0, medianPayMax])
                    .range([600, 0]);

    const rScale = d3.scaleSqrt()
                    .domain([0, peopleMax])
                    .range([0, 25])

    //STOP! DO YOU UNDERSTAND WHY OUR RANGE GOES BACKWARDS, FROM 600 TO 0, INSTEAD OF AS EXPECTED FROM 0 TO 600? 

    //Remember how y coordinates work in D3! 

    const dots = noMarginSvg.selectAll(".dot")
                        .data(data)
                        .join("circle")
                        .attr("class", "dot")
                        .attr("cx", d=> xScale(d.ShareMen))
                        .attr("cy", d=> yScale(d.Median))
                        .attr("r", d=>rScale(d.Total))

    //How do we set color? We'll use D3's ordinal color scale on the domain of the major categories in our data. First, let's check how many categories there are. 

    //This is a bit of a pain - we'll convert the MajorCategory properties to a set, and take its length. 

    let preSet = data.map(d=>d.Major_category);
    let set = new Set(preSet)
    console.log(set.size)

    //Now, we can take an array of 16 colors and save it. 

    //In real vis world, we'd carefully curate this, but today we're going to be a bit lazy and use the first 16 of the tableau 20.
    const colors16 = ['#4E79A7', '#A0CBE8', '#F28E2B', '#FFBE7D',
    '#59A14F', '#8CD17D', '#B6992D', '#F1CE63', 
    '#499894', '#86BCB6', '#E15759', '#FF9D9A',
    '#79706E', '#BAB0AC', '#D37295', '#FABFD2']

    const colorScale = d3.scaleOrdinal()
                        .domain(data.map(d=>d.Major_category))
                        .range(colors16)
    
    dots.style("fill", d=> colorScale(d.Major_category))   

    //Bit of opacity for visibility of all dots: 
    dots.style("opacity", 0.7)

    //Notice a couple of things. The top point, petroleum engineering, is cut off since its cy is on the very edge of the visual! Additionally, let's try to append the axes and see if they're able to show up.

    //First, we'll make our axes. These will take in the scales we've made and use them to generate a whole host of SVG elements, including text, axis lines, and ticks. 

    const xAxis = d3.axisBottom().scale(xScale);
    const yAxis = d3.axisLeft().scale(yScale);

    //Now, for each of these, we will add a group to the visual and "call" the axis on it, instructing the axis be appended to the group. 

    const xAxisSvg = noMarginSvg.append("g")
        .call(xAxis);

    const yAxisSvg = noMarginSvg.append("g")
        .call(yAxis)
    
    //You can see that both axes are out of position. Normally, we'd translate the bottom axis by the length of the visual, like this:
    xAxisSvg.attr("transform", "translate(0, 600)")

    //...but now they're both slightly out of frame! the only solution would be to shift them ONTO the visual, via..

    xAxisSvg.attr("transform", "translate(0, 550)")
    yAxisSvg.attr("transform", "translate(50,0)")

    //But this is a huge hot mess and moves the axes into our data space. The better way to do this would be through the margin convention!

    //1: define our margin object, with the margin for each side. Left and bottom will have larger margins here, as they're where the axes will live. 

    const margin = {top:30, right:30, left:75, bottom:60}

    //2: Using the margin, determine the "inner width" and "inner height" of the chart by taking the OUTER dimension size and subtracting out the margins for that dimension. 

    //Here, we want our total svg space to take up 800 by 600, so we'll define those and then use them to create the inner dimensions.

    const outerHeight = 600;
    const outerWidth = 800;

    const innerHeight = outerHeight - margin.top - margin.bottom;
    const innerWidth = outerWidth - margin.left - margin.right;

    //3: Create our full svg, with dimensions outer-height and outer-width.
    const outerSvg = d3.select("body").append("svg")
                            .attr("height", outerHeight)
                            .attr("width", outerWidth)
                            .style("border", "1px solid black");

    //4: Append a group to this svg that will be our inner chart space. This is where we will append all of our visual elements. 

    const inner = outerSvg.append("g");

    //TAKING STOCK: if we plot a rectangle on inner right now at 0, 0 (since the group hasn't yet been translated over by the margin amounts), that rectangle will appear at the true 0,0 of outerSvg.
    console.log(inner)
    const innerCanvasOutline = inner.append("rect")
        .attr("width", innerWidth)
        .attr("height", innerHeight)
        .attr("x", 0)
        .attr("y", 0)

    //You can see that our innerWidth and innerHeight give us the correct SIZE of the inner plot, but it's not yet centered how we want it to be according to the margins. Let's do this now, with a translation: 
    

    inner.attr("transform", "translate(" + margin.left+","+margin.top+")");

    //You can now see that our translation has successfully achieved the asymmetric margins we were looking for, which will make it much easier to append our axes with room to spare. 
    inner.style("fill", "green");

    //IMPORTANT: FROM NOW ON, WE APPEND ALL OF OUR DATA STUFF TO INNER! This takes care of setting the coordinates for us, yay.

    //Make our scales and axes with the new sizes in mind: 
    const xScaleNew = d3.scaleLinear()
                        .domain([0, 1])
                        .range([0, innerWidth]) // Important
    
    const yScaleNew = d3.scaleLinear()
                        .domain([0, medianPayMax])
                        .range([innerHeight, 0]);

    const xAxisNew = d3.axisBottom().scale(xScaleNew);
    const yAxisNew = d3.axisLeft().scale(yScaleNew);


    //Remove innerCanvasOutline:
    innerCanvasOutline.remove();

    //Append our axes (good to do this first so that any further items will fall on top of the axes, rather than beneath them)
    const x = inner.append("g").call(xAxisNew)
    const y = inner.append("g").call(yAxisNew);

    //Going well! Just need to shift x down a bit.
    x.attr("transform", "translate(0,"+innerHeight+")");


    const xLabel = inner.append("text")
        .text("Proportion of men in major")
        .style("text-anchor", "middle")
        .attr("transform", `translate(${innerWidth/2}, ${innerHeight+margin.bottom/2})`)
        .attr("dy", "1em")
        .style("fill", "black")
    const yLabel = inner.append("text")
        .text("Median income (USD)")
        .attr("transform", "rotate(-90) translate("+-innerHeight/2+"," + -margin.left+")")
        .attr("dy", "1.1em")
        .style("fill", "black")
        .style("text-anchor", "middle")


    console.log(yLabel)

    //And now we can plot just like before. As long as we keep appending to inner, these numbers will be accurate!

    //As a reminder, here's our inner graph space:
    //inner.append("rect")
      //  .attr("width", innerWidth)
        //.attr("height", innerHeight) //Soooooo cool
    
    const newDots = inner.selectAll(".dot")
        .data(data)
        .join("circle")
        .attr("class", "dot")
        .attr("cx", d=> xScaleNew(d.ShareMen))
        .attr("cy", d=> yScaleNew(d.Median))
        .attr("r", d=>rScale(d.Total))
        .style("fill", d=> colorScale(d.Major_category))
    
    
    
    })


    