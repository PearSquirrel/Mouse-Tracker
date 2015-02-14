var x = 0
var y = 0
var xDifference = 0;
var yDifference = 0;
var distance = 0;
var oldX = 0;
var oldY = 0;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting == "hello") {
            oldX = x;
            oldY = y;


            x = request.coords.x;
            y = request.coords.y;
            xDifference = x - oldX;
            yDifference = y - oldY;
            distance += Math.sqrt(Math.pow(xDifference,2) + Math.pow(yDifference,2));
            // distance = 0;
            sendResponse({farewell: "success"});
        }
        
});