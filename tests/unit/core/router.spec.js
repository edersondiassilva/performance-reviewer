describe('Core Router', function() {

    beforeEach(module('PerformanceReviewer'));

    var $location, $rootScope, $httpBackend;

    beforeEach(inject(function(_$location_, _$rootScope_, _$httpBackend_) {
        $location = _$location_;
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
    }));

    describe('Route Provider', function() {
        it('redirects to Home when accessing an empty page', function() {
            $httpBackend.expectGET('app/home/templates/home.html').respond(200);

            $location.path('');
            $rootScope.$digest();

            expect($location.path()).toEqual('/');
        });
    });
});
