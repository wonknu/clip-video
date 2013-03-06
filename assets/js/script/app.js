// APP ENTRY POINT
$(document).ready(function() {
    window.video = Video.getInstance({
        videoUrl : {
            'video/mp4' : 'assets/videos/REVOLVER_MIX.mp4'
        },
        poster : 'assets/img/poster.jpg',
        width : 858,
        height : 482,
        daddy : $('#video-wrapper')
    });
    
    // LOGIQUE A DEPORTER PAR LA SUITE DANS LE BUTTON MANAGER
    var btnLayer = $(document.createElement('div')).addClass('btn-layer');
    
    btnLayer.css({
        width : 858,
        height : 482,
        position : "absolute",
        top : 0,
        left : 0
    });
    
    $('#video-wrapper').append(btnLayer);
    var btn = new AnimatedButton(btnLayer);
});
