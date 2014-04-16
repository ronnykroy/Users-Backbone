define(
		[ 'jquery', 'underscore', 'backbone', 'collections/users',
				'views/user/create', 'views/user/edit', 'namespace',
				'jquerytable' ],
		function($, _, Backbone, Users, UserCreateView, UserEditView, namespace) {
			var AppView = Backbone.View.extend({

				// Instead of generating a new element, bind to the existing
				// skeleton of
				// the App already present in the HTML.
				el : $("#userapp"),

				// Delegated events for creating new items, and clearing
				// completed ones.
				events : {
					"click #add-user" : "createUser"
				},

				// At initialization we bind to the relevant events on the Users
				// collection, when items are added or changed.
				initialize : function() {
					Users.fetch();
					this.clearUsers();
					_.bindAll(this, 'addOne', 'render', 'saved');
					Users.bind('add', this.addOne);
					Users.bind('all', this.render);
					Users.bind('saved', this.saved);
					var doEdit = function(m) {
						var view = new UserEditView({
							model : m
						});
						view.render();
					};
					this.$('#user-list').dataTable(
							{
								"aoColumns" : [ {
									"sTitle" : "First Name",
									"sDefaultContent" : "No Name",
									"fnRender" : function(obj) {
										return obj.aData.get("firstName");
									}
								}, {
									"sTitle" : "Last Name",
									"sDefaultContent" : "No Name",
									"fnRender" : function(obj) {
										return obj.aData.get("lastName");
									}
								} ],
								"fnCreatedRow" : function(nRow, aData,
										iDataIndex) {
									$(nRow).dblclick(
											function() {
												doEdit($('#user-list')
														.dataTable().fnGetData(
																this));
											});
								}
							});
				},

				// Re-rendering the App just means refreshing the datatable --
				// the rest
				// of the app doesn't change.
				render : function() {
					var done = Users.getAll().length;
					console.log(done);
				},
				// Re-rendering the App just means refreshing the datatable --
				// the rest
				// of the app doesn't change.
				saved : function(model) {
					var oTable = this.$('#user-list').dataTable();
					oTable.fnClearTable();
					oTable.fnAddData(Users.getAll());
				},

				addOne : function(user) {
					var view = new UserCreateView({
						model : user
					});
					view.render();
				},

				// Clear all users, destroying their models.
				clearUsers : function() {
					var usrs = Users.getAll();
					while (usrs.length > 0) {
						usrs[0].clear();
					}
					return true;
				},

				// Creates a User.
				createUser : function() {
					console.log("in create user");
					Users.create({
						firstName : "",
						lastName : "",
					});
				},

			});
			return AppView;
		});
