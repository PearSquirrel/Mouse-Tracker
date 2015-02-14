var distance = 0;
var x = 0;
var y = 0;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting == "coords") {
            // new x and y are request.coords.x and request.coords.y
            distance += 1;
            sendResponse({farewell: "success"});
        }
});