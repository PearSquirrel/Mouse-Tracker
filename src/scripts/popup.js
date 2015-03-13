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
    



    var pixels_dailyDistance = bgPage.dailyDistance;
    // var pixels_dailyDistance = bgPage.minutelyDistance;
    
    var allTimeConversions = convertFromPixels(pixels_allTimeDistance);
    addAllTimeDistanceItem('Pixels', Number(Math.floor(pixels_allTimeDistance)).toLocaleString('en'));
    addAllTimeDistanceItem('Inches', Number(Math.floor(allTimeConversions[INCHES])).toLocaleString('en'));
    addAllTimeDistanceItem('Feet', Number(Math.floor(allTimeConversions[FEET])).toLocaleString('en'));
    addAllTimeDistanceItem('Miles', Number(Math.floor(allTimeConversions[MILES])).toLocaleString('en'));
    
    var dailyConversions = convertFromPixels(pixels_dailyDistance);
    addDailyDistanceItem('Pixels', Number(Math.floor(pixels_dailyDistance)).toLocaleString('en'));
    addDailyDistanceItem('Inches', Number(Math.floor(dailyConversions[INCHES])).toLocaleString('en'));
    addDailyDistanceItem('Feet', Number(Math.floor(dailyConversions[FEET])).toLocaleString('en'));
    addDailyDistanceItem('Miles', Number(Math.floor(dailyConversions[MILES])).toLocaleString('en'));
    // $('.tab-content').append('Current Time: ' + bgPage.currentMinutes);

    var quickLook = document.getElementById('distance-traveled');
    quickLook.innerHTML = Number(Math.floor(pixels_dailyDistance)).toLocaleString('en') + " pixels so far today";
});


function addAllTimeDistanceItem(units, distance) {
    var tableAddition = '<tr class="distanceTableRow"><td>' + units + '</td><td>' + distance + '</td></tr>';
    $allTimeDistanceTable.append(tableAddition);
}

function addDailyDistanceItem(units, distance) {
    var tableAddition = '<tr class="distanceTableRow"><td>' + units + '</td><td>' + distance + '</td></tr>';
    $dailyDistanceTable.append(tableAddition);
}

function convertFromPixels(pixels) {
    var conversions = [];
    conversions.push( (Math.round(pixels / ppi * 100000) / 100000) ); // inches
    conversions.push( (Math.round(conversions[INCHES] / 12.0 * 100000) / 100000) ); // feet
    conversions.push( (Math.round(conversions[FEET] / 5280.0 * 100000) / 100000) ); // miles
    return conversions;
}