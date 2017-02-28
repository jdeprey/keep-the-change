var request = require("request");
var server = require("../server.js");
var base_url = "http://localhost:3000/";
var charitiesController = require("../controllers/charities.js");
var database = require('../util/database.js');
var knex = database.connect();
var passport = require('passport');
var data = require('../models/auth')();
var passport = require('passport')
var Browser = require("zombie");

var browser = new Browser();



describe("Charities controller tests", function(){

	describe("Charities page tests", function(){
		
		beforeEach(function(done){
			this.cardsArray = [];
			charitiesController.formCardsArray(function(cardsArray){
				this.cardsArray = cardsArray;
				done();
			});
		});

		it("the charity cards display contains no more than 12 cards", function(){
			expect(this.cardsArray.length).toBeLessThanOrEqual(12);
		});

		it("Each charity card contains exactly two elements", function(){
			for(i=0 ; i<this.cardsArray.length ; i++){
				expect(this.cardsArray[i].length).toBe(2);
			}
		});

		it("Both elements in all charity cards are strings", function(){
			for(i=0 ; i<this.cardsArray.length ; i++){
				for(j=0; j<1; j++){
					expect(typeof(this.cardsArray[i][j])).toBe('string');
				}
			}
		})

	});
		
	describe("Charity page tests", function(){

		it("Charity card with valid name has all info fields", function(done){
			card = {};
			charitiesController.formIndivCard("Exhort the Unmotivated", function(card){
				expect(Object.keys(card)).toContain('name');
				expect(Object.keys(card)).toContain('city');
				expect(Object.keys(card)).toContain('state');
				expect(Object.keys(card)).toContain('description');
				expect(Object.keys(card)).toContain('found');
				done();
			});
		});

		it("Charity card with valid name has found == true", function(done){
			card = {};
			charitiesController.formIndivCard("Exhort the Unmotivated", function(card){
				expect(card.found).toBe(true);		
				done();
			});			
		});

		it("Charity card with invalid name has found == false and no other charity properties", function(done){
			card = {};
			charitiesController.formIndivCard("InvalidCharity", function(card){
				expect(card.found).toBe(false);		
				expect(Object.keys(card)).not.toContain('name');
				expect(Object.keys(card)).not.toContain('city');
				expect(Object.keys(card)).not.toContain('state');
				expect(Object.keys(card)).not.toContain('description');
				done();
			});			
		});

		it("Charity card with valid name has name, city, state, and description strings, found Boolean", function(done){
			card = {};
			charitiesController.formIndivCard("Exhort the Unmotivated", function(card){
				expect(typeof(card.found)).toBe('boolean');	
				expect(typeof(card.name)).toBe('string');
				expect(typeof(card.city)).toBe('string');
				expect(typeof(card.state)).toBe('string');
				expect(typeof(card.description)).toBe('string');		
				done();
			});			
		});

	});
		

});