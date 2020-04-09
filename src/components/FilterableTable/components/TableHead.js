import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import TableRow from './TableRow';

class TableHead extends Component {

  constructor(props) {
    super(props);

    this.state = {
      headingColor: 'default'
    };
  }

  // static propTypes = {
  //   category: PropTypes.string,
  //   heading: PropTypes.array,
  // };

  tableHeadIntervalChange = (headingColor) => {
    this.setState( { headingColor } );
  }

  render() {

    const headingColor = this.state.headingColor;

    let rows = [];

    rows.push( <TableRow type="thead" colSpan={this.props.heading.length} category={this.props.category} headingColor={headingColor} onIntervalChange={this.tableHeadIntervalChange} key="thead-category" /> );

    rows.push( <TableRow type="thead" data={this.props.heading} key={this.props.heading} /> );

    return (

      <thead>

        {rows}

      </thead>

    );
  }
}

export default TableHead;
