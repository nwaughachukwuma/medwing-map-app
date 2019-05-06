import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuIcon from "@material-ui/icons/Menu";
import {
  GoogleMap,
  LoadScript,
  MarkerClusterer,
  Marker,
  OverlayView
} from "@react-google-maps/api";
import "./App.css";
import { API_KEY } from "./utils/config";
import { latLng } from "./utils/mock";
import { SideList } from "./utils/navigation";
import { styles } from "./plugins/material-ui/styles";
import Swal from "sweetalert2";

export class MapHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawer: false,
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
      places: latLng
    };
  }

  toggleDrawer = open =>
    this.setState(prevState => ({ drawer: !prevState.drawer }));
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

  componentDidMount() {
    this.initLocation();
  }

  initLocation = () => {
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
        this.setState(prevState => ({
          places: [...prevState.places, this.state.location]
        }));
      }
    }
  }

  computeGeoCoord = async () => {
    const { query } = this.state;
    if (query.length < 3) {
      Swal.fire({
        type: "warning",
        title: "Oops!",
        text: "Enter a valid location..."
      });
      return null;
    }
    const new_query = query.replace(/\s/g, "+");
    try {
      return await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${new_query}&key=${API_KEY}`
      )
        .then(response => response.json())
        .then(responseJson => {
          const {
            formatted_address,
            geometry: { location }
          } = responseJson.results[0];
          const markerPoint = { ...location, title: formatted_address };
          this.setState(prevState => ({
            coords: {
              ...prevState.coords,
              ...location
            },
            location: markerPoint,
            places: [...prevState.places, markerPoint]
          }));
          return markerPoint;
        })
        // throw new Error(error);
        .catch(error => Promise.reject(error));
    } catch (error) {
      Swal.fire({
        type: "warning",
        title: "Oops!",
        text:
          "Status: The request did not encounter any error but returned no result"
      });
    }
  };

  addPlaceWithMarker = async e => {
    e.preventDefault();
    this.computeGeoCoord().then(result =>
      this.setState(prevState => ({
        currentMarker: {
          ...result,
          index: prevState.places.length
        },
        query: ""
      }))
    );
  };

  editPlaceWithMarker = async e => {
    const { index } = this.state.currentMarker;
    if (!index) {
      Swal.fire({
        type: "warning",
        title: "Oops!",
        text: "Click on a marker before editing..."
      });
      return;
    }
    if (this.state.markerName.length < 3) {
      Swal.fire({
        type: "warning",
        title: "Oops!",
        text: "Enter a valid title for marker..."
      });
      return null;
    }
    this.state.places.splice(index, 1);
    this.computeGeoCoord().then(result =>
      this.setState({ currentMarker: { ...result, index: index } })
    );
  };

  deletePlaceWithMarker = async e => {
    const { index } = this.state.currentMarker;
    if (!index) {
      Swal.fire({
        type: "warning",
        title: "Oops!",
        text: "Add and click on a place before deleting..."
      });
      return;
    }
    let places = Object.assign([], this.state.places);
    // this.state.places.splice(index, 1);
    places.splice(index, 1);
    this.setState(prevState => ({
      currentMarker: {
        ...prevState.places[index],
        index: index > 0 ? index - 1 : 0
      },
      places: places
    }));
  };

  render() {
    const { classes } = this.props;
    const {
      addPlace,
      query,
      drawer,
      coords,
      currentMarker,
      places,
      markerName
    } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton
              onClick={this.toggleDrawer}
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
        <Drawer
          anchor="left"
          open={drawer}
          onClose={() => this.setState({ drawer: false })}
        >
          <div tabIndex={0} role="button">
            <SideList classes={classes} />
          </div>
        </Drawer>

        <div className="map-row">
          <div className="map-container">
            <LoadScript id="script-loader" googleMapsApiKey={API_KEY}>
              <GoogleMap
                id="map-component"
                onLoad={map => {
                  // const bounds = new window.google.maps.LatLngBounds();
                  // map.fitBounds(bounds);
                }}
                onUnmount={map => {
                  // do your stuff before map is unmounted
                }}
                mapContainerClassName="map-element"
                mapContainerStyle={{
                  height: "550px",
                  width: "100%"
                }}
                clickableIcons={true}
                onClick={e => {
                  // console.log("map clicked:", e, coords);
                  this.setState(prevState => ({
                    coords: {
                      ...coords,
                      ...currentMarker
                    }
                  }));
                }}
                onDragEnd={() => {
                  console.log("map dragged");
                }}
                zoom={7}
                center={{
                  lat: parseFloat(coords.latitude),
                  lng: parseFloat(coords.longitude)
                }}
              >
                <OverlayView
                  position={{
                    lat: parseFloat(currentMarker.lat),
                    lng: parseFloat(currentMarker.lng)
                  }}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                  <div
                    style={{
                      background: `white`,
                      border: `1px solid #ccc`,
                      padding: 15
                    }}
                  >
                    <Typography variant="h6" component="p">
                      {currentMarker.lat
                        ? currentMarker.title
                        : "click on a marker"}
                    </Typography>
                    <Typography component="h5">
                      {currentMarker.lat && `Lat: ${currentMarker.lat}`}
                    </Typography>
                    <Typography component="h5">
                      {currentMarker.lng && `Lng: ${currentMarker.lng}`}
                    </Typography>
                  </div>
                </OverlayView>
                <MarkerClusterer
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
                              ...places[i]
                            },
                            currentMarker: {
                              ...places[i],
                              index: i
                            }
                          });
                        }}
                        onLoad={marker => {
                          // console.log('marker: ', marker)
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
                {/* <div className="marker-label-section ">
                  <label>Location: </label>
                  <label>{currentMarker.title} </label>
                  <br />
                  <label>Latitude: </label>
                  <label>{currentMarker.lat} </label>
                  <br />
                  <label>Longitude: </label>
                  <label>{currentMarker.lng} </label>
                </div> */}
                {/* <br /> */}
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
