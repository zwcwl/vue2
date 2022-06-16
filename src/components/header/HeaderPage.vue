<template>
	<div id="header-page">
		<div class="lf-container">
			<div class="spread-shrink" @click="cutSpread">
				<el-button type="primary" :icon="isSpread ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></el-button>
			</div>
			<bread-page></bread-page>
		</div>
		<div class="rt-container">
			<div class="user-utils">
				<el-dropdown trigger="click" style="display:block;">
					<div class="el-dropdown-link user-img">
						<img src="@/assets/images/logo.png" alt="">
					</div>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="setting">设置</el-dropdown-item>
						<el-dropdown-item @click.native="logOut">退出登入</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
	</div>
</template>

<script>
import storage from '@/utils/storage'
import { mapState, mapMutations } from 'vuex'
import BreadPage from "@/components/header/BreadPage.vue"

export default {
	name: "HeaderPage",
	methods: {
		...mapMutations(["cutSpread"]),
		logOut () {
			storage.removeKey("TOKEN")
			this.$message({
				message: '成功退出登入',
				type: 'success'
			});
			this.$router.replace("/login")
		},
		setting () {
			this.$router.replace("/setting")
		},
	},
	computed: {
		...mapState(["isSpread"])
	},
	components:{
		BreadPage
	}
}
</script>

<style lang="scss">
#header-page {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100%;

	.lf-container {
		display: flex;
		align-items: center;

		.spread-shrink {
			margin-right: 20px;

			.el-button {
				font-size: 26px;
				padding: 4px 10px;
			}
		}
	}

	.rt-container {
		display: flex;
		align-items: center;

		.user-utils {
			.user-img {
				width: 42px;
				height: 42px;
				border-radius: 50%;
				overflow: hidden;
				background-color: #fff;

				img {
					width: 100%;
				}
			}
		}
	}
}
</style>