//canvas and context variable declaration and initiallization
var canvas = document.getElementById("canvasId");
var ctx = canvas.getContext("2d");

//mouse variable
var mouse = {
    pressed: false,
    x: 0,
    y: 0,
}

//scroll speed variable
const SCROLL_SPEED = 5;

//offset and zoom variables for moving and zooming in the canvas
var x_offset = 0;
var y_offset = 0;
var zoom = 100;
var numScale = 1;

//draws the x axis
function drawXAxis() {

    var xCount1 = 0;
    var xCount2 = 0;
    //draws the positive x axis
    for (let i = canvas.width/2 + x_offset; i < canvas.width; i+=zoom) {
        ctx.beginPath();

        // grids
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.moveTo(i, canvas.height/2);
        ctx.strokeStyle = "#bdbdbd";
        ctx.lineWidth = 1;
        ctx.stroke();

        //positive x axis
        ctx.beginPath();
        ctx.moveTo(x_offset, canvas.height/2 + y_offset);
        
        ctx.lineTo(i, canvas.height/2 + y_offset);
        
        ctx.moveTo(i, canvas.height/2 + 10 + y_offset);
        ctx.lineTo(i, canvas.height/2 - 10 + y_offset);
        
        ctx.moveTo(i, canvas.height/2 + y_offset);
        
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;
        ctx.font = 25 + "px " + "arial";
        ctx.fillStyle = "black";
        if (i != canvas.width/2 + x_offset){
            ctx.fillText(xCount1*numScale, i-7, canvas.height/2 - 15 + y_offset);
        }
        ctx.stroke();
        xCount1++;
    }
    //draws the negative x axis
    for (let i = canvas.width/2 + x_offset; i > 0; i-=zoom) {

        //grids
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.moveTo(i, canvas.height/2);
        ctx.strokeStyle = "#bdbdbd";
        ctx.lineWidth = 1;
        ctx.stroke();

        //positive x axis
        ctx.beginPath();
        ctx.moveTo(0, canvas.height/2 + y_offset);
        ctx.lineTo(i, canvas.height/2 + y_offset);
        ctx.moveTo(i, canvas.height/2 + 10 + y_offset);
        ctx.lineTo(i, canvas.height/2 - 10 + y_offset);
        ctx.moveTo(i, canvas.height/2 + y_offset);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;
        ctx.font = 25 + "px " + "arial";
        ctx.fillStyle = "black";
        if (i != canvas.width/2 + x_offset){
            ctx.fillText(xCount2*numScale, i-7, canvas.height/2 - 15 + y_offset);
        }
        ctx.stroke();
        xCount2--;
    }
}
//draws the y axis
function drawYAxis() {

    var yCount1 = 0;
    var yCount2 = 0;

    //dras the positive y axis
    for (let i = canvas.height/2 + y_offset; i < canvas.height; i+=zoom) {

        //grid
        ctx.beginPath();
        ctx.moveTo(0, i);
        if (i != canvas.height/2 + y_offset){
        ctx.lineTo(canvas.width, i);
        ctx.moveTo(canvas.width/2, i);
        }
        ctx.strokeStyle = "#bdbdbd";
        ctx.lineWidth = 1;
        ctx.stroke();

        //negative y axis
        ctx.beginPath();
        ctx.moveTo(canvas.width/2 + x_offset, 0);
        ctx.lineTo(canvas.width/2 + x_offset, i);
        ctx.moveTo(canvas.width/2 + 10 + x_offset, i);
        ctx.lineTo(canvas.width/2 - 10 + x_offset, i);
        ctx.moveTo(canvas.width/2 + x_offset, i);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;
        ctx.font = 25 + "px " + "arial";
        ctx.fillStyle = "black";
        ctx.fillText(yCount1*numScale, canvas.width/2 + 5 + x_offset, i - 5);
        ctx.stroke();
        yCount1--;
    }
    //draws the negative y axis
    for (let i = canvas.height/2 + y_offset; i > 0; i-=zoom) {
        //grid
        ctx.beginPath();
        ctx.moveTo(0, i);
        if (i != canvas.height/2 + y_offset){
        ctx.lineTo(canvas.width, i);
        ctx.moveTo(canvas.width/2, i);
        }
        ctx.strokeStyle = "#bdbdbd";
        ctx.lineWidth = 1;
        ctx.stroke();

        //positive y axis
        ctx.beginPath();
        ctx.moveTo(canvas.width/2 + x_offset, 0);
        ctx.lineTo(canvas.width/2 + x_offset, i);
        ctx.moveTo(canvas.width/2 + 10 + x_offset, i);
        ctx.lineTo(canvas.width/2 - 10 + x_offset, i);
        ctx.moveTo(canvas.width/2 + x_offset, i);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;
        ctx.font = 25 + "px " + "arial";
        ctx.fillStyle = "black";
        ctx.fillText(yCount2*numScale, canvas.width/2 + 5 + x_offset, i - 5);
        ctx.stroke();
        yCount2++;
    }
}
//draw x and y axes
function drawAxes() {
    drawXAxis();
    drawYAxis();
}
//draws background to refresh the page
function background() {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.stroke();
}
//event listener to check scroll wheel for zoom
canvas.addEventListener('mousewheel', function(event) {
    var mousex = event.clientX - canvas.offsetLeft;
    var mousey = event.clientY - canvas.offsetTop;
    zoom += event.deltaY < 0 ? SCROLL_SPEED : -SCROLL_SPEED;
}, false);
//event listener to check if mouse is pressed
canvas.addEventListener('mousedown', (event) => {
    mouse.pressed = true;
});
//event listener to check if mouse is not pressed
canvas.addEventListener('mouseup', (event) =>{
    mouse.pressed = false;
});
//event listener to check the mouse x and y coordinates when mouse is pressed and adds that to the x and y offsets
canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
    if (mouse.pressed == true) {
        x_offset += event.movementX;
        y_offset += event.movementY;
    }
    
});

