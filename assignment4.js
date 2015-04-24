//assignment4.js

function testFunc(printInput) {
	document.getElementById('output').innerHTML = 'test';
}

function gistAjax() {
	var req = new XMLHttpRequest();
	if (!req) {
		throw 'Request did not go through.';
	}
	//var url = 
}

function saveDemoInput() {
	localStorage.setItem('demoText',document.getElementsByName('demo-input')[0].value);
}

function clearLocalStorage() {
	localStorage.clear();
}

function displayLocalStorage(fav) {
	document.getElementById('output').innerHTML = localStorage.getItem('demoText');
}

window.onload = function() {
	testFunc("Gwalla gwalla");
	saveDemoInput();
	displayLocalStorage("swag");
	gistAjax();
};