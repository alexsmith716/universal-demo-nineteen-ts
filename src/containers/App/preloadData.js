import { isLoaded as isInfoLoaded, load as loadInfo } from '../../redux/modules/info';
import { isLoaded as isInfoAlertLoaded, load as loadInfoAlert } from '../../redux/modules/infoAlert';
// import { isLoaded as isInfoAlertFourLoaded, load as loadInfoAlertFour } from '../../redux/modules/infoAlertFour';
import { isLoaded as isInfoTESTLoaded, load as loadInfoTEST } from '../../redux/modules/infoTEST';

async function preloadData(store, getState) {
	// console.log('>>>>>>>>>>>>>>>> APP > preloadData > store.getState()!!!: ', store.getState());

	console.log('>>>>>>>>>>>>>>>> APP > preloadData > isInfoLoaded?: ', isInfoLoaded(store.getState()))
	if (!isInfoLoaded(store.getState())) {
		await store.dispatch(loadInfo());
	}

	console.log('>>>>>>>>>>>>>>>> APP > preloadData > isInfoAlertLoaded?: ', isInfoAlertLoaded(store.getState()))
	if (!isInfoAlertLoaded(store.getState())) {
		await store.dispatch(loadInfoAlert());
	}

	// console.log('>>>>>>>>>>>>>>>> APP > preloadData > isInfoAlertFourLoaded?: ', isInfoAlertFourLoaded(store.getState()))
	// if (!isInfoAlertFourLoaded(store.getState())) {
	//   await store.dispatch(loadInfoAlertFour());
	// }

	console.log('>>>>>>>>>>>>>>>> APP > preloadData > isInfoTESTLoaded?: ', isInfoTESTLoaded(store.getState()))
	// await store.dispatch(loadInfoTEST());
	if (!isInfoTESTLoaded(store.getState())) {
		await store.dispatch(loadInfoTEST());
	}
}

export { preloadData };
