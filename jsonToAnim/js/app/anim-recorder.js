(function ()
{ 'use strict';
    
    this.AnimRecorder = (function ()
    {
        
        function AnimRecorder (video)
        {
            this.a = {};
            this.v = this.ov = this.b = this.b_play = this.div = null;
            this.v_url = video;
            this.w = 0;
            this.h = 0;
            
            this.ov = null;
            
            this.init();
        }
        
        AnimRecorder.prototype.init = function() 
        {
            var _this = this;
            
            this.v = $('<video controls="controls"/>');
            this.v.append('<source src="' + this.v_url + '" type="video/mp4" />');
            $('body').append(this.v);
            
            this.w = this.v.height();
            this.h = this.v.width();
            this.v.bind("loadedmetadata", function ()
            {
                _this.w = $(this).width();
                _this.h = $(this).height();
                
                _this.createOverlay();
            });
        };
        
        AnimRecorder.prototype.createOverlay = function() 
        {
            this.ov = $('<div />');
            this.ov.css({
                height : this.h + "px",
                width : this.w + "px",
                backgroundColor : 'rgba(6, 255, 0, 0.1)',
                position : 'absolute',
                top : 0,
                left : 0
            });
            $('body').append(this.ov);
            
            this.div = $('<div />');
            this.div.css({
                height : "10px",
                width : "10px",
                backgroundColor : 'rgba(255, 0, 0, 0.5)',
                position : 'absolute',
                top : 0,
                left : 0
            });
            this.ov.append(this.div);
            
            this.b = $('<button type="button" style="display:block">save</button>');
            $('body').append(this.b);
            
            this.b_play = $('<button type="button">play</button>');
            $('body').append(this.b_play);
            
            this.initListener();
            
            //window.saveFile.getFile();
        };
        
        AnimRecorder.prototype.initListener = function() 
        {
            var _this = this, vidEl = this.v.get(0), playingInterval = null;
            vidEl.muted = true;
            this.ov.bind('mousedown', function (e)
            {
                $(this).bind('mousemove', function (e)
                {
                     if(_this.a[vidEl.currentTime.toFixed(0) + ""] == null || _this.a[vidEl.currentTime.toFixed(0) + ""] == undefined)
                        _this.a[vidEl.currentTime.toFixed(0) + ""] = {};
                     _this.a[vidEl.currentTime.toFixed(0) + ""][vidEl.currentTime.toFixed(1) + ""] = {
                         x : e.pageX,
                         y : e.pageY
                     }
                });
            })
            .bind('mouseup', function ()
            {
                $(this).unbind('mousemove');
            });
             
            $('body').bind('keyup', function (e)
            {
                if(e.keyCode == 32){
                    if (vidEl.paused) {
                        vidEl.playbackRate = 0.2;
                        vidEl.play();
                    }
                    else vidEl.pause();
                }
            });
            
            this.b.bind('click', function ()
            {
                $(window).trigger('export-json', [JSON.stringify([_this.a])]);
            });
            
            this.b_play.bind('click', function ()
            {
                vidEl.currentTime = 0;
                vidEl.playbackRate = 1;
                
                vidEl.addEventListener('playing', function (e)
                {
                    playingInterval = setInterval(function(){ _this.playing(e); }, 10);
                }, false);
                
                vidEl.addEventListener('pause', function (e)
                {
                    if(playingInterval != null && playingInterval != undefined) clearInterval(playingInterval);
                }, false);
                
                console.log(_this.a);
                
                vidEl.play();
            });
        };
        
        AnimRecorder.prototype.playing = function(e) 
        {
            var vidEl = this.v.get(0);
            var min = vidEl.currentTime.toFixed(0);
            var sec = vidEl.currentTime.toFixed(1);
            if(this.a[min] != null && this.a[min] != undefined && this.a[min][sec] != null && this.a[min][sec] != undefined){
                console.log("anim at : " + min + " min and " + sec + "s");
                
                this.div.css({
                    left : this.a[min][sec].x,
                    top : this.a[min][sec].y
                })
            }
        };
        
        AnimRecorder.prototype.removeListener = function() 
        {
            this.ov.unbind('click');
            $('body').unbind('keyup');
        };
        
        return AnimRecorder;

    })();

}).call(this);