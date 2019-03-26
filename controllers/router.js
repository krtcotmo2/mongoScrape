/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
/* eslint-disable prefer-const */
const express = require('express');
const axious = require('axios');
const cheerio = require('cheerio');
const db = require('../models');

const router = express.Router();

router.get('/', (req, res) => {
  return res.render('index', { title: 'Mogo Scraper' });
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
      return res.status(404).json({ message: `no data to return ${err}` });
    });
});
router.get('/getSavedArticle', (req, res) => {
  db.Article.find()
    .populate('note')
    .sort({ created: -1 })
    .then((dbMessage) => {
      return res.json(dbMessage);
    });
});
router.post('/saveArticle', (req, res) => {
  db.Article.create(req.body)
    .then((dbMessage) => {
      return res.json({ message: `Success ${dbMessage}` });
    })
    .catch((err) => {
      res.json({ errorMessage: err });
    });
});
router.post('/newComment', (req, res) => {
  db.Note.create(req.body)
    .then((noteResponse) => {
      return noteResponse;
    })
    .then((noteResponse) => {
      req.body.note = noteResponse._id;
      db.Article.create(req.body)
        .then((artData) => {
          res.json(artData);
        });
    });
});
router.get('*', (req, res) => {
  return res.redirect(req.url);
});
module.exports = router;
