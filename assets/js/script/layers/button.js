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
            this.jsonData = jsonData[0] || {};
            this.$el = $(document.createElement('div')).addClass('btn-anim');
            this.btn = $(document.createElement('a')).attr('href', '#');
            this.tooltip = $(document.createElement('div')).addClass('btn-tooltip').text('voir le look');
            
            this.currMin = -1;
            this.currSec = -1;
            
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
            var _this = this;
            this.btn.bind('mouseover', function (e)
            { // Display tooltip
                _this.tooltip.stop().fadeIn(400);
            })
            .bind('mouseout', function (e)
            { // hide tooltip
                _this.tooltip.stop().fadeOut(400);
            })
            .bind('click', function (e)
            { // call popin
                $(window).trigger(EVENTS.DISPLAY_POPIN, [this.id]); // trigger custom event on window object
            });
        };
        
        /**
         * Remove event listener 
         */
        AnimatedButton.prototype.removeListener = function ()
        {
            this.btn.bind('mouseover, mouseout, click');
        };
        
        /**
         * Request button to render for a given position in time [refer to json data]
         */
        AnimatedButton.prototype.render = function (min, sec, ratio, force)
        {
            if(this.jsonData[min] != null && this.jsonData[min] != undefined && this.jsonData[min][sec] != null && this.jsonData[min][sec] != undefined){
                this.currMin = min;
                this.currSec = sec;
                this.applyRender(ratio);
            }
            else if(force){
                this.applyRender(ratio);
            }
        };
        
        AnimatedButton.prototype.applyRender = function (ratio)
        {
            this.$el.css({
                left : (this.jsonData[this.currMin][this.currSec].x * ratio),
                top : (this.jsonData[this.currMin][this.currSec].y * ratio)
            });
        }
        
        // return objet to be used inside the global scope
        return AnimatedButton;

    })();

}).call(this);
