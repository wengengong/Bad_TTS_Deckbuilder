# Bad_TTS_Deckbuilder

A bad Table Top Simulator (TTS) deck builder for magic the gathering, Based on the great Frogtown (https://www.frogtown.me/) website (pls dont sue me frogtown). Scrapes images directly from gatherer database.

<h2>Why?</h2>

Because I was bored.

<h2>How?</h2>

 - Electron for the front end because its easier to make things look good.
 - Web scrape the images from gatherer using node-fethch and cheerio.
    -Lighter weight than puppeteer
 
<h2>Issues</h2>

 - Bad card alignment in deckbuilding area
 - Can only search by name
 - Only lists the first page of results from gatherer
 - Only has a maindeck, no spot for side board or commanders
 - No token generation
