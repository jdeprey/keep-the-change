var database = require('../util/database.js'),
knex = database.connect(),
rendering = require('../util/rendering'),
navbar = require('../util/navbar');

/* TODO: Create support for charity images. For now, each image src is given as 'http://placehold.it/300x300' */

exports.formCardsArray = function(callback) {
	cardsArray =[];

	knex.select('name').from('charities').orderBy('name', 'asc').limit(12).then(function(charityNames) {
		for (i = 0; i < charityNames.length; i++) {
			var card = [];
			card.push(charityNames[i].name);
			card.push('img/300x300.png'); // This is the hardcoded image source line. Needs to change, possibly
													  // along with the query above.
			cardsArray.push(card);
		}
		callback(cardsArray);
	});   
}

exports.charities = function(req, res) {
	navbar.informNavbar(req, res);
	module.exports.formCardsArray(function(cardsArray){
		res.locals.cardsArray = cardsArray;
		res.render('charities/charities');
	});
}

exports.charity = function(req, res) {
	navbar.informNavbar(req, res);

	var candidateName = req.body.name;
	module.exports.formIndivCard(candidateName, function(card){
		if(card.found){	
			res.locals.name = card.name;
			res.locals.city = card.city;
			res.locals.state = card.state;
			res.locals.description = card.description;
		}
		res.locals.found = card.found;
		res.render('charities/charity');
	});	
}

exports.formIndivCard = function(candidateName, callback){
	card = {}

	knex('charities').where({
		name: candidateName
	}).select('name', 'city', 'state', 'description').limit(1).then(function(charity) {
		if(charity.length == 1) {
			card.name = charity[0].name;
			card.city = charity[0].city;
			card.state = charity[0].state;
			if (charity[0].description == null) {
				card.description = "If you are a member of this nonprofit and want to add a description about your mission, please contact us."
			} else {
				card.description = charity[0].description;
			}
			card.found = true;
		} else {
			card.found = false;
		}
		callback(card);	
	});
}