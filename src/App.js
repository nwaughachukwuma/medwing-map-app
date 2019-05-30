import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuIcon from "@material-ui/icons/Place";
import {
  GoogleMap,
  LoadScript,
  MarkerClusterer,
  Marker,
  OverlayView,
  Polygon
} from "@react-google-maps/api";
import "./App.css";
import { API_KEY } from "./utils/config";
import { styles } from "./plugins/material-ui/styles";
import Swal from "sweetalert2";
import {
  fetchDataFromServer,
  storeLocation,
  editLocation,
  deleteLocation
} from "./utils/api";
import { searchQuery } from "./utils/helper";

const delta = 0.0522;
let viewportheight = 1024;
if (typeof window.innerWidth !== "undefined") {
  // viewportwidth = window.innerWidth;
  viewportheight = window.innerHeight;
}

export class MapHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapZoom: 8,
      markerName: "",
      addPlace: false,
      query: "",
      coords: {},
      location: {},
      currentMarker: {
        lat: null,
        lng: null,
        title: "Marker title",
        index: null
      },
      places: []
    };
  }

  polygonOptions = {
    fillColor: "tranparent",
    fillOpacity: 0.1,
    strokeColor: "red",
    strokeOpacity: 1,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    geodesic: false,
    zIndex: 1
  };

  componentDidMount = async () => {
    if (API_KEY.length < 38) {
      Swal.fire({
        type: "info",
        title: "Invalid API Key",
        text: "Enter your API key in the src/utils/config file"
      });
    }
    fetchDataFromServer().then(result =>
      this.setState(prevState => ({
        places: [...prevState.places, ...result.markers]
      }))
    );
    this.initLocation();
  };

  initLocation = async () => {
    // use browser navigator object to get user's current location
    navigator.geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        if (!latitude && !longitude) {
          // if browser navigation does not return accurate location info.
          // use a third party solution to get an approximate location
          fetch("https://ipapi.co/json/")
            .then(response => response.json())
            .then(responseJson =>
              this.setState({
                coords: responseJson
              })
            )
            .catch(error => Promise.reject(error));
        } else {
          return this.setState({ coords: position.coords });
        }
      },
      () => {
        // navigator error: not supported or something went wrong
        fetch("https://ipapi.co/json/")
          .then(response => response.json())
          .then(responseJson =>
            this.setState({
              coords: responseJson
            })
          )
          .catch(_ =>
            Swal.fire({
              type: "warning",
              title: "GPS service down!",
              text: "Cannot get your location at this time"
            })
          );
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      if (prevState.places !== this.state.places) {
        // this.setState(prevState => ({
        //   places: [...prevState.places, this.state.location]
        // }));
      }
    }
  }

  toggleAddPlace = () =>
    this.setState(prevState => ({ addPlace: !prevState.addPlace }));

  handleChange = item => val => {
    switch (item) {
      case "marker_name":
        this.setState({ markerName: val.target.value });
        break;
      case "location":
        this.setState({ query: val.target.value });
        break;
      default:
        break;
    }
  };

  addPlaceWithMarker = async e => {
    e.preventDefault();
    searchQuery(this.state.query).then(async result => {
      // save on the server
      await storeLocation(result)
        .then(response => {
          const newMarkerPoint = response.success.marker;
          this.setState(prevState => ({
            coords: {
              ...prevState.coords,
              latitude: newMarkerPoint.lat,
              longitude: newMarkerPoint.lng
            },
            places: [...prevState.places, newMarkerPoint],
            currentMarker: {
              ...result,
              index: prevState.places.length
            },
            query: "",
            mapZoom: 12
          }));
        })
        .catch(_ =>
          Swal.fire({
            type: "error",
            title: "Error Saving location",
            text: "Something went wrong. Try adding a new location"
          })
        );
    });
  };

  editPlaceWithMarker = async e => {
    const {
      markerName,
      currentMarker: { index, lat, lng }
    } = this.state;
    if (!index && !(lat || lng)) {
      Swal.fire({
        type: "warning",
        title: "Oops!",
        text: "Click on a marker before editing..."
      });
      return null;
    }
    if (markerName.length < 3) {
      Swal.fire({
        type: "warning",
        title: "Oops!",
        text: "Enter a valid edit title for place..."
      });
      return null;
    }

    let places = Object.assign([], this.state.places);
    const editPlace = places.slice(index, index + 1);
    places.splice(index, 1);
    await this.setState({ query: markerName, places: places, addPlace: false });
    searchQuery(this.state.query).then(async result => {
      // update on the server
      await editLocation(editPlace[0].id, result)
        .then(response => {
          const newMarkerPoint = response.success.marker;
          this.setState(prevState => ({
            coords: {
              ...prevState.coords,
              latitude: newMarkerPoint.lat,
              longitude: newMarkerPoint.lng
            },
            places: [...prevState.places, newMarkerPoint],
            currentMarker: { ...result, index: index },
            query: "",
            markerName: ""
          }));
        })
        .catch(_ =>
          Swal.fire({
            type: "error",
            title: "Error updating location",
            text: "Something went wrong."
          })
        );
    });
  };

  deletePlaceWithMarker = async e => {
    const {
      currentMarker: { index, lat, lng }
    } = this.state;
    if (!index && !(lat || lng)) {
      Swal.fire({
        type: "warning",
        title: "Oops!",
        text: "Add and click on a place before deleting..."
      });
      return;
    }

    let places = Object.assign([], this.state.places);
    const deletePlace = places.slice(index, index + 1);
    if (!deletePlace[0]) {
      Swal.fire({
        type: "warning",
        title: "Oops!",
        text: "Click on a place before deleting..."
      });
      return;
    }
    places.splice(index, 1);
    // delete on the serve
    await deleteLocation(deletePlace[0].id)
      .then(response => {
        this.setState({
          currentMarker: {
            ...places[places.length ? places.length - 1 : 0],
            index: places.length ? places.length - 1 : 0
          },
          places: [...response.success.markers]
        });
      })
      .catch(_ =>
        Swal.fire({
          type: "error",
          title: "Error deleting location",
          text: "Something went wrong."
        })
      );
  };

  render() {
    const { classes } = this.props;
    const {
      addPlace,
      query,
      coords,
      currentMarker,
      places,
      markerName,
      mapZoom
    } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton
              // onClick={this.toggleDrawer}
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              MedWing App
            </Typography>
          </Toolbar>
        </AppBar>

        <div className="map-row">
          <div className="map-container">
            <LoadScript
              id="script-loader"
              googleMapsApiKey={API_KEY}
              onError={error => {
                console.log(error);
              }}
            >
              <GoogleMap
                id="map-component"
                onLoad={map => {
                  // const bounds = new window.google.maps.LatLngBounds();
                  // map.fitBounds(bounds);
                }}
                ref={ref => (this.mapRef = ref)}
                onUnmount={map => {
                  // do your stuff before map is unmounted
                }}
                mapContainerClassName="map-element"
                mapContainerStyle={{
                  height: "550px",
                  width: "100%"
                }}
                onZoomChanged={() => {
                  console.log("zoom changed");
                }}
                clickableIcons={true}
                onDragEnd={() => {
                  // console.log("map dragged");
                }}
                zoom={mapZoom}
                center={{
                  lat: parseFloat(coords.latitude),
                  lng: parseFloat(coords.longitude)
                }}
              >
                <OverlayView
                  position={{
                    lat: parseFloat(currentMarker.lat) + delta,
                    lng: parseFloat(currentMarker.lng) - delta / viewportheight
                  }}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                  <div
                    style={{
                      background: `white`,
                      border: `1px solid #ccc`,
                      padding: 15,
                      marginLeft: 10,
                      marginTop: 20
                    }}
                  >
                    <Typography component="p">
                      {currentMarker.lat
                        ? currentMarker.title
                        : "click on a marker"}
                    </Typography>
                  </div>
                </OverlayView>
                <Polygon
                  onLoad={polygon => {
                    // console.log("polygon: ", polygon);
                  }}
                  paths={[
                    {
                      lat: currentMarker.lat + 0.05,
                      lng: currentMarker.lng + 0.05
                    },
                    {
                      lat: currentMarker.lat + 0.05,
                      lng: currentMarker.lng - 0.05
                    },
                    {
                      lat: currentMarker.lat - 0.05,
                      lng: currentMarker.lng - 0.05
                    },
                    {
                      lat: currentMarker.lat - 0.05,
                      lng: currentMarker.lng + 0.05
                    }
                  ]}
                  options={this.polygonOptions}
                />
                <MarkerClusterer
                  gridSize={10}
                  options={{
                    imagePath:
                      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
                  }}
                >
                  {clusterer =>
                    places.map((location, i) => (
                      <Marker
                        clickable={true}
                        onClick={_ => {
                          this.setState({
                            coords: {
                              ...coords,
                              latitude: places[i].lat,
                              longitude: places[i].lng
                            },
                            currentMarker: {
                              ...places[i],
                              index: i
                            }
                          });
                        }}
                        onLoad={marker => {
                          // console.log(marker)
                        }}
                        // onMouseOver={e => {
                        // }}
                        title={location.title}
                        key={i}
                        position={{ lat: location.lat, lng: location.lng }}
                        clusterer={clusterer}
                      />
                    ))
                  }
                </MarkerClusterer>
              </GoogleMap>

              {addPlace ? (
                <div
                  style={{
                    background: `white`,
                    border: `1px solid #ccc`,
                    padding: 15
                  }}
                  className="overlay-component"
                >
                  <span className="overlay-header">
                    <h3>Add location</h3>
                    <button
                      onClick={this.toggleAddPlace}
                      type="button"
                      className="overlay-header-button"
                    >
                      X
                    </button>
                  </span>
                  <form onSubmit={this.addPlaceWithMarker}>
                    <TextField
                      id="search-location"
                      label="Location"
                      onKeyPress={e => {
                        e.stopPropagation();
                        if (e.which === 13) {
                          return this.addPlaceWithMarker(e);
                        }
                      }}
                      className={classes.textField}
                      value={query}
                      helperText="enter a valid address"
                      onChange={this.handleChange("location")}
                      margin="normal"
                      variant="outlined"
                    />
                    <br />
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className={classes.addButton}
                      // onClick={addPlaceWithMarker}
                    >
                      Add
                    </Button>
                  </form>
                </div>
              ) : (
                <div />
              )}
            </LoadScript>
          </div>
          <div className="map-editor-container">
            <Paper className="editor-container" elevation={1}>
              <Button
                variant="outlined"
                onClick={this.toggleAddPlace}
                color="primary"
                className={classes.button}
              >
                Add place
              </Button>
              <Divider />
              <Typography variant="h6" component="h4">
                {currentMarker.title}
              </Typography>

              <form>
                <TextField
                  id="edit-marker-name"
                  label="Marker name"
                  className={classes.textField}
                  value={markerName}
                  helperText="change the marker title"
                  onChange={this.handleChange("marker_name")}
                  margin="normal"
                  variant="outlined"
                />
                <br />
                <div className="marker-label-section ">
                  <label>Latitude: </label>
                  <label>
                    {currentMarker.lat && currentMarker.lat.toFixed(6)}
                  </label>
                  <br />
                  <label>Longitude: </label>
                  <label>
                    {currentMarker.lng && currentMarker.lng.toFixed(6)}{" "}
                  </label>
                </div>
                <br />
                <span className="edit-marker-section">
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={this.editPlaceWithMarker}
                  >
                    Edit
                  </Button>
                  Or
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={this.deletePlaceWithMarker}
                  >
                    Delete
                  </Button>
                </span>
              </form>
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}

MapHome.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MapHome);
