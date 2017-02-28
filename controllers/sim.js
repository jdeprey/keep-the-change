var crypto = require('crypto'),
    passport = require('passport'),
    data = require('../models/auth')(),
    navbar = require('../util/navbar'),
    TransactionCalculator= require('../classes/TransactionCalculator.js'),
	SimViewModel = require("../classes/SimViewModel.js"),
    database = require('../util/database.js'),
	knex = database.connect();

exports.sim = function(req, res) {
    formArrays(req, res);
}

exports.transact = function(req, res) {
	validate(req, res);
}

formArrays = function(req, res) {
	navbar.informNavbar(req, res);
	knex.select('name').from('charities').then(function(array){
    	res.locals.charitiesArray = [];
    	for (i in array) {
    		res.locals.charitiesArray.push(array[i].name);
    	}
    	
    	knex.select('name').from('payments').then(function(array){
    		res.locals.paymentsArray = [];
    		for (i in array) {
    			res.locals.paymentsArray.push(array[i].name);
    		}
    		res.render('sim/sim');
    	});
    });
}

validate = function(req, res) {
	res.locals.messages = [];
	var model = new SimViewModel();
	var trans = new TransactionCalculator();
	
	// Get data from the view
	model.date = req.body.date;
	model.charity = req.body.charity;
	model.payment = req.body.payment;
	model.uid = req.user.attributes.id;
	
	trans.userId = req.user.attributes.id;
	trans.charityId = model.charity;
	trans.initialAmount = req.body.amount.trim();
	trans.calculate();
	model.trans = trans;
	
	model.isValid(function(modelIsValid)
	{
		if (modelIsValid)
		{
			model.save(function(success)
			{
				res.locals.messages.push({message: "Your payment was successfully processed", type: "info"});
				formArrays(req, res);
			});
		}
		else
		{
			res.locals.messages.push({message: model.returnMsg, type: "danger"});
			formArrays(req, res);
		}
	});
	
	// Date input validation
/*	date = req.body.date;
	date.trim();
	re = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;

	if (!date.match(re)) {
		res.locals.messages.push({message: "Please enter a valid date.", type: "danger"});
		formArrays(req, res);
	} else {
		req.body.date = date
		// Amount input validation
		amount = req.body.amount;
		transCalc = new TransactionCalculator();
		
		
		if (!transValidation.isValidAmount(amount.trim())) {
			res.locals.messages.push({message: "Please enter a valid amount.", type: "danger"});
			formArrays(req, res);
		} else {
			
			// Validate charity
			knex.select().from('charities').where('name', req.body.charity).then(function (array){
				if (array.length == 1) {
					req.body.cid = array[0].cid;
					// Perform further validation on the amount input string.
					trans = new Transaction();
					trans.donate(req.user.attributes.id, req.body.cid, req.body.amount)
					if(!trans.isValidTransaction){
						res.locals.messages.push({message: "Please enter a valid amount.", type: "danger"});
						formArrays(req, res);
						return;
					}
					if(trans.amountDonated == "0.00"){
						res.locals.messages.push({message: "Cannot donate when transaction contains whole dollar amounts (no cents).", type: "danger"})
						formArrays(req, res);
						return;
					}
					amountDonated = (trans.amountDonated).replace(".", "");
					req.body.amount = parseInt(amountDonated);
					transactionAmount = (trans.initialAmount).replace(".", "");
					req.body.transaction = parseInt(transactionAmount);
					
					// Validate payment
					knex.select().from('payments').where('name', req.body.payment).then(function (array){
						if (array.length == 1) {
							req.body.pid = array[0].pid;
							// Ready to ship
							updateTransactionsDB(req, res);

						} else {
							res.locals.messages.push({message: "Please enter a valid payment provider.", type: "danger"});
							formArrays(req, res);
						}
					});
				} else {
					res.locals.messages.push({message: "Please enter a valid charity.", type: "danger"});
					formArrays(req, res);
				}
			});
		}
	}*/
}

updateTransactionsDB = function(req, res) {
	knex('donations').insert({amount : req.body.amount,
							  transaction : req.body.transaction,
							  date : req.body.date,
							  cid : req.body.cid,
							  pid : req.body.pid,
							  uid : req.user.attributes.id}).then(function(array){
		navbar.informNavbar(req, res);
		res.locals.messages.push({message: "Donations table updated.", type: "info"});
		formArrays(req, res);
	});
}