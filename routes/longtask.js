const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.startTime('longtask', 'The long task is running');
  setTimeout(() => {
    res.endTime('longtask');
    return res.send('long task')
  }, 5000);
});

module.exports = router;
