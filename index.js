const express = require('express');
const app = express();
const dotenv = require('dotenv');
const userRoutes = require('./routes/users.js');
const registerRoutes = require('./routes/register.js');
const loginRoutes = require('./routes/login.js');
const postRoutes = require('./routes/posts.js');
const multer = require('multer');
const path = require('path');
const PORT = process.env.PORT||3001;

dotenv.config();
require('./config/db.connection');

app.use("/images", express.static(path.join(__dirname, "public/images")))

const cors = require('cors');

const whitelist = ['http://localhost:3001', 'http://localhost:3000']
const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }

app.use(cors())
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "/public/images")
  },
  filename: (req, res, callback) => {
    callback(null, file.originalname)
  }
})

const upload = multer();
app.post("/upload", upload.single('file'), (req, res) => {
  try {
    return res.status(200).json("file saved")
  } catch (err) {
    console.log(err)
  }
} )


app.use('/users', userRoutes);
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/posts', postRoutes);

// const Posts = require('./models/post.js');
// const Users = require('./models/user.js');


app.listen(PORT, () =>{
    console.log(`Meat Locker up and running on port ${PORT} 🍖🥩🍗`)
});