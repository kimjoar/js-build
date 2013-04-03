define(function(require) {

    var View = require('base/view');
    var events = require('component/eventBus');

    var UserDetailView = require('./userDetailView');
    var userTemplate = require('hgn!./user');

    var UserView = View.extend({

        template: userTemplate,

        initialize: function(options) {
            this.user = options.user;

            this.userDetailView = new UserDetailView({ user: this.user });
            this.addSubView(this.userDetailView);

            // write this instead (see component/eventBinder.js)
            this.listenTo(this.user, 'change', this.render, this);

            // or this to bind to global events
            this.listenTo(events, 'global', this.render, this);
        },

        render: function() {
            this.renderTemplate(this.user.toJSON());
            this.renderUserDetail(this.$('.user-detail'));
            return this;
        },

        renderUserDetail: function(el) {
            this.userDetailView.setElement(el).render();
        }

    });

    return UserView;

});
