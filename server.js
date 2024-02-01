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
app.get('/', (req, res) => {
  res.sendFile('public/contact.html', { root: __dirname });
  // res.sendFile(__dirname + '/contact.html');
});

app.post('/api/contact', async (req, res) => {
  const newData = new Contact({
    fullName: req.body.fullName,
    email: req.body.email,
    message: req.body.message
  });

  try {
    await newData.save();
    res.send('Message sent successfully.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving data.');
  }
});

module.exports = app;

// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));

// // Connect to MongoDB Atlas
// mongoose.connect('mongodb+srv://Lawunn:Petra1005@cluster.1qhaeok.mongodb.net/Contact', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// // Create a MongoDB schema and model for the contact form data
// const contactSchema = {
//   fullName: String,
//   email: String,
//   message: String
// };

// const Contact = mongoose.model("Contact", contactSchema);

// app.get('/', function(req, res) {
//   res.sendFile(__dirname + '/contact.html');
// });

// app.post('/', function(req, res) {
//   // Create a new contact instance
//   let newContact = new Contact({
//     fullName: req.body.fullName,
//     email: req.body.email,
//     message: req.body.message
//   });

//   // Save the new contact to the database
//   newContact.save()
//     .then(() => {
//       console.log('Contact added!');
//       res.redirect('/'); // Redirect to the contact.html page or another confirmation page
//     })
//     .catch(err => {
//       console.error('Error:', err);
//       res.status(500).send('Internal Server Error');
//     });
// });

// app.listen(5500, function() {
//   console.log("Server started on port 5500");
// });
