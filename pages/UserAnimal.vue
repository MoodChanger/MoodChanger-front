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
		<LikeImages v-else-if="tab === 2" />
	</v-card>
</template>
<script>
import { mapGetters } from 'vuex';
import InfiniteScrollForCat from '@/components/animal/InfiniteScrollForCat';
import InfiniteScrollForDog from '@/components/animal/InfiniteScrollForDog';
import LikeImages from '@/components/animal/LikeImages';
export default {
	name: 'UserAnimal',
	components: {
		InfiniteScrollForCat,
		InfiniteScrollForDog,
		LikeImages,
	},
	data() {
		return {
			tab: null,
			items: ['CAT', 'DOG'],
		};
	},

	computed: {
		...mapGetters(['getLoggedIn']),
	},
	methods: {
		checkLogin() {
			if (!this.getLoggedIn) {
				alert('로그인 후 이용 가능합니다');
				this.$router.push('/userlogin');
			}
		},
	},
};
</script>

<style></style>
