(function ()
{ 'use strict';
    
    this.SaveFile = (function ()
    {
        
        function SaveFile (opt)
        {
            this.fileOpt = opt || {
                name : "export/export"
            };
            this.initListener();
        }
        
        
        SaveFile.prototype.initListener = function() 
        {
            var _this = this;
            $(window).bind('export-json', function (e, txt){ _this.saveFile(txt); });
        };
        
        SaveFile.prototype.saveFile = function(txt) 
        {
            var _this = this;
            $.ajax({
                type: "GET",
                url: _this.fileOpt.name + ".php",
                data: { txt: txt },
                dataType: "json"
            }).done(function(res) {
                console.log("succes saving json");
            })
            .fail(function() { console.log("error saving json"); })
            .always(function() { console.log("complete saving json"); });
        };
        
        SaveFile.prototype.getFile = function()
        {
            var _this = this;
            $.ajax({
                type: "GET",
                url: _this.fileOpt.name + ".json",
                dataType: "json"
            }).done(function(res) {
                console.log("succes loading json");
                return JSON.parse(res);
            })
            .fail(function() { console.log("error loading json"); })
            .always(function() { console.log("complete loading json"); });
        };
        
        return SaveFile;

    })();

}).call(this);