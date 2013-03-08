/**
 * @author Fabrice
 *
 * pattern : Singleton
 * Objet d'instance unique dans un projet (pas de doublon possible)
 */
var Video = (function ()
{
    // private var
    var _instance, // only instance of the Singleton object
        $videoObject = null,
        videoPlayer = null,
        $vid_obj = null,
        options = null,
        PLAYING_EVENT = "video-is-playing",
        IS_FULLSCREEN = false;
    // can't be called outside of this object

    function createVideo () // private methode
    {
        if(options == null || options == undefined) return;
        $videoObject = $('<video controls/>');
        $videoObject.attr('id', 'revolver-mix');
        $videoObject.attr('class', 'video-js vjs-default-skin');
        if(options.videoUrl != null && options.videoUrl != undefined)
            for (videoMeta in options.videoUrl) // loop through video source
                $videoObject.append('<source src="' + options.videoUrl[videoMeta] + '" type="' + videoMeta + '">');
        if(options.width != null && options.width != undefined) { // set width
            options.daddy.width(options.width);
            $videoObject.attr("width", "100%" );
        }
        if(options.height != null && options.height != undefined) { // set height
            options.daddy.height(options.height);
            $videoObject.attr("height", "100%" );
        }
        
        if(options.daddy != null && options.daddy != undefined) options.daddy.append($videoObject); // add to parent container
        videoPlayer = $videoObject.get(0);
        
        $vid_obj = _V_( "revolver-mix").ready(function ()
        {
            $("img.vjs-poster").attr("src", options.poster).show();
            // reset the UI states
            $(".vjs-big-play-button").hide();
            $("#div_video").removeClass("vjs-playing").addClass("vjs-paused");
            
            videoPlayer.load(); // load the new sources
            
            initListener();
        });
        
    }
    
    function sendEventUpdate (force)
    {
        var force = force || false;
        $(window).trigger(EVENTS.VIDEO_UPDT_TIME, [{
            min : $vid_obj.currentTime().toFixed(0),
            sec : $vid_obj.currentTime().toFixed(1),
            force : force
        }]);
    }
    
    function initListener () // private methode
    {
        videoPlayer.addEventListener('playing', function (e)
        {
            console.log('PLAYING');
            //playingInterval = setInterval(function(){ _this.playing(e); }, 10);
            $vid_obj.addEvent('timeupdate', function (e)
            {
                sendEventUpdate();
            });
        }, false);
        
        videoPlayer.addEventListener('pause', function (e)
        {
            console.log('PAUSED');
            //if(playingInterval != null && playingInterval != undefined) clearInterval(playingInterval);
            $vid_obj.removeEvent('timeupdate');
        }, false);
        
        $('.vjs-fullscreen-control').live('click', function(e)
        {
            var newWidth;
            e.preventDefault();
            
            if(IS_FULLSCREEN){
                IS_FULLSCREEN = false;
                newWidth = options.width;
                options.daddy.css({
                    "position" : "relative",
                    "width" : newWidth + "px",
                    "height" : options.height + "px",
                    "left" : 0,
                    'margin-left' : 0
                });
            }
            else{
                IS_FULLSCREEN = true;
                newWidth = $(window).width() * 0.9;
                options.daddy.css({
                    "position" : "absolute",
                    "width" : newWidth,
                    "height" : (STATIC.HEIGHT * (newWidth/STATIC.WIDTH)),
                    "left" : ($(window).width() * .5) + "px",
                    'margin-left' : "-" + (newWidth * .5) + "px"
                });
            }
            
            $(window).trigger(EVENTS.VIDEO_RESIZE, [newWidth]);
            sendEventUpdate(true);
        });
    }
    
    function removeListener ()
    {
        
    }
    
    /**
     * @param, {Object} opt, videoUrl, width, height, daddy
     */
    function Singleton (opt)
    {
        options = opt || {};
        createVideo();
        
        /**
         * Singleton constructor
         */
        return {
            // GETTER & SETTER, to access private properties from the singleton
            getCurrentTime : function () // getter = read var
            {
                
            },
            setCurrentTime : function (time) // setter = write var
            {
                
            }
        };
    }

    var _static = {
        name : "[Singleton Video]",
        PLAYING_EVENT : PLAYING_EVENT,
        /**
         * Only way to get the only instance of the singleton object
         * @param {Object} options
         */
        getInstance : function (options)
        {
            if (_instance === undefined) _instance = new Singleton(options);
            return _instance;
        }
    };
    return _static;

})(); 