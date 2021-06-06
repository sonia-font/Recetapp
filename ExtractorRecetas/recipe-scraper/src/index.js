const browserObject = require('./browser');
const scraperController = require('./pageController');

// Start the browser and create a browser instance
let browserInstance = browserObject.startBrowser();
let categories = ['Verduras']
/*let categories = ['Aperitivos y tapas', 'Arroces y cereales', 'Aves y caza', 'Carne', 'Cócteles y bebidas', 'Ensaladas', 'Guisos y Potajes', 'Huevos y lácteos', 'Legumbres', 'Mariscos', 'Pan y bollería', 'Pasta', 'Pescado', 'Postres', 'Salsas', 'Sopas y cremas', 'Verduras']*/

// Pass the browser instance to the scraper controller
scraperController(browserInstance, categories)