$(document).ready(function() {
    
    console.log('document ready');
    //$('body').css('background-color', 'yellow');
    //$('#gbqfq').css('color', 'blue');
    
    document.onmousemove = function(e) {
        $('#gbqfq').val(e.pageX + ', ' + e.pageY);
        
        chrome.runtime.sendMessage({greeting: "hello", coords: {x: e.pageX, y: e.pageY}}, function(response) {
            console.log(response.farewell);
        });
        
    };
});
