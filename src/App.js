import React, { Component } from 'react';
import './App.css';
import Search from './Search';

class App extends Component {
  state = {
          locations:[{
          'title': 'The National Gallery', 'location': {lat: 51.508929, lng: -0.128299}},
          {'title': 'The British Museum', 'location': {lat: 51.519413,lng: -0.126957}},
          {'title': 'Science Museum', 'location': {lat:51.497810,lng:-0.174523}},
          {'title': 'V & A Museum of Childhood', 'location': {lat: 51.529041, lng: -0.054952}},
          {'title': 'Grant Museum of Zoology', 'location': {lat: 51.523802, lng:-0.134395}
        }],
          infowindow: '',
          prevmarker: ''
      };

    componentDidMount() {
      window.initMap = this.initMap;
      loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyCMxifHdFmQWRVLDL1e4bbWNN4ekmcKtaY&v=3&callback=initMap')
    }

    initMap = () => {
        var self = this;
        var mapview = document.getElementById('map');
        const map = new window.google.maps.Map(mapview, {
          center: {lat: 51.507351, lng: -0.127758},
            zoom: 13,
        });
        var InfoWindow = new window.google.maps.InfoWindow();
        let allLocations = [];
        this.state.locations.forEach(function (location) {
          var title = location.title;
          var marker = new window.google.maps.Marker({
          position: location.location,
          title: location.title,
          map: map,
          animation: window.google.maps.Animation.DROP,
            });
            marker.addListener('click', function () {
                self.openInfoWindow(marker);
            });
            location.title = title;
            location.marker = marker;
            allLocations.push(location);
        });
        this.setState({ locations: allLocations, map: map, infowindow: InfoWindow });
    }

    openInfoWindow = (marker) => {
        this.closeInfoWindow();
        this.state.infowindow.open(this.state.map, marker);
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(function() {
          marker.setAnimation(null);
        }, 950);
        this.setState({ prevmarker: marker });
        this.populateInfoWindow(marker);
        this.state.infowindow.setContent('Loading');
    }

    closeInfoWindow = () => {
        if (this.state.prevmarker) {
            this.state.prevmarker.setAnimation(null);
        }
        this.setState({ prevmarker: '' });
        this.state.infowindow.close();
    }

    populateInfoWindow = (marker) => {
        let self = this;
        var url = "https://api.foursquare.com/v2/venues/search?client_id=MW0L1ZXTPGUQASLIEKKJIF1HW1ICONRZOPZJFMG2C13QEMBJ&client_secret=XT2AOODWNTKCP3ZUTIJNGMTSBBYG315RSWUEEE00YSSAIREA&v=20130815&ll=" + marker.getPosition().lat() + "," + marker.getPosition().lng() + "&limit=1";
        fetch(url)
        .then(function(response) {
          response.json().then(function(data) {
            var locationData = data.response.venues[0];
            var locationName = '<p tabindex="0"><u><strong> ' + locationData.name +'</strong></u></p>';
            var locationAddress = '<p tabindex="1">' + locationData.location.formattedAddress[0]+'</p>';
            var locationID = '<a href="https://foursquare.com/v/'+ locationData.id +'" target="_blank" tabindex="2">Read More on Foursquare Website</a>';
            self.state.infowindow.setContent(locationName+locationAddress+locationID);
          });
        })
        .catch(function(err) {
          var errorContent = "Data cannot be loaded.";
          self.state.infowindow.setContent(errorContent);
        });
      }

    render() {
      const style = {
      width: '100vw',
      height: '100vh'
      }
        return (
            <div>
                <Search
                locations={this.state.locations}
                openInfoWindow={this.openInfoWindow}
                closeInfoWindow={this.closeInfoWindow}
                />
                <div id="map" style={style}></div>
            </div>
          );
        }
      }

  function loadJS(src) {
      const local = window.document.getElementsByTagName("script")[0];
      const script = window.document.createElement("script");
      script.src = src;
      script.async = true;
      local.parentNode.insertBefore(script, local);
      script.onerror = function () {
        document.write("Error trying to load the map.");
    };
  }

export default App;
