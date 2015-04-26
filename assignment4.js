//assignment4.js
//jack holkeboer

var gistStorage = null;
var gistArray = [];
var gistJSON = [];
var numPages = 1;


function Gist(desc, address, lang) {
	if (desc === null || desc == '' || desc === undefined) {
		this.desc = "[no description]";
	}
	else {
		this.desc = desc;
	}
	this.address = address;
	this.lang = lang;
}

// function addGist(gistStorage, gist) {
// 	if (gist instanceof Gist) {
// 		gistStorage.gists.push(gist);
// 		localStorage.setItem('myGists', JSON.stringify(gistStorage))
// 	}
// 	console.error('That\'s not a gist.');
// 	return false;
// }


function tableRow(gist) {
	var tr = document.createElement('tr');
	var td1 = document.createElement('td');
	var td2 = document.createElement('td');
	td1.innerHTML = '<a href=\"' + gist.address + '\">' + gist.desc + '</a>';
	td2.innerHTML = 'button';
	tr.appendChild(td1);
	tr.appendChild(td2);
	return tr;
}

// function extractGist(gist) {
// 	var gistCell = document.createElement('td');
// 	var buttonCell = document.createElement('td');
// 	gistCell.innerHTML = '<a href=\"' + gist.address + '\">' + gist.desc + '</a>';
// 	buttonCell = 'button';
// 	return {'gistCell':gistCell, 'buttonCell':buttonCell};
// }

// function saveOptions() {

// }

function renderGistTable(table, gistJSON) {
	//clear table
	for (var i=table.childNodes.length - 1; i >= 0; i--) {
		table.removeChild(table.childNodes[i]);
	}
	for (var j=0; j < gistJSON.length; j++) {
		//loop through each page of gists (subarray)
		for (var k=0; k < gistJSON[j].length; k++) {
			var lang;
			for (var key in gistJSON[j][k].files) {
				if (gistJSON[j][k].files.hasOwnProperty(key)) {
					lang = gistJSON[j][k].files[key].language;
				}
			}
			var newGist = new Gist(gistJSON[j][k].description, gistJSON[j][k].html_url, lang);
			console.log(newGist);
			table.appendChild(tableRow(newGist));
		}
	}
}


//runs AJAX query
function getGists() {
	if (document.getElementsByName('numPages')[0].value >= 1 && document.getElementsByName('numPages')[0].value <= 5) {
		var numPages = document.getElementsByName('numPages')[0].value;
		gistJSON = [];
		for (var i = 0; i < numPages; i++) {
			var req = new XMLHttpRequest();
			if (!req) {
				throw 'Request did not go through.';
			}
			var url = 'https://api.github.com/gists/public';
			var params = {
				mode: 'json',
				page: i + 1
			};
			url += '?' + appendToQuery(params);
			console.log(url);
			req.onreadystatechange = function() {
				if (this.readyState === 4) {
					gistJSON.push(JSON.parse(this.responseText));
					console.log(gistJSON);
				}
				renderGistTable(document.getElementById('gist-table'), gistJSON);
			};
			req.open('GET', url);
			req.send();
		}
	}
	//invalid input case
	else {
		console.log('Invalid input.');
	}

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


function clearLocalStorage() {
	localStorage.clear();
}


window.onload = function() {
	var testStorage = localStorage.getItem('myGists');
	if (testStorage === null) {
		gistStorage = {'gists': [], 'favs': []};
		localStorage.setItem('myGists', JSON.stringify(gistStorage));
	}
	else {
		gistStorage = JSON.parse(localStorage.getItem('myGists'));
	}
	getGists();
};