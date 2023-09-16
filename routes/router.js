const path = require('path');
const express = require('express');
const mainController = require('../controllers/mainConstroller');
const router = express.Router();

router.get('/',mainController.getIndex);
router.post('/bookEntry',mainController.postBookEntry);
router.get('/getIssuedBooks',mainController.getIssuedBooks)
router.post('/returnBook',mainController.postReturn);

module.exports = router;