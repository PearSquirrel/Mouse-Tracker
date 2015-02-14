var bgPage = chrome.extension.getBackgroundPage();

$(document).ready(function() {
    $('#status').text('initial');
    renderStatus("distance: " + bgPage.distance);
});

function renderStatus(statusText) {
    $('#status').text(statusText);
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