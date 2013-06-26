(function ()
{ 'use strict';
    
    this.Tuto = (function ()
    {
        /*
         * Constructor
         * @param {Object} opt, object containing default path to php script and export json file
         */
        function Tuto (opt)
        {
            this.help0 = $('.help-0');
            this.help0.popover({
                animation : true,
                title : 'Tutorial',
                html : true,
                content :   '- Press "Tab" to launch video<br/>' +
                            '<a href="#" class="next" data-id="0" > > Next</a>',
                placement : "bottom"
            });
            
            this.help1 = $('.help-1');
            this.help1.popover({
                animation : true,
                title : 'Tutorial',
                html : true,
                content :   '- Move your mouse over the video<br/>' +
                            '<a href="#" class="next" data-id="1" > > Next</a>',
                placement : "left"
            });
            
            this.help2 = $('.help-2');
            this.help2.popover({
                animation : true,
                title : 'Tutorial',
                html : true,
                content :   '- You can press left and right arrow to change video speed<br/>'  +
                            '<a href="#" class="next" data-id="2" > > Next</a>',
                placement : "right"
            });
            
            this.help3 = $('.help-3');
            this.help3.popover({
                animation : true,
                title : 'Tutorial',
                html : true,
                content :   '- Press "Tab" again to stop the video<br/>' +
                            '<a href="#" class="next" data-id="3" > > Next</a>',
                placement : "left"
            });
            
            this.help4 = $('.help-4');
            this.help4.popover({
                animation : true,
                title : 'Tutorial',
                html : true,
                content :   '- When your done, just save it<br/>' +
                            '<a href="#" class="closeit" data-id="4" > X Close</a>',
                placement : "top"
            });
            
            $('.next').live('click', function (e)
            {
                e.preventDefault();
                $('.help-' + parseInt($(this).attr('data-id'))).popover('hide');
                $('.help-' + (parseInt($(this).attr('data-id')) + 1)).popover('show');
            });
            
            $('.closeit').live('click', function (e)
            {
                e.preventDefault();
                $('.help-' + parseInt($(this).attr('data-id'))).popover('hide');
            });
        }
        
        // return objet to be used inside the global scope
        return Tuto;

    })();

}).call(this);