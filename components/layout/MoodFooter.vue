<template>
	<v-footer white>&copy; {{ new Date().getFullYear() }} {{ footer }} </v-footer>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'MoodFooter',
	computed: {
		...mapState({
			footer: state => state.state.footer,
		}),
	},
};
</script>

<style></style>
