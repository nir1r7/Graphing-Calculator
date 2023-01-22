inputBox = document.getElementById("textbox")
hasEval = false
previousAnswer = 0
shiftMode = 1
degreeMode = "radians"
shifts = ["","-1"]
//event listeners for the buttons on the calculator
document.getElementById("shift").addEventListener("click",function(){shiftButton()})
document.getElementById("sin").addEventListener("click",function(){addToField(`sin${shifts[shiftMode-1]}(`)})
document.getElementById("cos").addEventListener("click",function(){addToField(`cos${shifts[shiftMode-1]}(`)})
document.getElementById("tan").addEventListener("click",function(){addToField(`tan${shifts[shiftMode-1]}(`)})
document.getElementById("trigMode").addEventListener("click",function(){changeMode()})
document.getElementById("shift").addEventListener("click",function(){})
document.getElementById("abs").addEventListener("click",function(){addToField("abs(")},true)
document.getElementById("cubed").addEventListener("click",function(){addToField("^3")})
document.getElementById("-1").addEventListener("click",function(){addToField("^-1")})
document.getElementById("sqrt").addEventListener("click",function(){addToField("√(")})
document.getElementById("10^").addEventListener("click",function(){addToField("10^")})
document.getElementById("square").addEventListener("click",function(){addToField("^2")})
document.getElementById("pow").addEventListener("click",function(){addToField("^")})
document.getElementById("log10").addEventListener("click",function(){addToField("log10(")})
document.getElementById("ln").addEventListener("click",function(){addToField("ln(")})
document.getElementById("(-)").addEventListener("click",function(){addToField("-")})
document.getElementById("(").addEventListener("click",function(){addToField("(")})
document.getElementById(")").addEventListener("click",function(){addToField(")")})
document.getElementById("1").addEventListener("click",function(){addToField("1")})
document.getElementById("2").addEventListener("click",function(){addToField("2")})
document.getElementById("3").addEventListener("click",function(){addToField("3")})
document.getElementById("4").addEventListener("click",function(){addToField("4")})
document.getElementById("5").addEventListener("click",function(){addToField("5")})
document.getElementById("6").addEventListener("click",function(){addToField("6")})
document.getElementById("x").addEventListener("click",function(){addToField("x")})
document.getElementById("/").addEventListener("click",function(){addToField("/")})
document.getElementById("7").addEventListener("click",function(){addToField("7")})
document.getElementById("7").addEventListener("click",function(){addToField("8")})
document.getElementById("9").addEventListener("click",function(){addToField("9")})
document.getElementById("+").addEventListener("click",function(){addToField("+")})
document.getElementById("-").addEventListener("click",function(){addToField("-")})
document.getElementById("0").addEventListener("click",function(){addToField("0")})
document.getElementById(".").addEventListener("click",function(){addToField(".")})
document.getElementById("pi").addEventListener("click",function(){addToField("π")})
document.getElementById("Ans").addEventListener("click",function(){addToField("Ans")})
document.getElementById("DEL").addEventListener("click",function(){deleteLast()})
document.getElementById("AC").addEventListener("click",function(){allClear()})
document.getElementById("=").addEventListener("click",function(){evaluate()})

function addToField(element){
    if (hasEval){
        inputBox.value = ""
        hasEval = false
    }
    inputBox.value += element
}
//function that evaluates the value in the text box
function evaluate(){
    hasEval = true
    stringEval = inputBox.value
    if (degreeMode == "radians"){ // if the degree mode is radians, it replaces the trig functions differently
        inputBox.value = inputBox.value.replaceAll("sin(","Math.sin(")
        inputBox.value = inputBox.value.replaceAll("cos(","Math.cos(")
        inputBox.value = inputBox.value.replaceAll("tan(","Math.tan(")
        inputBox.value = inputBox.value.replaceAll("tan-1(","Math.atan(")
        inputBox.value = inputBox.value.replaceAll("sin-1(","Math.asin(")
        inputBox.value = inputBox.value.replaceAll("cos-1(","Math.acos(")
    }
    else{ // if the degree mode is in degrees, it is multiplied by a constant so that it converts radians to degrees
        inputBox.value = inputBox.value.replaceAll("sin(","Math.sin(Math.PI/180 *")
        inputBox.value = inputBox.value.replaceAll("cos(","Math.cos(Math.PI/180 *")
        inputBox.value = inputBox.value.replaceAll("tan(","Math.tan(Math.PI/180 *")
        inputBox.value = inputBox.value.replaceAll("tan-1(","180/Math.PI*Math.atan(")
        inputBox.value = inputBox.value.replaceAll("sin-1(","180/Math.PI*Math.asin(")
        inputBox.value = inputBox.value.replaceAll("cos-1(","180/Math.PI*Math.acos(")
    }
    inputBox.value = inputBox.value.replaceAll("π","Math.PI")
    inputBox.value = inputBox.value.replaceAll("log10(","Math.log10(")
    inputBox.value = inputBox.value.replaceAll("ln(","Math.log(")
    inputBox.value = inputBox.value.replaceAll("^","**")
    inputBox.value = inputBox.value.replaceAll("abs(","Math.abs(")
    inputBox.value = inputBox.value.replaceAll("√","Math.sqrt")
    inputBox.value = inputBox.value.replaceAll("x","*")
    inputBox.value = inputBox.value.replaceAll("Ans",previousAnswer)
    console.log(inputBox.value)
    try{
        inputBox.value = parseFloat(eval(inputBox.value).toFixed(9)) // this rounds the values to 9 decimal places so that there is no floating point error
        previousAnswer = inputBox.value
    }
    catch(e){ // If there is a problem with the user input then it prints it out on the calculator screen, like a normal calculator
        inputBox.value = e.name
    }
}

function allClear(){ // clears the input box of the calculator
    inputBox.value = ""
}

function deleteLast(){ // this function deletes the last character inputted on the input box
    inputBox.value = inputBox.value.slice(0,-1)
}
//shift button that lets you use the alternate function of the buttons
function shiftButton(){
    if (shiftMode == 1){
        shiftMode = 2
    }
    else{
        shiftMode = 1
    }
    console.log("This function changes the function of the other buttons to the second version")
}
//changes from radians to degrees and degrees to radians
function changeMode(){
    if (degreeMode == "radians"){
        degreeMode = "degrees"
    }
    else{
        degreeMode = "radians"
    }
    console.log("This function changes the mode of the calculator between degrees and radians")
}