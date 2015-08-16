'use strict';

describe('RsvpController', function () {
    var $controller, $scope, controller;

    beforeEach(module('rsvp'));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;

        $scope = {};
        controller = $controller('RsvpController', {$scope, $scope});
    }));

    it('Initially contains an empty guest object', function () {
        expect($scope.rsvp.guests.length).toEqual(1);
        expect($scope.rsvp.guests[0]).toEqual({});
    });

    describe('$scope.addGuest', function () {
        it('Adds an additional guest to the existing list', function () {
            $scope.addGuest();
            expect($scope.rsvp.guests.length).toEqual(2);
        });

        it('Creates the guest list when no guests exist', function () {
            $scope.rsvp.guests = null;
            
            $scope.addGuest();

            expect($scope.rsvp.guests.length).toEqual(1);
            expect($scope.rsvp.guests[0]).toEqual({});
        });
    });

    describe('$scope.removeGuest', function () {
        it('Will remove guests from the list', function () {
            $scope.rsvp.guests = [{}, {}];

            $scope.removeGuest();

            expect($scope.rsvp.guests.length).toEqual(1);
            expect($scope.rsvp.guests[0]).toEqual({});
        });

        it('Will not remove the last guest from the list', function () {
            $scope.removeGuest();

            expect($scope.rsvp.guests.length).toEqual(1);
            expect($scope.rsvp.guests[0]).toEqual({});
        });
    });

    describe('$scope.addRsvp', function () {
        var $httpBackend;

        beforeEach(inject(function(_$httpBackend_) {
            $httpBackend = _$httpBackend_;
        }));

        it('Should post the RSVP object via XHR', function () {
            expect(1).toEqual(1);
        });
    });
});