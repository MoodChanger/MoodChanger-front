<template>
	<v-container fluid>
		<v-row>
			<template v-for="(item, index) in listItems">
				<v-col :key="index" class="ma-2">
					<v-card>
						<v-card-title primary-title @click="moveToSpecificPost(item)">
							{{ item.title }}
						</v-card-title>

						<v-card-text @click="moveToSpecificPost(item)">
							{{ item.content }}
						</v-card-text>
						<v-card-actions class="d-flex flex-row-reverse">
							<v-icon class="pr-1" @click="deleteDiary(item)"
								>mdi-delete</v-icon
							>
							<v-icon class="pr-1" @click="moveToModifyPost(item)"
								>mdi-pencil</v-icon
							>
						</v-card-actions>
					</v-card>
				</v-col>
				<v-responsive
					v-if="index === 2"
					:key="`width-${index}`"
					width="100%"
				></v-responsive>
			</template>
		</v-row>
	</v-container>
</template>

<script>
import { mapActions } from 'vuex';
export default {
	name: 'PostList',
	data() {
		return {
			listItems: [],
		};
	},
	// async fetch() {},
	created() {
		this.fetchListItem();
	},
	methods: {
		...mapActions(['FETCH_DIARY', 'GET_MY_DIARY', 'REMOVE_DIARY']),
		async fetchListItem() {
			const response = await this.FETCH_DIARY();
			console.log(response);
			response.data.forEach(element => {
				this.listItems.push(element);
			});
		},
		moveToSpecificPost(item) {
			this.$router.push(`specificPost/${item.id}`);
		},
		moveToModifyPost(item) {
			this.$router.push(`modifypost/${item.id}`);
		},
		async deleteDiary(item) {
			const response = await this.REMOVE_DIARY(item.id);
			console.log(response);
		},
	},
};
</script>

<style></style>
