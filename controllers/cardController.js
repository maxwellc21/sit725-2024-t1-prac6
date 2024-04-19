const cardService = require('../services/cardService');

const getCards = async (req, res) => {
  try {
    const cards = await cardService.getCards();
    res.render('index', {
      cardLists: cards
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const createCard = async (req, res) => {
  try {
    await cardService.createCard(req.body.title, req.body.content, req.body.image);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getCards,
  createCard
};