<template>
	<v-main>
		<v-card class="ma-10">
			<v-card-title primary-title> {{ item.title }} </v-card-title>
			<v-card-text> {{ item.content }} </v-card-text>
			<v-card-actions class="d-flex flex-row-reverse">
				<v-btn plain icon @click.stop="deleteDiary(item)">
					<v-icon>mdi-delete</v-icon>
				</v-btn>
				<v-btn plain icon @click.stop="moveToModifyPost(item)">
					<v-icon>mdi-pencil</v-icon>
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-main>
</template>

<script>
import { mapActions } from 'vuex';
import { getSpecificDiary } from '@/api/index';
export default {
	async asyncData({ params }) {
		try {
			const response = await getSpecificDiary(params.id);
			const item = response.data;
			return { item };
		} catch (error) {
			console.log(error.response);
		}
	},
	methods: {
		...mapActions(['REMOVE_DIARY']),
		moveToModifyPost(item) {
			this.$router.push(`modifypost/${item.id}`);
		},
		async deleteDiary(item) {
			try {
				await this.REMOVE_DIARY(item.id);
			} catch (error) {
				console.log(error.reponse);
			}
		},
	},
};
</script>
