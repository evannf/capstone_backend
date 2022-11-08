const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');
const loginRoutes = require('./routes/authorization.js');
const PORT = process.env.PORT||3000;

dotenv.config()
require('./config/db.connection')

// mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}, () => {
//     console.log('Connected to Meat Locker 🍽🤤')
// });


app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.use('/users', userRoutes);
app.use('/login', loginRoutes);



app.listen(PORT, () =>{
    console.log(`Meat Locker up and running on port ${PORT} 🍖🥩🍗`)
})