var distance = 0;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting == "hello") {
            distance += 1;
            sendResponse({farewell: "success"});
        }
        else if(request.greeting == "gimme_mah_info_brej") {
            sendResponse({farewell: "distance", distance: distance});
        }
});