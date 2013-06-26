(function ()
{ 'use strict';
    
    this.AnimRecorder = (function ()
    {
        /**
         * constructor
         * @param {String} video, path to video
         */
        function AnimRecorder ()
        {
            this.a = {};
            this.v = this.ov = this.b = this.b_play = this.div = null;
            this.v_url = null;
            this.w = 0;
            this.h = 0;
            this.ov = null;
            this.isCreated = false;
        }
        /**
         * auto initialize,
         * 		- create video tag
         * 		- request overlay creation
         */
        AnimRecorder.prototype.init = function(video) 
        {
            var _this = this;
            this.v_url = video;
            if(this.v != null) this.v.remove();
            this.v = $('<video controls="controls"/>');
            this.v.append('<source src="' + this.v_url + '" type="video/mp4" />');
            $('.container').prepend(this.v);
            
            this.w = this.v.height();
            this.h = this.v.width();
            this.v.bind("loadedmetadata", function ()
            {
                _this.w = $(this).width();
                _this.h = $(this).height();
                
                $(".wrapper").width(_this.w);
                
                _this.createOverlay();
            });
        };
        
        /**
         * Overlay creation,
         * 		- create overlay, get width / height from video tag properties
         * 		- create user UI
         * 			- button save JSON button
         * 			- button play ( which launch anim with normal speed )
         * 		- auto launch event listener
         */
        AnimRecorder.prototype.createOverlay = function() 
        {
            this.ov = $('<div />');
            this.ov.css({
                height : this.h + "px",
                width : this.w + "px",
                backgroundColor : 'rgba(0, 255, 192, 0.1)',
                position : 'absolute',
                top : 0,
                left : 0
            });
            $('.container').append(this.ov);
            
            if(this.isCreated) {
                this.removeListener();
                this.div.css({
                    transform : 'translate3d(0px, 0px, 0px)'
                });
            }
            else {
                this.isCreated = true;
                this.div = $('<div />').addClass('circle-wrapper');
                this.div.html('<div class="rond"></div>');
                this.ov.append(this.div);
                
                this.b_group = $('<div class="btn-group" ></div>');
                $('.container').append(this.b_group);
                
                this.b = $('<button type="button" class="btn btn-success hint--left" data-hint="export json to /export/export.json">save</button>');
                this.b_group.append(this.b);
                
                this.b_play = $('<button type="button" class="btn hint--bottom" data-hint="Play video with current json animation">play</button>');
                this.b_group.append(this.b_play);
                
                this.b_toogle = $('<button type="toogle-overlay" class="btn btn-inverse hint--right" data-hint="Toggle display state for overlay layer over the video">Toggle overlay</button>');
                this.b_group.append(this.b_toogle);
                window.saveFile.getFile();
            }
            this.initListener();
            
        };
        
        /**
         * launch user event listener
         */
        AnimRecorder.prototype.initListener = function() 
        {
            var _this = this, vidEl = this.v.get(0), playingInterval = null;
            vidEl.muted = true;
            $('body').bind('keyup', function (e)
            {
                if(e.keyCode == 9){
                    e.preventDefault();
                    if (vidEl.paused) {
                        vidEl.playbackRate = 0.01;
                        vidEl.play();
                        _this.record();
                    }
                    else {
                        _this.stopRecording();
                        vidEl.pause();
                    }
                }
                else if (e.keyCode == 39){
                    vidEl.playbackRate = vidEl.playbackRate + 0.1;
                    console.log('VIDEO PLAYING AT SPEED : ' + vidEl.playbackRate);
                }
                else if (e.keyCode == 37){
                    vidEl.playbackRate = vidEl.playbackRate - 0.1;
                    console.log('VIDEO PLAYING AT SPEED : ' + vidEl.playbackRate);
                }
            });
            
            this.b.bind('click', function ()
            {
                $(window).trigger('export-json', [[_this.a]]);
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
                
                vidEl.play();
            });
            
            this.b_toogle.bind('click', function ()
            {
                _this.ov.toggleClass('hidden');
            });
        };
        
        /**
         *  
         */
        AnimRecorder.prototype.record = function() 
        {
            var _this = this, vidEl = this.v.get(0);
            this.ov.bind('mousemove', function (e)
            {
                 if(_this.a[Math.floor(vidEl.currentTime)] == null || _this.a[Math.floor(vidEl.currentTime)] == undefined)
                    _this.a[Math.floor(vidEl.currentTime)] = {};
                 _this.a[Math.floor(vidEl.currentTime)][vidEl.currentTime.toFixed(1) + ""] = {
                     x : e.pageX - $(this).offset().left,
                     y : e.pageY - $(this).offset().top
                 }
            });
        };
        
        /**
         *  
         */
        AnimRecorder.prototype.stopRecording = function() 
        {
            this.ov.unbind('mousemove');
        };
        
        /**
         * Called each 10 milliseconds
         * 		- render anim from JSON object
         */
        AnimRecorder.prototype.playing = function(e) 
        {
            var vidEl = this.v.get(0);
            
            var min = Math.floor(vidEl.currentTime);
            var sec = vidEl.currentTime.toFixed(1);
            if(this.a[min] != null && this.a[min] != undefined && this.a[min][sec] != null && this.a[min][sec] != undefined){
                //console.log("anim at : " + min + " min and " + sec + "s");
                
                this.div.css({
                    transform : 'translate3d(' + this.a[min][sec].x + 'px, ' + this.a[min][sec].y + 'px, 0px)'
                });
            }
        };
        
        /**
         * stop listening to user event
         */
        AnimRecorder.prototype.removeListener = function() 
        {
            this.ov.unbind('click');
            $('body').unbind('keyup');
            this.b.unbind('click');
            this.b_play.unbind('click');
            this.b_toogle.unbind('click');
        };
        
        // return objet to be used inside the global scope
        return AnimRecorder;

    })();

}).call(this);
