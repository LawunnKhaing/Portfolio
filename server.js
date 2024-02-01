const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Ignore favicon requests
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://Lawunn:Petra1005@cluster.1qhaeok.mongodb.net/Contact", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const dataSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  message: String
});

const Contact = mongoose.model('Data', dataSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.post('/', async (req, res) => {
  const newData = new Contact({
    fullName: req.body.fullName,
    email: req.body.email,
    message: req.body.message
  });

  try {
    await newData.save();
    // Redirect back to contact.html with a success query parameter
    res.redirect('/contact.html?status=success');
  } catch (err) {
    console.error(err);
    // Redirect back to contact.html with an error query parameter
    res.redirect('/contact.html?status=error');
  }
});

// Serve the contact.html file for any other route
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/contact.html');
});

module.exports = app;


