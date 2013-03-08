// APP ENTRY POINT
$(document).ready(function() {
    var daddy = $('#video-wrapper');
    
    window.video = Video.getInstance({
        videoUrl : {
            'video/mp4' : STATIC.PATH_ASSETS + 'videos/REVOLVER_MIX.mp4'
        },
        poster : STATIC.PATH_ASSETS + 'img/poster.jpg',
        width : STATIC.WIDTH,
        height : STATIC.HEIGHT,
        daddy : daddy
    });
    
    var btns = new Buttons( daddy );
});
