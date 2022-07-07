<template>
	<div id="dialog-form">
		<el-dialog title="新增菜单" :visible="dialogVisible" @close="closeDialog" :close-on-click-modal="false">
			<el-form ref="menuDialogform" :model="menuDialogform" status-icon :rules="rules">
				<el-form-item label="父级菜单" prop="parentId">
					<el-cascader v-model="menuDialogform.parentId"></el-cascader>
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
	data() {
		return {
			dialogVisible: false,
			action: "",
			menuDialogform: {
				parentId: ""
			},
			rules: {
				parentId: {
					required: true, message: '请输入菜单名称', trigger: 'blur'
				}
			}
		}
	},
	methods: {
		//判断对话框的类型：编辑、局部新增、全局新增
		menuDialogShow(action, row) {
			this.action = action
			if (action == "update") {
				this.editMenuDialog(row)
				return
			} else {
				this.dialogVisible = true
			}
		},

		//编辑对话框
		editMenuDialog(row) {

		},

		//dialog弹窗关闭触发的事件函数
		closeDialog() {
			this.dialogVisible = false
			this.$refs.menuDialogform.resetFields();
		},

		//提交对话框
		submitDialog(){
			
		}
	},
	created() {
		this.$bus.$on("menuDialogShow", this.menuDialogShow)
	}
}
</script>

<style lang="scss">
</style>