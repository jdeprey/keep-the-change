function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }

    document.body.appendChild(form);
    form.submit();
}

var addCardListeners = function() {
	for(i = 1; i <= 12; i++){
		var card = document.getElementById("card-" + i);
		if(card) {
			card.addEventListener('click', selectCard(i), false);
		}
	}	
}

function selectCard(i) {
	return function() {
		var card = document.getElementById("card-" + i);
		if(card) {
			
			var name = card.lastElementChild.firstElementChild.textContent;
			
			post('/charity', {'name' : name});
		}
	}
}

addCardListeners();