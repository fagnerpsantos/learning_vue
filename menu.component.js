window.menuComponent = Vue.extend({
	template: `
	<nav>
		<ul>
			<li v-for="o in menus">
			<a v-link="{name: o.routeName}">{{o.name}}</a>
			</li>
		</ul>
	</nav>
	`,
	data: function(){
		return {
			menus: [
				//{id:0, name:"Listar contas", url: '/bills'},
				//{id:1, name:"Criar conta", url: '/bill/create'}
				{id:0, name:"Listar contas", routeName: 'bill.list'},
				{id:1, name:"Criar conta", routeName: 'bill.create'}
			],
		};
	},
	methods: {
		showView: function(id){
			this.$dispatch('change-activedview', id);
			if(id == 1){
				this.$dispatch('change-formtype', 'insert');
			}
		},
	}
});