import multireducer from 'multireducer';

// isolate concerns within a Redux application (modules)
// https://github.com/erikras/ducks-modular-redux

// import auth from './modules/auth';
import counterMultiReducer from './modules/counterMultiReducer';
import counterPreloaded from './modules/counterPreloaded';
import device from './modules/device';
import filterableTable from './modules/filterableTable';
import info from './modules/info';
import infoAlert from './modules/infoAlert';
import infoAlertOne from './modules/infoAlertOne';
import infoAlertTwo from './modules/infoAlertTwo';
import infoAlertThree from './modules/infoAlertThree';
import infoAlertFour from './modules/infoAlertFour';
import lineChart from './modules/lineChart';
// import notifs from './modules/notifs';
import temperatureCalculator from './modules/temperatureCalculator';

export default function rootReducer() {
  return {
    online: (v = true) => v,
    counterCollection: multireducer({
      AboutOneMultireducer1: counterMultiReducer,
      AboutTwoMultireducer1: counterMultiReducer,
      AboutTwoMultireducer2: counterMultiReducer,
      AboutTwoMultireducer3: counterMultiReducer,
    }),
    counterPreloaded,
    device,
    filterableTableCollection: multireducer({
      AboutOneMultireducerFilterableTable1: filterableTable,
      AboutOneMultireducerFilterableTable2: filterableTable,
    }),
    info,
    infoAlert,
    infoAlertOne,
    infoAlertTwo,
    infoAlertThree,
    infoAlertFour,
    lineChartCollection: multireducer({
      AboutTwoMultireducerLineChart1: lineChart,
      AboutTwoMultireducerLineChart2: lineChart,
    }),
    temperatureCalculatorCollection: multireducer({
      AboutOne1: temperatureCalculator,
      AboutOne2: temperatureCalculator,
      AboutTwo1: temperatureCalculator,
      AboutTwo2: temperatureCalculator,
    }),
  };
}
