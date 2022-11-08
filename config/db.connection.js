const mongoose = require('mongoose');

// Connection String - connect to process.env or connect to local database 
const connectionStr = process.env.MONGODB_URI

mongoose.connect( connectionStr);

// set up listeners to monitor your database connection
mongoose.connection.on('connected', ()=> console.log('Connected to Meat Locker 🍽🤤'));

mongoose.connection.on('error', (err)=> console.log(err.message));

mongoose.connection.on('disconnected', ()=> console.log('mongoose disconnected'));
