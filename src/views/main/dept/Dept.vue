<template>
	<div id="dept-manage">
		<div class="container">
			<query-form></query-form>
			<base-table></base-table>
			<dialog-form></dialog-form>
		</div>
	</div>
</template>

<script>
import QueryForm from './QueryForm'
import BaseTable from './BaseTable'
import DialogForm from './DialogForm'
export default {
	name:'Dept',
	components:{
		QueryForm,
		BaseTable,
		DialogForm
	}
}
</script>

<style lang="scss">
#dept-manage {
	padding: 20px;
	height: 100%;
	box-sizing: border-box;

	.container {
		height: 100%;
		box-sizing: border-box;
	}
}
</style>