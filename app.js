//define variables and constants
let containerDiv = document.querySelector('.container');
let userValue = document.getElementById('user-number');
let userSubmit = document.getElementById('user-submit');
let promptText = document.getElementById('prompt');
let copyInput = document.getElementById('copy-input');
let clearButton = document.getElementById('clear-button');
/*nested for loops
*/

userValue.addEventListener('focus', entryHint);
userValue.addEventListener('keyup', duplicateGrid);
userSubmit.addEventListener('click', makeGrid);
clearButton.addEventListener('click', clearGrid);

//Runs makeGrid to draw functions on page load and make default grid 10x10
makeGrid();
draw();

//Indicates to user it's a square grid Y x Y
function duplicateGrid() {
    let userGrid = userValue.ariaValueMax;
    copyInput.textContent = "x " + userGrid;
}

//Save space and clutter on page with appear/disappearing user instructions for grid size
function entryHint() {
    promptText.textContent = "Enter a number between 2 and 99.";
}

//Makes nested divs that are organized into a grid using css flexbox.
//Invalid entries get warning, default grid is 10 x 10, else it is under a defined resolution.
function makeGrid() {
    let number = userValue.value;
    if (number < 0 || number > 99 || isNaN(number)) {  
        promptText.textContent = "Make sure it's a number between 2 and 99!"
    } 
    else {
        promptText.textContent = "";
        copyInput.textContent = "";
        userValue.value = "";
        containerDiv.innerHTML = "";
        if (number == 0 || number > 99 || number == "") {    //for page load
            for(let i = 0; i < 10; i++) {
                let row = document.createElement('div');
                row.classList.add('row');
                containerDiv.appendChild(row);
                for(let k = 0; k < 10; k++) {
                    let column = document.createElement('div');
                    column.classList.add('column');
                    row.appendChild(column);
                }
            }
        }  
        else {
            for(let i = 0; i <number; i++) {
                let row = document.createElement('div');
                row.classList.add('row');
                containerDiv.appendChild(row);
                for(let k = 0; k < number; k++) {
                    let column = document.createElement('div');
                    column.classList.add('column');
                    row.appendChild(column);
                }
            }
        }
    }
    //call draw function here to allow drawing after new grid is made
    draw();
}

//adds event listener to all divs with class "column"
//added in global scope to allow drawing on page load
//this refers to the element triggering the mouseover event listener.
function draw() {
    let columns = document.getElementsByClassName("column");
    for (let i = 0; i < columns.length; i++) {
        columns[i].addEventListener("mouseover" , changeColor);
    }
    function changeColor() {
        let blackRadio = document.getElementById('black-pen');
        let rainbow = document.getElementById('rainbow');
        let eraserRadio = document.getElementById('eraser');

        if (blackRadio.checked) {
            this.style.backgroundColor = '#2e2b2b';
        } else if (eraserRadio.checked) {
            this.style.backgroundColor = ''
        } else if (rainbow.checked) {
            let randomColor = Math.floor(Math.random()*16777215).toString(16);
            this.style.backgroundColor = "#" + randomColor;
        }
    }
}

//eraser function loops through all column divs and ses background to "" in DOM
function clearGrid() {
    let columns = document.getElementsByClassName("column");
    for (let i = 0; i < columns.length; i++) {
        columns[i].style.backgroundColor = '';
    }
}