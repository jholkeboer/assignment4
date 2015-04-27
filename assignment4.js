//assignment4.js
//jack holkeboer

var gistArray = [];
var gistJSON = [];
var numPages = 1;
var favStorage = null;


function Gist(desc, address, lang) {
	if (desc === null || desc === '' || desc === undefined) {
		this.desc = "[no description]";
	}
	else {
		this.desc = desc;
	}
	this.address = address;
	this.lang = lang;
}

function Fav(favLink, favLang) {
	//favorite constructor
	this.favLink = favLink;
	this.favLang = favLang;
}

function addFav(favStorage, idCounter) {
	var el = document.getElementById(idCounter);
	var td1 = el.childNodes[0];
	var td2 = el.childNodes[1];
	var fav = new Fav(td1, td2);
	if (fav instanceof Fav) {
		favStorage.favs.push(fav);
		localStorage.setItem('favStorageItem', JSON.stringify(favStorage));
	}
	console.error('fav add error');
	return false;
}


function removeFav(index) {

}


function tableRow(gist, idCounter) {
	var tr = document.createElement('tr');
	tr.setAttribute("id",idCounter);
	var td1 = document.createElement('td');
	var td2 = document.createElement('td');
	var td3 = document.createElement('td');
	td1.innerHTML = '<a href=\"' + gist.address + '\">' + gist.desc + '</a>';
	td2.innerHTML = gist.lang;
	td3.innerHTML = '<input type=\'button\' value=\'Favorite\' onclick=\'addFav(' + idCounter + ')\'>';
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	return tr;
}



function renderGistTable(table, gistJSON) {
	//clear table
	for (var i=table.childNodes.length - 1; i >= 0; i--) {
		table.removeChild(table.childNodes[i]);
	}
	var idCounter = 0;
	favTable = document.getElementById('favs-table');
	for (var j=0; j < gistJSON.length; j++) {
		//loop through each page of gists (subarray)
		for (var k=0; k < gistJSON[j].length; k++) {
				var lang;
				for (var key in gistJSON[j][k].files) {
					if (gistJSON[j][k].files.hasOwnProperty(key)) {
						if (gistJSON[j][k].files[key].language !== undefined && gistJSON[j][k].files[key].language !== '' && gistJSON[j][k].files[key].language !== null) {
							lang = gistJSON[j][k].files[key].language;
						}
						else {
							lang = 'no language listed';
						}
					}
				}
				var newGist = new Gist(gistJSON[j][k].description, gistJSON[j][k].html_url, lang);
				//language filtration
				if (document.getElementsByName('python')[0].checked) {
					if (newGist.lang == 'Python') {
						continue;
					}
				}
				else if (document.getElementsByName('javascript')[0].checked) {
					if (newGist.lang == 'JavaScript') {
						continue;
					}
				}
				else if (document.getElementsByName('sql')[0].checked) {
					if (newGist.lang == 'SQL') {
						continue;
					}
				}
				else if (document.getElementsByName('json')[0].checked) {
					if (newGist.lang == 'JSON') {
						continue;
					}
				}
			console.log(newGist);
			table.appendChild(tableRow(newGist, idCounter));
			idCounter += 1;
		}
	}
}

function renderFavTable(table) {
	for (var i=table.childNodes.length - 1; i >= 0; i--) {
		table.removeChild(table.childNodes[i]);
	}
	favStorage.favs.forEach(function(e) {
		var tr = document.createElement('tr');
		var td1 = document.createElement('td');
		var td2 = document.createElement('td');
		var td3 = document.createElement('td');
		td1 = e.favLink;
		td2 = e.favLang;
		td3 = 
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		table.appendChild(tr);
	});
}

//runs AJAX query
function getGists() {
	if (document.getElementsByName('numPages')[0].value >= 1 && document.getElementsByName('numPages')[0].value <= 5) {
		var el = document.getElementById('input-error');
		el.innerHTML = '';
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

				//render table
				renderGistTable(document.getElementById('gist-table'), gistJSON);
			};
			req.open('GET', url);
			req.send();
		}
	}
	//invalid input case
	else {
		console.log('Invalid input.');
		console.log(document.getElementsByName('numPages')[0].value);
		var el = document.getElementById('input-error');
		el.innerHTML = 'You have not entered a valid number of pages.';
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
	var testStorage = localStorage.getItem('favStorageItem');
	if (testStorage === null) {
		favStorage = {'favs': []};
		localStorage.setItem('favStorageItem', JSON.stringify(favStorage));
	}
	else {
		favStorage = JSON.parse(localStorage.getItem('favStorageItem'));
	}
	renderFavTable(document.getElementById('favs-table'));
};