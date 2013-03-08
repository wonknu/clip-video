/**
 * OBJECT USED TO STORE STATIC DATA ...
 */

// Static variables
var STATIC = {
    PATH_ASSETS : 'assets/',
    HEIGHT : 482,
    WIDTH : 858,
    VIDEO_WIDTH : 1024
};

// Custom events name
var EVENTS = {
    // Triggered by $(window)
    // Used when a button is clicked and send as custom event
    // Also listened by video object to pause video
    DISPLAY_POPIN : "DiSpLaY-PoPiN",
    // Event dispatched when video is playing
    VIDEO_UPDT_TIME : "ViDeO-UpDaTe-TiMe",
    // Used when json loading is done
    APP_READY : "applicationIsReady",
    // sent when play goes full-browser or leave full-browser
    VIDEO_RESIZE : "videoHasChangedSize"
};

// Data to load
var BUTTONS_DATA = [ // Json to load, one url by animated button and a given ID
    {
        "jsonUrl" : STATIC.PATH_ASSETS + "json/lead-singer.json",
        "id" : "1"
    }
];
