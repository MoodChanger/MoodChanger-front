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
	<!-- <div>
		<v-app-bar class="primary pl-5" dense>
			<v-toolbar-title>
				<NuxtLink class="white--text text-decoration-none" to="/"
					>MoodChanger</NuxtLink
				>
			</v-toolbar-title>
			<v-spacer></v-spacer>

			<v-tabs v-model="value" color="primary" slider-color="white">
				<v-tab v-for="(item, index) in items" :key="index">
					<NuxtLink
						class="black--text text-decoration-none"
						plain
						:to="item.path"
						>{{ item.title }}</NuxtLink
					>
				</v-tab>
			</v-tabs>
			<MoodUser />
		</v-app-bar>
	</div> -->
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
