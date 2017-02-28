exports.informNavbar = function(req, res) {

    if (req.isAuthenticated()) { 
        res.locals.logged = "Out";
        res.locals.loghref = "/logout" 
        res.locals.showNav = "True"
    } else {
    	res.locals.logged = "In";
    	res.locals.loghref = "/login"
    }

    var active = req.url.substr(1);
    if(active.length > 0){
       	res.locals[active] = "active";
	}
	
    return res;
}