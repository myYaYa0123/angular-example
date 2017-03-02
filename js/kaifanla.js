var app=angular.module('myApp',['ng','ngRoute']);
//创建一个父控制器
app.controller('parentCtrl',["$scope","$location",function ($scope,$location) {
    $scope.jump=function (url) {
        $location.path(url);
    }
}]);
//声明main控制器
app.controller('mainCtrl',["$scope","$http",function ($scope,$http) {
    $scope.more=true;
    $http.get('data/dish_getbypage.php?start=0').success(function (data) {
        $scope.dishList=data;
    });
    $scope.loadMore=function () {
        $http.get('data/dish_getbypage.php?start='+$scope.dishList.length).success(function (data) {
            $scope.dishList=$scope.dishList.concat(data);//拼接在一起
            if(data.length<5){
                $scope.more=false;
            }
        });
    }
    $scope.$watch('key',function () {//监听搜索框的内容变化
        if($scope.key){//如果存在关键字再和服务器做交互
            $http.get('data/dish_getbykw.php?key='+$scope.key).success(function (data) {
                $scope.dishList=data;
            });
        }
    });
}]);
//声明detail控制器
app.controller('detailCtrl',["$scope","$http","$routeParams",function ($scope,$http,$routeParams) {
    $http.get('data/dish_getbyid.php?did='+$routeParams.did).success(function (data) {
        $scope.dish=data[0];
    });
}]);
app.controller('orderCtrl',["$scope","$rootScope","$http","$routeParams",function ($scope,$rootScope,$http,$routeParams) {
    $scope.order={"did":$routeParams.did};
    $scope.submitOrder=function () {
        var str = jQuery.param($scope.order);//拼接成键值对
        $http.get('data/order_add.php?'+str)
            .success(function (data) {
                if(data.msg == "succ")
                {
                    $rootScope.phone = $scope.order.phone;
                    $scope.succMsg = "下单成功！订单编号为："+data.oid;
                }
                else
                {
                    $scope.errMsg = '下单失败';
                }
            })
    }
}]);
app.controller('myorderCtrl',["$scope","$http","$rootScope",function($scope,$http,$rootScope){
    $http.get('data/order_getbyphone.php?phone='+$rootScope.phone).success(function (data) {
        $scope.orderList = data;
    })
}]);
app.config(function ($routeProvider) {
    $routeProvider.when('/start',{
        templateUrl:'tpl/start.html'
    }).when('/detail',{
        templateUrl:'tpl/detail.html',
        controller:'detailCtrl'
    }).when('/detail/:did',{
        templateUrl:'tpl/detail.html',
        controller:'detailCtrl'
    }).when('/main',{
        templateUrl:'tpl/main.html',
        controller:'mainCtrl'
    }).when('/myOrder',{
        templateUrl:'tpl/myOrder.html',
        controller:'myorderCtrl'
    }).when('/order',{
        templateUrl:'tpl/order.html',
        controller:'orderCtrl'
    }).when('/order/:did',{
        templateUrl:'tpl/order.html',
        controller:'orderCtrl'
    }).otherwise({
        redirectTo:'/start'
    })
});
