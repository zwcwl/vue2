module.exports=(date,rule)=>{
		let fmt=rule || "YYYY-MM-DD hh:mm:ss";
		new RegExp("(Y+)").test(fmt)
			fmt.replace(RegExp.$1,date.getFullYear())
		

		let str={
			"M+":date.getMonth() + 1,
			"D+":date.getDate(),
			"h+":date.getHours(),
			"m+":date.getMinutes(),
			"s+":date.getSeconds()
		}

		for(key in str){
			new RegExp(`(${key})`).test(fmt)
			let val=str[key]
			fmt=fmt.replace(RegExp.$1,val)
		}
		return fmt
	}