import React, { Component } from 'react';
// import PropTypes from 'prop-types';

class TableRow extends Component {

  // static propTypes = {
  //   type: PropTypes.string,
  //   colSpan: PropTypes.number,
  //   category: PropTypes.string,
  //   headingColor: PropTypes.string,
  //   onIntervalChange: PropTypes.func,
  //   data: PropTypes.array
  // };

  componentDidMount() {
    if (this.props.colSpan) {
      // #################### INTERVAL IS CRASHING/MEMORY MAXING HEROKU ####################
      this.timerID = setInterval( () => this.getRandomHeadingColor(), 5000 );
      // this.getRandomHeadingColor()
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getRandomHeadingColor = () => {
    const classHeadingColor = ['active','primary','secondary','success','danger','warning','info','light', 'dark'];
    const randomClassHeadingColor = classHeadingColor[ Math.floor( Math.random() * classHeadingColor.length ) ];
    this.props.onIntervalChange(randomClassHeadingColor);
  }

  render() {

    let rows = [];

    if (this.props.type) {

      if (this.props.colSpan) {

        return (

          <tr className={`table-${this.props.headingColor}`}>

            <th colSpan={this.props.colSpan}>{`${this.props.category.toUpperCase()} `}</th>

          </tr>
        );

      } else {

        const thDataCols = this.props.data.map((object, index) =>

          <th scope="col" key={index}>

            { object.charAt(0).toUpperCase()+object.slice(1) }

          </th>
        );

        return (

          <tr>

            { thDataCols }

          </tr>
        );
      }

    } else {

      const tDataCols = this.props.data.map((object, index) =>

        <td key={index}>

          { object }

        </td>
      );

      return (

        <tr>

          { tDataCols }

        </tr>
      );
    }
  }
}

export default TableRow;
