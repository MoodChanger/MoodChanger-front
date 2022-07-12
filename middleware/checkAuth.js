import { CHECK_TOKEN } from '../store/modules/actions-types';

export default async ({ store }) => {
	await store.dispatch(CHECK_TOKEN);
};
