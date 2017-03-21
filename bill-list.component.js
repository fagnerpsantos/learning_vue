window.billListComponent = Vue.extend({
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