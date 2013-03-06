(function ()
{ 'use strict';
    
    this.AnimatedButton = (function ()
    {
        /*
         * Constructor
         * @param {Object} opt, object containing default path to php script and export json file
         */
        function AnimatedButton (container, id, jsonData)
        {
            this.container = container;
            this.id = id || -1;
            this.jsonData = jsonData || {};
            this.$el = $(document.createElement('div'))
                        .addClass('btn-anim');
            this.btn = $(document.createElement('a')).attr('href', '#');
            
            this.tooltip = $(document.createElement('div')).addClass('btn-tooltip').text('voir le look');
            
            this.$el.append(this.tooltip);
            this.$el.append(this.btn);
            
            this.container.append(this.$el);
            
            this.initListener();
        }
        
        /**
         * Add event listener
         */
        AnimatedButton.prototype.initListener = function ()
        {
            // ----------------------- TEMP
            this.$el.css({
                top : 200,
                left : 300
            });
            // ----------------------- FIN TEMP
            var _this = this;
            this.btn.bind('mouseover', function (e)
            { // Display tooltip
                _this.tooltip.stop().fadeIn(400);
            })
            .bind('mouseout', function (e)
            { // hide tooltip
                _this.tooltip.stop().fadeOut(400);
            });
            
            this.btn.bind('click', function (e)
            { // call popin
                $(window).trigger(EVENTS.DISPLAY_POPIN, [this.id]); // trigger custom event on window object
            });
        };
        
        /**
         * Remove event listener 
         */
        AnimatedButton.prototype.removeListener = function ()
        {
            this.btn.bind('mouseover, mouseout');
        };
        
        /**
         * Request button to render for a given position in time [refer to json data]
         */
        AnimatedButton.prototype.render = function (min, sec)
        {
            
        };
        
        // return objet to be used inside the global scope
        return AnimatedButton;

    })();

}).call(this);