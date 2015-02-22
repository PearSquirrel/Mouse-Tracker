var bgPage = chrome.extension.getBackgroundPage();

var ppi = 227.0; // need to change based on user screen size
var INCHES = 0;
var FEET = 1;
var MILES = 2;

var $allTimeDistanceTable;
var $dailyDistanceTable;

$(document).ready(function() {
    
    var pages = document.querySelector('core-pages');
    var tabs = document.querySelector('paper-tabs');
    tabs.addEventListener('core-select', function() {
      pages.selected = tabs.selected;
    });

    $allTimeDistanceTable = $('#allTimeDistanceTable');
    $dailyDistanceTable = $('#dailyDistanceTable');
    
    var pixels_allTimeDistance = bgPage.allTimeDistance;
    
    //var pixels_dailyDistance = bgPage.dailyDistance;
    var pixels_dailyDistance = bgPage.minutelyDistance;
    
    var allTimeConversions = convertFromPixels(pixels_allTimeDistance);
    addAllTimeDistanceItem('Pixels', Math.floor(pixels_allTimeDistance));
    addAllTimeDistanceItem('Inches', allTimeConversions[INCHES]);
    addAllTimeDistanceItem('Feet', allTimeConversions[FEET]);
    addAllTimeDistanceItem('Miles', allTimeConversions[MILES]);
    
    var dailyConversions = convertFromPixels(pixels_dailyDistance);
    addDailyDistanceItem('Pixels', Math.floor(pixels_dailyDistance));
    addDailyDistanceItem('Inches', dailyConversions[INCHES]);
    addDailyDistanceItem('Feet', dailyConversions[FEET]);
    addDailyDistanceItem('Miles', dailyConversions[MILES]);
    $('.tab-content').append('Current Time: ' + bgPage.currentMinutes);
});


function addAllTimeDistanceItem(units, distance) {
    var tableAddition = '<tr class="distanceTableRow"><td>' + units + '</td><td>' + distance + '<td/></tr>';
    $allTimeDistanceTable.append(tableAddition);
};

function addDailyDistanceItem(units, distance) {
    var tableAddition = '<tr class="distanceTableRow"><td>' + units + '</td><td>' + distance + '<td/></tr>';
    $dailyDistanceTable.append(tableAddition);
};

function convertFromPixels(pixels) {
    var conversions = [];
    conversions.push(pixels / ppi); // inches
    conversions.push(conversions[INCHES] / 12.0); // feet
    conversions.push(conversions[FEET] / 5280.0); // miles
    return conversions;
};