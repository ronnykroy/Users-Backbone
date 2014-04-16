define([
  'underscore', 
  'backbone', 
  'libs/backbone/localstorage', 
  'models/user/user'
  ], function(_, Backbone, Store, User){
	  
	var usersCollection = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: User,
    
    localStorage: new Store("users"),
    
    getAll: function() {
      return this.models;
    },

    // users are sorted in the first name.
    comparator: function(user) {
      return user.get('firstName');
    }

  });
  return new usersCollection;
});
