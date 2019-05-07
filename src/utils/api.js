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

export default fetchConfig;
