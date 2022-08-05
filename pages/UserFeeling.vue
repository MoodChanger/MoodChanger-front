<template>
	<div>
		<PostList />
		<v-icon class="float-right pr-2" x-large @click="moveToPostAddForm"
			>mdi-plus-circle</v-icon
		>
	</div>
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

<style></style>
