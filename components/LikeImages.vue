<template>
	<v-container fluid>
		<v-row>
			<v-col v-for="(item, index) in items" :key="index" md="4">
				<v-img
					:src="item.url"
					:lazy-src="item.url"
					aspect-ratio="1"
					class="mb-5"
				></v-img>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapActions } from 'vuex';
export default {
	name: 'LikeImages',
	data() {
		return {
			items: [],
		};
	},
	fetch() {
		this.fetchLikeImages();
	},
	methods: {
		...mapActions(['FETCH_LIKE_IMAGES']),
		async fetchLikeImages() {
			const user = JSON.parse(localStorage.getItem('user'));
			const email = user.user.email;
			const response = await this.FETCH_LIKE_IMAGES(email);
			this.items = response;
		},
	},
};
</script>

<style></style>
