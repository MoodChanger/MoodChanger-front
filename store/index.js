export const state = () => ({
	state: {
		title: 'MoodChanger',
		footer: 'S.K all right reserved.',
	},
});

export const actions = {
	nuxtServerInit(storeContext, nuxtContext) {
		storeContext.dispatch('modules/user/refreshToken', null, { root: true });
	},
};
