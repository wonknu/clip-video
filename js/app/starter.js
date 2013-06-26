// jquery starter, do not put thing that doesn't need to be here!
$(document).ready(function() {
    //btn-load
    window.saveFile = new SaveFile();
    var a = new AnimRecorder();
    new Tuto();
    var dataUrl = window.localStorage.getItem("animation-creator-video-url");
    if(dataUrl != null && dataUrl != undefined){
        a.init(dataUrl);
        $("#video-url").val(dataUrl);
    }
    else{
        $('.alert').show();
    }
    
    $('.btn-load').bind('click', function ()
    {
        $('.alert').hide();
        dataUrl = $("#video-url").val();
        //http://localhost/NEWMANCLIP/assets/videos/REVOLVER_MIX.mp4
        a.init(dataUrl);
        window.localStorage.setItem("animation-creator-video-url", dataUrl);
    });
    
});
