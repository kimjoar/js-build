define(function(require) {

    var UserDetailView = require('modules/user/userDetailView');
    var User = require('modules/user/user');

    describe('User detail view', function() {

        var userDetailView, user, age;

        beforeEach(function() {
            age = 12;
            user = new User();
            userDetailView = new UserDetailView({ user: user });
        });

        it('renders when user age is changed', function() {
            user.set({ age: age });

            expect(userDetailView.$el.text()).toContain(age);
        });

        it('renders partial', function() {
            expect(userDetailView.$('.partial')).toNotBe('');
        });

    });

});
