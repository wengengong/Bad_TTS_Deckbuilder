let {PythonShell} = require('python-shell');
const { dialog , BrowserWindow } = require('electron');

const searchbtn = document.getElementById('search')
searchbtn.addEventListener('click', function(event){
    // remove all old results
    results = document.getElementsByClassName('result_image');
    while(results[0]){
        results[0].parentNode.removeChild(results[0]);
    }
    
    // create new py-shell task
    let pyshell = new PythonShell('src/image_fetcher.py');

    // call python scrip to search for cards
    pyshell.send(document.getElementById('card_name').value);

    // wait for result
    pyshell.on('message', function (message) {
        console.log(message);
        // create cards (if any)
        // split return using NULL char
        const result = message.split(String.fromCharCode(0));

        //make image
        var image = document.createElement('img');
        image.src = result[0];
        image.width = 95*2;
        image.height = 132*2;
        image.id = result[1];
        image.className = 'result_image';

        // add event listener
        image.addEventListener('dblclick', add_card);
        // add card to deck area
        document.getElementById('results').appendChild(image);
        console.log(message);
        console.log('name: ' + result[1])
    });
    
    // close the py-shell
    pyshell.end(function (err,code,signal) {
        if (err) throw err;
        console.log('The exit code was: ' + code);
        console.log('The exit signal was: ' + signal);
        console.log('finished');
    });
})

// search when you hit enter in the text box
const searchbox = document.getElementById('card_name')
searchbox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById('search').click();
    }
  });

//add a new card to the deck area
function add_card(event){
    console.log('double clicked');
    // creates a copy of the card
    var image = document.createElement('img');
    image.src = event.target.src;
    image.width = 95*2;
    image.height = 132*2;
    image.id = event.target.id;
    image.className = "imagecard";
    image.addEventListener('dblclick', remove_card);
    dragElement(image);
    document.getElementById('deck_area').appendChild(image);
}

// remove a card from the deck area
function remove_card(event){
    event.target.parentNode.removeChild(event.target);
}

/* 
make cards dragable
coppied from ( https://www.w3schools.com/howto/howto_js_draggable.asp )
slightly modified to work with any element 
and added snapping on mouse
*/
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    elmnt.onmousedown = dragMouseDown;
  
    function dragMouseDown(e) {
        // get event
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves
        document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        elmnt.style.zIndex = elmnt.offsetTop;
    }
  
    function closeDragElement() {
        // snap left-right
        if (elmnt.offsetLeft < 350){
            elmnt.style.left = elmnt.offsetLeft = 350 + "px";
            console.log('out of bounds');
        } else {
            if (elmnt.offsetLeft % 100 > 49) {
                elmnt.style.left = elmnt.offsetLeft + (100 - (elmnt.offsetLeft % 100)) + "px";
            } else {
                elmnt.style.left = elmnt.offsetLeft - (elmnt.offsetLeft % 100) + "px";
            }
        }
        // snap up-down
        if (elmnt.offsetTop % 30 > 14) {
            elmnt.style.top = elmnt.offsetTop + (30 - (elmnt.offsetTop % 30)) + "px";
        } else {
            elmnt.style.top = elmnt.offsetTop - (elmnt.offsetTop % 30) + "px";
        }
        elmnt.style.zIndex = elmnt.offsetTop;
        // stop moving when mouse button is released
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
