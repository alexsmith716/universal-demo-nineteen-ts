import { isLoaded as isInfoAlertThreeLoaded, load as loadInfoAlertThree } from '../../redux/modules/infoAlertThree';

async function preloadData(store, getState) {
  console.log('>>>>>>>>>>>>>>>> AboutThree > preloadData > isInfoAlertThreeLoaded?: ', isInfoAlertThreeLoaded(store.getState()))
  if (!isInfoAlertThreeLoaded(store.getState())) {
    await store.dispatch(loadInfoAlertThree());
  }
}

export { preloadData };
