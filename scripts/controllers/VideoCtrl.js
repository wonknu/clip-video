videoApp.controller("VideoCtrl", ['$scope', '$window', 'Video', function ($scope, $window, Video)
{
    $scope.source = Video.getUrl();
    $scope.anim_json = '';
    isAnimating = false;
    $scope.anim = {};
    $scope.video = document.querySelector('video');
    $scope.playbackRate = 1;
    
    $scope.playAnim = function (e)
    {
        $scope.video.playbackRate = 1;
        $scope.video.currentTime.toFixed(1);
    };
    
    $scope.trackMove = function (e)
    {
        if(!isAnimating) return;
        $scope.anim[$scope.video.currentTime] = {
            x : e.layerX,
            y : e.layerX
        };
        $scope.anim_json = JSON.stringify($scope.anim);
    };
    
    angular.element($window).on('keyup', function (e)
    {
        if (e.keyCode == 39){
            $scope.video.playbackRate = $scope.playbackRate += 0.1;
        }
        else if (e.keyCode == 37){
            $scope.video.playbackRate = $scope.playbackRate -= 0.1;
        }
        if(e.keyCode !== 9) return;
        isAnimating = !isAnimating;
        if(isAnimating){
            $scope.video.play();
        }
        else{
            $scope.video.pause();
        }
    });
}]);
