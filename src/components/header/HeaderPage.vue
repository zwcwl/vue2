<template>
	<div id="header-page">
		<div class="lf-container">
			<div class="spread-shrink" @click="cutSpread">
				<i :class="isSpread ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
			</div>
			<bread-page></bread-page>
		</div>
		<div class="rt-container">
			<div class="user-info">
				<el-badge :value="count" :max="99" class="item">
					<i class="el-icon-bell"></i>
				</el-badge>
			</div>
			<div class="user-utils">
				<el-dropdown trigger="click" style="display:block;" @command="handleCommand">
					<div class="el-dropdown-link user-img">
						<img src="@/assets/images/logo.png" alt="">
					</div>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="setting">设置</el-dropdown-item>
						<el-dropdown-item command="logOut">退出登入</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import BreadPage from "@/components/header/BreadPage.vue"

export default {
	name: "HeaderPage",
	data () {
		return {
			count: ""
		}
	},
	methods: {
		...mapMutations(["cutSpread"]),
		handleCommand (key) {
			if (key === "setting") {
				this.$router.replace("/setting")
			} else if (key === "logOut") {
				this.$store.commit("delUserInfo")
				this.$router.replace("/user/login")
			}
		},
		async getUndone () {
			try {
				let result = await this.$api.getUndone()
				this.count = result
			} catch (error) {

			}
		}
	},
	computed: {
		...mapState(["isSpread"])
	},
	components: {
		BreadPage
	},
	mounted () {
		this.getUndone()
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

			i {
				font-size: 26px;
				padding: 4px 10px;
				cursor: pointer;
			}
		}
	}

	.rt-container {
		display: flex;
		align-items: center;

		.user-info {
			.el-badge {
				i {
					font-size: 26px;
					padding: 4px 10px;
				}

				.el-badge__content.is-fixed {
					right: 26px;
				}
			}
		}

		.user-utils {
			margin-left: 20px;

			.user-img {
				width: 42px;
				height: 42px;
				border-radius: 50%;
				overflow: hidden;
				background-color: #ccc;

				img {
					width: 100%;
				}
			}
		}
	}
}
</style>