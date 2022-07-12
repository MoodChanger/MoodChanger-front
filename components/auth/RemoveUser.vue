<template>
	<div class="text-center mt-3">
		<v-btn class="secondary" style="width: 200px" @click="REMOVE_USER"
			>회원 탈퇴</v-btn
		>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
	name: 'RemoveUser',
	methods: {
		...mapActions(['REMOVE_USER']),
	},
};
</script>
