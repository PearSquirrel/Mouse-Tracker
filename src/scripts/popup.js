var bgPage = chrome.extension.getBackgroundPage();

var ppi = 227.0; // need to change based on user screen size

//Indices for different units
var INCHES = 0;
var FEET = 1;
var MILES = 2;

//Cutoffs for when QuickView switches from one unit to the next
var pixelsCutoff = 100000;
var inchesCutoff = 36;
var feetCutoff = 5280;

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
    
    //Add daily distances to the table
    var dailyConversions = convertFromPixels(pixels_dailyDistance);
    addDailyDistanceItem('Pixels', Number(Math.floor(pixels_dailyDistance)).toLocaleString('en'));
    addDailyDistanceItem('Inches', Number(Math.floor(dailyConversions[INCHES])).toLocaleString('en'));
    addDailyDistanceItem('Feet', Number((dailyConversions[FEET]).toFixed(1)).toLocaleString('en'));
    addDailyDistanceItem('Miles', Number((dailyConversions[MILES]).toFixed(3)).toLocaleString('en'));
    
    //Add all time distances to the table
    var allTimeConversions = convertFromPixels(pixels_allTimeDistance);
    addAllTimeDistanceItem('Pixels', Number(Math.floor(pixels_allTimeDistance)).toLocaleString('en'));
    addAllTimeDistanceItem('Inches', Number(Math.floor(allTimeConversions[INCHES])).toLocaleString('en'));
    addAllTimeDistanceItem('Feet', Number((allTimeConversions[FEET]).toFixed(1)).toLocaleString('en'));
    addAllTimeDistanceItem('Miles', Number((allTimeConversions[MILES]).toFixed(3)).toLocaleString('en'));
    
    // $('.tab-content').append('Current Time: ' + bgPage.currentMinutes);

    //Display QuickView
    var quickView = document.getElementById('distance-traveled');
    quickView.innerHTML = generateQuickViewNumber(pixels_dailyDistance, dailyConversions) + " today";
});

function generateQuickViewNumber(pixels_dailyDistance, dailyConversions) {
    var number = "";
    if (pixels_dailyDistance < pixelsCutoff) {
        number = Number(pixels_dailyDistance).toLocaleString('en') + " pixels";
    } else if (dailyConversions[INCHES] < inchesCutoff) {
        number = Number(dailyConversions[INCHES]).toLocaleString('en') + " inches";
    } else if (dailyConversions[FEET] < feetCutoff) {
        number = Number((dailyConversions[FEET]).toFixed(1)).toLocaleString('en') + " feet";
    } else {
        number = Number((dailyConversions[MILES]).toFixed(3)).toLocaleString('en') + " miles";
    }
    return number;
}


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
