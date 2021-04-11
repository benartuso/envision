

//Reading in data again...

d3.csv('https://raw.githubusercontent.com/benartuso/nodef19/master/data/03-vis-aesthetics/recent-grads.csv')
    .then((data) => {
        //Do our data processing...
        for (i=0; i<data.length; i++) {
            data[i].ShareMen = 1 - +data[i].ShareWomen // Only binary sex categories recorded in this dataset 
            data[i].Total = +data[i].Total;
            data[i].Median  = +data[i].Median;
        };

        //Now, we'll do our set-up outside of our data join function. 
        //Margin stuff won't change as we change the data, so this can be setup outside. 

        //Make our margin object:
        const margin = {top:30, right:30, left:55, bottom:40}

        //Hard-coding our outer dimensions
    
        const outerHeight = 600;
        const outerWidth = 800;
    
        //Using the margin to create our inner dimensions...
        const height = outerHeight - margin.top - margin.bottom;
        const width = outerWidth - margin.left - margin.right;

        //Creating our outer svg
        const outerSvg = d3.select("body").append("svg")
                            .attr("height", outerHeight)
                            .attr("width", outerWidth)
                            .style("border", "1px solid black")

        //Append your group and translate it over
        const svg = outerSvg.append("g")
                            .attr("id", "main-canvas")
                            .attr("transform", "translate("+margin.left+","+margin.top+")")

        //Append rect with inner dimensions to make sure it worked: 
        svg.append("rect")
            .attr("width", width)
            .attr("height", height)

        //Great!
        svg.select("rect").remove()

        //Let's create our axes here, then change the details of them within our draw function.

        //We're basically setting "starting" values here. these can be for the whole data.
        let xScale = d3.scaleLinear()
                        .domain([0, 1])
                        .range([0, width])
        let yScale = d3.scaleLinear()
                        .domain([0, d3.max(data, d=> d.Median)])
                        .range([height, 0])
        let rScale = d3.scaleSqrt()
                        .domain([0, d3.max(data, d=> d.Total)])
                        .range([0, 25])

        let xAxis = d3.axisBottom()
                      .scale(xScale)
        let yAxis = d3.axisLeft()
                      .scale(yScale)

        //Append axes

        const x = svg.append("g")
            .call(xAxis)
            .attr("transform", "translate(0,"+height+")");

        const y = svg.append("g")
            .call(yAxis)

        const colors16 = ['#4E79A7', '#A0CBE8', '#F28E2B', '#FFBE7D',
        '#59A14F', '#8CD17D', '#B6992D', '#F1CE63', 
        '#499894', '#86BCB6', '#E15759', '#FF9D9A',
        '#79706E', '#BAB0AC', '#D37295', '#FABFD2'] // Color scale won't change
    
        const colorScale = d3.scaleOrdinal()
                            .domain(data.map(d=>d.Major_category))
                            .range(colors16)
        //Now, all of the drawing goes within our function. 

        const draw = (dataset) => {
            //Establish the correct parameters for our scales.
            xScale.range([0, width]);

            yScale.domain([0, d3.max(dataset, d=>d.Median)])
  
            
            //Scale radius to have biggest dot be 25px radius
            rScale.domain([0, d3.max(dataset, d=>d.Total)])


            //Now let's update and our append our Axes. First, link them to the scales. 

            x.transition().duration(500).call(xAxis);
            y.transition().duration(500).call(yAxis)
                

            const newDots = svg.selectAll(".dot")
                .data(dataset)
                .join("circle")
                .style("fill", d=> colorScale(d.Major_category))
                .attr("cx", d=> xScale(d.ShareMen))
                .attr("cy", d=> yScale(d.Median))
                .attr("class", "dot")
                .attr("r", d=>rScale(d.Total))
                .style("opacity", 0.7)
        };

        //For later...
        const fancyDraw = (dataset) => {
            //Establish the correct parameters for our scales.
            xScale.range([0, width]);

            yScale.domain([0, d3.max(dataset, d=>d.Median)])
    
            
            //Scale radius to have biggest dot be 25px radius
            rScale.domain([0, d3.max(dataset, d=>d.Total)])


            //Now let's update and our append our Axes. First, link them to the scales. 

            x.transition().duration(500).call(xAxis);
            y.transition().duration(500).call(yAxis)
                

            const newDots = svg.selectAll(".dot")
                .data(dataset)
                .join(enter => 
                    enter.append("circle")
                         .attr("cy", d=>yScale(d.Median))
                         .attr("class", "dot")
                         .style("fill", d=>colorScale(d.Major_category))
                         .transition().duration(500).delay((d,i) => i*1)
                         .attr("cx", d=>xScale(d.ShareMen))
                         .attr("r", d=>rScale(d.Total)),
                    update => update.transition().duration(500)
                                    .attr("cx", d=>xScale(d.ShareMen))
                                    .attr("cy", d=>yScale(d.Median))
                                    .attr("r", d=>rScale(d.Total))
                                    .style("fill", d=>colorScale(d.Major_category)),
                    exit => exit.transition().duration(500)
                                .attr("r", 0)
                                .remove())
                         
        }

        //Alright. Now, let's enable toggling based on career field. 

        const buttonsDiv = d3.select("body").append('div')
                            .style("width", outerWidth+"px");
        
        //Made our buttons div. Now, we want to append one button for every unique value of Major_category. What would be good for this? A data join, on buttons!

        //Get a list of every unique button: use the new "set" data structure in ES6!

        const majorCategoriesDupe = data.map(d=>d.Major_category);
        console.log(majorCategoriesDupe)

        //Now, we use a new Set to reduce these to only the uniques. 

        const majorCategories = new Set(majorCategoriesDupe);
        console.log(majorCategories);

        //Back to an array: 
        let categoriesArray = Array.from(majorCategories);

        //Let's sort them alaphebtically: 
        categoriesArray = d3.sort(categoriesArray);

        //Now we can do our data join: 

        const buttons = buttonsDiv.selectAll("button")
                            .data(categoriesArray) // Not dataset, or data!
                            .join("button")
                            .text(d=>d)
                            .style("background-color", "white")
                            .style("border", d=>"2px solid "+ colorScale(d))
                            .style("padding", "3px")
                            .style("margin", "3px")
                            .style("color", d=> colorScale(d));

        //What do we want to happen when we click these buttons? 

        //We want to call our draw function on a modified version of the dataset, where the Major_category is equal to the category specified by the button!

        buttons.on("click", function(clickEvent, d) {
            let filteredData = data.filter(row => row.Major_category==d);
            console.log(filteredData)
            fancyDraw(filteredData)
        })



        fancyDraw(data)
    })
