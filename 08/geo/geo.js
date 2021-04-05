
/*MAPPING, OH BOY.

Before we can do any selectively coloring of states to make choropleth maps, or plotting points, or any of these other fun things we want to do, we have to DRAW the geographical areas we're interested in first. 

We can do this by finding GeoJSON files containing the specific types of regions we're looking to draw. Included in this folder are ones we found for us states, counties, and congressional districts.

*/

//First, basic setup: 

const svg = d3.select("body").append("svg")
    .attr("width", 900)
    .attr("height", 700)


d3.json('us_states.json').then( (states) => 
{ //Now we can do stuff, within braces.

    //What do these data look like? 
    console.log(states);

    //A collection of 52 "features", what for each state, plus PR and DC. 

    //We will use the d3 geoPath function to convert our geographic coordinates into SVG "path" objects.

    //When we create this function, we'll need to specify a specific "projection", which determines how the 3D globe is represented on our 2D screen. We'll use the Albers USA projection to save space, since it moves Hawaii and Alaska to more visible locations. 

    const projection = d3.geoAlbersUsa().scale(1000)
        //.center(wherever you want to center it)
    const pathGenerator = d3.geoPath().projection(projection);

    //Now, using our pathGenerator to do our dirty work, we'll do a data join on the features of our json to generate a path for each state. 
    
    //See what we're going to be joining: 
    console.log(states.features)

    //The whole dataset is ONE giant "featureCollection", with 52 individual features. We want those features (not the one giant collection) for our data join. 

    const statePaths = svg.selectAll(".state-path")
        .data(states.features) //52 states
        .join("path")
        .attr("class", "state-path")
        .attr("d", pathGenerator);

    //d is how you define a path. We're setting d equal to the output of APPLYING OUR PATHGENERATOR FUNCTION to each data item!

    //Now we can style these paths just like anything else. It's pretty wild.
    
    statePaths.attr("stroke", "white")
    statePaths.attr("stroke-width", 5) //Etc.

    statePaths.attr("stroke", "")
    statePaths.attr("stroke-width", "")

    //Now, we can use the properties of these features to style them. To do so, we'll need to see how they're textually representing each state. Full name, or abbreviation? Anything weird? 

    for (i=0; i<states.features.length; i++) {
        //console.log(states.features[i].properties.NAME)
    }

    //Now, we need YET ANOTHER promise to reed in...even more data!
    d3.csv('states-data.csv').then(statesCsv => {
    
        for (i = 0; i<statesCsv.length; i++) {
            //Save the name of the state for referencing in json: 
            let currentCsvState = statesCsv[i].state;

            //Save our data values: 
            let current2020 = statesCsv[i].vote_2020;
            let current2016 = statesCsv[i].vote_2016;
            let currentPctDem2020 = +statesCsv[i].pctDem2020;

            //Now, loop through our states features array.
            for (j = 0; j < states.features.length; j++) {
            
            //Get the sate of this current json item:
                let currentJsonState = states.features[j].properties.NAME;

                //Check to see if the states match:
                if (currentJsonState == currentCsvState) {
                    //Add these properties!
                    states.features[j].properties.vote2020 = current2020;
                    states.features[j].properties.vote2016 = current2016;
                    states.features[j].properties.pctDem2020 = currentPctDem2020
                }


            }
        }

        //Now, we can selectively color the states. Yes, that's literally an enormous amount of work!
        statePaths.style("fill", d=>d.properties.vote2020 == 'D' ? "blue" : "red")
            .style("stroke", "white")
  
        statePaths.on("mouseover",function() {
            d3.select(this).style("opacity", 0.5)
        })

        statePaths.on("mouseout", function() {
            d3.select(this).style("opacity", 1)
        })

        //Adding tooltips!
        //We want to add the tooltip to the BODY, so that we can float it around wherever we need to in the visual, so that it follows the pointer. 

        const tooltip = d3.select("body").append("div")
            .attr("id", "tooltip")
            .style("border", "1px solid black")
            .style("position", "absolute")
            .style("padding", "10px")
            .style("opacity", 0)
            .text("Not currently hovering over a state.")

        //Now, let's have the text change based on the state that we hover over. 

        // statePaths.on("mouseover", function() {
        //     let thisData = d3.select(this).data()[0]
        //     tooltip.text(thisData.properties.NAME)
        //     tooltip.style("opacity", 1)
        // })

        // //And make this stop on mouseout: 
        // statePaths.on("mouseout", function() {
        //     tooltip.style("opacity", 0)
        //     tooltip.text("Not currently hovering over a state.")
        // })

        // //Finally, we'll make the tooltip actually follow our mouse!

        // statePaths.on("mousemove", function(event) {
        //     //console.log(d3.pointer(event)) 

        //     tooltip.style("left", d3.pointer(event)[0]+"px")
        //         .style("top", 20+d3.pointer(event)[1]+"px")

        //     //Notice what happens if you're too close! Your mouse ends up on the div, rather than on the hover events. We can change this: 

        //     tooltip.style("pointer-events", "none")
        //            .style("background-color", "white")
        //            .style("font-family", "Helvetica")
        // })
        
        //If we want, we can make this even more complex through adding multiple lines to the tooltip. 

        let complexTip = d3.select("body").append("div")
            .attr("id", "complex-toooltip")
            .style("position", "absolute")
            .style("background-color", "white")
            .style("padding", "10px")
            .style("border", "1px solid black")

        
        let ctStateName = complexTip.append("div")
                            .text("State name: ")


        let ctStateNameSpan = ctStateName.append("span").style("font-weight", 600)
        
        let ct2016 = complexTip.append("div")
                        .text("2016 vote: ")

        let ct2016span = ct2016.append("span")
                            .style("font-weight", 600);

        let ct2020 = complexTip.append("div")
                        .text("2020 vote: ")

        let ct2020span = ct2020.append("span")
                    .style("font-weight", 600);

        let ct2020VoteShare = complexTip.append("div")
            .text("2020 Dem share: ")

        let ct2020VoteShareSpan = ct2020VoteShare.append("span")
        .style("font-weight", 600)
        
        statePaths.on("mouseover", function() {
            let thisData = d3.select(this).data()[0]
            ctStateNameSpan.text(thisData.properties.NAME)
            complexTip.style("opacity", 1)

            ct2016span.text(thisData.properties.vote2016)
                .style("color", thisData.properties.vote2016 == 'D' ? "blue" : "red")
            ct2020span.text(thisData.properties.vote2020)
                .style("color", thisData.properties.vote2020 == 'D' ? "blue": "red")
            ct2020VoteShareSpan.text(thisData.properties.pctDem2020 + "%")
                .style("color", thisData.properties.vote2020=='D' ? "blue":"red")
        })

        statePaths.on("mouseout", function() {
            complexTip.style("opacity", 0)
        })

        statePaths.on("mousemove", function(event) {
            complexTip.style("left", d3.pointer(event)[0] + 'px')
                    .style("top", d3.pointer(event)[1]+"px")
                    .style("pointer-events", "none")
        })

        //Very lastly, we will plot a circle for my hometown of Washington, PA. 
        //Washington pa: latitude: 40.1740, 80.2462. 

        //Using our "path generator" again from above:
        const washpaCoordinates = projection([-80.2462, 40.1740]);
        console.log(washpaCoordinates);
        svg.append("circle")
            .attr("cx", washpaCoordinates[0])
            .attr("cy", washpaCoordinates[1])
            .attr("r", 5)
            .style("fill", "white")
            .style("stroke", "black")
            .on("mouseover", () => alert("ALERT: You are trying to go to Washington, PA. This is a very bad idea. Turn back immediately."));

        

    })
    
    

})