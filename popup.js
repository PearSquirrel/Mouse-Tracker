var x = 0
var y = 0

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting == "hello")
            sendResponse({farewell: "goodbye"});
    });

document.onmousemove = function(e)
{
    x = e.pageX;
    y = e.pageY;
    renderStatus('x:' + x + ', y:' + y);
};
