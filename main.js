var router = new VueRouter();

var mainComponent = Vue.extend({
	components:{
		'app-component': appComponent
	},
	template: `<app-component></app-component>`,
	data: function(){
		return {
			bills: [
				{date_due: '20/08/2015', name: 'Conta de Luz', value: 25.99, done:true},
				{date_due: '23/08/2015', name: 'Conta de Água', value: 22.99, done:false},
				{date_due: '22/08/2015', name: 'Conta de Internet', value: 233.99, done:false},
				{date_due: '25/08/2015', name: 'Conta de Cartão', value: 266.99, done:false},
				{date_due: '26/08/2015', name: 'Conta de Aluguel', value: 255.99, done:false},
			]
		};
	}
});

router.map({
	'/bills': {
		name: 'bill.list',
		component: billListComponent
	},
	'/bill/create':{
		name: 'bill.create',
		component: billCreateComponent
	},
	'*': {
		component: billListComponent
	}
});

router.start({
	components: {
		'main-component': mainComponent
	}
}, '#app');

router.redirect({
	'*': '/bills'
})
