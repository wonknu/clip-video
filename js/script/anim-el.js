(function ()
{ 'use strict';
    
    this.AnimEl = (function ()
    {
        
        function AnimEl (keyFrames)
        {
            this.keyFrames = keyFrames || {
                "0" : {
                    "0" : { x : 0, y : 0 },
                    "1" : { x : 1, y : 5 },
                    "2" : { x : 2, y : 10 },
                    "3" : { x : 3, y : 15 },
                    "4" : { x : 4, y : 20 },
                    "5" : { x : 5, y : 25 },
                    "6" : { x : 6, y : 30 },
                    "7" : { x : 7, y : 35 },
                    "8" : { x : 8, y : 40 },
                    "9" : { x : 9, y : 45 },
                    "10" : { x : 10, y : 50 }/*,
                    "" : { x : , y :  }*/
                }
            };
            
            this.minutes = 0;
            this.secondes = 0;
            
        }
        
        AnimEl.prototype.animate = function(time) 
        {
            
        };
        
        AnimEl.prototype.seek = function(time) 
        {
            
        };
        
        return AnimEl;

    })();

}).call(this);

