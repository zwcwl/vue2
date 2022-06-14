let storage={
	getAll(key){
		let val=localStorage.getItem(key) || "[]"
		return JSON.parse(val)
	},
	setItem(key,value){
		let val=this.getAll()
		val[key]=value
		localStorage.setItem("TOKEN",JSON.stringify(val))
	},
}

export default storage