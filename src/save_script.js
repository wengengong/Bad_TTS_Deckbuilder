module.exports = {
    save : (path) => { 
        // check path 
        if (path.filePath.slice(-5) != '.json') {
            path.filePath += '.json';
        }

        // make json
        cards = document.getElementsByClassName('imagecard');
        json = [];
        for (card of cards) {
            item = {};
            item ['id'] = card.id;
            item ['src'] = card.src;
            item ['x'] = card.offsetLeft;
            item ['y'] = card.offsetTop;
            json.push(item);
        }

        // save json
        var fs = require('fs');
        fs.writeFile(path.filePath, JSON.stringify(json), function(err) {
            if (err) {
                console.log(err);
            }
        });
    }
}
