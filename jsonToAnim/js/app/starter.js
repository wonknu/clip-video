// jquery starter, BITCH do not put thing that doesn't need to be here!
// READ THIS YOU FOOL :
// example : other JS object or whatever that create application logic
// without creating local scope to encapsulate functionalities
// DO NOT POLLUTE GLOBAL SPACE :D
$(document).ready(function() {
    window.saveFile = new SaveFile();
    new AnimRecorder('../assets/videos/video.mp4');
});
