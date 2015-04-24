//assignment4.js
//jack holkeboer

function printGists() {

}

//takes dictionary of parameters and puts them in an array to be added to the url
function appendToQuery(params) {
	var queryPiece = [];
	for (var key in params) {
		var tempString = encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
		queryPiece.push(tempString);
	}
	return queryPiece.join('&');
}

function gistAjax(numPages, python, javascript, sql, jason) {
	var req = new XMLHttpRequest();
	if (!req) {
		throw 'Request did not go through.';
	}
	var url = 'https://api.github.com/gists/public';

	var params = {
		mode: 'json'

	};
	url += '?' + appendToQuery(params);
	req.onreadystatechange = function() {
		if (this.readyState === 4) {
			var gistArray = JSON.parse(this.responseText);


		}
	};

	//return gistArray
}



function getGists() {
	// put values from html page into javascript variables
	var numPages = document.getElementsByName('numPages')[0].value;
	var python = document.getElementsByName('python')[0].checked;
	var javascript = document.getElementsByName('javascript')[0].checked;
	var sql = document.getElementsByName('sql')[0].checked;
	var jason = document.getElementsByName('json')[0].checked;

	var gistArray = gitAjax(numPages, python, javascript, sql, jason);
}


function clearLocalStorage() {
	localStorage.clear();
}

// function displayLocalStorage(fav) {
//	document.getElementById('output').innerHTML = localStorage.getItem('demoText');
// }

window.onload = function() {

};