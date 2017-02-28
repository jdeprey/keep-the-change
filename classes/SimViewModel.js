var TransactionCalculator = require("../classes/TransactionCalculator.js");
var database = require('../util/database.js');
var knex = database.connect();

var SimViewModel = function()
{
	// These are placeholder properties
	this.trans = new TransactionCalculator();
	this.date = undefined;
	this.charity = undefined
	this.cid = undefined;
	this.payment = undefined;
	this.pid = undefined;
	this.uid = undefined;
	this.returnMsg = "";
};

// Performs the form validation. Returns a message of the error missing back to the controller
SimViewModel.prototype.isValid = function(callback)
{
	// Check each property
	// Check transaction
	if (this.trans === undefined
			|| !this.trans.isValidTransaction)
	{
		this.returnMsg = 'Invalid transaction amount';
		callback(false);
		return;
	}
	
	// Check date
	if (this.date === undefined
			|| this.date.trim().match(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/) === null)
	{
		this.returnMsg = 'Invalid date';
		callback(false);
		return;
	}
	
	// Check payment
	if (this.payment === undefined)
	{
		this.returnMsg = 'Invalid payment';
		callback(false);
		return;
	}
	
	// Check if the payment exists
	var that = this;
	that.PaymentExists(function(payExists) {
		// Check charity
		if (that.charity === undefined)
		{
			that.returnMsg = 'Undefined charity';
			callback(false);
		}
		
		// Check if the charity name exists
		that.CharityExists(function(theTruth) {
			callback(theTruth);
		});
	}, that);
};

// Here we will save to the database
SimViewModel.prototype.save = function(callback)
{

	knex('donations').insert({amount : this.trans.amountDonated,
							  transaction : this.trans.databaseAmount,
							  date : this.date,
							  cid : this.cid,
							  pid : this.pid,
							  uid : this.uid}).then(function(array){
		callback(true);
	});
};

// Node is asynchronous, so the only way to wait on this is to use a callback function
SimViewModel.prototype.CharityExists = function(callback) {
	var that = this;
	that.GetCharityId(that.charity, function(id) {
		if (id)
		{
			that.cid = id;
			
			callback(true);
		}
		else
		{
			that.cid = undefined;
			this.returnMsg = 'Could not find charity';
			callback(false);
		}
	});
}

SimViewModel.prototype.GetCharityId = function(name, callback) {
	knex('charities').select('cid').where('name', name).then(function (array){
		if (array.length == 0)
			callback(undefined);
		else
		{
			callback(array[0].cid);
		}
	});
}

// Node is asynchronous, so the only way to wait on this is to use a callback function
SimViewModel.prototype.PaymentExists = function(callback) {
	var that = this
	that.GetPaymentId(that.payment, function(id) {
		if (id)
		{
			that.pid = id;
			callback(true);
		}
		else
		{
			that.id = undefined;
			that.returnMsg = 'Could not find payment';
			callback(false);
		}
	});
}
		
SimViewModel.prototype.GetPaymentId = function(name, callback) {
	knex.select().from('payments').where('name', name).then(function (array){
		if (array.length == 0)
			callback(undefined);
		else
		{
			callback(array[0].pid);
		}
	});
}

module.exports = SimViewModel;