<template>
	<div id="user-manage">
		<div class="manage-container">
			<query-form></query-form>

			<table-content></table-content>

			<dialog-form></dialog-form>
		</div>
	</div>
</template>

<script>
import QueryForm from './QueryForm.vue'
import TableContent from './TableContent.vue'
import DialogForm from './DialogForm.vue'
export default {
	name: "ManageView",
	components: {
		QueryForm,
		TableContent,
		DialogForm
	}
}
</script>

<style lang="scss">
#user-manage {
	padding: 20px;
	height: 100%;
	box-sizing: border-box;

	.manage-container {
		height: 100%;
		box-sizing: border-box;
	}
}
</style>