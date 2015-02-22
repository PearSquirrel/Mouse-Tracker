var bgPage = chrome.extension.getBackgroundPage();

var ppi = 227.0; // need to change based on user screen size
var INCHES = 0;
var FEET = 1;
var MILES = 2;

$(document).ready(function() {
    //renderStatus("hello");
    var status = "Pixels: " + bgPage.distance + "\n...";
    var conversions = convertFromPixels(bgPage.distance);
    status += "\nInches: " + conversions[INCHES];
    status += "\nFeet: " + conversions[FEET];
    status += "\nMiles: " + conversions[MILES];
    renderStatus(status);
});

function renderStatus(statusText) {
    $('#page-1').text(statusText);
};

function convertFromPixels(pixels) {
    var conversions = [];
    conversions.push(pixels / ppi); // inches
    conversions.push(conversions[INCHES] / 12.0); // feet
    conversions.push(conversions[FEET] / 5280.0); // miles
    return conversions;
};