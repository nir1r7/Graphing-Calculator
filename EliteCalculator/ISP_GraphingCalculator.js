function isNumber(char) { // checks if a char is a number
    return /^\d$/.test(char);
}

let newBoxCounter = 0; // the number of new boxes created
boxes = [newBoxCounter]; // creates an array of the number of inputboxes
document.getElementById("newbox").addEventListener('click', addBox); 
function addBox(){ // this function adds a box to the table of boxes
    newBoxCounter++;
    if (boxes.length == 16) document.getElementById("newbox").parentNode.removeChild(document.getElementById("newbox")); // prevents the number of input boxes to exceed 16
    boxData = boxDataSave(); // saves the data inside the input boxes
    document.getElementById("inputbox").innerHTML += `<tr><td><input id='${-newBoxCounter}' type='text' placeholder='Type here'></td><td><button id='${newBoxCounter}' onclick='removeBox()'>-</button></td></tr>`;
    boxDataDisplay(boxData); // displays the saved data inside the input boxes
    boxes.push(newBoxCounter); // adds another element to the array of input boxes
}

function removeBox(){ // remove box function
    box = boxes.indexOf(parseInt(event.target.id)); // finds the index of the id of the button being clicked in the input boxes array
    document.getElementById("inputbox").deleteRow(box+1); // deletes the table row at the index found in the previous line
    boxes.splice(box,1); // removes that element from the boxes array
    if (boxes.length == 16){ // turns the input box table back to its original form if the number of inputboxes is less than 16 
        document.getElementById("newboxpadding").innerHTML += "<button id='newbox'>+</button>";
        document.getElementById("newbox").addEventListener('click', addBox); 
    }
}

function boxDataSave(){ // saves all the data inside the input boxes
    boxesData = []; // array storage
    for (let i = 0; i < boxes.length; i++){ // for loop
        boxesData.push(document.getElementById(`${-boxes[i]}`).value); // adds the value of each input box as a string to the array
    }
    return boxesData; // returns the array
}

function boxDataDisplay(data){ // displays the data that was saved in the boxDataSave() function
    for (let i = 0; i < boxes.length; i++){ // for loop
        document.getElementById(`${-boxes[i]}`).value = data[i]; // adds the data back to the input boxes
    }
}






