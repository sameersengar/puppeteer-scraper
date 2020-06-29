const puppeteer = require('puppeteer');
const $ = require('cheerio');

const url = 'https://www.flipkart.com/nokia-8-1-blue-64-gb/p/itme8f13ad18e6bc'; // product out of stock
//const url = 'https://www.flipkart.com/realme-x2-pearl-white-64-gb/p/itm75023903eb431'; // Product in stock

async function configureBrowser() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    return page;
}

async function checkStock(page) {
    await page.reload();
    let html = await page.evaluate(() => document.body.innerHTML);
    //console.log(html);

    var check = $('._1mzTZn', html).each(function() {
        let isStock = $(this).text();
        //console.log(isStock);
    });
    
    if(check.length == 1){
    	console.log("OUT OF STOCK");
    	process.exit();
    }
    else{
    	console.log("IN STOCK");
    	process.exit();
    }
    
}

async function startTracking() {
    const page = await configureBrowser();
    checkStock(page);
}

startTracking();
