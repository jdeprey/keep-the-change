var request = require("request");
var server = require("../server.js");
var base_url = "http://localhost:3000/";
var paymentsController = require("../controllers/payments.js");
var database = require('../util/database.js');
var knex = database.connect();
var passport = require('passport');
var data = require('../models/auth')();
var passport = require('passport')
var Browser = require("zombie");

var browser = new Browser();

describe("Payments controller tests", function(){

	beforeEach(function(done){
		this.paymentsArray = [];
		paymentsController.formPaymentsArray(function(paymentsArray){
			this.paymentsArray = paymentsArray;
			done();
		});
	});

	it("Payments array contains 12 or fewer items", function(){
		expect(this.paymentsArray.length).toBeLessThanOrEqual(12);
	})

	it("Each p[ayment card contains exactly two elements", function(){
		for(i=0 ; i<this.paymentsArray.length ; i++){
			expect(this.paymentsArray[i].length).toBe(2);
		}
	});

	it("Both elements in all charity cards are strings", function(){
		for(i=0 ; i<this.paymentsArray.length ; i++){
			for(j=0; j<1; j++){
				expect(typeof(this.paymentsArray[i][j])).toBe('string');
			}
		}
	})

});