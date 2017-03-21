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