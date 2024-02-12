// require('dotenv').config();

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const contactRouter = require('./routes/contactRoutes');

// const app = express();

// const port = process.env.PORT || 3000;

// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use('/api',contactRouter);

// const mongoURI = process.env.MONGODB_URI || 'fallback_connection_string';

// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB!');
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });



require('dotenv').config();
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const contact_router = require('./routes/contactRoutes');

const app = express();

const port = process.env.PORT || 3000;
app.use(cors());
app.use(contact_router);

const mongoURI = process.env.MONGODB_URI || 'fallback_connection_string';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});