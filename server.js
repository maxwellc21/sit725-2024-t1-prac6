const path = require('path')
const express = require('express');
const connectDB = require('./dbconnection');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const routes = require('./routes/index');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
connectDB();

app.use('/', routes); // Use routes defined in index.js

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
