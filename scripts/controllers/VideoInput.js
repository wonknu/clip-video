videoApp.controller('VideoInput', ['$scope', '$location', 'Video', function($scope, $location, Video)
{
    $scope.video = Video;
    $scope.placeholder = 'url to your video';
    $scope.buttonSubmit = 'Load video';
    $scope.videoForm = function (videoForm)
    {
        if(videoForm.$valid){
            Video.setUrl($scope.url);
            $location.path("/video");
        }
    };
}]);
