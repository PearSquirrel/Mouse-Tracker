var bgPage = chrome.extension.getBackgroundPage();

var ppi = 227.0; // need to change based on user screen size
var INCHES = 0;
var FEET = 1;
var MILES = 2;

var $distanceList;

$(document).ready(function() {
    $distanceList = $('#distanceList');
    var conversions = convertFromPixels(bgPage.distance);
    addDistanceItem('Pixels', Math.floor(bgPage.distance));
    addDistanceItem('Inches', conversions[INCHES]);
    addDistanceItem('Feet', conversions[FEET]);
    addDistanceItem('Miles', conversions[MILES]);
});

function addDistanceItem(units, distance) {
    $distanceList.append('<li class="distanceItem">' + units + ': ' + distance + '</li>');
};

function convertFromPixels(pixels) {
    var conversions = [];
    conversions.push(pixels / ppi); // inches
    conversions.push(conversions[INCHES] / 12.0); // feet
    conversions.push(conversions[FEET] / 5280.0); // miles
    return conversions;
};