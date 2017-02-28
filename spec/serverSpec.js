var request = require("request");
var Browser = require("zombie");
var server = require("../server.js");
var base_url = "http://localhost:3000/";

var browser = new Browser({site: 'http://localhost:3000', debug : true});

var valid_user = 'test@oregonstate.edu';;
var valid_password = 'password';

describe("server status tests", function() {

	describe("GET /", function() {
		it("returns status code in range 200-399", function(done) {
			request.get(base_url, function(error, response, body) {
				expect(response.statusCode).toBeGreaterThanOrEqual(200);
				expect(response.statusCode).toBeLessThan(400);
				done();
			});
		});
    });

	describe("GET /home", function() {
		it("returns status code range 200-399", function(done) {
			request.get(base_url + "home", function(error, response, body) {
				expect(response.statusCode).toBeGreaterThanOrEqual(200);
				expect(response.statusCode).toBeLessThan(400);
				done();
			});
		});
    });

    describe("POST /home", function() {
		it("returns status code range 200-399", function(done) {
			request.post(base_url + "home", function(error, response, body) {
				expect(response.statusCode).toBeGreaterThanOrEqual(200);
				expect(response.statusCode).toBeLessThan(400);
				done();
			});
		});
    });

    describe("GET /register", function() {
		it("returns status code range 200-399", function(done) {
			request.get(base_url + "register", function(error, response, body) {
				expect(response.statusCode).toBeGreaterThanOrEqual(200);
				expect(response.statusCode).toBeLessThan(400);
				done();
			});
		});
    });

    describe("POST /register", function() {
		it("returns status code range 200-399", function(done) {
			request.post(base_url + "register", function(error, response, body) {
				expect(response.statusCode).toBeGreaterThanOrEqual(200);
				expect(response.statusCode).toBeLessThan(400);
				done();
			});
		});
    });

	describe("GET /login", function() {
		it("returns status code range 200-399", function(done) {
			request.get(base_url + "login", function(error, response, body) {
				expect(response.statusCode).toBeGreaterThanOrEqual(200);
				expect(response.statusCode).toBeLessThan(400);
				done();
			});
		});
    });

	describe("POST /login", function() {
		it("returns status code range 200-399", function(done) {
			request.post(base_url + "login", function(error, response, body) {
				expect(response.statusCode).toBeGreaterThanOrEqual(200);
				expect(response.statusCode).toBeLessThan(400);
				done();
			});
		});
    });

	describe("GET /logout", function() {
		it("returns status code range 200-399", function(done) {
			request.get(base_url + "logout", function(error, response, body) {
				expect(response.statusCode).toBeGreaterThanOrEqual(200);
				expect(response.statusCode).toBeLessThan(400);
				done();
			});
		});
    });

	describe("POST /logout", function() {
		it("returns status code greater than or equal to 400", function(done) {
			request.post(base_url + "logout", function(error, response, body) {
				expect(response.statusCode).toBeGreaterThanOrEqual(400);			
				done();
			});
		});
    });

    describe("GET /charities", function() {
		it("returns status code range 200-399", function(done) {
			request.get(base_url + "charities", function(error, response, body) {
				expect(response.statusCode).toBeGreaterThanOrEqual(200);
				expect(response.statusCode).toBeLessThan(400);
				done();
			});
		});
    });

    describe("POST /charities", function() {
		it("returns status code greater than or equal to 400", function(done) {
			request.post(base_url + "charities", function(error, response, body) {
				expect(response.statusCode).toBeGreaterThanOrEqual(400);
				done();
			});
		});
    });

    describe("GET /charity", function() {
		it("returns status code greater than or equal to 400", function(done) {
			request.get(base_url + "charity", function(error, response, body) {
				expect(response.statusCode).toBeGreaterThanOrEqual(400);
				done();
			});
		});
    });

    describe("POST /charity", function() {
		it("returns status code range 200-399", function(done) {
			request.post(base_url + "charity", function(error, response, body) {
				expect(response.statusCode).toBeGreaterThanOrEqual(200);
				expect(response.statusCode).toBeLessThan(400);
				done();
			});
		});
    });

    describe("GET /payments", function() {
		it("returns status code range 200-399", function(done) {
			request.get(base_url + "payments", function(error, response, body) {
				expect(response.statusCode).toBeGreaterThanOrEqual(200);
				expect(response.statusCode).toBeLessThan(400);
				done();
			});
		});
    });

    describe("POST /payments", function() {
		it("returns status code range 200-399", function(done) {
			request.post(base_url + "payments", function(error, response, body) {
				expect(response.statusCode).toBeGreaterThanOrEqual(200);
				expect(response.statusCode).toBeLessThan(400);
				done();
			});
		});
    });

    describe("GET /sim", function() {
		it("returns status code range 200-399", function(done) {
			request.get(base_url + "sim", function(error, response, body) {
				expect(response.statusCode).toBeGreaterThanOrEqual(200);
				expect(response.statusCode).toBeLessThan(400);
				done();
			});
		});
    });

    describe("POST /sim", function() {
		it("returns status code greater than or equal to 400", function(done) {
			request.post(base_url + "sim", function(error, response, body) {
				expect(response.statusCode).toBeGreaterThanOrEqual(400);
				done();
			});
		});
    });

    describe("GET /transact", function() {
		it("returns status code greater than or equal to 400", function(done) {
			request.get(base_url + "transact", function(error, response, body) {
				expect(response.statusCode).toBeGreaterThanOrEqual(400);
				done();
			});
		});
    });

    describe("POST /transact", function() {
		it("returns status code range 200-399", function(done) {
			request.post(base_url + "transact", function(error, response, body) {
				expect(response.statusCode).toBeGreaterThanOrEqual(200);
				expect(response.statusCode).toBeLessThan(400);
				done();
			});
		});
    });

//Confirm headless browser

	it("should have defined headless browser", function(next){
        expect(typeof browser != "undefined").toBe(true);
        expect(browser instanceof Browser).toBe(true);
        next();
    });

//Confirm login page present

	describe("Confirm login present", function() {
		it("should visit ktc login page and see the login form", function(next){
		browser.visit(base_url +'login' , function(){
			expect(browser.success).toBe(true);
			expect(browser.query("div.panel-login")).not.toBeNull();
			expect(browser.query("div.form-group input[id=username]")).not.toBeNull();
			expect(browser.query("div.form-group input[id=password]")).not.toBeNull();

			next();
			})
		});
	});

//Confirm login will not allow invalid credentials

	describe("Confirm login will not allow invalid credentials", function() {
		it("should declare unknown user when credentials are not valid and keep user on login page", function (next){
		browser.visit(base_url +'login' , function(){
		browser.fill("div.form-group input[id=username]","foo")
		browser.fill("div.form-group input[id=password]","bar")
		browser.pressButton("button.btn.btn-primary.btn-block",function(){
			expect(browser.location.pathname).toBe("/login");
			next();
			});
		});
	});
	});

//Confirm login will allow valid credentials 

	describe("Confirm login will proceed when login credentials are valid", function() {
		it("should allow user login with valid credentials", function (next){
		
		

		browser.visit(base_url +'login' , function(){
		browser.fill("div.form-group input[id=username]", valid_user)
		browser.fill("div.form-group input[id=password]", valid_password)
		browser.pressButton("button.btn.btn-primary.btn-block")
		browser.wait().then(function(){
			expect(browser.html("body")).not.toContain("Missing credentials");
			expect(browser.url).toBe("http://localhost:3000/home");
			next();
		})
	})
	});
	});

});

