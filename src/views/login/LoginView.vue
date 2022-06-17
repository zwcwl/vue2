<template>
	<div id="login-view">
		<el-form :model="user" status-icon :rules="rules" ref="ruleForm">
			<el-form-item prop="username">
				<el-input type="text" v-model="user.username" placeholder="请输入账号"></el-input>
			</el-form-item>
			<el-form-item prop="userpwd">
				<el-input type="password" v-model="user.userpwd" placeholder="请输入密码"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm">提交</el-button>
				<el-button @click="resetForm">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	data () {
		return {
			user: {
				username: "",
				userpwd: ""
			},
			rules: {
				username: [
					{ required: true, message: "请输入账号", trigger: "blur" }
				],
				userpwd: [
					{ required: true, message: "请输入账号", trigger: "blur" }
				]
			}
		}
	},
	methods: {
		async submitForm () {
			try {
				await this.$refs.ruleForm.validate()
				let data = await this.$api.login(this.user)
				if (data.token) {
					this.$storage.replaceItem("TOKEN", data)
					// setTimeout(()=>{
						this.$router.replace("/")
					// },2000)
				}
			} catch (error) {
				console.log(error)
			}
		},
		resetForm () {
			this.$refs.ruleForm.resetFields()
		}
	}
}
</script>

<style lang="scss">
#login-view {
	height: 100%;
	background-color: #ccc;
	display: flex;
	justify-content: center;
	align-items: center;

	.el-form {
		width: 260px;
		padding: 20px;
		background-color: #fff;
		border-radius: 6px;

		.el-form-item:last-child {
			margin-bottom: 0;
		}
	}
}
</style>