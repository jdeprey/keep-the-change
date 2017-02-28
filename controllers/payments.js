var database = require('../util/database.js'),
knex = database.connect(),
rendering = require('../util/rendering'),
navbar = require('../util/navbar');

exports.payments = function(req, res) {
	navbar.informNavbar(req, res);

	module.exports.formPaymentsArray(function(cardsArray){
		res.locals.cardsArray = cardsArray;
		res.render('payments/payments');
	})	
}

exports.formPaymentsArray = function(callback){
	cardsArray =[];

	knex.select('name').from('payments').orderBy('name', 'asc').limit(12).then(function(paymentNames) {
		for (i = 0; i < paymentNames.length; i++) {
			var card = [];
			card.push(paymentNames[i].name);
			card.push('img/300x300.png'); // This is the hardcoded image source line. Needs to change, possibly
													  // along with the query above.
			cardsArray.push(card);
		}

		callback(cardsArray);
	});   
}