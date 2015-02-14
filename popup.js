var bgPage = chrome.extension.getBackgroundPage();

$(document).ready(function() {
    $('#status').text('initial');
    renderStatus("distance: " + bgPage.distance);
});

function renderStatus(statusText) {
    $('#status').text(statusText);
};