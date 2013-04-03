define(function(require) {

    var Backbone = require('backbone');
    var sync = require('component/sync');

    var Model = Backbone.Model.extend({

        sync: sync

    });

    return Model;

});
