//Backbone Model
var Post = Backbone.Model.extend({
	defaults : {
		title: '',
		description: '',
		type: '',
		ville: '',
		loyer: '',
		numero: ''
	}
});
var Posts = Backbone.Collection.extend({

});
var posts = new Posts();
var PostView = Backbone.View.extend({
	model : new Post(),
	tagName : 'li',
	initialize : function () {
		this.template = _.template($('.posts_list_temlate').html());

	},
	events: {
		'click .edit-post': 'edit',
		'click .cancel-post': 'cancel',
		'click .update-post' : 'update',
		'click .delete-post' : 'delete',
	},
	'cancel': function () {
		$('.edit-post').show();
		$('.delete-post').show();
		$('.update-post').hide();
		$('.cancel-post').hide();
		postsview.render();
	},
	'edit': function () {
		$('.edit-post').hide();
		$('.delete-post').hide();
		$('.update-post').show();
		$('.cancel-post').show();
		var title = this.$('.title').html();
		var ville = this.$('.ville').html();
		var description = this.$('.description').html();
		var loyer = this.$('.loyer').html();
		var numero = this.$('.numero').html();

		this.$('.title').html('<input type="text" class="form-control title-update" value="' + title + '">');
		this.$('.description').html('<textarea class="form-control description-update">' + description +'</textarea>');
		this.$('.ville').html('<input type="text" class="form-control ville-update" value="' + ville + '">');
		this.$('.loyer').html('<input type="number" class="form-control loyer-update" value="' + loyer + '">');
		this.$('.numero').html('<input type="number" class="form-control numero-update" value="' + numero + '">');
	},
	'update': function () {
		var title = this.$('.title-update').val();
		var description = this.$('.description-update').val();
		var ville = this.$('.ville-update').val();
		var loyer = this.$('.loyer-update').val();
		var numero = this.$('.numero-update').val();

		this.model.set('title', title);
		this.model.set('description', description);
		this.model.set('ville', ville);
		this.model.set('loyer', loyer);
		this.model.set('numero', numero);
	
	},
	'delete' : function () {
		this.model.destroy();
		setTimeout(function () {
			/*$('#container').html('<img src="assets/images/load.gif">');*/
			postsview.render();
		}, 500);
	},
	render: function () {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},

});
var PostsView = Backbone.View.extend({
	model : posts,
	el : $('.post_list'),
	initialize :function () {
		var self = this;
		this.model.on('add', this.render, this);
		this.model.on('change', function () {
			setTimeout(function () {
				/*$('#container').html('<img src="assets/images/load.gif">');*/
				self.render();
			}, 500);
		});
	},
	render : function () {
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function (post) {
		self.$el.append((new PostView({model : post})).render().$el);
		});
		return this;
	}

});
var postsview = new PostsView();

$(document).ready(function (){
	$('.add-post').on('click', function () {

			var post = new Post({
				title: $('.title-input').val(),
				description: $('.description-input').val(),
				type: $('.type-input').val(),
				ville: $('.ville-input').val(),
				loyer: $('.loyer-input').val(),
				numero: $('.numero-input').val()
			});
			posts.add(post);
	});

	$('#localisation').on('click', function () {
		$('#map-canvas').show();
	})

});