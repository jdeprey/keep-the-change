
var rendering = require('./util/rendering'),
    indexController = require('./controllers/index'),
    loginController = require('./controllers/login'),
    charitiesController = require('./controllers/charities'),
    paymentsController = require('./controllers/payments'),
    simController = require('./controllers/sim');

module.exports = function (app, passport) {

    // Home
    app.get('/', indexController.home);
    app.get('/home', ensureAuthenticated, indexController.userHome);
    app.post('/home', ensureAuthenticated, indexController.userHomePost);

    // Auth
    app.get('/register', loginController.registerPage);
    app.post('/register', loginController.registerPost);
    app.get('/login', loginController.loginPage);
    app.post('/login', loginController.checkLogin);
    app.get('/logout', loginController.logout);
    app.get('/charities', ensureAuthenticated, charitiesController.charities);
    app.post('/charity', ensureAuthenticated, charitiesController.charity);
    app.get('/payments', ensureAuthenticated, paymentsController.payments);
    app.post('/payments', ensureAuthenticated, paymentsController.payments);
    app.get('/sim', ensureAuthenticated, simController.sim);
    app.post('/transact', ensureAuthenticated, simController.transact);
    // 'rendering' can be used to format api calls (if you have an api)
    // into either html or json depending on the 'Accept' request header
    app.get('/apitest', function(req, res) {
        rendering.render(req, res, {
            'data': {
                'test': {
                    'testsub': {
                        'str': 'testsub hello world'
                    },
                    'testsub2': 42
                },
                'test2': 'hello world'
            }
        });
    })


    // Auth Middleware
    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) { 
            return next(); 
        }
        res.redirect('/login');
    }
}
