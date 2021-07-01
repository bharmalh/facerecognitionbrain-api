const handleSignIn = (req,res,db,bcrypt)=>{
// const handleSignIn = (db,bcrypt) => (req,res) => { If we are to use the way we did Line 34 in Server.js file then here we do this 
	db.select('email', 'hash').from('login')
	.where('email','=', req.body.email)
	.then(data=>{
		const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
		if (isValid){
			db.select('*').from('users')
			.where('email','=',req.body.email)
			.then(user=>{
				res.json(user[0])
			})
			.catch(err=>res.status(400).json('unable to get user'))
		} else{
		res.status(400).json('wrong credentials')
		}
	})
	.catch(err=>res.status(400).json('wrong credentials'))
}

module.exports={
	handleSignIn: handleSignIn
};
