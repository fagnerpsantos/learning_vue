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
			bills: this.$root.$children[0].bills
			
		};
	},
	methods:{
		loadBill: function(bill){
			this.$dispatch('change-bill', bill);
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