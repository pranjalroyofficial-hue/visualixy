// Visualixy Ad & Analytics Manager
(function() {
    window.triggerPopunder = function() {
        let count = parseInt(sessionStorage.getItem('action_count') || '0');
        count++;
        sessionStorage.setItem('action_count', count);
        
        // Open Monetag Direct Link ONLY once every 3 actions
        if (count % 3 === 0) {
            window.open('https://omg10.com/4/11508752', '_blank');
        }
    };
})();