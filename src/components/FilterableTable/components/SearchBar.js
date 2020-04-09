import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = props => {

  const { filterText, inStockOnly, onFilterTextChange, onInStockChange } = props;

  return (

    <form>

      <div className="form-group">

        <input
          type="text"
          className="form-control"
          id="searchBar"
          placeholder="Search by product name..."
          value={ filterText }
          onChange={ onFilterTextChange }
        />

      </div>

      <div className="form-check">

        <input
          type="checkbox"
          className="form-check-input"
          id="productsInStock"
          checked={ inStockOnly }
          onChange={ onInStockChange }
        />

        <label className="form-check-label" htmlFor="productsInStock">
          Only show products in stock
        </label>

      </div>

    </form>
  );
};

export default SearchBar;
