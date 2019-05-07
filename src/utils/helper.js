import Swal from "sweetalert2";
import { API_KEY } from "./config";

export const latLng = [
  { lat: -31.56391, lng: 147.154312, title: "Some place" },
  { lat: -33.718234, lng: 150.363181, title: "Some place" },
  { lat: -33.727111, lng: 150.371124, title: "Some place" },
  { lat: -33.848588, lng: 151.209834, title: "Some place" },
  { lat: -33.851702, lng: 151.216968, title: "Some place" },
  { lat: -34.671264, lng: 150.863657 },
  { lat: -35.304724, lng: 148.662905 }
];

export const searchQuery = async query => {
  if (query.length < 3) {
    return Swal.fire({
      type: "warning",
      title: "Oops!",
      text: "Enter a valid location..."
    });
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
        return markerPoint;
      })
      // throw new Error(error);
      .catch(error => Promise.reject(error));
  } catch (error) {
    return Swal.fire({
      type: "warning",
      title: "Oops!",
      text:
        "Status: The request did not encounter any error but returned no result"
    });
  }
};

export default searchQuery;
