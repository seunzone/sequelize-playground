import express from 'express';
let router = express.Router();
//import fake data
import data from './fakedata'
module.exports = router;
//Create Routes Here
//The Get Route that displays all Puppies
router.get('/', (req, res) => {
	res.send(data)
})

//Get Individual Players
router.get('/:id', (req, res) =>{
	let id = req.params.id;
	let query = req.query;
	let player = data[id];
	Object.keys(query).map(function(key){
		return player[key]
	})
	res.send(data[id]);
})

//Post Request to the Index Route
router.post('/', (req, res) =>{
	let player = req.body
	data.push(player);
	res.redirect('/players');
})

//Put request to update existing data
router.put('/:id', (req, res) => {
	let player = data[req.params.id];
	Object.assign(player, req.body);
	res.send(player);
})
