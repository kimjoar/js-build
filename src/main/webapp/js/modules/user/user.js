define(function(require) {

    var Model = require('base/model');

    var User = Model.extend({
        defaults: {
            name: undefined,
            age: undefined
        }
    });

    return User;

});
