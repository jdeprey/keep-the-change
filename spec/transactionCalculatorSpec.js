var request = require("request");
var server = require("../server.js")
var base_url = "http://localhost:3000/"
var TransactionCalculator = require("../classes/TransactionCalculator.js");

function setupTrans() {
	var trans = new TransactionCalculator();
	
	trans.initialAmount = "1.23";
	
	return trans;
}

describe("TransactionCalculator.js tests", function() {

	describe("Valid Amounts", function() {
		it("11.40 is a valid amount", function(done) {
			var trans = new TransactionCalculator();
			expect(trans.amountIsValid("11.40")).toBe(true);
			done();
		});
    });
	
	describe("Valid Amounts", function() {
		it("2.34 is a valid amount", function(done) {
			var trans = new TransactionCalculator();
			expect(trans.amountIsValid("2.34")).toBe(true);
			done();
		});
    });
	
	describe("Valid Amounts", function() {
		it("0 is not a valid amount", function(done) {
			var trans = new TransactionCalculator();
			expect(trans.amountIsValid("0")).toBe(false);
			done();
		});
    });
	
	describe("Valid Amounts", function() {
		it("-1.23 is not a valid amount", function(done) {
			var trans = new TransactionCalculator();
			expect(trans.amountIsValid("-1.23")).toBe(false);
			done();
		});
    });
	
	describe("Valid Amounts", function() {
		it("12.345 is not a valid amount", function(done) {
			var trans = new TransactionCalculator();
			expect(trans.amountIsValid("12.345")).toBe(false);
			done();
		});
    });
	
	describe("Valid Amounts", function() {
		it("12 is not a valid amount", function(done) {
			var trans = new TransactionCalculator();
			expect(trans.amountIsValid("12")).toBe(false);
			done();
		});
    });
	
	describe("Round up to nearest dollar", function() {
		it("rounds 1.23 to 2.00", function(done) {
			var trans = setupTrans();
			
			trans.initialAmount = "1.23";
			trans.calculate();
			
			expect(trans.finalAmount).toBe("2.00");
			expect(trans.amountDonated).toBe("77");
			expect(trans.isValidTransaction).toBe(true);
			done();
		});
    });
	
	describe("No donation is made", function() {
		it("does not round 13.00", function(done) {
			var trans = setupTrans();
			
			trans.initialAmount = "13.00";
			
			trans.calculate();
			
			expect(trans.finalAmount).toBe("13.00");
			expect(trans.amountDonated).toBe("0");
			expect(trans.isValidTransaction).toBe(true);
			done();
		});
    });
	
	describe("Transaction.calculate", function() {
		it("requires a transaction amount ", function(done) {
			var trans = setupTrans();
			
			trans.initialAmount = undefined;
			trans.calculate();
			
			expect(trans.isValidTransaction).toBe(false);
			done();
		});
    });
	
	describe("Transaction.calculate", function() {
		it("has all relevent properties set", function(done) {
			var trans = setupTrans();
			
			trans.calculate();
			
			expect(trans.isValidTransaction).toBe(true);
			done();
		});
    });
	
});