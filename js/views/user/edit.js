define([ 'jquery', 'underscore', 'backbone', 'text!templates/user/edit.html',
		'jqueryui' ], function($, _, Backbone, editTemplate) {
	var UserEditView = Backbone.View.extend({
		// Cache the template function for a single item.
		template : _.template(editTemplate),
		el : $('body'),
		// The DOM events specific to an item.
		events : {
			"change .text" : "fieldChanged",
		},

		initialize : function() {
			_.bindAll(this, 'render', 'close', 'remove');
			this.model.view = this;
			$("#dialog").append(this.template({}));
			var me = this;
			var doSave = function() {
				me.close();
				$("#dialog-edit-form").dialog("close");
				$("#dialog-edit-form").remove();
			};
			var doDelete = function() {
				me.remove();
				$("#dialog-edit-form").dialog("close");
				$("#dialog-edit-form").remove();
			};
			$("#dialog-edit-form").dialog({
				autoOpen : false,
				height : 300,
				width : 350,
				modal : true,
				buttons : {
					"Save" : doSave,
					"Delete" : doDelete,
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
			$("#dialog-edit-form").dialog("open");
			return this;
		},
		fieldChanged : function() {
			this.model.set({
				firstName : this.fname.val(),
				lastName : this.lname.val(),
			});
		},

		setContent : function() {
			$(this.fname).val(this.model.get("firstName"));
			$(this.lname).val(this.model.get("lastName"));
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
			this.model.destroy({}, {
				success : function(response) {
					model.collection.trigger("saved", {});
				}
			});
		},

	});
	return UserEditView;
});
