<template>
	<v-app id="app">
		<MoodTitle />
		<Nuxt />
		<MoodFooter />
	</v-app>
</template>

<script>
import { mapActions } from 'vuex';
import MoodTitle from '@/components/layout/MoodTitle';
import MoodFooter from '@/components/layout/MoodFooter';

export default {
	name: 'DefaultLayout',
	components: { MoodTitle, MoodFooter },
	async mounted() {
		await this.fetchUser();
	},
	methods: {
		...mapActions('modules/user', ['fetchUser']),
	},
};
</script>
