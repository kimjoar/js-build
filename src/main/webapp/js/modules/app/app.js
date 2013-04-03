define(function(require) {

    var _ = require('underscore');

    var Router = require('router');
    var View = require('base/view');
    var Section = require('component/section');

    var appTemplate = require('hgn!./app');

    var App = View.extend({

        template: appTemplate,

        addSections: function(sections) {
            this.sections = this.sections || {};

            _.each(sections, function(selector, name) {
                this.sections[name] = new Section(this.$el, selector);
            }, this);
        },

        run: function(done) {
            this.renderTemplate();

            this.router = new Router(this.sections);

            done();
        }
    });

    return App;

});
