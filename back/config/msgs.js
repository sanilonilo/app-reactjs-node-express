module.exports = app => {

	function existeOuErro(value,msg){

		if(!value) throw msg

		if(Array.isArray(value) && value.length === 0) throw msg
		
		if(typeof value === 'string' && !value.trim()) throw msg	
	}

	
	function naoExisteOuErro(value,msg){
		try{
			existeOuErro(value,msg)
		}

		catch(e){
			return
		}

		throw msg
	}

	function compareValores(valueA,valueB,msg){
		if(valueA !== valueB) throw msg
	}

	return {existeOuErro,naoExisteOuErro,compareValores}
}