<template>
	<div id="dept-manage">
		<div class="manage-container">
			<query-form></query-form>
			<table-content></table-content>
		</div>
	</div>
</template>

<script>
import QueryForm from './QueryForm'
import TableContent from './TableContent'
export default {
	name:'DeptManage',
	components:{
		QueryForm,
		TableContent
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