const cheerio = require('cheerio');
const fetch = require('node-fetch');
const https = require('https');

module.exports = {fetch_image} ;

async function fetch_image(card_name){
    var srcs = [];

    if (card_name.trim() == "") {
        return srcs;
    };
    //form the url
    var url = "https://gatherer.wizards.com/Pages/Search/Default.aspx?action=advanced&name="
    var words = card_name.split(" ");
    words.forEach(word => {
        url = url + '+[' + word + ']';
    });


    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
      });

    //get the image src's
    const res = await fetch(url, {agent: httpsAgent});
    const html = await res.text();
    const $ = cheerio.load(html);
    
    $('img').each((i, img) => {
        if ($(img).attr('width') == '95') {
            const tempsrc = $(img).attr('src');
            const src = 'https://gatherer.wizards.com/' + (tempsrc.replace('../../', '')); 
            const name = $(img).attr('alt');  
            srcs.push([src, name]);
        }
    });

    return srcs;
}