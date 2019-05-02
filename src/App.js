import React, { useState } from "react";
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
import { dummyLatLng } from "./utils/mock";
import { SideList } from "./utils/navigation";
import { styles } from "./plugins/material-ui/styles";

function DenseAppBar(props) {
  const { classes } = props;

  const [drawer, setDrawer] = useState(false);
  const [markerName, setMarkerName] = useState("");
  const [addPlace, setAddPlace] = useState(false);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState({});
  let searchBox = null;

  const toggleDrawer = open => {
    setDrawer(!drawer);
  };

  const toggleAddPlace = () => {
    setAddPlace(!addPlace);
  };

  const handleChange = item => val => {
    switch (item) {
      case "marker_name":
        setMarkerName(val.target.value);
        break;
      default:
        break;
    }
  };

  const computeGeoCoord = async () => {
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
              onLoad={map => {
                const bounds = new window.google.maps.LatLngBounds();
                map.fitBounds(bounds);
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
                console.log("map clicked:", e);
              }}
              onDragEnd={e => {
                console.log("map dragged", e);
              }}
              zoom={7}
              center={{
                lat: 9.076,
                lng: 7.398
              }}
            >
              <OverlayView
                position={{
                  lat: 35.772,
                  lng: -120.214
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
                  <h1>OverlayView</h1>
                  <button
                    onClick={() => {
                      console.info("I have been clicked!");
                    }}
                    type="button"
                  >
                    Click me
                  </button>
                </div>
              </OverlayView>
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
            <div
              className={`${
                addPlace ? "show-add-new-marker" : "hide-add-new-marker"
              }`}
            >
              <Divider />
              <Typography component="p">Add a new place to the map</Typography>
              <form>
                <TextField
                  id="add-marker-name"
                  label="Marker name"
                  className={classes.textField}
                  value={markerName}
                  helperText="enter a valid location"
                  onChange={handleChange("marker_name")}
                  margin="normal"
                  variant="outlined"
                />
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.addButton}
                >
                  Add
                </Button>
              </form>
            </div>
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
