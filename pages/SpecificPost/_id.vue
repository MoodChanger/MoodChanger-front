<template>
	<v-card>
		<v-card-title primary-title> 제목 : {{ item.title }} </v-card-title>
		<v-card-text> 내용 : {{ item.content }} </v-card-text>
		<v-card-actions class="d-flex flex-row-reverse">
			<v-icon class="pr-1" @click="moveToModifyPost(item)">mdi-pencil</v-icon>
			<v-icon class="pr-1" @click="deleteDiary(item)">mdi-delete</v-icon>
		</v-card-actions>
	</v-card>
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
		// url 이상하게 이동함, 일단 보류
		moveToModifyPost(item) {
			this.$router.replace(`modifypost/${item.id}`);
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

<style></style>
