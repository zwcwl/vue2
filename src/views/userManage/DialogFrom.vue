<template>
	<div id="dialog-form">
		<el-dialog title="添加用户" :visible.sync="dialogFormVisible" :close-on-click-modal="false" @close="dialogClose">
			<el-form :model="dialogFrom" :rules="rules" status-icon ref="dialogFrom">
				<el-form-item label="用户名" label-width="100px" prop="userName">
					<el-input v-model="dialogFrom.userName" autocomplete="off" placeholder="请输入用户名" prefix-icon="el-icon-user">
					</el-input>
				</el-form-item>
				<el-form-item label="邮箱" label-width="100px" prop="userEmail">
					<el-input v-model="dialogFrom.userEmail" autocomplete="off" placeholder="请输入用户邮箱" prefix-icon="">
						<template #append>@163.com</template>
					</el-input>
				</el-form-item>
				<el-form-item label="手机号" label-width="100px" prop="mobile">
					<el-input v-model="dialogFrom.mobile" autocomplete="off" placeholder="请输入手机号"></el-input>
				</el-form-item>
				<el-form-item label="岗位" label-width="100px" prop="job">
					<el-input v-model="dialogFrom.job" autocomplete="off" placeholder="请选择岗位"></el-input>
				</el-form-item>
				<el-form-item label="用户状态" label-width="100px" prop="userState">
					<el-select v-model="dialogFrom.userState" placeholder="请选择用户状态" style="width: 100%">
						<el-option :value="1" label="在职"></el-option>
						<el-option :value="2" label="离职"></el-option>
						<el-option :value="3" label="试用期"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="系统角色" label-width="100px" prop="role">
					<el-select v-model="dialogFrom.roleList" placeholder="请选择系统角色" multiple style="width: 100%">
						<el-option v-for="role in roleList" :key="role._id" :label="role.roleName" :value="role._id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="部门" label-width="100px" prop="deptList">
					<el-cascader v-model="dialogFrom.deptList" :options="deptList" placeholder="请选择所属部门"
						:props="{ multiple: true, checkStrictly: true, value: '_id', label: 'deptName' }" clearable style="width: 100%">
					</el-cascader>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogClose">取 消</el-button>
				<el-button type="primary" @click="dialogSubmit">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data () {
		return {
			roleList: [],
			deptList: [],
			dialogFormVisible: false,
			dialogFrom: {
				userName: "",
				userEmail: "",
				mobile: "",
				job: "",
				userState: 3,
				roleList: [],
				deptList: []
			},
			rules: {
				userName: [
					{
						required: true,
						message: "请输入用户名",
						trigger: "blur"
					}
				],
				userEmail: [
					{
						required: true,
						message: "请输入邮箱",
						trigger: "blur"
					}
				],
				deptList: [
					{
						required: true,
						message: "请填写所属部门",
						trigger: "blur"
					}
				]
			}
		}
	},
	methods: {
		//获取部门列表
		async getDept () {
			try {
				let list = await this.$api.getDept()
				this.deptList = list
			} catch (error) {
				console.log("🚀 ~ file: DialogFrom.vue ~ line 94 ~ getDept ~ error", error)
			}
		},

		//获取角色列表
		async getRole () {
			try {
				let list = await this.$api.getRole()
				this.roleList = list
			} catch (error) {
				console.log("🚀 ~ file: DialogFrom.vue ~ line 104 ~ getRole ~ error", error)
			}
		},

		//打开和关闭dialog弹窗表单
		dialogShow () {
			this.dialogFormVisible=true
		},

		//dialog弹窗关闭触发的事件函数
		dialogClose () {
			this.dialogFormVisible=false
			this.$refs.dialogFrom.resetFields();
		},

		//dialog弹窗提交时触发的事件函数
		dialogSubmit () {
			this.$refs.dialogFrom.validate(async valid => {
				if (valid) {
					try {
						let data = JSON.parse(JSON.stringify(this.dialogFrom))
						data.userEmail += "@163.com"
						let resule= await this.$api.postUser(data)
						if(resule){
							this.$message.success("用户添加成功")
							this.dialogClose()
						}
					} catch (error) {
						console.log(error);
					}
				}
			})
		},

		//更新用户函数
		handleEdit(old){
      console.log("🚀 ~ file: DialogFrom.vue ~ line 148 ~ handleEdit ~ old", old)
			this.dialogFormVisible=true
			Object.assign(this.dialogFrom,old)
		}
	},
	mounted () {
		this.$bus.$on("dialogShow", this.dialogShow)
		this.$bus.$on("handleEdit",this.handleEdit)
		this.getRole()
		this.getDept()
	},
}
</script>

<style lang="scss">
#dialog-form {}
</style>