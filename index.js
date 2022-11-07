const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const PORT = process.env.PORT||3000;

dotenv.config()

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}, () => {
    console.log('Connected to Meat Locker 🍽🤤')
});




app.listen(PORT, () =>{
    console.log(`Meat storage up and running on port ${PORT} 🍖🥩🍗`)
})