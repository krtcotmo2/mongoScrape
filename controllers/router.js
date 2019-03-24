const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Mogo Scraper' });
});

module.exports = router;
