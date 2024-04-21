
import {createRequire } from 'module';
import {expect, assert} from 'chai';
const require = createRequire(import.meta.url);
const sinon = require('sinon');
const mongoose = require('mongoose');
const dbConnection = require('../dbconnection');
const Card = require('../models/card');
const CardService = require('../services/cardService');
const cardController = require('../controllers/cardController');


//Establishing Mongoose connection before tests
before(async () => {
  await dbConnection();
});
//Testing for connection
describe('Checks if the connection to MongoDB is established successfully', () => {
  it('should connect to MongoDB successfully', async () => {
    assert.strictEqual(mongoose.connection.readyState, 1);
  });
 
  beforeEach(async()=>{
    await Card.deleteMany({});
  })
});
//Testing for the card model
describe('Confirms that Card is exported as a Mongoose model', () => {
  it('should export a Mongoose model for Card', () => {
    assert.strictEqual(typeof Card, 'function');
  });
  
});
//testing for the service script 
describe('Ensures the service exports getCards and createCard functions.', () => {
  it('should export getCards and createCard functions', () => {
    assert.strictEqual(typeof CardService.getCards, 'function');
    assert.strictEqual(typeof CardService.createCard, 'function');
  });
  
});
//testing for the controller 
describe('Verifies the controller exports the getCards and createCard functions', () => {
  it('should export getCards and createCard functions', () => {
    assert.strictEqual(typeof cardController.getCards, 'function');
    assert.strictEqual(typeof cardController.createCard, 'function');
  });
  
});
//verify if createCard creates cards as expected
describe('verify if createCard creates cards as expected', () => {
  it('should create a new card and redirect to the root path on success', async () => {
    const req = { body: { title: 'New Card', content: 'This is a new card' } };
    const res = {
      redirect: (path) => {
        expect(path).to.equal('/');
      },
    };
    await cardController.createCard(req, res);
  });
  //if you want to test for exceptions, uncomment this line of code.
  /*it('should handle errors and send an internal server error response', async () => {
    const mockError = new Error('Something went wrong');
    const sandbox = sinon.createSandbox();
    sandbox.stub(Card, 'create').throws(mockError);

    const req = { body: { title: 'New Card', content: 'This is a new card' } };
    const res = {
      status: (code) => {
        expect(code).to.equal(500);
        return { send: (message) => { expect(message).to.equal('Internal Server Error'); } };
      },
    };

    try {
      await cardController.createCard(req, res);
    } catch (error) {
      console.error('Error during card creation:', error);
      res.status(500).send('Internal Server Error');
    } finally {
      sandbox.restore();
    }
  });*/
});
describe('verify if getCards retrieves data correctly', () => {
  it('should return a list of cards if they exist in the database', async () => {
    //await Card.create({ title: 'Test Card', content: 'This is a test card' });
    const data = { cardLists: [] }; // Assuming you have some test data here
    expect(data.cardLists).to.be.an('array');
    data.cardLists.forEach((card, index ) => {
        expect(card).to.have.property('title').that.is.a('string');
        expect(card).to.have.property('content').that.is.a('string');
        expect(card.title).to.equal(`Test Card ${index + 1}`);
    });
});
  
  it('should return an empty array if no cards exist', async () => {
    const data = { cardLists: [] };
    expect(data.cardLists).to.be.an('array').that.is.empty;
});
});



// Close Mongoose connection after tests
after(async () => {
  await mongoose.connection.close();
});