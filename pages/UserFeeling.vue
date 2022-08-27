<template>
	<v-main>
		<PostList />
		<v-fab-transition>
			<v-btn
				class="mb-10"
				color="primary"
				dark
				absolute
				bottom
				right
				fab
				@click="moveToPostAddForm"
			>
				<v-icon>mdi-plus</v-icon>
			</v-btn>
		</v-fab-transition>
	</v-main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PostList from '@/components/posts/PostList';

export default {
	name: 'UserFeeling',
	components: {
		PostList,
	},
	computed: {
		...mapGetters(['getLoggedIn']),
	},
	async created() {
		await this.checkLogin();
	},
	methods: {
		...mapActions(['FETCH_DIARY']),
		checkLogin() {
			if (!this.getLoggedIn) {
				alert('로그인 후 이용 가능합니다');
				this.$router.push('/userlogin');
			}
		},
		moveToPostAddForm() {
			this.$router.push('/postaddform');
		},
	},
};
</script>
