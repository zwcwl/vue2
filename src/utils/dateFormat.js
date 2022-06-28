module.exports = (date, rule) => {
	date = new Date(date)
	let fmt = rule || "YYYY-MM-DD hh:mm:ss";
	new RegExp("(Y+)").test(fmt)
	fmt=fmt.replace(RegExp.$1, date.getFullYear())

	let str = {
		"M+": date.getMonth() + 1,
		"D+": date.getDate(),
		"h+": date.getHours(),
		"m+": date.getMinutes(),
		"s+": date.getSeconds()
	}

	for (key in str) {
		new RegExp(`(${key})`).test(fmt)
		let val = (str[key]+'').length === 1? "0"+str[key]+"":str[key]+""
		fmt = fmt.replace(RegExp.$1, val)
	}
	return fmt
}