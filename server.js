const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const { response } = require('express');
const signin = require('./controllers/signin');
const register = require('./controllers/register');


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

app.post('/register', (req,res)=>{register.handleRegister(req,res,db,bcrypt)});

app.get('/profile/:id', (req, res)=>{
	const {id} = req.params;
	db.select('*').from('users').where({id: id})
	.then(user=>{
		if(user.length){
		res.json(user[0])
		} else{
			res.status(400).json("User not found")
		}
	})
	.catch(err=>res.status(400).json('Error getting user'))
});

app.put('/image', (req, res)=>{
	const {id} = req.body;
	db('users').where('id','=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries=>{
		res.json(entries[0]);
	})
	.catch(err=> res.status(400).json("unable to get entries"));
})






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