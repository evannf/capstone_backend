const express = require('express');
const app = express();
const dotenv = require('dotenv');
const userRoutes = require('./routes/users.js');
const registerRoutes = require('./routes/register.js');
const loginRoutes = require('./routes/login.js');
const PORT = process.env.PORT||3000;

dotenv.config();
require('./config/db.connection');

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.use('/users', userRoutes);
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);



app.listen(PORT, () =>{
    console.log(`Meat Locker up and running on port ${PORT} 🍖🥩🍗`)
});