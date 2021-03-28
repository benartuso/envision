/*PRACTICE UPDATES:

This file creates an extremely basic scatterplot where the x axis is number of losses, the y axis is the number of wins, circle radius is proportional to the number of fans, and the circles are colored according to the team's color. 

Right now, the graph is hand-coded to render only for data1. 

Change this!! Move the data joining into an function called "draw" with the parameter "dataset", then bind two buttons: one to draw dataset one, and the other to draw dataset two.

Add transitions for some extra flair, if you wish!

IGNORE DATA3 FOR NOW! We will use this in the scales exercise.
*/


data1 = [
    {wins:13, losses:8, fans:10000, teamColor:"blue"},
    {wins:6, losses:13, fans:5000, teamColor:"orange"},
    {wins:7, losses: 8, fans:12000, teamColor:"gold"},
    {wins:14, losses: 5, fans:15000, teamColor:"red"},
    {wins:10, losses: 5, fans:8000, teamColor:"green"}
]

data2 = [
    {wins:6, losses:9, fans:10000, teamColor:"blue"},
    {wins:15, losses:7, fans:5000, teamColor:"orange"},
    {wins:2, losses: 10, fans:12000, teamColor:"purple"},
    {wins:13, losses: 6, fans:15000, teamColor:"black"},
    {wins:8, losses: 10, fans:8000, teamColor:"pink"}
]

data3 = [
    {wins:32, losses:25, fans:130000, teamColor:"blue"},
    {wins:15, losses:27, fans:500000, teamColor:"orange"},
    {wins:37, losses: 40, fans:120000, teamColor:"purple"},
    {wins:56, losses: 13, fans:10000, teamColor:"black"},
    {wins:27, losses: 27, fans:80000, teamColor:"pink"}
]

const body = d3.select("body")

//Append our SVG canvas for scatter plot

const svg = body.append("svg")
                .attr("id", "scatter")
                .attr("width", 500)
                .attr("height", 500)
                .style("border", "1px solid grey")
                .style("display", "block")
                .style("margin", "0 auto");

const teamCircles = svg.selectAll(".team-circle")
    .data(data1)
    .join("circle")
    .attr("class", "team-circle")
    .attr("cx", d => d.losses*30)
    .attr("cy",  d=> d.wins*30)
    .attr("r", d=> d.fans/500)
    .style("fill", d=>d.teamColor)

//Adding the buttons...
const buttonDiv = body.append("div").attr("id", "buttonDiv")
                        .style("width", "20%")
                        .style("margin", "0 auto")

const oneButton = buttonDiv.append("button").attr("id", "one").text("Draw dataset 1")
const twoButton = buttonDiv.append("button").attr("id", "two").text("Draw dataset 2")

//FILL IN THE FUNCTION BELOW (you'll need to move the data join code around!)

const draw = (dataset) => {
    //Do data join stuff here
}

//NOW, BIND THE BUTTONS. 

oneButton.on("click", () => console.log("replace this console log with what you want to do on click"))
twoButton.on("click", () => console.log("replace this console log with what you want to do on click"))