function graphFunction() {
    functions = boxDataSave()
    for (j = 0; j < functions.length ; j++){
        if (functions[0].length >= 1){
            func = functions[j]
            //This centers the canvas so that the values that are calculated through nerdamer are able to be easily graphed
            ctx.beginPath()
            ctx.translate(canvas.width/2, canvas.height/2);     
            ctx.scale(1,-1);
            if (func.includes("=") && func.includes("y") && func.includes("x")){ // if the input is an equation it will graph it
                try{
                    func2 = nerdamer(func).solveFor("y").toString(); // simplifies the equation so that we only need to plug in x
                    increment = 5/numScale
                    if (increment < 2){// this caps the increment at 2
                        increment = 2
                    }
                    for (i = -(canvas.width/2)-x_offset; i <=(canvas.width/2-x_offset); i += increment){ // This for loop replaces values for x in a corresponding range and makes sure that the program does not cause an error
                        
                        try{
                            func3 = func2.replaceAll("x",`(${i/zoom*numScale})`)
                            y = parseFloat(eval(nerdamer(func3).evaluate().toString())*zoom/numScale-y_offset); // calculates the value of y
                            
                            //This if else statement draws the line
                            if (i == -canvas.width/2-x_offset){
                                ctx.moveTo(i+x_offset,y)
                            }
                            else{
                                ctx.lineTo(i+x_offset,y)
                                console.log(y)
                            }
                        }
                        catch(error){
                            ctx.scale(1, -1);
                            ctx.translate(-canvas.width/2, -canvas.height/2); 
                            ctx.stroke()
                        }
                        
                    } 
                }
                catch(e){

                }   
            }
            ctx.scale(1, -1); 
            ctx.translate(-canvas.width/2, -canvas.height/2); 
            ctx.stroke() 
        }

      }
};

//animates the canvas
function animate() {
    window.requestAnimationFrame(animate);
    background();
    drawAxes();
    graphFunction();
    //resets the scale when the zoom level reaches the zoom cap
    if (zoom >= 200) {
        zoom = 100;
        numScale /= 2;
    } else if (zoom <= 50) {
        zoom = 100;
        numScale *= 2;
    }
}
animate();