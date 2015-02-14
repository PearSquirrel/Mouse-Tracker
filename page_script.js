$(document).ready(function() {
    
    console.log('document ready');
    //$('body').css('background-color', 'yellow');
    //$('#gbqfq').css('color', 'blue');
    
    chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
        console.log(response.farewell);
    });
    
    document.onmousemove = function(e) {
        $('#gbqfq').val(e.pageX + ', ' + e.pageY);
        
    };
});
