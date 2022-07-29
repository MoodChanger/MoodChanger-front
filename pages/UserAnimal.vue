<template>
	<v-card>
		<v-tabs v-model="tab" primary right>
			<v-tab v-for="item in items" :key="item">
				{{ item }}
			</v-tab>
			<v-tab @click="checkLogin">SAVE</v-tab>
		</v-tabs>
		<InfiniteScrollForCat v-if="tab === 0" />
		<InfiniteScrollForDog v-else-if="tab === 1" />
	</v-card>
</template>
<script>
import { mapGetters } from 'vuex';
import InfiniteScrollForCat from '@/components/InfiniteScrollForCat';
import InfiniteScrollForDog from '@/components/InfiniteScrollForDog';
export default {
	name: 'UserAnimal',
	components: {
		InfiniteScrollForCat,
		InfiniteScrollForDog,
	},
	data() {
		return {
			tab: null,
			items: ['CAT', 'DOG'],
			heartColor: false,
		};
	},

	computed: {
		...mapGetters(['getLoggedIn']),
	},
	updated() {
		console.log(this.tab);
	},
	methods: {
		checkLogin() {
			// user.js에서 checkUser랑 비교하기
			if (!this.getLoggedIn) {
				alert('로그인 후 이용 가능합니다');
				this.$router.push('/userlogin');
			}
		},
		saveImg(event) {
			// if (!this.getLoggedIn) {
			//   alert('로그인 후 이용 가능합니다')
			// } else {
			// 이미지 id저장 후 SAVE 탭에서 보여주기
			// 회원 정보랑 같이 id저장
			// 하트 아이콘 빨간색으로 바꾸기
			// }
		},
	},
};
</script>

<style></style>
