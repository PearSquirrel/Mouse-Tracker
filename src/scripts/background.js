// constants for local storage
var ALL_TIME_DISTANCE = "allTimeDistance";

var allTimeDistance = loadAllTimeDistance();
var currentDate = updateCurrentDate(); 
var dailyDistance = loadDailyDistance(); 

// these minute variables are temporary
var currentMinutes = updateCurrentTime();
var minutelyDistance = loadMinutelyDistance();

// notification ID
var notificationID = 0;

// the variables are used to calculate changes in distance based on mouse x and y coordinates
var x = 0;
var y = 0;
var xDifference = 0;
var yDifference = 0;
var oldX = 0;
var oldY = 0;

var notificationID = 0;

// next notification milestone in miles
var nextMilestone = allTimeDistance + 10000;

// returns the all-time distance variable that is stored in local storage
function loadAllTimeDistance() {
    var dist = parseInt(localStorage[ALL_TIME_DISTANCE]) || 0;
    return dist;
}

// loads the distance for the current date
function loadDailyDistance() {
    var dist = parseInt(localStorage[currentDate]) || 0;
    return dist;
}

// loads the distance for the current minute
function  loadMinutelyDistance() {
    var dist = parseInt(localStorage[currentMinutes]) || 0;
    return dist;
}

// returns a string for the current date in the format: yyyy/mm/dd
// this string is the key for the daily distance value in the local storage dictionary
function updateCurrentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) {
        dd='0'+dd;
    }      
    if(mm<10) {
        mm='0'+mm;
    } 
    today = yyyy + '/' + mm + '/' + dd;
    return today;
}

// returns a string for the current time in the format: yyyy/mm/dd/hh:mm
function updateCurrentTime() {
    var time = updateCurrentDate();
    var today = new Date();
    time += '/' + today.getHours() + ':' + today.getMinutes();
    return time;
}

// saves all the distances in their respective variables and into local storage
function saveDistance(newDist) {
    // updates all-time distance
    allTimeDistance += newDist;
    localStorage[ALL_TIME_DISTANCE] = allTimeDistance;
    
    // updates daily distance
    currentDate = updateCurrentDate(); 
    dailyDistance = loadDailyDistance() + newDist;
    localStorage[currentDate] = dailyDistance;
    
    // updates minutely distance
    currentMinutes = updateCurrentTime();
    minutelyDistance = loadMinutelyDistance() + newDist;
    localStorage[currentMinutes] = minutelyDistance;
    
    if(allTimeDistance > nextMilestone) {
        // send notification
        var opt = {
            type: "basic",
            title: "Milestone",
            message: "You moved " + nextMilestone + " pixels!!!",
            iconUrl: chrome.runtime.getURL('../images/icon.png')
        };
	 
        chrome.notifications.create('notify' + notificationID, opt, function(id) {
            console.log('displayed notification ' + id);
        });

        notificationID += 1;
        nextMilestone += 10000;
    }
}

// listens for messages from page_script.js containing the latest coordinates for the mouse (Go MouseRat!)
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // popup.js is requesting the coordinates of the mouse
        if (request.greeting == "coords") {
            oldX = x;
            oldY = y;
            x = request.coords.x;
            y = request.coords.y;
            xDifference = x - oldX;
            yDifference = y - oldY;
            
            // calculates new distance using the pythagorean theorem/distance formula
            var newDist = Math.floor(Math.sqrt(Math.pow(xDifference,2) + Math.pow(yDifference,2)));
            saveDistance(newDist);
            
            sendResponse({farewell: "success"});
        }
});
