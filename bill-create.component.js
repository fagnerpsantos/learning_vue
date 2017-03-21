window.billCreateComponent = Vue.extend({
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