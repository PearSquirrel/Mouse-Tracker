$(document).ready(function() {
    document.onmousemove = function(e) {        
        chrome.runtime.sendMessage( { greeting: "coords", coords: { x: e.pageX, y: e.pageY } } );
    };
});
