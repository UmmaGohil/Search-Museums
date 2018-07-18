import React, { Component } from 'react';
import Locations from './Locations';

class Search extends Component {
  state = {
    searchLocations: [],
    input: '',
  };

  componentWillMount () {
    this.setState({ searchLocations: this.props.locations });
  }

  filterLocations = (e) => {
    this.props.closeInfoWindow();
    const {value} = e.target;
    let searchLocations = [];
    this.props.locations.forEach(function (location) {
        if (location.title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
          location.marker.setVisible(true);
          searchLocations.push(location);
        }
        else {
          location.marker.setVisible(false);
        }
    });
    this.setState({
      searchLocations: searchLocations,
      input: value
    });
  }

  render() {
    const list = this.state.searchLocations
    .map((locationTitle, title) => (
        <Locations key={title} openInfoWindow={this.props.openInfoWindow} data={locationTitle}/>
      ))
      return (
          <div className="search">
              <input role="search"
              aria-labelledby="filter"
              id="search-field"
              className="search-field"
              type="text"
              placeholder="Filter the list"
              value={this.state.input}
              onChange={this.filterLocations}
              />
              <ul>
              {list}
              </ul>
          </div>
    );
  }
}

export default Search;
