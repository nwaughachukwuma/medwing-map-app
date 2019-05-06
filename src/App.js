import React, { useState, useEffect } from "react";
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
  OverlayView,
  InfoWindow
} from "@react-google-maps/api";
import "./App.css";
import { API_KEY } from "./utils/config";
import { dummyLatLng } from "./utils/mock";
import { SideList } from "./utils/navigation";
import { styles } from "./plugins/material-ui/styles";

function DenseAppBar(props) {
  const { classes } = props;

  const [drawer, setDrawer] = useState(false);
  const [markerName, setMarkerName] = useState("");
  const [addPlace, setAddPlace] = useState(false);
  const [query, setQuery] = useState("");
  const [coords, setCoords] = useState({});
  const [location, setLocation] = useState({});
  const [infoWindow, setInfoWindow] = useState(undefined);
  let searchBox = null;

  const toggleDrawer = open => {
    setDrawer(!drawer);
  };

  const toggleAddPlace = () => {
    setAddPlace(!addPlace);
  };

  const handleChange = item => val => {
    console.log(item);
    switch (item) {
      case "marker_name":
        setMarkerName(val.target.value);
        break;
      case "location":
        setQuery(val.target.value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // use browser navigator object to get user's current location
    navigator.geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        if (!latitude && !longitude) {
          // if browser navigation does not return accurate location info.
          // use a third party solution to get an approximate location
          fetch("https://ipapi.co/json/")
            .then(response => response.json())
            .then(responseJson => {
              setCoords({
                ...coords,
                ...responseJson
              });
            })
            .catch(error => Promise.reject(error));
        } else {
          setCoords(position.coords);
        }
      },
      () => {
        // navigator error: not supported or something went wrong
        fetch("https://ipapi.co/json/")
          .then(response => response.json())
          .then(responseJson => {
            setCoords({
              ...coords,
              ...responseJson
            });
          })
          .catch(_ =>
            alert("GPS service down!, Cannot get your location at this time")
          );
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const computeGeoCoord = async () => {
    console.log(query);
    if (query.length < 3) {
      alert("Enter a valid location");
      return;
    }
    const new_query = query.replace(/\s/g, "+");
    try {
      await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${new_query}&key=${API_KEY}`
      )
        .then(response => response.json())
        .then(responseJson => {
          const { location } = responseJson.results[0].geometry;
          setLocation(location);
          console.log("new location: ", location);
        })
        .catch(error => {
          Promise.reject("ERROR FETCHING LOCATION with error: " + error);
        });
    } catch (error) {
      Promise.reject(error).then(
        resolved => resolved,
        rejected =>
          alert("Location Error! Returned with a message: " + rejected)
      );
    }
  };

  const addPlaceWithMarker = e => {
    e.preventDefault();
    computeGeoCoord();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            onClick={toggleDrawer}
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
      <Drawer anchor="left" open={drawer} onClose={() => setDrawer(false)}>
        <div tabIndex={0} role="button">
          <SideList classes={classes} />
          {/* {sideList} */}
        </div>
      </Drawer>

      <div className="map-row">
        <div className="map-container">
          <LoadScript id="script-loader" googleMapsApiKey={API_KEY}>
            <GoogleMap
              id="circle-example"
              // onLoad={map => {
              //   const bounds = new window.google.maps.LatLngBounds();
              //   map.fitBounds(bounds);
              // }}
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
              <MarkerClusterer
                options={{
                  imagePath:
                    "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
                }}
              >
                {clusterer =>
                  dummyLatLng.map((location, i) => (
                    <Marker
                      clickable={true}
                      title="marker title"
                      onClick={e => {
                        // console.log('click: ', e)
                      }}
                      onLoad={marker => {
                        // console.log('marker: ', marker)
                      }}
                      key={i}
                      position={location}
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
                    onClick={toggleAddPlace}
                    type="button"
                    className="overlay-header-button"
                  >
                    X
                  </button>
                </span>
                <form onSubmit={addPlaceWithMarker}>
                  <TextField
                    id="search-location"
                    label="Location"
                    className={classes.textField}
                    value={query}
                    helperText="enter a valid address"
                    onChange={handleChange("location")}
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
              onClick={toggleAddPlace}
              color="primary"
              className={classes.button}
            >
              Add place
            </Button>
            <Divider />
            <Typography variant="h5" component="h3">
              Marker title
            </Typography>

            <form>
              <TextField
                id="edit-marker-name"
                label="Marker name"
                className={classes.textField}
                value={markerName}
                helperText="change the marker title"
                onChange={handleChange("marker_name")}
                margin="normal"
                variant="outlined"
              />
              <br />
              <div className="marker-label-section ">
                <label>Location: </label>
                <label>marker title </label>
                <br />
                <label>Latitude: </label>
                <label>Latitude </label>
                <br />
                <label>Longitude: </label>
                <label>Latitude </label>
              </div>
              <br />
              <span className="edit-marker-section">
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Edit
                </Button>
                Or
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
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

DenseAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DenseAppBar);
