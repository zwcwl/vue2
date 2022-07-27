//localStorage：本地存储，本地存储可以由多个存储项组成

//item:代表本地存储的项

//key：代表每一项的键

let storage = {
	//获取本地存储的指定项
	getItem (item) {
		return JSON.parse(window.localStorage.getItem(item) || "{}");
	},
	//获取指定项的指定key值
	getItemKey (item, key) {
		let obj = this.getItem(item);
		return obj[key];
	},

	//设置指定项
	setItem (item, val) {
		window.localStorage.setItem(item, JSON.stringify(val));
	},
	//设置指定项的指定key值
	setItemKey (item, key, val) {
		let obj = this.getItem(item);
		obj[key]=val
		window.localStorage.setItem(item, JSON.stringify(obj));
	},

	//获取所有的项
	getAll () {
		// return JSON.parse(window.localStorage.getItem(key) || "{}");
		let keys=Object.keys(localStorage)
		let obj={}
		keys.forEach(item=>{
			obj[item]=this.getItem(item)
		})
		return obj
	},
	//清除所有项
	clear(){
		window.localStorage.clear()
	},

	//删除指定项
	delItem (item) {
		window.localStorage.removeItem(item);
	},
	//删除指定项的指定key值
	delItemKey (item,key) {
		let obj=this.getItem(item)
		delete obj[key]
		window.localStorage.setItem(item,JSON.stringify(obj))
	}
}

export default storage