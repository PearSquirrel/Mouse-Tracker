var distance = loadDistance();

var x = 0
var y = 0
var xDifference = 0;
var yDifference = 0;
var oldX = 0;
var oldY = 0;

var ALL_TIME_DISTANCE = "allTimeDistance";

function loadDistance() {
    var dist = parseInt(localStorage[ALL_TIME_DISTANCE]) || 0;
    console.log(dist)
    return dist;
}

function saveDistance(dist) {
    localStorage[ALL_TIME_DISTANCE] = dist;
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting == "coords") {
            oldX = x;
            oldY = y;
            x = request.coords.x;
            y = request.coords.y;
            xDifference = x - oldX;
            yDifference = y - oldY;
            distance += Math.floor(Math.sqrt(Math.pow(xDifference,2) + Math.pow(yDifference,2)));
            
            saveDistance(distance);
            
            sendResponse({farewell: "success"});
        }
});