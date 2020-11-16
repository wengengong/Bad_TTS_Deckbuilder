module.exports = {
    export_deck : (path) => { 
        // check path 
        if (path.filePath.slice(-5) != '.json') {
            path.filePath += '.json';
        }

        // get cards
        cards = document.getElementsByClassName('imagecard');
        
        /* 
        make a 'deck' object
        format reverse engineered from https://www.frogtown.me/
        */
        deck = {};
        var id_counter = 100;
        // deck name
        deck ['name'] = 'DeckCustom';
        // 'cards' objects are stored in a array
        deck ['ContainedObjects'] = [];
        // object IDs in the deck
        deck ['DeckIDs'] = [];
        // object display data (image URLs, size, if it's visible in hand)
        deck ['CustomDeck'] = {};
        // generate data for each card
        for (card of cards) {
            item = {};
            // for some reason the ID das to be in 100s? 
            item ['CardID'] = id_counter;
            item ['Name'] = 'card';
            // the actual name displayed on the card
            item ['Nickname'] = card.id;
            item ['Transform'] = {"posX":0,"posY":0,"posZ":0,"rotX":0,"rotY":180,"rotZ":180,"scaleX":1,"scaleY":1,"scaleZ":1};
            deck['DeckIDs'].push(id_counter);
            deck.CustomDeck[(id_counter / 100).toString()] = {
                FaceURL: card.src,
                /* 
                rob the back from frog town
                should probably find a different source
                or ask for permission to use it
                */
                BackURL: "https://s3.amazonaws.com/frogtown.cards.hq/CardBack.jpg",
                NumHeight: 1,
                NumWidth: 1,
                BackIsHidden: true
            };
            deck.ContainedObjects.push(item);
            id_counter += 100;
        }
        // how the deck reacts when rotated
        deck['Transform'] = {"posX":0,"posY":1,"posZ":0,"rotX":0,"rotY":180,"rotZ":180,"scaleX":1,"scaleY":1,"scaleZ":1};
        
        // TTS only accepts a array of 'deck' objects
        json = {ObjectStates: [deck]};
        // save json
        var fs = require('fs');
        fs.writeFile(path.filePath, JSON.stringify(json), function(err) {
            if (err) {
                console.log(err);
            }
        });
    }
}