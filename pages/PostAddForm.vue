<template>
	<v-main>
		<v-card class="ma-10">
			<v-form @submit.prevent="submitDiaryForm">
				<v-card-title primary-title>
					<v-textarea
						v-model="title"
						outlined
						name="name"
						label="Title"
						rows="1"
						row-height="15"
					></v-textarea>
				</v-card-title>
				<v-card-text>
					<v-textarea v-model="contents" outlined label="Contents"></v-textarea>
				</v-card-text>
				<v-fab-transition>
					<v-btn class="float-right ma-2 primary" type="submit">Create</v-btn>
				</v-fab-transition>
			</v-form>
		</v-card>
	</v-main>
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
