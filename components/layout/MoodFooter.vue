<template>
	<v-footer white absolute style="height: 5%"
		>&copy; {{ new Date().getFullYear() }} {{ footer }}
	</v-footer>
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
