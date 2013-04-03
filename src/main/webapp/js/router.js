define(function(require) {

    var Backbone = require('backbone');

    var UserView = require('modules/user/userView');
    var User = require('modules/user/user');

    var Router = Backbone.Router.extend({

        initialize: function(sections) {
            this.sections = sections;
        },

        routes: {
            '': 'user'
        },

        user: function() {
            var user = new User({ name: "Testing", age: 26 });
            var userView = new UserView({ user: user });

            this.sections.main.show(userView);
            userView.render();
        }
    });

    return Router;

});
