<template>
	<div id="dialog-form">
		<el-dialog title="添加部门" :visible="dialogVisible" @close="closeDialog" :close-on-click-modal="false">
			<el-form :model="deptDialogform" :rules="rules" status-icon ref="deptDialogform" label-width="100px">
				<el-form-item label="上级部门" prop="parentId">
					<el-cascader placeholder="请选择上级部门" clearable v-model="deptDialogform.parentId"
						:props="{ checkStrictly: true, value: '_id', label: 'deptName' }" :options="deptList" :show-all-levels="true">
					</el-cascader>
				</el-form-item>
				<el-form-item label="部门名称" prop="deptName">
					<el-input v-model="deptDialogform.deptName" autocomplete="off" placeholder="请输入部门名称">
					</el-input>
				</el-form-item>
				<el-form-item label="负责人" prop="userName">
					<el-select placeholder="请选择部门负责人" v-model="deptDialogform.userName" @change="handelUser">
						<el-option v-for="item in userList" :key="item.userId" :label="item.userName"
							:value="`${item.userId}/${item.userName}/${item.userEmail}`"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="负责人邮箱" prop="userEmail">
					<el-input v-model="deptDialogform.userEmail" disabled autocomplete="off" placeholder="负责人邮箱会根据负责人自动填写">
					</el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitDialog">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: "DialogForm",
	data () {
		return {
			dialogVisible: false,
			deptDialogform: {
				deptName: '',
				preatedId: [null]
			},
			userList: [],
			dialogType: "",
			rules: {
				preatedId: {
					required: true, message: '请输入上级部门', trigger: 'blur'
				},
				deptName: {
					required: true, message: '请输入菜单名称', trigger: 'blur'
				},
				userName: {
					required: true, message: '请输入负责人', trigger: 'blur'
				}
			},
			deptList: []
		}
	},
	methods: {
		closeDialog () {
			this.dialogVisible = false
			this.$refs.deptDialogform.resetFields()
		},

		deptOpenDialog (dialogType, row) {
			this.dialogType = dialogType
			this.dialogVisible = true
			if (dialogType == "update") {
				this.$nextTick(() => {
					Object.assign(this.deptDialogform, row)
				})
			}
		},

		async submitDialog () {
			if(this.dialogType == "update"){
				await this.$api.putDept(this.deptDialogform)
			}else{
				await this.$api.postDept(this.deptDialogform)
			}
			this.closeDialog()
			this.$bus.$emit("handleSubmit")
		},

		async getDept(){
			let res= await this.$api.getDept()
			this.deptList=res
		},

		async getUserAll(){
			let res= await this.$api.getUserAll()
			this.userList=res
		},

		handelUser(val){
			console.log(this.deptDialogform.userName.split("/"));
			let [userId,userName,userEmail]=this.deptDialogform.userName.split("/")
			Object.assign(this.deptDialogform,{userId,userName,userEmail})
		}
	},
	mounted () {
		this.$bus.$on("deptOpenDialog", this.deptOpenDialog)
		// this.getDept()
		this.getUserAll()
	}
}
</script>

<style lang="scss">
</style>