const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.startTime('shorttask', 'The short task is running');
  res.send('short task');
  res.endTime('shorttask');
});

module.exports = router;
