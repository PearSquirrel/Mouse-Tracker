var x = 0
var y = 0

var bgPage = chrome.extension.getBackgroundPage();

$(document).ready(function() {
    $('#status').text('initial');
    renderStatus("distance: " + bgPage.distance);
});

function renderStatus(statusText) {
    $('#status').text(statusText);
    //document.getElementById('status').textContent = statusText;
};

/*document.onmousemove = function(e) {
    x = e.pageX;
    y = e.pageY;
    renderStatus('x:' + x + ', y:' + y);
};*/

/*chrome.runtime.sendMessage({greeting: "gimme_mah_info_brej"}, function(response) {
    console.log(response.farewell);
    renderStatus("distance: " + response.distance);
});*/