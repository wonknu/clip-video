(function ()
{ 'use strict';
    
    this.Buttons = (function ()
    {
        /*
         * Constructor
         */
        function Buttons (container)
        {
            if(container == null || container == undefined) throw new Error('ButtonManager instanciation Error : hup hup hup! il est ou mon container??'); 
            this.container = container;
            this.btnLayer = null;
            this.btns = [];
            this.ratio = (STATIC.WIDTH / STATIC.VIDEO_WIDTH);
            this.opt = {
                tagName : 'div',
                className : 'btn-layer'
            }
            
            this.createOverlay();
            this.createButtons();
        }
        
        /**
         * create overlay layer
         */
        Buttons.prototype.createOverlay = function ()
        {
            this.btnLayer = $(document.createElement(this.opt.tagName)).addClass(this.opt.className);
            this.container.append(this.btnLayer);
        };
        
        /**
         * create animated buttons
         */
        Buttons.prototype.createButtons = function ()
        {
            var _this = this,
                i,
                _loader = new Loader(),
                fileLoad = 0;
            
            for (i=0; i < BUTTONS_DATA.length; i++) {
                _loader.load(BUTTONS_DATA[i].jsonUrl, BUTTONS_DATA[i].id, function (data, id)
                {
                    if(++fileLoad >= BUTTONS_DATA.length) {
                        $(window).trigger(EVENTS.APP_READY);
                        _this.initListener();
                    }
                    _this.btns.push( new AnimatedButton(_this.btnLayer, id, data) );
                });
            };
        };
        
        /**
         * Listen to events
         */
        Buttons.prototype.initListener = function ()
        {
            var _this = this;
            $(window).bind(EVENTS.VIDEO_UPDT_TIME, function (e, t, force)
            { // Listen for player event -> player is playing video
                _this.updateButtons(t, force);
            });
            
            $(window).bind(EVENTS.VIDEO_RESIZE, function (e, width)
            { // Listen for player event -> player is playing video (newWidth/STATIC.WIDTH)
                _this.ratio = (width/STATIC.VIDEO_WIDTH);
            });
        };
        
        /**
         * Stop listening to events
         */
        Buttons.prototype.removeListener = function ()
        {
            $(window).unbind(EVENTS.VIDEO_UPDT_TIME + ", " + EVENTS.VIDEO_RESIZE);
        };
        
        /**
         * Tell buttons to render position from video current time
         * @param {Object} time
         */
        Buttons.prototype.updateButtons = function (time, force)
        {
            var _this = this;
            this.btns.forEach(function (el, i, arr)
            {
                el.render(time.min, time.sec, _this.ratio, force);
            });
        };
        
        // return objet to be used inside the global scope
        return Buttons;

    })();

}).call(this);
