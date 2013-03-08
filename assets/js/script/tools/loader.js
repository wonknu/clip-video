(function ()
{ 'use strict';
    
    this.Loader = (function ()
    {
        /*
         * Constructor
         */
        function Loader ()
        {
            
        }
        
        /**
         * Load json file
         * @param {Object} url
         * @param {Object} id
         * @param {Object} cb
         */
        Loader.prototype.load = function (url, id, cb)
        {
            var data = null,
                jqxhr = $.ajax({
                url     : url,
                type    : 'POST',
                dataType: 'json'
            })
            .done(function (d)
            {
                data = d;
            })
            .fail(function (xhr, ajaxOptions, thrownError)
            {
                console.log('failed loading ressources');
            })
            .always(function ()
            {
                cb(data, id);
            });
        };
        
        // return object to be used inside the global scope
        return Loader;

    })();

}).call(this);
