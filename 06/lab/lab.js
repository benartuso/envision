//Here's your data: 

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

//1: Select the body and save it in an variable. 


//2: Append an svg to this body to use as your canvas. You can choose the dimensions, but it should be wide enough to facilitate the bar graph example shown. Save this in a variable, too!


/*3: Data join! Append a rectangle for each data item, saving them in the variable "rects" as you go.
   - Select all existing rectangles 
   - Bind them to the data to create enter/exit selection
   - Use join to add rectangles for each item in the enter selection
   - Give them a constant width and height

After this step, there should be 10 rectangles on your page. They will only appear as one rectangle, though, since they'll all have identical x and y position of 0 and 0.

*/ 


//Now, time to correctly position them. 

//Their WIDTH should be a function of the number of students, and their Y POSITION should be a function of i. 





//Finally, change the color! This will require you to write and use a small function that will return #FF6E6A when type = Creative,  #8738E5 when type = Technical.


//Now use this to change the fill property of the rectangles. 


//Add text to go at the beginning of each rectangle! X will be 0 (or a bit more than 0, for some nice visual appearance of left padding) for all of these, but you'll need a slight vertical shift to vertically center it in the bar. 

//ERROR ALERT! We're going to add two different kinds of text, so you need to make sure that instead of doing svg.selectAll("text") you're instead doing svg.selectAll(".course-names") and svg.selectAll(".numbers"). Use the help function if you have questions about this! Start with course-names for now.

//We've actually made a class for you in the lab.css file called course-names, so you can just apply that class .attr("class", "course-names") and this will take care of most of the CSS. You'll still probably need to add a bit of left padding or margin, though!

//YOUR course-names data join here:


//Finally, one more data join to add additional black text coming off of the bars, with the number of students enrolled in each course. Use the class "numbers" for this.

