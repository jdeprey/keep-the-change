var request = require("request");
var server = require("../server.js")
var base_url = "http://localhost:3000/"
var TransactionCalculator = require("../classes/TransactionCalculator.js");
var SimViewModel = require("../classes/SimViewModel.js");

function setupModel() {
	var model = new SimViewModel();
	var trans = new TransactionCalculator();
	trans.initialAmount = "1.23";
	trans.isValidTransaction = true;
	
	model.trans = trans;
	model.date = '2013-12-24';
	model.charity = "Assist the Elderly";
	model.payment = "CashDisc";
	model.uid = 1;
	model.cid = 1;
	model.pid = 1;
	
	return model;
}

describe("SimViewModel.js tests", function() {
	
	describe("model validity", function() {
		it("is valid", function(done) {
			var model = setupModel();
			model.isValid(function(callback) {
				expect(callback).toBe(true);
				done();
			});
		});
    });
	
	describe("model validity", function() {
		it("does not have a valid transaction", function(done) {
			var model = setupModel();
			model.trans = undefined;
			model.isValid(function(callback) {
				expect(callback).toBe(false);
				
				var otherModel = setupModel();
				otherModel.trans.isValidTransaction = false;
				otherModel.isValid(function(otherCallback) {
					expect(otherCallback).toBe(false);
					done();
				});
			});
		});
    });
	
	describe("model validity", function() {
		it("does not have a valid date", function(done) {
			var model = setupModel();
			model.date = undefined;
			model.isValid(function(callback) {
				expect(callback).toBe(false);
				done();
			});
		});
    });
	
	describe("model validity", function() {
		it("does not have a valid charity", function(done) {
			var model = setupModel();
			model.charity = undefined;
			model.isValid(function(callback) {
				expect(callback).toBe(false);
				done();
			});
		});
    });
	
	// This test is failing, probably because of knex asynchronous call
	describe("searching db for a charity", function() {
		it("that does not exist", function(done) {
			var model = setupModel();
			model.charity = 'Save McDonalds';
			model.isValid(function(callback) {
				expect(callback).toBe(false);
				done();
			});
		});
    });
	
	describe("model validity", function() {
		it("does not have a valid payment", function(done) {
			var model = setupModel();
			model.payment = undefined;
			model.isValid(function(callback) {
				expect(callback).toBe(false);
				done();
			});
		});
    });
	
	describe("valid insert", function() {
		it("inserts a record into the database", function(done) {
			var model = setupModel();
			model.isValid(function(callback) {
				model.save(function(result) {
					expect(result).toBe(true);
					done();	
				});
			});
		});
    });
	
	describe("searching for charity by name", function() {
		it("sets the charity id", function(done) {
			var model = setupModel();
			model.cid = undefined;
			model.charity = undefined;
			model.GetCharityId('Protect our Planet', function(id) {
				expect(id).not.toBe(undefined);
				done();
			});
		});
    });
	
	describe("searching for payment by name", function() {
		it("sets the payment id", function(done) {
			var model = setupModel();
			model.pid = undefined;
			model.payment = undefined;
			model.GetPaymentId('CashDisc', function(id) {
				expect(id).not.toBe(undefined);
				done();
			});
		});
    });	
	
	describe("validating model", function() {
		it("sets all properties on valid", function(done) {
			var model = new SimViewModel();
			var trans = new TransactionCalculator();
			
			model.date = '2013-11-11';
			model.charity = 'Protect our Planet';
			model.payment = 'CashDisc';
			model.uid = 1;
			
			trans.userId = 1;
			trans.charityId = model.charity;
			trans.initialAmount = '43.21';
			trans.calculate();
			
			var initialAmount = trans.initialAmount;
			
			model.trans = trans;
			model.isValid(function(callback) {
				expect(model.cid).not.toBe(undefined);
				expect(model.pid).not.toBe(undefined);
				expect(model.trans.amountDonated).not.toBe(0);
				expect(model.trans.databaseAmount).toBe(initialAmount.replace(".", ""));
				done();
			});
		});
    });
});