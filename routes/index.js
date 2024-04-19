const express = require('express');
const cardController = require('../controllers/cardController');

const router = express.Router();

router.get("/", cardController.getCards);
router.post("/", cardController.createCard);

module.exports = router;
