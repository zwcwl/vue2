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
				<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
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
		async submitForm (formName) {
			try {
				await this.$refs[formName].validate()
				let result = await this.$api.login(this.user)
        console.log("🚀 ~ file: LoginView.vue ~ line 41 ~ submitForm ~ result", result)
				if (result) {
					this.$store.commit("addUserInfo",result)
					this.$router.replace("/")
				}
			} catch (error) {
        console.log("🚀 ~ file: LoginView.vue ~ line 46 ~ submitForm ~ error", error)
			}
		},
		resetForm (formName) {
			console.log(this.$refs);
			this.$refs[formName].resetFields()
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