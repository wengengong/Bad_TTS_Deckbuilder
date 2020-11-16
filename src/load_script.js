module.exports = {
    load : (path) => { 
        // get json file
        var fs = require('fs')
        fs.readFile('' + path.filePaths, 'utf8', (err, jsonString) => {
            var json;
            // check if the file exists
            if (err) {
                console.log(err);
                return;
            }
            try {
                // try to convert
                json = JSON.parse(jsonString);

                //clear the old cards from the div
                old_cards = document.getElementsByClassName('imagecard');
                while(old_cards[0]){
                    old_cards[0].parentNode.removeChild(old_cards[0]);
                }

                // load the json images to the div
                json.forEach(card => {
                    var image = document.createElement('img');
                    image.src = card.src;
                    image.width = 95;
                    image.height = 132;
                    image.style.left = card.x;
                    image.style.top = card.y;
                    image.id = card.id;
                    image.className = "imagecard";
                    image.addEventListener('dblclick', remove_card);
                    dragElement(image);
                    document.getElementById('deck_area').appendChild(image);
                });
            } catch(err) {
                //catches errors
                console.log(err);
            }
        });

        /* 
        Had to copy the drag and remove functions from main
        probably better is i move both to another file 
        and import them since they are used in multiple places 
        but CBA
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
                if (elmnt.offsetLeft < 360){
                    elmnt.style.left = elmnt.offsetLeft = 360 + "px";
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

        function remove_card(event){
            event.target.parentNode.removeChild(event.target);
        }
    }
}