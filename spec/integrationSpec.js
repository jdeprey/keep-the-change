var request = require("request");
var Browser = require("zombie");
var server = require("../server.js");
var base_url = "http://localhost:3000/";

var browser = new Browser({site: 'http://localhost:3000', debug : true});

var valid_user = 'test@oregonstate.edu';
var valid_password = 'password';

describe("Integration testing: Valid user, login -> home -> charities -> charity -> home", function() {

	it("Valid login takes us to user /home", function(next){
		browser.visit(base_url +'login' , function(){
		browser.fill("div.form-group input[id=username]", valid_user)
		browser.fill("div.form-group input[id=password]", valid_password)
		browser.pressButton("button.btn.btn-primary.btn-block")
			browser.wait().then(function(){
				expect(browser.html("body")).not.toContain("Missing credentials");
				expect(browser.url).toBe("http://localhost:3000/home");
				next();
			});
		});
	});

	it("User navigates from /home to /charities", function(next){
		expect(browser.url).toBe("http://localhost:3000/home");
		browser.visit('/charities');
		browser.wait().then(function(){
			expect(browser.success).toBe(true);
			expect(browser.url).toBe(base_url + "charities");
			next();
		});
	});

	it("User selects a charity card, is sent to /charity", function(next){
		expect(browser.url).toBe(base_url + "charities");
		browser.click('#card-1');
		browser.wait().then(function(){
			expect(browser.success).toBe(true);
			expect(browser.url).toBe(base_url + "charity");
			next();
		});	
	});

	it("All elements of charity card are present on /charity", function(next){
		expect(browser.html("body")).toContain("Assist the Elderly"); // Name
		expect(browser.html("body")).toContain("Omaha, Nebraska"); // Location
		expect(browser.html("body")).toContain("If you are a member of this nonprofit"); // Description
		next();
	})

	it("User selects charity and is sent back to /home", function(next){
		browser.click('#charity-card-submit-button');
		browser.wait().then(function(){
			expect(browser.success).toBe(true);
			expect(browser.url).toBe(base_url + "home");
			next();
		})
	});

	it("User selected charity is now visible as the user's charity on /home", function(done){
		expect(browser.text('#home-charity')).toEqual("Assist the Elderly");
		done();
	})

});

describe("Integration testing: Valid user, login -> home -> payments -> home", function() {

	it("Valid login takes us to user /home", function(next){
		browser.visit(base_url +'login' , function(){
		browser.fill("div.form-group input[id=username]", valid_user)
		browser.fill("div.form-group input[id=password]", valid_password)
		browser.pressButton("button.btn.btn-primary.btn-block")
			browser.wait().then(function(){
				expect(browser.html("body")).not.toContain("Missing credentials");
				expect(browser.url).toBe("http://localhost:3000/home");
				next();
			});
		});
	});

	it("User navigates from /home to /payments", function(next){
		expect(browser.url).toBe("http://localhost:3000/home");
		browser.visit('/payments');
		browser.wait().then(function(){
			expect(browser.success).toBe(true);
			expect(browser.url).toBe(base_url + "payments");
			next();
		});
	});

	it("User selects a payment option, is sent to /home", function(next){
		expect(browser.url).toBe(base_url + "payments");
		browser.click('#card-1');
		browser.wait().then(function(){
			expect(browser.success).toBe(true);
			expect(browser.url).toBe(base_url + "home");
			next();
		});	
	});

	it("User selected payment is now visible as the user's payment option on /home", function(next){
		expect(browser.text('#home-payment')).toEqual("CashDisc");
		next();
	})

});