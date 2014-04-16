define(['underscore', 'backbone'], function(_, Backbone) {
  var UserModel = Backbone.Model.extend({

    // Default attributes for the User.
    defaults: {
      firstName: "No-Name",
      lastName: "Last-Name"
    },

    // Ensure that each user created has firstName & lastName.
    initialize: function() {
      if (!this.get("firstName")) {
        this.set({"firstName": this.defaults.firstName});
      }
      if (!this.get("lastName")) {
          this.set({"lastName": this.defaults.lastName});
      }
    },

    // Remove this User from view and delete its view.
    clear: function() {
      this.destroy();
      //this.view.remove();
    }

  });
  return UserModel;
});
