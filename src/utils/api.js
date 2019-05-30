import Swal from "sweetalert2";

export const fetchConfig = function() {
  // Default options are marked with *
  return {
    method: "GET", // POST
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "text/json;charset=UTF-8" // "application/json"
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer" // no-referrer, *client
  };
};

export const fetchDataFromServer = () => {
  return fetch("https://medwing-app.herokuapp.com/api/markers", fetchConfig)
    .then(response => response.json())
    .then(result => result)
    .catch(_ =>
      Swal.fire({
        type: "error",
        title: "Something went wrong!",
        text: "Cannot connect to the server at this point"
      })
    );
};

export const storeLocation = (data = {}) => {
  // save on the server...
  return fetch("https://medwing-app.herokuapp.com/api/marker", {
    ...fetchConfig,
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(result => result)
    .catch(error => {
      console.log(error.response);
      return Swal.fire({
        type: "error",
        title: "Something went wrong!",
        text: "Cannot connect to the server at this point"
      });
    });
};

export const editLocation = (id, data = {}) => {
  // edit location on the server...
  return fetch(`https://medwing-app.herokuapp.com/api/marker/${id}`, {
    ...fetchConfig,
    method: "PUT",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(result => result)
    .catch(error => {
      console.log(error.response);
      return Swal.fire({
        type: "error",
        title: "Something went wrong!",
        text: "Cannot connect to the server at this point"
      });
    });
};

export const deleteLocation = id => {
  // delete location on the server...
  return fetch(`https://medwing-app.herokuapp.com/api/marker/${id}`, {
    ...fetchConfig,
    method: "DELETE"
  })
    .then(response => response.json())
    .then(result => result)
    .catch(error => {
      console.log(error.response);
      return Swal.fire({
        type: "error",
        title: "Something went wrong!",
        text: "Cannot connect to the server at this point"
      });
    });
};

export default fetchConfig;
