import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import TableRow from './TableRow';

class TableBody extends Component {

  // static propTypes = {
  //   tableData: PropTypes.array
  // };

  render() {

    let rows = [];

    this.props.tableData.forEach((obj, index, arr) => {
      rows.push( <TableRow data={ obj } key={ index } /> );
    });

    return (

      <tbody>

        {rows}

      </tbody>

    );
  }
}

export default TableBody;
