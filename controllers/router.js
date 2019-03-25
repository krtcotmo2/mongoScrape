/* eslint-disable prefer-const */
const express = require('express');
const axious = require('axios');
const cheerio = require('cheerio');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Mogo Scraper' });
});

router.get('/getArticles', (req, res) => {
  axious.get('https://www.cnn.com/us')
    .then((results) => {
      let $ = cheerio.load(results.data);
      const artArr = [];
      $('article').each((i, element) => {
        const theheadline = $(element).find('.cd__headline-text').text();
        const thelink = $(element).find('a').attr('href');
        const theSection = $(element).data('section-name');
        if (theheadline && thelink) {
          artArr.push({ headline: theheadline, link: thelink, section: theSection });
        }
      });
      return res.json({ articles: artArr });
    }).catch((err) => {
      res.status(404).json({ message: `no data to return ${err}` });
    });
});

module.exports = router;
