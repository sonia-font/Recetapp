const pageScraper = require('./pageScraper');
const fs = require('fs');

async function scrapeAll(browserInstance, categories){
    for(const category of categories) {
         await scrapeCategory(browserInstance, category)
    }
}

async function scrapeCategory(browserInstance, category){
    let browser;
    try{
        browser = await browserInstance;
        let scrapedData = {};
        scrapedData[category] = await pageScraper.scraper(browser, category);
        await browser.close();

        fs.writeFile(`./recetas/${category}.json`, JSON.stringify(scrapedData), 'utf8', function(err){
            if(err){
                return console.log(err)
            }
            console.log(`Recetas para categoria ${category} guardadas`);
        });
    }
    catch(err){
        console.log("Could not resolve the browser instance => ", err);
    }
}

module.exports = (browserInstance, categories) => scrapeAll(browserInstance, categories)