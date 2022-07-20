<template>
	<div id="dept-manage">
		<div class="manage-container">
			<query-form></query-form>
			<table-content></table-content>
			<dialog-form></dialog-form>
		</div>
	</div>
</template>

<script>
import QueryForm from './QueryForm'
import TableContent from './TableContent'
import DialogForm from './DialogForm.vue'
export default {
	name:'DeptManage',
	components:{
		QueryForm,
		TableContent,
		DialogForm
	}
}
</script>

<style lang="scss">
#dept-manage {
	padding: 20px;
	height: 100%;
	box-sizing: border-box;

	.manage-container {
		height: 100%;
		box-sizing: border-box;
	}
}
</style>