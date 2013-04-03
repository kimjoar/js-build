define(function(require) {

    var View = require('base/view');
    var userDetailTemplate = require('hgn!./userDetail');

    var UserDetailView = View.extend({

        template: userDetailTemplate,

        initialize: function(options) {
            this.user = options.user;
            this.listenTo(this.user, "change:age", this.render, this);
        },

        render: function() {
            return this.renderTemplate(this.user.toJSON());
        }

    });

    return UserDetailView;

});
