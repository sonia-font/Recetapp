const scraperObject = {
    url: 'https://www.recetasgratis.net/', 
    async scraper(browser, category){
        let page = await browser.newPage();
        page.setDefaultNavigationTimeout(0);
        console.log(`Navigating to ${this.url}...`);

        // Navigate to the selected page
        await page.goto(this.url);    

        // Search selected category
        let selectedCategory = await page.$$eval('a.ga', (links, _category) => {
            //Search for element with matching text
            links = links.map(a => a.textContent.replace(/(\r\n\t|\n|\r|\t|^\s|\s$|\B\s|\s\B)/gm, "") === _category ? a : null);
            let link = links.filter(tx => tx !== null)[0];
            return link.href;
        }, category);

        // Navigate to selected category
        await page.goto(selectedCategory);
        let scrapedData = [];
        
        // Wait for the required DOM to be rendered
        async function scrapeCurrentPage(){
            await page.waitForSelector('.main-content');

            // Get the link to all recipes
            let urls = await page.$$eval('.link', links => {
                // Extract the links from the data
                links = links.map(el => el.querySelector('a').href)
                return links;
            });

            //console.log(urls);
            
            //Loop through each of those links, open a new page instance and get the relevant data
            let pagePromise = (link) => new Promise(async(resolve, reject) => {
                try{
                    let dataObj = {};
                    let newPage = await browser.newPage();
                    await newPage.goto(link);
    
                    dataObj['title'] = await newPage.$eval('article > h1', text => text.textContent.replace('Receta de ',''));
                    dataObj['imagen'] = await newPage.$eval('.lupa > img', item => item.src);
                    dataObj['comensales'] = await newPage.$eval('.comensales', text => text.textContent.replace(' comensales',''));
                    dataObj['duracion'] = await newPage.$eval('.duracion', text => text.textContent.replace('m',''));
                    dataObj['dificultad'] = await newPage.$eval('.dificultad', text => text.textContent);
                    dataObj['caracteristicas'] = await newPage.$eval('.recipe-info > .inline', text => text.innerText.replace('Características adicionales: ',''));                    
                    dataObj['ingredientes'] = await newPage.$$eval('li.ingrediente > label', items => {
                        items = items.map(el => el.innerText)
                        return items;
                    });
    
                    resolve(dataObj);
                    await newPage.close();
                }
                catch{
                    resolve(null);
                }                
            });

            for(link in urls){
                let currentPageData = await pagePromise(urls[link]);
                
                if (currentPageData != null) {
                    scrapedData.push(currentPageData);
                }
            }

            //When all the dara on this page is done, click next
            let nextButtonExists = false;
            try{                
                const nextButton = await page.$eval('a.next', a => a.textContent);
                console.log('Next');
                nextButtonExists = true;
            }
            catch(err){
                nextButtonExists = false;
                console.log('End');
            }

            if(nextButtonExists){
                await page.click('a.next');
                return scrapeCurrentPage();
            }

            await page.close()
            return scrapedData;
        }

        let data = await scrapeCurrentPage();
        return data;        
    }
}

module.exports = scraperObject;