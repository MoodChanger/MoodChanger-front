<template>
	<v-card>
		<v-form @submit.prevent="submitModifyForm">
			<v-card-title primary-title>
				<v-text-field v-model="title" label="제목"></v-text-field>
			</v-card-title>
			<v-card-text>
				<v-text-field v-model="content" label="내용"></v-text-field>
			</v-card-text>
			<v-btn class="float-right mb-2 mr-2" type="submit">수정완료</v-btn>
		</v-form>
	</v-card>
</template>

<script>
import { mapActions } from 'vuex';
import { getSpecificDiary } from '@/api/index';
export default {
	// async asyncData({ params }) {
	// 	try {
	// 		const response = await getSpecificDiary(params.id);
	// 		const test = response.data;
	// 		console.log(test);
	// 		return { test };
	// 	} catch (error) {
	// 		console.log(error.response);
	// 	}
	// },
	data() {
		return {
			title: '',
			content: '',
			id: '',
		};
	},
	// asyncData나 fetch하고 싶지만 페이지에 들어갔을 때 내용들이 보이게 할려면 nuxt 주기에 따라 created가 최선인가?
	async created() {
		const response = await getSpecificDiary(this.$route.params.id);
		console.log(response, 'created');
		this.title = response.data.title;
		this.content = response.data.content;
	},
	methods: {
		...mapActions(['UPDATE_DIARY']),
		async submitModifyForm() {
			try {
				const form = {
					title: this.title,
					content: this.content,
					id: this.$route.params.id,
				};
				await this.UPDATE_DIARY(form);
				this.$router.push('/userfeeling');
			} catch (error) {
				console.log(error.response);
			}
		},
	},
};
</script>

<style></style>
