var database = require('../util/database.js'),
knex = database.connect(),
rendering = require('../util/rendering'),
navbar = require('../util/navbar'),
data = require('../models/auth')();


exports.home = function(req, res) {
	navbar.informNavbar(req, res);
    res.render('index/index');
}


exports.userHome = function(req, res) {
	navbar.informNavbar(req, res);
	exports.returnInfo(req, res);
}

exports.userHomePost = function(req, res) {
	navbar.informNavbar(req, res);

	if (req.body.charityName) {
		var candidateName = req.body.charityName;
		
		knex('charities').where({
			name: candidateName
		}).select('cid', 'name').limit(1).then(function(charity) {        // Select the charity's id and name.
			if(charity.length == 1) {
				                
				var charityId = charity[0].cid;

				knex('users').where('id', req.user.attributes.id)         // Update the passport user data as well as the database.
				.update({cid : charityId}).then(function(count) {
					
					req.user.attributes.cid = charityId;
					
					exports.returnInfo(req, res);
					
				});
			} else {									  
				exports.returnInfo(req, res);								      // Otherwise, just display that no charity has been set.
			}	
		});	
	} else if (req.body.paymentName) {
		var candidateName = req.body.paymentName;

		knex('payments').where({
			name: candidateName
		}).select('pid', 'name').limit(1).then(function(payment) {        // Select the payment's id and name.
			if(payment.length == 1) {
				
				var paymentId = payment[0].pid;

				knex('users').where('id', req.user.attributes.id)         // Update the passport user data as well as the database.
				.update({pid : paymentId}).then(function(count) {
					
					req.user.attributes.pid = paymentId;

					exports.returnInfo(req, res);
					
				});
			} else {									  
				exports.returnInfo(req, res);								      // Otherwise, just display that no charity has been set.
			}	
		});	
	}	
}

exports.returnInfo = function(req,res) {
	knex('users').where('id', req.user.attributes.id).join('charities', 'users.cid', 'charities.cid').then(function(joined) {
		// Set the charityName local var if the user currently has a charity set.
		if(joined.length > 0 && joined[0].hasOwnProperty('name')){
			res.locals.charityName = joined[0].name;
		}			

		knex('users').where('id', req.user.attributes.id).join('payments', 'users.pid', 'payments.pid').then(function(joined) {
			if(joined.length > 0 && joined[0].hasOwnProperty('name')){
				res.locals.paymentName = joined[0].name;
			}

			knex('donations').where('uid', req.user.attributes.id).sum('amount as amt').then(function(array){
				rawAmount = array[0].amt;

				if(rawAmount){
					// convert the integer to a money quantity string (shift the decimal two to the left).
					rawAmount = rawAmount.toString();
					if(rawAmount.length < 3) {
						rawAmount = '0'.repeat(3 - rawAmount.length) + rawAmount;
					}
					amount = rawAmount.substr(0, rawAmount.length-2) + '.' + rawAmount.substr(rawAmount.length-2);
					res.locals.totalContrib = amount;
				} else {
					res.locals.totalContrib = '0.00';
				}

				// Form the Contributions History array
				res.locals.contribArray = [];
				knex('donations').where('uid', req.user.attributes.id)
				                 .join('charities as c', 'c.cid', 'donations.cid')
				                 .join('payments as p', 'p.pid', 'donations.pid')
				                 .select('amount', 'date', 'c.name as cname', 'p.name as pname', 'transaction')
				                 .limit(20).orderBy('date', 'desc').then(function(joined) {
				    
					for(i=0; i < joined.length; i++){
						element = [];
						
						date = joined[i].date.toISOString().split('T')[0];
						date = date.substr(5) + '-' + date.substr(0,4);
				        element.push(date);
				        // format and push the donation amount.
				        amount = joined[i].amount.toString();
				        
				        if(amount.length < 3) {
				        	amount = '0'.repeat(3 - amount.length) + amount;
				        }
				       	amount = '$' + amount.substr(0, amount.length-2) + '.' + amount.substr(amount.length-2);
						element.push(amount);
				        
						element.push(joined[i].pname);
						element.push(joined[i].cname);


						// format and push the transaction amount.
				       	transaction = joined[i].transaction.toString();
				       	if(transaction.length < 3) {
				        	transaction = '0'.repeat(3 - transaction.length) + transaction;
				        }
				        transaction = '$' + transaction.substr(0, transaction.length-2) + '.' + transaction.substr(transaction.length-2);
				        
				        element.push(transaction);

						res.locals.contribArray.push(element);
					}
					if (res.locals.contribArray.length > 0){
						res.locals.history = true;
					}
					res.render('index/user-home');
				});				
			});			
		});
	}); 
}

