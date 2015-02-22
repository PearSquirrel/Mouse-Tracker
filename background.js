// constants for local storage
var ALL_TIME_DISTANCE = "allTimeDistance";

var allTimeDistance = loadAllTimeDistance();
var currentDate = updateCurrentDate();
var dailyDistance = loadDailyDistance();

var currentMinutes = updateCurrentTime();
var minutelyDistance = loadMinutelyDistance();

var x = 0
var y = 0
var xDifference = 0;
var yDifference = 0;
var oldX = 0;
var oldY = 0;

function loadAllTimeDistance() {
    var dist = parseInt(localStorage[ALL_TIME_DISTANCE]) || 0;
    console.log(dist)
    return dist;
};

// loads the distance for the current date
function loadDailyDistance() {
    var dist = parseInt(localStorage[currentDate]) || 0;
    return dist;
};

function  loadMinutelyDistance() {
    var dist = parseInt(localStorage[currentMinutes]) || 0;
    return dist;
}

function updateCurrentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) {
        dd='0'+dd
    }      
    if(mm<10) {
        mm='0'+mm
    } 
    today = yyyy + '/' + mm + '/' + dd;
    console.log(today);
    return today;
};

function updateCurrentTime() {
    var time = updateCurrentDate();
    var today = new Date();
    time += '/' + today.getHours() + ':' + today.getMinutes();
    return time;
};

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
};

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        
        // popup.js is requesting the coordinates of the mouse
        if (request.greeting == "coords") {
            oldX = x;
            oldY = y;
            x = request.coords.x;
            y = request.coords.y;
            xDifference = x - oldX;
            yDifference = y - oldY;
            
            var newDist = Math.floor(Math.sqrt(Math.pow(xDifference,2) + Math.pow(yDifference,2)));
            saveDistance(newDist);
            
            sendResponse({farewell: "success"});
        }
});