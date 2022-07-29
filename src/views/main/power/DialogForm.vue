<template>
	<div id="dialog-form">
		<el-dialog :title="dialogType == 'update' ? '更新权限' : '新增权限'" :visible="dialogVisible" @close="closeDialog"
			:close-on-click-modal="false">
			<el-form ref="powerDialogForm" :model="powerDialogForm" status-icon :rules="rules" label-width="100px">

				<el-form-item label="权限名称" prop="powerName">
					<el-input v-model="powerDialogForm.powerName" placeholder="请输入权限名称"></el-input>
				</el-form-item>

				<el-form-item label="权限状态" prop="powerState">
					<el-radio-group v-model="powerDialogForm.powerState">
						<el-radio :label="1">正常</el-radio>
						<el-radio :label="2">失效</el-radio>
					</el-radio-group>
				</el-form-item>

			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button @click="submitDialog">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data () {
		return {
			dialogType:'',
			dialogVisible:false,
			powerDialogForm:{
				powerName:"",
				powerState:1
			},
			rules:{
				powerName:{
					required: true, message: '请输入权限名称', trigger: 'blur'
				}
			}
		}
	},
	methods: {
		//判断对话框的类型：编辑、局部新增、全局新增
		powerOpenDialog (dialogType, row) {
			this.dialogVisible = true
			this.dialogType = dialogType
			if (dialogType == "update") {
				this.$nextTick(() => {
					Object.assign(this.powerDialogForm, row)
				})
			}
		},

		//dialog弹窗关闭触发的事件函数
		closeDialog () {
			this.dialogVisible = false
			this.$refs.powerDialogForm.resetFields();
		},

		//提交对话框
		submitDialog () {
			let { dialogType, powerDialogForm } = this
			this.$refs.powerDialogForm.validate(async (valid) => {
				if (!valid) return
				if (dialogType == "create") {
					await this.$api.postPower(powerDialogForm)
					this.$message.success("菜单新增成功")
				} else {
					await this.$api.putPower(powerDialogForm)
					this.$message.success("菜单更新成功")
				}
				this.closeDialog()
				this.$bus.$emit("querySubmit")
			})
		},
	},
	created () {
		this.$bus.$on("powerOpenDialog", this.powerOpenDialog)
	}
}
</script>

<style lang="scss">
</style>