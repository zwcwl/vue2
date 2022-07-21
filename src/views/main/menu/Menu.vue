<template>
	<div id="menu-manage">
		<div class="manage-container">
			<query-form></query-form>

			<base-table></base-table>

			<dialog-form></dialog-form>
		</div>
	</div>
</template>

<script>
import QueryForm from './QueryForm.vue'
import BaseTable from './BaseTable.vue'
import DialogForm from './DialogForm.vue'
export default {
	name: "ManageView",
	components: {
		QueryForm,
		BaseTable,
		DialogForm
	}
}
</script>

<style lang="scss">
#menu-manage {
	padding: 20px;
	height: 100%;
	box-sizing: border-box;

	.manage-container {
		height: 100%;
		box-sizing: border-box;
	}
}
</style>