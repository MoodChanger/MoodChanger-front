<template>
	<v-menu offset-y>
		<template #activator="{ on, attrs }">
			<v-btn icon v-bind="attrs" v-on="on">
				<v-avatar color="accent" size="32">
					<v-icon>mdi-account</v-icon>
				</v-avatar>
			</v-btn>
		</template>
		<v-card>
			<v-card-text>
				<v-switch
					label="Dark Theme"
					:input-value="darkMode"
					@change="setDarkMode($event)"
				></v-switch>
			</v-card-text>

			<!-- 로그인 했을 때 -->
			<div v-if="getLoggedIn">
				<v-card-actions class="d-flex flex-column">
					<p class="font-weight-bold" block>{{ getUserName.user_name }}님</p>
					<v-btn block @click="LOGOUT_USER">로그아웃</v-btn>
				</v-card-actions>
				<v-card-actions>
					<NuxtLink class="nuxt-link-style" to="/UpdateUserInfo">
						<v-btn block>회원정보 수정</v-btn>
					</NuxtLink>
				</v-card-actions>
			</div>

			<!-- 로그인 안 했을 때  -->
			<div v-else>
				<v-card-actions>
					<NuxtLink class="nuxt-link-style" to="/UserLogin">
						<v-btn block>로그인</v-btn>
					</NuxtLink>
				</v-card-actions>
				<v-card-actions>
					<NuxtLink class="nuxt-link-style" to="/UserJoin">
						<v-btn block>회원가입</v-btn>
					</NuxtLink>
				</v-card-actions>
			</div>
		</v-card>
	</v-menu>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
	name: 'MoodUser',
	data() {
		return {
			isLoading: false,
		};
	},
	computed: {
		darkMode() {
			// v-switch 색 표시
			return this.$vuetify.theme.dark;
		},
		...mapGetters(['getLoggedIn', 'getUserName']),
		// ...mapState('modules/user', ['loggedIn', 'currentUser']),
	},
	mounted() {
		this.getDarkMode();
	},
	methods: {
		...mapActions(['LOGOUT_USER']),
		setDarkMode(mode) {
			console.log(mode);
			this.$vuetify.theme.dark = mode;
			localStorage.setItem('darkMode', mode ? 'dark' : 'light');
		},
		getDarkMode() {
			const mode = localStorage.getItem('darkMode') === 'dark';
			this.$vuetify.theme.dark = mode;
		},
	},
};
</script>

<style>
.nuxt-link-style {
	text-decoration: none;
	width: 100%;
}
</style>
