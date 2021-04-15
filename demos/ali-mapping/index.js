const svg = d3.select("body").append("svg")
                .attr('width', 700)
                .attr("height", 500)
                .style("border", "1px solid black");


d3.json("Bicycle_Lane_Lines.geojson").then(data => {

    console.log(data.features);

    const projection = d3.geoMercator().scale(1000000).center([-78.4767, 38.0293]);
    const pathGenerator = d3.geoPath().projection(projection)

    const bikePaths = svg.selectAll(".bike-path")
            .data(data.features)
            .join("path")
            .attr("class", "bike-path")
            .attr("d", pathGenerator)
            .style("fill", "none")
            .style("stroke", "black")
            .style("stroke", d=>d.properties.FacilityStatus=='PROPOSED' ? "blue" : "red")


})
