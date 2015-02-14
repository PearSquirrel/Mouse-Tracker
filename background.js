var x = 0
var y = 0
var xDifference = 0;
var yDifference = 0;
var distance = loadDistance();
var oldX = 0;
var oldY = 0;

function loadDistance() {
    var dist = parseInt(localStorage["distance"]);
    console.log(dist)
    if (dist == undefined) {
        dist = 0;
    }
    return dist;
}

function saveDistance(dist) {
    localStorage["distance"] = dist;
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