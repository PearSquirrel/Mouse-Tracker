// retrieve the background page, background.js
var bgPage = chrome.extension.getBackgroundPage();

var ppi = 227.0; // need to change based on user screen size

//Indices for different units
var INCHES = 0;
var FEET = 1;
var MILES = 2;

//Cutoffs for when QuickView switches from one unit to the next
var pixelsCutoff = 100000;
var inchesCutoff = 1000;
var feetCutoff = 5280;

// true if the quick view header is showing the daily distance
var showingTodayStat = true;

// the quick view header
var $distanceTraveled;

// variables containing the daily and all time distances retrieved from the background page
var pixels_allTimeDistance;
var pixels_dailyDistance;

// lists containing the converted values for the daily and all time distances
var dailyConversions;
var allTimeConversions; 

// the two tables containing the daily and all time distances in different units
var $allTimeDistanceTable;
var $dailyDistanceTable;

$(document).ready(function() {
    
    // for the tabbing effect
    var pages = document.querySelector('core-pages');
    var tabs = document.querySelector('paper-tabs');
    tabs.addEventListener('core-select', function() {
        pages.selected = tabs.selected;
    });

    $allTimeDistanceTable = $('#allTimeDistanceTable');
    $dailyDistanceTable = $('#dailyDistanceTable');
    
    // retrieves the daily and all time distances from the background page, background.js
    pixels_allTimeDistance = bgPage.allTimeDistance;
    pixels_dailyDistance = bgPage.dailyDistance;
    
    //Add daily distances to the table
    dailyConversions = convertFromPixels(pixels_dailyDistance);
    addDailyDistanceItem('Pixels', Number(Math.floor(pixels_dailyDistance)).toLocaleString('en'));
    addDailyDistanceItem('Inches', Number(Math.floor(dailyConversions[INCHES])).toLocaleString('en'));
    addDailyDistanceItem('Feet', Number((dailyConversions[FEET]).toFixed(1)).toLocaleString('en'));
    addDailyDistanceItem('Miles', Number((dailyConversions[MILES]).toFixed(3)).toLocaleString('en'));
    
    //Add all time distances to the table
    allTimeConversions = convertFromPixels(pixels_allTimeDistance);
    addAllTimeDistanceItem('Pixels', Number(Math.floor(pixels_allTimeDistance)).toLocaleString('en'));
    addAllTimeDistanceItem('Inches', Number(Math.floor(allTimeConversions[INCHES])).toLocaleString('en'));
    addAllTimeDistanceItem('Feet', Number((allTimeConversions[FEET]).toFixed(1)).toLocaleString('en'));
    addAllTimeDistanceItem('Miles', Number((allTimeConversions[MILES]).toFixed(3)).toLocaleString('en'));
    
    // $('.tab-content').append('Current Time: ' + bgPage.currentMinutes);

    $distanceTraveled = $('#distance-traveled');
    
    // sets the initial text of the quick view header to be the daily distance
    $distanceTraveled.html(generateQuickViewNumber(pixels_dailyDistance, dailyConversions) + ' today');
    
    // activates the first pulse/switch after 1 second
    setTimeout(updateQuickView, 2000);
    
    // activates the consecutive pulses/switches every 8 seconds
    // the 8 seconds includes the 3 seconds it takes to complete the switching animation
    setInterval(updateQuickView, 6000); 
});
 
// switches between showing the daily amount and the all time amount
var updateQuickView = function() {
    $distanceTraveled.animate({'opacity': 0}, 500, function() {
        if(showingTodayStat) {
            // switches to all time distance
            $(this).html(generateQuickViewNumber(pixels_allTimeDistance, allTimeConversions) + ' total');
        } 
        else {
            // switches to today/daily distance
            $(this).html(generateQuickViewNumber(pixels_dailyDistance, dailyConversions) + ' today');
        }
        showingTodayStat = !showingTodayStat; 
        $(this).animate({'opacity': 1}, 500);    
    }); 
};

// based on the distances, this function determines which unit to display the 
function generateQuickViewNumber(pixels_dailyDistance, dailyConversions) {
    var number = "";
    if (pixels_dailyDistance < pixelsCutoff) {
        number = Number(pixels_dailyDistance).toLocaleString('en') + " pixels";
    } 
    else if (dailyConversions[INCHES] < inchesCutoff) {
        number = Number(dailyConversions[INCHES]).toLocaleString('en') + " inches";
    } 
    else if (dailyConversions[FEET] < feetCutoff) {
        number = Number((dailyConversions[FEET]).toFixed(1)).toLocaleString('en') + " feet";
    } 
    else {
        number = Number((dailyConversions[MILES]).toFixed(3)).toLocaleString('en') + " miles";
    }
    return number;
}

// adds a row to the table containing the stats for all time distance
function addAllTimeDistanceItem(units, distance) {
    var tableAddition = '<tr class="distanceTableRow"><td>' + units + '</td><td>' + distance + '</td></tr>';
    $allTimeDistanceTable.append(tableAddition);
}

// adds a row to the table containing the stats for daily distance
function addDailyDistanceItem(units, distance) {
    var tableAddition = '<tr class="distanceTableRow"><td>' + units + '</td><td>' + distance + '</td></tr>';
    $dailyDistanceTable.append(tableAddition);
}

// returns a list containing values for different units (inches, feet, and miles) converted from pixels
function convertFromPixels(pixels) {
    var conversions = [];
    conversions.push( (Math.round(pixels / ppi * 100000) / 100000) ); // inches
    conversions.push( (Math.round(conversions[INCHES] / 12.0 * 100000) / 100000) ); // feet
    conversions.push( (Math.round(conversions[FEET] / 5280.0 * 100000) / 100000) ); // miles
    return conversions;
}