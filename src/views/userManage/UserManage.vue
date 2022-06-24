<template>
	<div id="manage-view">
		<div class="manage-container">
			<query-form></query-form>

			<table-content></table-content>

			<dialog-from></dialog-from>
		</div>
	</div>
</template>

<script>
import QueryForm from './QueryForm.vue'
import TableContent from './TableContent.vue'
import DialogFrom from './DialogFrom.vue'
export default {
	name: "ManageView",
	data () {
		return {
			
		}
	},
	components: {
		QueryForm,
		TableContent,
		DialogFrom
	},
	methods: {
		
	}
}
</script>

<style lang="scss">
#manage-view {
	padding: 20px;
	height: 100%;
	box-sizing: border-box;

	.manage-container {
		height: 100%;
		box-sizing: border-box;
	}
}
</style>