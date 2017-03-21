Vue.filter('doneLabel', function(value){
	if(value == 0){
		return "Não Paga";
	}else{
		return "Paga";
	}
});

Vue.filter('statusGeneral', function(value){
	if(value === false){
		return "Não existem contas cadastradas";
	}
	if(!value){
		return "Nenhuma conta a pagar";
	}else{
		return "Existem "+ value + " contas a pagar";
	}
});

var menuComponent = Vue.extend({
	template: `
	<nav>
		<ul>
			<li v-for="o in menus">
			<a href="#" @click.prevent="showView(o.id)">{{o.name}}</a>
			</li>
		</ul>
	</nav>
	`,
	data: function(){
		return {
			menus: [
				{id:0, name:"Listar contas"},
				{id:1, name:"Criar conta"}
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


var billListComponent = Vue.extend({
	template: `
	<table border="1" cellpadding="10">
		<thead>
			<tr>
				<th>#</th>
				<th>Vencimento</th>
				<th>Nome</th>
				<th>Valor</th>
				<th>Paga?</th>
				<th>Ações</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(index, o) in bills">
				<td>{{index}}</td>
				<td>{{o.date_due}}</td>
				<td>{{o.name}}</td>
				<td>{{o.value | currency 'R$' 2}}</td>
				<td :class="{'pago': o.done,'nao-pago': !o.done}">
				{{o.done | doneLabel}}
				</td>
				<td>
					<a href="#" @click.prevent="loadBill(o)">Editar</a> | 
					<a href="#" @click.prevent="deleteBill(o)">Remover</a> 
				</td>
			</tr>
		</tbody>
	</table>
	`,
	data: function(){
		return{
			bills: [
				{date_due: '20/08/2015', name: 'Conta de Luz', value: 25.99, done:true},
				{date_due: '23/08/2015', name: 'Conta de Água', value: 22.99, done:false},
				{date_due: '22/08/2015', name: 'Conta de Internet', value: 233.99, done:false},
				{date_due: '25/08/2015', name: 'Conta de Cartão', value: 266.99, done:false},
				{date_due: '26/08/2015', name: 'Conta de Aluguel', value: 255.99, done:false},
			]
		};
	},
	methods:{
		loadBill: function(bill){
			this.$dispatch('change-bill', bill);
			this.$dispatch('change-activedview', 1);
			this.$dispatch('change-formtype', 'update');
		},
		deleteBill: function(bill){
			if(confirm('Deseja excluir esta conta?')){
				this.bills.$remove(bill);
			}
		}
	},
	events:{
		'new-bill': function(bill){
			this.bills.push(bill);
		}
	}
});

var billCreateComponent = Vue.extend({
	template: `
		<form name="form" @submit.prevent="submit">
			<label>Vencimento:</label>
			<input type="text" v-model="bill.date_due">
			<br/><br/>
			<label>Nome:</label>
			<select v-model="bill.name">
				<option v-for="o in names" :value="o">	{{ o }}	</option>
			</select>
			<br/><br/>
			<label>Valor:</label>
			<input type="text" v-model="bill.value">
			<br/><br/>
			<input type="checkbox" v-model="bill.done">
			<br/><br/>
			<input type="submit" value="Enviar"/>
		</form>
	`,
	data: function(){
		return {
			formType: 'insert',
			names:[
				'Conta de Luz',
				'Conta de Água',
				'Conta de Internet',
				'Conta de Cartão',
				'Conta de Aluguel',
			],
			bill: {
				date_due: '',
				name: '',
				value: 0,
				done: false
			}
		};
	},

	methods: {
		submit: function(){
			if(this.formType == 'insert'){
				this.$dispatch('new-bill', this.bill);
			}
			this.bill = {
				date_due: '',
				name: '',
				value: 0,
				done: false
			};
			this.$dispatch('change-activedview', 0);
		}
	},
	events:{
		'change-formtype': function(formType){
			this.formType = formType;
		},
		'change-bill': function(bill){
			this.bill = bill;
		}
	}
});

var appComponent = Vue.extend({
	components:{
		'menu-component': menuComponent,
		'bill-list-component': billListComponent,
		'bill-create-component': billCreateComponent
	},
	template: `	
	<style type="text/css">
			.pago{
				color: green;
			}
			.nao-pago{
				color: red;
			}
			.red{
				color: red;
			}
			.green{
				color: green;
			}
			.gray{
				color: gray;
			}
		</style>	
		<h1>{{title}}</h1>
	<h3 :class="{'gray': status === false, 'green': status === 0, 'red': status > 0}">{{status | statusGeneral}}</h3>
	<menu-component></menu-component>
	<div v-show="activedView == 0">
		<bill-list-component v-ref:bill-list-component></bill-list-component>
	</div>

	<div v-show="activedView == 1">
		<bill-create-component v-bind:bill.sync="bill"></bill-create-component>

	</div>
`,
	data: function(){
		return {
			title: "Contas a pagar",
			activedView: 0,			
		bill: {
				date_due: '',
				name: '',
				value: 0,
				done: false
			},
		};
	},
	computed: {
		status: function(){
			var billListComponent = this.$refs.billListComponent;
			if(!billListComponent.bills.length){
				return false;
			}
			var count = 0;
			for(var i in billListComponent.bills){
				if(!billListComponent.bills[i].done){
					count++;
				}
			}
			return count;
		}
	},
	methods: {	
	},
	events:{
		'change-activedview': function(activedView){
			this.activedView = activedView;
		},
		'change-formtype': function(formType){
			this.$broadcast('change-formtype', formType);
		},
		'new-bill': function(bill){
			this.$broadcast('new-bill', bill);
		},
		'change-bill': function(bill){
			this.$broadcast('change-bill', bill);
		}
	}
});

Vue.component('app-component', appComponent);

var app = new Vue({
	el: "#app",
	
});

