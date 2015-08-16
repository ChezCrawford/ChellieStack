'use strict'

var app = angular.module('rsvp', []);

app.controller('RsvpController', ['$scope', '$http', function($scope, $http) {
    $scope.rsvp = {guests: [{}]};
    $scope.submitSuccess = false;


    $scope.addGuest = function() {
        if ($scope.rsvp.guests) {
            $scope.rsvp.guests.push({});
        }
        else {
            $scope.rsvp.guests = [{}];
        }
    };

    $scope.removeGuest = function() {
        if ($scope.rsvp.guests.length > 1) {
            $scope.rsvp.guests.pop();
        }
    };

    this.addRsvp = function() {
        console.log($scope.rsvp);

        $http.post('/api/rsvps/', $scope.rsvp)
        .success(function(data) {
            $scope.submitSuccess = true;
            
            $scope.notification = getNotificationMessage($scope.rsvp);
            $scope.notificationVisible = true;

            $scope.rsvp = {guests: [{}]};
            $scope.rsvpForm.$setPristine();
            console.log(data);
        })
        .error(function(data) {
            console.log('Error' + data);

        });
    };

    function getNotificationMessage(rsvp) {
        var notification = "Thank you for your response.";

        if (rsvp.attending === "true") {
            notification += "  We are looking forward to seeing you.";
        }
        else {
            notification += "  We are sorry you cannot be with us.";
        }

        return notification;
    }

}]);

app.directive('rsvpForm', function() {
    return {
        restrict: 'E',
        templateUrl: 'rsvp-form.html'
    };
});

app.directive('rsvpNotification', function() {
    return {
        restrict: 'E',
        templateUrl: 'rsvp-notification.html'
    };
});


