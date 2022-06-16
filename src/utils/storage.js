let storage= {
	getItem(key,item){
			let obj=this.getAll(key);
			return obj[item];
	},
	setItem(key,data){
			let obj=this.getAll();
			window.localStorage.setItem(key,JSON.stringify({...data,...obj}));
			return "添加成功";
	},
	replaceItem(key,data){
			window.localStorage.setItem(key,JSON.stringify(data));
			return "替换成功";
	},
	getAll(key){
			return JSON.parse(window.localStorage.getItem(key) || "{}");
	},
	removeItem(key,item){
			let obj=this.getAll();
			delete obj[item];
			window.localStorage.setItem(key,JSON.stringify(obj));
			return "删除成功"
	},
	removeKey(key){
			window.localStorage.removeItem(key);
			return "删除成功"
	}
}

export default storage