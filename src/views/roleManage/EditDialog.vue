<template>
	<div class="edit-dialog">
		<el-dialog title="权限设置" :visible="dialogVisible" @close="closeDialog" :close-on-click-modal="false">
			<el-form label-width="100px">
				<el-form-item label="角色名称">
					{{ curRoleName }}
				</el-form-item>
				<el-form-item label="权限设置">
					<el-tree :data="menuList" show-checkbox node-key="_id" default-expand-all ref="tree"
						:props="{label:'menuName'}">
					</el-tree>
				</el-form-item>
			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button dialogType="primary" @click="submitDialog">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: "EditDialog",
	data(){
		return {
			menuList:[],
			dialogVisible: false,
			curRoleId:"",
			curRoleName:""
		}
	},
	methods:{
		async getMenu(){
			let res=await this.$api.getMenu()
			this.menuList=res
		},

		//dialog弹窗关闭触发的事件函数
		closeDialog () {
			this.dialogVisible = false
		},

		editDialog(row){
			console.log(row);
			let {_id,roleName,permissionList} = row
			this.dialogVisible=true
			this.curRoleName=roleName
			this.curRoleId=_id

			this.$nextTick(()=>{
				this.$refs.tree.setCheckedKeys(permissionList.checkedKeys)
			})
		},
		submitDialog(){
			console.log(this.$refs.tree.getCheckedKeys());
			console.log(this.$refs.tree.getCheckedNodes());
		}
	},
	created(){
		this.getMenu(),
		this.$bus.$on("editDialog",this.editDialog)
	}
}
</script>

<style lang="scss">
</style>