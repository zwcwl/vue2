<template>
	<div id="query-form">
		<el-form :inline="true" :model="queryForm" class="demo-form-inline" ref="queryForm">
			<el-form-item label="菜单名称" prop="menuName">
				<el-input v-model="queryForm.menuName" placeholder="请输入菜单名称"></el-input>
			</el-form-item>
			<el-form-item label="菜单状态">
				<el-select v-model="queryForm.menuState">
					<el-option label="正常" :value="1"></el-option>
					<el-option label="停用" :value="2"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">查询</el-button>
				<el-button type="primary" @click="onReset('queryForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	name:"QueryForm",
	data () {
		return {
			queryForm: {
				menuName: "",
				menuState: 1,
			},
		}
	},
	methods: {
		//点击搜索用户
		onSubmit () {
			this.$bus.$emit("getMenu",this.queryForm)
		},

		//点击重置表单
		onReset (formName) {
			this.$refs[formName].resetFields();
		},
	},
	mounted(){
		this.$bus.$emit("getMenu",this.queryForm)
		this.$bus.$on("onSubmit",this.onSubmit)
	}
}
</script>

<style lang="scss">
#query-form {
	padding: 20px;
	background-color: #fff;

	.el-form-item {
		margin: 0 20px 0 0
	}
}
</style>