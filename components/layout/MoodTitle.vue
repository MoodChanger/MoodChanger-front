<template>
	<v-card>
		<v-card-title class="justify-center px-7">
			<h1 class="font-weight-bold text-h2 primary--text">MoodChanger</h1>
			<v-spacer></v-spacer>
			<div class="">
				<MoodUser />
			</div>
		</v-card-title>
		<v-tabs background-color="transparent" grow>
			<v-tab v-for="item in items" :key="item.title" :to="item.path">
				{{ item.title }}
			</v-tab>
		</v-tabs>
	</v-card>
</template>

<script>
import { mapState } from 'vuex';
import MoodUser from '@/components/layout/MoodUser';

export default {
	name: 'MoodTitle',
	components: { MoodUser },
	data() {
		return {
			items: [
				{ title: 'Home', path: '/' },
				{ title: 'Animal', path: '/UserAnimal' },
				{ title: 'Feeling', path: '/UserFeeling' },
			],
		};
	},
	computed: {
		...mapState({
			title: state => state.title,
		}),
	},
};
</script>

<style></style>
