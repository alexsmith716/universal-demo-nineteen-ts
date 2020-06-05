
function enumerateObjectValues(obj, i, z) {

	let isArray = obj instanceof Array;
	
	if (i) {
		console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&: ', i);
	}

	if (z === 1) {
		console.log('------------------------------------');
	}

	Object.keys(obj).forEach((prop, index) => {

		// ---------------------------------------------

		if (typeof(obj[prop]) === 'object') {

			// ---------------------------------------------

			if (!isArray) {

				index === 1 ? console.log('------------------------------') : null;

				if (obj[prop] !== null) {
					console.log('################### OBJECT ###################: ', index, ' :: ', prop + ':');
				}

				// TODO:

				if (obj[prop] === null) {
					console.log('======= NULL =============: ', prop + ': ' + obj[prop]);
				}
			}

			// ---------------------------------------------

			if (obj[prop] !== null && isArray) {

				console.log('>>>>>>>>>>>>>>>>>>>>>>> REAL ARRAY! <<<<<<<<<<<<<<<<<<<<<<');
				return enumerateObjectValues(obj[prop], index, undefined);

			} else if (obj[prop] !== null) {

				return enumerateObjectValues(obj[prop], undefined, index);

			}

		// ---------------------------------------------

		} else if (!isArray) {

			console.log('======= NON-OBJECT =======: ', index, ' :: ', prop + ': ' + obj[prop]);

			if (z === 1 && index === 1) {
				console.log('------------------------------------');
			}

		}
	})
};

export default enumerateObjectValues;
