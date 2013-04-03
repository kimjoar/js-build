define(function(require) {

    var Router = require('router');
    var UserView = require('modules/user/userView');

    describe('Router', function() {

        it('show user', function() {
            var spy = sinon.spy();

            var sections = {};
            sections.main = {
                show: spy
            };

            var router = new Router(sections);

            router.user();

            var args = spy.firstCall.args;

            expect(args[0] instanceof UserView);
        });

    });

});
