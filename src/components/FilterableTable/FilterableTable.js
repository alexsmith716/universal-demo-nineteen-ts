import React, { Component, createRef } from 'react';
// import PropTypes from 'prop-types';
import { bindActionCreators } from 'multireducer';
import { connect } from 'react-redux';

import Loading from '../Loading/Loading';
import SearchBar from './components/SearchBar';
import Tables from './components/Tables';
import DropdownSelect from '../DropdownSelect/DropdownSelect';
import * as filterableTableActions from '../../redux/modules/filterableTable';

// import enumerateObjectValues from '../../utils/enumerateObjectValues';
// import { promiseGenerator } from '../../utils/promiseGenerator';

@connect(
  (state, { multireducerKey: key  }) => ({
    dropDownOptionSelected: state.filterableTableCollection[key].dropDownOptionSelected,
    loading: state.filterableTableCollection[key].loading,
    loaded: state.filterableTableCollection[key].loaded,
    data: state.filterableTableCollection[key].data,
    error: state.filterableTableCollection[key].error,
    errorResponse: state.filterableTableCollection[key].errorResponse,
    filterText: state.filterableTableCollection[key].filterText,
    inStockOnly: state.filterableTableCollection[key].inStockOnly,
  }),
  (dispatch, { multireducerKey: key  }) => bindActionCreators({ ...filterableTableActions }, dispatch, key)
)

class FilterableTable extends Component {

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { loading, load, dropDownOptionSelected, loaded } = this.props;

    if (loading) {
      load({ request: dropDownOptionSelected });
    }

    // if (loaded && !loading) {
    //   console.log('>>>>>>>>>>>>>>>> FilterableTable > promiseGenerator() !!!!!!!!!!!!!!!!!');

    //   const result = promiseGenerator();
    //   let p  = result.next().value;

    //   p.then(r => {
    //     console.log('>>>>>>>>>>>>>>>> FilterableTable > promiseGenerator() > result.next().value: ', p);
    //     console.log('>>>>>>>>>>>>>>>> FilterableTable > promiseGenerator() > resolve: ', r);
    //     return result.next(r)
    //   });

    //   return enumerateObjectValues({"category": "Sporting Goods Small 2"})
    //     .then(response => {
    //       console.log('>>>>>>>>>>>>>>>> FilterableTable > SELECTED_OPTION LOAD LOAD_SUCCESS > enumerateObjectValues > returned: ', response);
    //     })
    //     .catch(error => {
    //       console.log('>>>>>>>>>>>>>>>> FilterableTable > cSELECTED_OPTION LOAD LOAD_SUCCESS > enumerateObjectValues > ERROR: ');
    //     })
    // }
  };

  // ==============================================================================================

  handleDropdownChange = (e) => {
    const { actionHandleDropdownChange } = this.props;
    actionHandleDropdownChange({
      data: e.target.value
    });
  };

  handleFilterTextChange = (e) => {
    const { actionFilterTextChange } = this.props;
    actionFilterTextChange({
      data: e.target.value
    });
  };

  handleInStockChange = (e) => {
    const { actionInStockChange } = this.props;
    actionInStockChange({
      data: e.target.checked
    });
  };

  render() {

    const styles = require('./scss/FilterableTable.scss');

    const { loading, loaded, data, error, errorResponse,  dropDownOptionSelected }  = this.props;
    const { optionsArray, description, filterText, inStockOnly } = this.props;

    const loadingText = 'Fetching Requested Data ...';
    let items = null;

    let arrayLike = data && data.length > 0 ? true : null;

    if (data && (dropDownOptionSelected.indexOf('https') === 0 || dropDownOptionSelected.indexOf('http') === 0)) {

      if (arrayLike) {

        items = Array.from(data).map((item, index) => {

          let fromItem = item;
          let fromIndex = index;
          let ok = Object.keys(fromItem).map((item, index) => {
            return <div key={index}>{`${fromIndex}: ${item}: "${fromItem[item]}"`}</div>
          })

          return (
            <div key={index}>
              {ok}

              {fromIndex !== data.length-1 && (
                <div key={index}>---------</div>
              )}
            </div>
          )
        });

      } else {

        items = Object.keys(data).map((item, index) => {
          return <div key={index}>{`${index}: ${item}: "${data[item]}"`}</div>;
        });
      }
    }

    // ------------------------------------------------------------------------------------

    return (

      <div>

        {/* (>>>>>>>>>>>>>>>>>>>>>> DropdownSelect >>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="my-1 mx-1 p-1 container-padding-border-radius-2">
          <div className="my-1 mx-1 bg-color-ivory container-padding-border-radius-1">

            <div className="d-flex">
              <div className="bg-color-ivory width-400">

                <DropdownSelect
                  title={ description }
                  optionsArray={ optionsArray }
                  dropDownOptionSelected={ dropDownOptionSelected }
                  onChange={ this.handleDropdownChange }
                />

              </div>
            </div>

          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>> LOADING >>>>>>>>>>>>>>>>>>>>>>>>) */}

        {loading && (

            <div>
              <br/>
              <div className="my-1 mx-1 p-1 container-padding-border-radius-2">
                <div className="my-1 mx-1 bg-color-ivory container-padding-border-radius-1">

                  <Loading text={ loadingText } />

                </div>
              </div>
            </div>
          )}

        {/* (>>>>>>>>>>>>>>>>>>>>>> ERROR >>>>>>>>>>>>>>>>>>>>>>>>) */}

        {error &&
          !loading && (

            <div>
              <br/>
              <div className="my-1 mx-1 p-1 container-padding-border-radius-2">
                <div className="my-1 mx-1 bg-color-ivory container-padding-border-radius-1">

                  <div className="alert alert-danger text-center" role="alert">
                    <div>{errorResponse.documentation_url}</div>
                    <div>------------</div>
                    <div>{errorResponse.message}</div>
                  </div>

                </div>
              </div>
            </div>
          )}

        {/* (>>>>>>>>>>>>>>>>>>>>>> EXTERNAL DATA LOADED >>>>>>>>>>>>>>>>>>>>>>>>) */}

        {items !== null &&
          loaded &&
          !loading && (

            <div>
              <br/>
              <div className="my-1 mx-1 p-1 container-padding-border-radius-2">
                <div className="my-1 mx-1 bg-color-ivory container-padding-border-radius-1">

                  {items}

                </div>
              </div>
            </div>
          )}

        {/* (>>>>>>>>>>>>>>>>>>>>>> LOCAL DATA LOADED >>>>>>>>>>>>>>>>>>>>>>>>) */}

        {items === null &&
          loaded &&
          !loading && (

            <div>
              <br/>

              <div className="my-1 mx-1 p-1 container-padding-border-radius-2">
                <div className="my-1 mx-1 bg-color-ivory container-padding-border-radius-1">

                  <div className="d-flex">
                    <div className="bg-color-ivory width-400">

                      <SearchBar 
                        filterText={ filterText }
                        inStockOnly={ inStockOnly }
                        onFilterTextChange={ this.handleFilterTextChange }
                        onInStockChange={ this.handleInStockChange }
                      />

                    </div>
                  </div>

                </div>

                <br />
                <div>
                  <Tables 
                    tablesData={ data } 
                    filterText={ filterText }
                    inStockOnly={ inStockOnly }
                  />
                </div>

              </div>
            </div>
          )}

      </div>
    );
  }
}

export default FilterableTable;
