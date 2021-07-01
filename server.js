const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const { response } = require('express');
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
	client: 'pg',
	connection: {
	  host : '127.0.0.1',
	  user : 'postgres',
	  password : 'admin',
	  database : 'smart-brain'
	}
  });



const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req, res)=>{
	res.json(database.users);
})

app.post('/signin', (req,res)=>{signin.handleSignIn(req,res,db,bcrypt)});
// app.post('/signin', signin.handleSignIn(db,bcrypt)(req,res)); WE CAN ALSO DO THE PREVIOUS LINE THIS WAY


app.post('/register', (req,res)=>{register.handleRegister(req,res,db,bcrypt)});

app.get('/profile/:id', (req,res)=>{profile.handleProfileGet(req,res,db)});

app.put('/image', (req,res)=>{image.handleImage(req,res,db)});






// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

/*
API PLAN:
root / --> res = this is working
/signin --> POST res = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/






app.listen(3004, ()=>{
	console.log('app is running on port 3004');
})