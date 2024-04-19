const Card = require('../models/card');

const getCards = async () => {
  try {
    return await Card.find({});
  } catch (error) {
    throw error;
  }
};

const createCard = async (title, content, imageURL) => {
  try {
    return await Card.create({ title, content, imageURL });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getCards,
  createCard
};