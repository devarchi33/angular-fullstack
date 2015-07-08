'use strict';

angular.module('skyfly33App')
.controller('LoginCtrl', function ($scope, Auth, $location, $window) {
  $scope.user = {};
  $scope.errors = {};

  $scope.login = function(form) {
    $scope.submitted = true;

    if(form.$valid) {
      Auth.login({
        email: $scope.user.email,
        password: $scope.user.password
      })
      .then( function() {
          // Logged in, redirect to home
          $location.path('/');
        })
      .catch( function(err) {
        $scope.errors.other = err.message;
      });
    }
  };

  $scope.loginOauth = function(provider) {
    $window.location.href = '/auth/' + provider;
  };

  $scope.loginKakao = function() {
    console.log('kakao login button click');
    Kakao.Auth.login({
      success: function(authObj) {
        // 로그인 성공시, API를 호출합니다.
        console.log("authObj : ");
        console.log(authObj);

        Kakao.Auth.setAccessToken(authObj.access_token, true);
        console.log("access_token : " + authObj.access_token);
        Kakao.Auth.setRefreshToken(authObj.refresh_token, true);
        console.log("refresh_token : " + authObj.refresh_token);

        $window.location.href = '/' ;
        alert("로그인에 성공 하였습니다!");
      },
      fail: function(err) {
        console.log(err);
      }
    });
  };
});
