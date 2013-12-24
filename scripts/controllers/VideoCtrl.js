videoApp.controller("VideoCtrl", ['$scope', '$window', 'Video', function ($scope, $window, Video)
{
    $scope.source = Video.getUrl();
    $scope.anim_json = '';
    isAnimating = false;
    anim = {};
    $scope.video = angular.element(document.querySelector('video'));
    
    $scope.trackMove = function (e)
    {
        if(!isAnimating) return;
        //@TODO : retrieve real video time
        var time = (Math.round(Math.random() * 99)) + ':' + (Math.round(Math.random() * 99));
        anim[time] = {
            x : e.layerX,
            y : e.layerX
        };
        $scope.anim_json = JSON.stringify(anim);
    };
    
    angular.element($window).on('keydown', function (e)
    {
        if(e.keyCode !== 9) return;
        isAnimating = !isAnimating;
        if(isAnimating){
            $scope.video[0].play();
        }
        else{
            $scope.video[0].pause();
        }
    });
}]);
