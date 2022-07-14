<template>
	<div id="query-form">
		<el-form :inline="true" :model="queryForm" class="demo-form-inline" ref="queryForm">
			<el-form-item label="角色名称" prop="roleName">
				<el-input v-model="queryForm.roleName" placeholder="请输入角色名称"></el-input>
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
				roleName: "",
			},
		}
	},
	methods: {
		//点击搜索用户
		onSubmit () {
			this.$bus.$emit("getRole",this.queryForm)
		},

		//点击重置表单
		onReset (formName) {
			this.$refs[formName].resetFields();
		},
	},
	mounted(){
		this.onSubmit()
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