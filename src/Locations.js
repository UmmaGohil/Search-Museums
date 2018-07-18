import React, { Component } from 'react';

class Location extends Component {

  render() {
      return (
          <li
          role="button"
          className="title"
          tabIndex="0"
          onKeyPress={this.props.openInfoWindow.bind(this, this.props.data.marker)}
          onClick={this.props.openInfoWindow.bind(this, this.props.data.marker)}
          >
          {this.props.data.title}
          </li>
        );
      }
    }

export default Location;
