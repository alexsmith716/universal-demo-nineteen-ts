import React from 'react';
import PropTypes from 'prop-types';

const DropdownSelect = props => {

  const { title, optionsArray, dropDownOptionSelected, onChange } = props;

  return (

    <form>

      <div className="form-group mb-0">

        <label htmlFor="exampleFormControlSelect1">{ title }</label>

        <select
          className="custom-select custom-select-sm"
          id="exampleFormControlSelect1"
          value={ dropDownOptionSelected }
          onChange={ onChange }
        >

          <option value="">{ title }...</option>

          {optionsArray.map((value, index) => (
            <option value={value} key={index}>{value}</option>
          ))}

        </select>

      </div>
    </form>
  );
};

// DropdownSelect.propTypes = {
//   title: PropTypes.string,
//   optionsArray: PropTypes.array.isRequired,
//   dropDownOptionSelected: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired
// };

export default DropdownSelect;
