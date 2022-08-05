<template>
	<v-card>
		<v-form @submit.prevent="submitDiaryForm">
			<v-card-title primary-title>
				<v-text-field v-model="title" name="name" label="title"></v-text-field>
			</v-card-title>
			<v-card-text>
				<v-text-field
					v-model="contents"
					name="name"
					label="content"
				></v-text-field>
			</v-card-text>
			<v-btn class="float-right mb-2 mr-2" type="submit">등록하기</v-btn>
		</v-form>
	</v-card>
</template>

<script>
import { mapActions } from 'vuex';
export default {
	name: 'PostAddForm',
	data() {
		return {
			title: '',
			contents: '',
		};
	},
	methods: {
		...mapActions(['CREATE_DIARY']),
		async submitDiaryForm() {
			try {
				const form = {
					title: this.title,
					content: this.contents,
				};
				await this.CREATE_DIARY(form);
			} catch (error) {
				console.log(error.response);
			}
		},
	},
};
</script>

<style></style>
