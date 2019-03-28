# This is not CNN (almost)
![alt text](https://img.shields.io/badge/uses-node-brightgreen.svg) ![alt text](https://img.shields.io/badge/uses-cheerio-brightgreen.svg) ![alt text](https://img.shields.io/badge/uses-express-brightgreen.svg) ![alt text](https://img.shields.io/badge/uses-mongoose-brightgreen.svg) ![alt text](https://img.shields.io/badge/uses-axious-brightgreen.svg) ![alt text](https://img.shields.io/badge/uses-handlebars-blue.svg) ![alt text](https://img.shields.io/badge/uses-bootstrap-blue.svg)

I looked at several different news sites for feeds and very few had details below the headline. NYT did but there was a range of different styleing which made parsing the data more cumbersome. The mongo db and mongoose made saving files easier.

When the user clicks on  the add artilce button, it will attempt to save the article first and then the comment to the db if the article is on the new stories page. If the article is on the saved story pages, it updates the note instead of creating a new one.

I added error status and custom messages to appear if an error occures while attempting to save and artilce. The easist way to trigger an error is to try and save an article that has already been saved to the db.
