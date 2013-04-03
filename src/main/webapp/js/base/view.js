define(function(require) {

    var _ = require('underscore');
    var Backbone = require('backbone');

    var SubViewHandler = require('component/subViewHandler');

    var View = Backbone.View.extend({

        constructor: function() {
            var subViewHandler = new SubViewHandler();
            _.extend(this, subViewHandler);

            Backbone.View.prototype.constructor.apply(this, arguments);
        },

        destroy: function() {
            // Remove the view from the DOM
            this.remove();

            // Recusively destroy all subviews
            this.destroySubViews();
        },

        renderTemplate: function() {
            var data = {};
            _.each(arguments, function(arg) {
                _.extend(data, arg);
            });

            var html = this.parseTemplate(this.template, data);
            this.$el.html(html);

            return this;
        },

        parseTemplate: function(template, data) {
            return template(data);
        }

    });

    return View;

});
