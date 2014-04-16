define([ 'jquery', 'underscore', 'backbone', 'text!templates/user/create.html',
		'jqueryui' ], function($, _, Backbone, createTemplate) {
	var UserCreateView = Backbone.View.extend({
		// Cache the template function for a single item.
		template : _.template(createTemplate),
		el : $('body'),
		// The DOM events specific to an item.
		events : {
			"change .text" : "fieldChanged",
		},

		initialize : function() {
			_.bindAll(this, 'render', 'close');
			this.model.view = this;
			$("#dialog").append(this.template({}));
			var me = this;
			var doCreate = function() {
				me.close();
				$("#dialog-form").dialog("close");
				$("#dialog-form").remove();
			};
			$("#dialog-form").dialog({
				autoOpen : false,
				height : 300,
				width : 350,
				modal : true,
				buttons : {
					"Create User" : doCreate,
					"Cancel" : function() {
						$(this).dialog("close");
						$(this).remove();
					}
				}
			});

			this.fname = this.$('#fname');
			this.lname = this.$('#lname');
		},

		render : function() {
			this.setContent();
			$("#dialog-form").dialog("open");
			return this;
		},
		fieldChanged : function() {
			this.model.set({
				firstName : this.fname.val(),
				lastName : this.lname.val(),
			});
		},

		setContent : function() {
			$(this.fname).val("");
			$(this.lname).val("");
		},

		close : function() {
			this.model.save({
				firstName : this.fname.val(),
				lastName : this.lname.val(),
			}, {
				success : function(model, response) {
					model.collection.trigger("saved", model);
				}
			});
		},

		remove : function() {
		},

		// Remove the item, destroy the model.
		clear : function() {
			this.model.clear();
		}

	});
	return UserCreateView;
});
