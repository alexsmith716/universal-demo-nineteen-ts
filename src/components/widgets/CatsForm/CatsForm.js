import React, { Component } from 'react';

import CatInputs from './CatInputs';


class CatsForm extends Component {

	constructor(props) {
		super(props);

		this.state = {
			cats: [{name:'', age:''}],
			owner: '',
			description: ''
		}
	}

	handleChange = (e) => {

		if ( e.target.name.indexOf('cat') === 0 || e.target.name.indexOf('age') === 0 ) {

			let cats = [...this.state.cats];
			let nameAttribute = 'name';

			e.target.name.indexOf('age') === 0 ? nameAttribute = 'age' : null;

			cats[e.target.dataset.id][`${nameAttribute}`] = e.target.value;

			this.setState({ cats })

		} else {

			this.setState({ [e.target.name]: e.target.value });
		}
	};

	// handleCatStateArrayInputChange = (e) => {
	//   console.log('>>>>>>>>>>>>>>>> CatsForm > handleCatStateArrayInputChange > e.target: ', e.target);
	// };

	// --------------------------------------------------------------------------

	handleSubmit = (e) => {

		e.preventDefault();
	}

	// --------------------------------------------------------------------------

	// A form element becomes 'controlled' if you set its value via a prop

	// State and Lifecycle
	// ============================== State Updates May Be Asynchronous =====================================
	// * React may batch multiple 'setState()' calls into a single update for performance.
	// * Because 'this.props' and 'this.state' may be updated asynchronously, 
	//    you should not rely on their values for calculating the next state.
	// * To fix it, use a second form of 'setState()' that accepts a function rather than an object. 
	//   That function will receive the previous state as the first argument, 
	//    and the props at the time the update is applied as the second argument

	//  ============================= Correct ===============================================================
	//  this.setState((state, props) => ({
	//    counter: state.counter + props.increment
	//  }));

	addCat = (e) => {
		this.setState((prevState) => ({
			cats: [...prevState.cats, {name:'', age:''}],
		}));
	}

	// --------------------------------------------------------------------------
	// --------------------------------------------------------------------------

	render() {

		let {cats, owner, description} = this.state;

		return (

			<div className="d-flex justify-content-center">
				<div className="bg-color-ivory width-600">
					<div className="my-1 container-padding-border-radius-2">

						<form onSubmit={this.handleSubmit} >

							<div className="form-row mb-2">

								<div className="form-group col-md-6">
									<label htmlFor="owner">Owner</label>
									<input type="text" className="form-control" name="owner" id="owner" value={owner} onChange={this.handleChange} placeholder="Owner!!" />
								</div>

								<div className="form-group col-md-6">
									<label htmlFor="description">Description</label>
									<input type="text" className="form-control" name="description" id="description" value={description} onChange={this.handleChange} placeholder="Description" />
								</div>

							</div>

							<CatInputs cats={cats} onChange={ this.handleChange } />

							<div className="row text-center">

								<div className="col-lg-6 col-md-6 col-sm-12">
									<button onClick={this.addCat} className="btn btn-primary">Add new cat</button>
								</div>

								<div className="col-lg-6 col-md-6 col-sm-12">
									<button type="submit" className="btn btn-success">Submit</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

export default CatsForm;
