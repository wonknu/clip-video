videoApp.factory('Video', function ()
{
    var data = {url : ''};
    return {
        setUrl : function (url)
        {
            data.url = url;
        },
        getUrl : function ()
        {
            return data.url;
        }
    };
});
