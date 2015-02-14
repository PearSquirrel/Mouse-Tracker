var x = 0
var y = 0
var xDifference = 0;
var yDifference = 0;
var distance = 0;
var oldX = 0;
var oldY = 0;

var bgPage = chrome.extension.getBackgroundPage();

$(document).ready(function() {
    $('#status').text('initial');
    renderStatus("distance: " + bgPage.distance);
});

function renderStatus(statusText) {
    $('#status').text(statusText);
    //document.getElementById('status').textContent = statusText;
};

document.onmousemove = function(e)
{
    oldX = x;
    oldY = y;
    x = e.pageX;
    y = e.pageY;
    xDifference = x - oldX;
    yDifference = y - oldY;
    distance += Math.sqrt(Math.pow(xDifference,2) + Math.pow(yDifference,2));
    renderStatus('distance ' + distance);
};