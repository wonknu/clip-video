var videoApp = angular.module("VideoApp", ['ngRoute']);

videoApp.config(['$routeProvider', '$sceDelegateProvider', function ($routeProvider, $sceDelegateProvider)
{
    $routeProvider
        .when('/', {templateUrl : "views/main.html"})
        .when("/video", {templateUrl : "views/video.html"});
    $sceDelegateProvider.resourceUrlWhitelist(['^(?:http(?:s)?:\/\/)?(?:[^\.]+\.)?\(vimeo|youtube)\.com(/.*)?$', 'self']);
    $sceDelegateProvider.resourceUrlWhitelist(['.*', 'self']);
}]);
