import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuIcon from "@material-ui/icons/Menu";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import {
  GoogleMap,
  LoadScript,
  MarkerClusterer,
  Marker
} from "@react-google-maps/api";
import "./App.css";

const styles = theme => ({
  root: {
    // ...theme.mixins.gutters(),
    // paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5
  },
  addButton: {
    marginBottom: 10,
    marginTop: "4vh"
  }
});

function DenseAppBar(props) {
  const { classes } = props;

  const [drawer, setDrawer] = useState(false);
  const [markerName, setMarkerName] = useState("");
  const [addPlace, setAddPlace] = useState(false);

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

  const sideList = (
    <div className={classes.list}>
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

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
          {sideList}
        </div>
      </Drawer>

      <div className="map-row">
        <div className="map-container">
          <LoadScript
            id="script-loader"
            googleMapsApiKey="AIzaSyCJ8s34KdxkerYrGB9A5edmHsqCe50ab2s"
          >
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
              zoom={7}
              center={{
                lat: 9.745,
                lng: 7.523
              }}
            >
              <MarkerClusterer
                options={{
                  imagePath:
                    "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
                }}
              >
                {clusterer =>
                  [
                    { lat: -31.56391, lng: 147.154312 },
                    { lat: -33.718234, lng: 150.363181 },
                    { lat: -33.727111, lng: 150.371124 },
                    { lat: -33.848588, lng: 151.209834 },
                    { lat: -33.851702, lng: 151.216968 },
                    { lat: -34.671264, lng: 150.863657 },
                    { lat: -35.304724, lng: 148.662905 },
                    { lat: -36.817685, lng: 175.699196 },
                    { lat: -36.828611, lng: 175.790222 },
                    { lat: -37.75, lng: 145.116667 },
                    { lat: -37.759859, lng: 145.128708 },
                    { lat: -37.765015, lng: 145.133858 },
                    { lat: -37.770104, lng: 145.143299 },
                    { lat: -37.7737, lng: 145.145187 },
                    { lat: -37.774785, lng: 145.137978 },
                    { lat: -37.819616, lng: 144.968119 },
                    { lat: -38.330766, lng: 144.695692 },
                    { lat: -39.927193, lng: 175.053218 },
                    { lat: -41.330162, lng: 174.865694 },
                    { lat: -42.734358, lng: 147.439506 },
                    { lat: -42.734358, lng: 147.501315 },
                    { lat: -42.735258, lng: 147.438 },
                    { lat: -43.999792, lng: 170.463352 }
                  ].map((location, i) => (
                    <Marker key={i} position={location} clusterer={clusterer} />
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
              <br />
              <Typography component="p">Add a new place to the map</Typography>
              <form>
                <TextField
                  id="add-marker-name"
                  label="Marker name"
                  className={classes.textField}
                  value={markerName}
                  defaultValue="Marker name"
                  onChange={handleChange("marker_name")}
                  margin="normal"
                  variant="outlined"
                />
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Add
                </Button>
              </form>
            </div>
            <br />
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
