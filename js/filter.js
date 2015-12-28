/*
 * KRK Filter - Content Script
 * 
 * This is the primary JS file that manages the detection and filtration of KRK from the web page.
 */

// Variables
var regex = /Kamaal/i;
var search = regex.exec(document.body.innerText);


// Functions
function filterMild() {
	console.log("Filtering KRK with Mild filter...");
	return $(":contains('Krk'), :contains('KAMAAL R KHAN'), :contains('kamaal r khan'), :contains('Kamaal Rashid Khan'), :contains('KRK'), :contains('KRK')").filter("h1,h2,h3,h4,h5,p,span,li");
}

function filterDefault () {
	console.log("Filtering KRK with Default filter...");
	return $(":contains('Krk'), :contains('KAMAAL R KHAN'), :contains('kamaal r khan'), :contains('Kamaal Rashid Khan'), :contains('KRK'), :contains('KRK')").filter(":only-child").closest('div');
}

function filterVindictive() {
	console.log("Filtering KRK with Vindictive filter...");
	return $(":contains('Krk'), :contains('KAMAAL R KHAN'), :contains('kamaal r khan'), :contains('Kamaal Rashid Khan'), :contains('KRK'), :contains('KRK')").filter(":not('body'):not('html')");
}

function getElements(filter) {
   if (filter == "mild") {
	   return filterMild();
   } else if (filter == "vindictive") {
	   return filterVindictive();
   } else {
	   return filterDefault();
   }
}

function filterElements(elements) {
	console.log("Elements to filter: ", elements);
	elements.fadeOut("fast");
}


// Implementation
if (search) {
   console.log("KRK found on page! - Searching for elements...");
   chrome.storage.sync.get({
     filter: 'aggro',
   }, function(items) {
	   console.log("Filter setting stored is: " + items.filter);
	   elements = getElements(items.filter);
	   filterElements(elements);
	   chrome.runtime.sendMessage({method: "saveStats", krk: elements.length}, function(response) {
			  console.log("Logging " + elements.length + " KRK."); 
		 });
	 });
  chrome.runtime.sendMessage({}, function(response) {});
}
