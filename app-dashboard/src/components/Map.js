import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form'
import Accordion from 'react-bootstrap/Accordion'
import * as Icon from 'react-bootstrap-icons';

const mapStyles = {
  width: '450px',
  height: '300px',
};

export class MapContainer extends Component {

  constructor(props) {
    super(props);

    const { lat, lng } = this.props.initialCenter;

    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      },
      stores: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      value: 'warning'
    }
  }

  loadMap() {
    if (this.props && this.props.google) {
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;

      const node = ReactDOM.findDOMNode(mapRef);

      let { zoom } = this.props;
      const { lat, lng } = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);

      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom
        }
      );

      this.map = new maps.Map(node, mapConfig);
    }
  }

  renderChildren() {
    const { children } = this.props;

    if (!children) return;

    return React.Children.map(children, c => {
      if (!c) return;

      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        //mapCenter: this.state.currentLocation
      });
    });
  }

  componentDidMount() {
    if (!this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude
            }
          });

        });
      }
    }
    this.loadMap();

    axios.get('http://api.citybik.es/v2/networks/velib?')
      .then(res => {
        this.setState({ stores: res.data.network.stations })
      })

    if (this.props.params) {
      this.setState({ value: this.props.params.color })
    }
  }

  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return <Marker key={index} id={index} position={{
        lat: store.latitude,
        lng: store.longitude
      }}
        onClick={this.onMarkerClick} name={store.name} availableBikes={store.free_bikes} emptySlots={store.empty_slots} />
    })
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  recenterMap() {
    const map = this.map;
    const current = this.state.currentLocation;
    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      let center = new maps.LatLng(current.lat, current.lng);
      map.panTo(center);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value })
    this.props.updateWidget(this.props.id, { color: e.target.value })
  }

  /*   handleSubmit = () => {
      this.props.updateWidget(this.props.id, { color: this.state.value })
    } */

  render() {
    const style = Object.assign({}, mapStyles.map);
    let fontColor = "text-dark"
    if (this.state.value === "dark") {
      fontColor = "text-light"
    } else {
      fontColor = "text-dark"
    }
    return (
      <div style={{ height: '420px', width: '450px' }} className={'my-4 bg-' + this.state.value}>
        <Accordion >
          <div className={'bg-' + this.state.value + ' d-flex justify-content-between p-2'}>
            <h5 className={'text-center ml-3 p-2 font-weight-bold ' + fontColor}>Maps - Vélib</h5>
            <div className="text-center ml-3 p-2">
              <Accordion.Toggle variant="dark" eventKey="0" className="mr-4">
                <Icon.Tools className="" />
              </Accordion.Toggle>
              <Icon.XSquareFill onClick={this.props.deleteWidget.bind(this, this.props.id)} color="red" size={30} className="" style={{ cursor: "pointer" }} />
            </div>

          </div>

          <div className="p-3">

            <Accordion.Collapse eventKey="0">
              <div className="d-flex flex-row p-3 align-items-start">
                <Form.Control value={this.state.value} onChange={this.handleChange} as="select" custom>
                  <option >Choisir un thème</option>
                  <option value="dark">Sombre</option>
                  <option value="light">Clair</option>
                </Form.Control>
                {/* <button onClick={this.handleSubmit} className="btn-dark">OK</button>} */}
              </div>
            </Accordion.Collapse>
          </div>
        </Accordion>
        <Map
          centerAroundCurrentLocation
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: 48.856614,
            lng: 2.3522219
          }}
        >
          {this.displayMarkers()}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
              <p>Available Bikes:  {this.state.selectedPlace.availableBikes}</p>
              <p>Available Space:  {this.state.selectedPlace.emptySlots}</p>
            </div>
          </InfoWindow>
          <div>
            <div style={style} ref="map">
              Loading map...
            </div>
            {this.renderChildren()}
          </div>
        </Map>
      </div>

    );
  }
}

MapContainer.defaultProps = {
  zoom: 14,
  initialCenter: {
    lat: 48.856614,
    lng: 2.3522219
  },
  centerAroundCurrentLocation: false,
  visible: true
};



export default GoogleApiWrapper({
  apiKey: 'AIzaSyAMEzFrubmy2ZyHNFuzYe3ewdPbWiMcGCE'
})(MapContainer);