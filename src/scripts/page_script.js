$(document).ready(function() {
    
    console.log('document ready');
    
    document.onmousemove = function(e) {        
        chrome.runtime.sendMessage({greeting: "coords", coords:{x: e.pageX, y: e.pageY}}, function(response) {
            console.log(response.farewell);
        });
    };
});
     