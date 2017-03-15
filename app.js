var app = new Vue({
	el: "#app",
	data: {
		title: "Contas a pagar",
		menus: [
			{id:0, name:"Listar contas"},
			{id:1, name:"Criar conta"}
		],
		activedView: 0,
		bills: [
			{date_due: '20/08/2015', name: 'Conta de Luz', value: 25.99, done:1},
			{date_due: '23/08/2015', name: 'Conta de Água', value: 22.99, done:0},
			{date_due: '22/08/2015', name: 'Conta de Internet', value: 233.99, done:0},
			{date_due: '25/08/2015', name: 'Conta de Cartão', value: 266.99, done:0},
			{date_due: '26/08/2015', name: 'Conta de Aluguel', value: 255.99, done:0},
		]
	},
	computed: {
		status: function(){
			var count = 0;
			for(var i in this.bills){
				if(!this.bills[i].done){
					count++;
				}
			}
			return !count?"Nenhuma conta a pagar":"Existem " +count+" contas a pagar";
		}
	},
	methods: {
		showView: function(id){
			this.activedView = id;
		}
	}
});