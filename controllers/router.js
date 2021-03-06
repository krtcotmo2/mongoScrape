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
      res.status(409).json({ friendlyMessage: 'This story has already been saved', errorMessage: err });
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
router.post('/updateComment/:id', (req, res) => {
  let artId = req.params.id;
  db.Article.findOne({ _id: artId })
    .then((artData) => {
      if (artData.note === undefined) {
        db.Note.create(req.body)
          .then((noteData) => {
            db.Article.update({ _id: artId }, { note: noteData._id }, (err, data) => {
              if (err) {
                return req.status(500).json({ errorMessage: 'Unable to add note to the article' });
              }
              return res.json(data);
            });
          });
      } else {
        db.Note.update({ _id: artData.note }, req.body, (err, data) => {
          if (err) {
            return res.status(500).json({ errorMessage: 'Can not update note' });
          }
          return res.json(data);
        });
      }
    });
});
module.exports = router;
