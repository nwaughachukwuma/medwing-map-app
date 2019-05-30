(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  {
    107: function(e, t, n) {
      e.exports = n(284);
    },
    112: function(e, t, n) {},
    144: function(e, t, n) {},
    284: function(e, t, n) {
      
      n.r(t);
      var a = n(0),
        r = n.n(a),
        o = n(19),
        c = n.n(o),
        i = (n(112), n(20)),
        l = n(16),
        s = n.n(l),
        u = n(31),
        p = n(21),
        d = n(96),
        m = n(97),
        h = n(105),
        f = n(98),
        g = n(106),
        b = n(57),
        k = n(99),
        v = n.n(k),
        y = n(101),
        w = n.n(y),
        E = n(104),
        x = n.n(E),
        O = n(42),
        j = n.n(O),
        S = n(43),
        C = n.n(S),
        P = n(102),
        N = n.n(P),
        M = n(34),
        A = n.n(M),
        T = n(58),
        L = n.n(T),
        W = n(103),
        q = n.n(W),
        B = n(25),
        F = (n(144), "AIzaSyCJ8s34KdxkerYrGB9A5edmHsqCe50ab2s"),
        I = n(18),
        R = n.n(I),
        D = function() {
          return {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: { "Content-Type": "text/json;charset=UTF-8" },
            redirect: "follow",
            referrer: "no-referrer"
          };
        },
        G = function() {
          return fetch("https://medwing-app.herokuapp.com/api/markers", D)
            .then(function(e) {
              return e.json();
            })
            .then(function(e) {
              return e;
            })
            .catch(function(e) {
              return R.a.fire({
                type: "error",
                title: "Something went wrong!",
                text: "Cannot connect to the server at this point"
              });
            });
        },
        z = function() {
          var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return fetch(
            "https://medwing-app.herokuapp.com/api/marker",
            Object(i.a)({}, D, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(e)
            })
          )
            .then(function(e) {
              return e.json();
            })
            .then(function(e) {
              return e;
            })
            .catch(function(e) {
              return (
                console.log(e.response),
                R.a.fire({
                  type: "error",
                  title: "Something went wrong!",
                  text: "Cannot connect to the server at this point"
                })
              );
            });
        },
        J = function(e) {
          var t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          return fetch(
            "https://medwing-app.herokuapp.com/api/marker/".concat(e),
            Object(i.a)({}, D, {
              method: "PUT",
              headers: { "Content-Type": "application/json; charset=utf-8" },
              body: JSON.stringify(t)
            })
          )
            .then(function(e) {
              return e.json();
            })
            .then(function(e) {
              return e;
            })
            .catch(function(e) {
              return (
                console.log(e.response),
                R.a.fire({
                  type: "error",
                  title: "Something went wrong!",
                  text: "Cannot connect to the server at this point"
                })
              );
            });
        },
        U = function(e) {
          return fetch(
            "https://medwing-app.herokuapp.com/api/marker/".concat(e),
            Object(i.a)({}, D, { method: "DELETE" })
          )
            .then(function(e) {
              return e.json();
            })
            .then(function(e) {
              return e;
            })
            .catch(function(e) {
              return (
                console.log(e.response),
                R.a.fire({
                  type: "error",
                  title: "Something went wrong!",
                  text: "Cannot connect to the server at this point"
                })
              );
            });
        },
        _ = (function() {
          var e = Object(p.a)(
            s.a.mark(function e(t) {
              var n;
              return s.a.wrap(
                function(e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (!(t.length < 3)) {
                          e.next = 2;
                          break;
                        }
                        return e.abrupt(
                          "return",
                          R.a.fire({
                            type: "warning",
                            title: "Oops!",
                            text: "Enter a valid location..."
                          })
                        );
                      case 2:
                        return (
                          (n = t.replace(/\s/g, "+")),
                          (e.prev = 3),
                          (e.next = 6),
                          fetch(
                            "https://maps.googleapis.com/maps/api/geocode/json?address="
                              .concat(n, "&key=")
                              .concat(F)
                          )
                            .then(function(e) {
                              return e.json();
                            })
                            .then(function(e) {
                              var t = e.results[0],
                                n = t.formatted_address,
                                a = t.geometry.location;
                              return Object(i.a)({}, a, { title: n });
                            })
                            .catch(function(e) {
                              return Promise.reject(e);
                            })
                        );
                      case 6:
                        return e.abrupt("return", e.sent);
                      case 9:
                        return (
                          (e.prev = 9),
                          (e.t0 = e.catch(3)),
                          e.abrupt(
                            "return",
                            R.a.fire({
                              type: "warning",
                              title: "Oops!",
                              text:
                                "Status: The request did not encounter any error but returned no result"
                            })
                          )
                        );
                      case 12:
                      case "end":
                        return e.stop();
                    }
                },
                e,
                null,
                [[3, 9]]
              );
            })
          );
          return function(t) {
            return e.apply(this, arguments);
          };
        })(),
        K = 1024;
      "undefined" !== typeof window.innerWidth && (K = window.innerHeight);
      var Z = (function(e) {
          function t(e) {
            var n;
            return (
              Object(d.a)(this, t),
              ((n = Object(h.a)(
                this,
                Object(f.a)(t).call(this, e)
              )).polygonOptions = {
                fillColor: "tranparent",
                fillOpacity: 0.1,
                strokeColor: "red",
                strokeOpacity: 1,
                strokeWeight: 2,
                clickable: !1,
                draggable: !1,
                editable: !1,
                geodesic: !1,
                zIndex: 1
              }),
              (n.componentDidMount = Object(p.a)(
                s.a.mark(function e() {
                  return s.a.wrap(function(e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          F.length < 38 &&
                            R.a.fire({
                              type: "info",
                              title: "Invalid API Key",
                              text:
                                "Enter your API key in the src/utils/config file"
                            }),
                            G().then(function(e) {
                              return n.setState(function(t) {
                                return {
                                  places: [].concat(
                                    Object(u.a)(t.places),
                                    Object(u.a)(e.markers)
                                  )
                                };
                              });
                            }),
                            n.initLocation();
                        case 3:
                        case "end":
                          return e.stop();
                      }
                  }, e);
                })
              )),
              (n.initLocation = Object(p.a)(
                s.a.mark(function e() {
                  return s.a.wrap(function(e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          navigator.geolocation.getCurrentPosition(
                            (function() {
                              var e = Object(p.a)(
                                s.a.mark(function e(t) {
                                  var a, r, o;
                                  return s.a.wrap(function(e) {
                                    for (;;)
                                      switch ((e.prev = e.next)) {
                                        case 0:
                                          if (
                                            ((a = t.coords),
                                            (r = a.latitude),
                                            (o = a.longitude),
                                            r || o)
                                          ) {
                                            e.next = 5;
                                            break;
                                          }
                                          fetch("https://ipapi.co/json/")
                                            .then(function(e) {
                                              return e.json();
                                            })
                                            .then(function(e) {
                                              return n.setState({ coords: e });
                                            })
                                            .catch(function(e) {
                                              return Promise.reject(e);
                                            }),
                                            (e.next = 6);
                                          break;
                                        case 5:
                                          return e.abrupt(
                                            "return",
                                            n.setState({ coords: t.coords })
                                          );
                                        case 6:
                                        case "end":
                                          return e.stop();
                                      }
                                  }, e);
                                })
                              );
                              return function(t) {
                                return e.apply(this, arguments);
                              };
                            })(),
                            function() {
                              fetch("https://ipapi.co/json/")
                                .then(function(e) {
                                  return e.json();
                                })
                                .then(function(e) {
                                  return n.setState({ coords: e });
                                })
                                .catch(function(e) {
                                  return R.a.fire({
                                    type: "warning",
                                    title: "GPS service down!",
                                    text:
                                      "Cannot get your location at this time"
                                  });
                                });
                            },
                            {
                              enableHighAccuracy: !0,
                              timeout: 2e4,
                              maximumAge: 1e3
                            }
                          );
                        case 1:
                        case "end":
                          return e.stop();
                      }
                  }, e);
                })
              )),
              (n.toggleAddPlace = function() {
                return n.setState(function(e) {
                  return { addPlace: !e.addPlace };
                });
              }),
              (n.handleChange = function(e) {
                return function(t) {
                  switch (e) {
                    case "marker_name":
                      n.setState({ markerName: t.target.value });
                      break;
                    case "location":
                      n.setState({ query: t.target.value });
                  }
                };
              }),
              (n.addPlaceWithMarker = (function() {
                var e = Object(p.a)(
                  s.a.mark(function e(t) {
                    return s.a.wrap(function(e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            t.preventDefault(),
                              _(n.state.query).then(
                                (function() {
                                  var e = Object(p.a)(
                                    s.a.mark(function e(t) {
                                      return s.a.wrap(function(e) {
                                        for (;;)
                                          switch ((e.prev = e.next)) {
                                            case 0:
                                              return (
                                                (e.next = 2),
                                                z(t)
                                                  .then(function(e) {
                                                    var a = e.success.marker;
                                                    n.setState(function(e) {
                                                      return {
                                                        coords: Object(i.a)(
                                                          {},
                                                          e.coords,
                                                          {
                                                            latitude: a.lat,
                                                            longitude: a.lng
                                                          }
                                                        ),
                                                        places: [].concat(
                                                          Object(u.a)(e.places),
                                                          [a]
                                                        ),
                                                        currentMarker: Object(
                                                          i.a
                                                        )({}, t, {
                                                          index: e.places.length
                                                        }),
                                                        query: "",
                                                        mapZoom: 12
                                                      };
                                                    });
                                                  })
                                                  .catch(function(e) {
                                                    return R.a.fire({
                                                      type: "error",
                                                      title:
                                                        "Error Saving location",
                                                      text:
                                                        "Something went wrong. Try adding a new location"
                                                    });
                                                  })
                                              );
                                            case 2:
                                            case "end":
                                              return e.stop();
                                          }
                                      }, e);
                                    })
                                  );
                                  return function(t) {
                                    return e.apply(this, arguments);
                                  };
                                })()
                              );
                          case 2:
                          case "end":
                            return e.stop();
                        }
                    }, e);
                  })
                );
                return function(t) {
                  return e.apply(this, arguments);
                };
              })()),
              (n.editPlaceWithMarker = (function() {
                var e = Object(p.a)(
                  s.a.mark(function e(t) {
                    var a, r, o, c, l, d, m, h;
                    return s.a.wrap(function(e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (
                              ((a = n.state),
                              (r = a.markerName),
                              (o = a.currentMarker),
                              (c = o.index),
                              (l = o.lat),
                              (d = o.lng),
                              c || l || d)
                            ) {
                              e.next = 4;
                              break;
                            }
                            return (
                              R.a.fire({
                                type: "warning",
                                title: "Oops!",
                                text: "Click on a marker before editing..."
                              }),
                              e.abrupt("return", null)
                            );
                          case 4:
                            if (!(r.length < 3)) {
                              e.next = 7;
                              break;
                            }
                            return (
                              R.a.fire({
                                type: "warning",
                                title: "Oops!",
                                text: "Enter a valid edit title for place..."
                              }),
                              e.abrupt("return", null)
                            );
                          case 7:
                            return (
                              (m = Object.assign([], n.state.places)),
                              (h = m.slice(c, c + 1)),
                              m.splice(c, 1),
                              (e.next = 12),
                              n.setState({ query: r, places: m, addPlace: !1 })
                            );
                          case 12:
                            _(n.state.query).then(
                              (function() {
                                var e = Object(p.a)(
                                  s.a.mark(function e(t) {
                                    return s.a.wrap(function(e) {
                                      for (;;)
                                        switch ((e.prev = e.next)) {
                                          case 0:
                                            return (
                                              (e.next = 2),
                                              J(h[0].id, t)
                                                .then(function(e) {
                                                  var a = e.success.marker;
                                                  n.setState(function(e) {
                                                    return {
                                                      coords: Object(i.a)(
                                                        {},
                                                        e.coords,
                                                        {
                                                          latitude: a.lat,
                                                          longitude: a.lng
                                                        }
                                                      ),
                                                      places: [].concat(
                                                        Object(u.a)(e.places),
                                                        [a]
                                                      ),
                                                      currentMarker: Object(
                                                        i.a
                                                      )({}, t, { index: c }),
                                                      query: "",
                                                      markerName: ""
                                                    };
                                                  });
                                                })
                                                .catch(function(e) {
                                                  return R.a.fire({
                                                    type: "error",
                                                    title:
                                                      "Error updating location",
                                                    text:
                                                      "Something went wrong."
                                                  });
                                                })
                                            );
                                          case 2:
                                          case "end":
                                            return e.stop();
                                        }
                                    }, e);
                                  })
                                );
                                return function(t) {
                                  return e.apply(this, arguments);
                                };
                              })()
                            );
                          case 13:
                          case "end":
                            return e.stop();
                        }
                    }, e);
                  })
                );
                return function(t) {
                  return e.apply(this, arguments);
                };
              })()),
              (n.deletePlaceWithMarker = (function() {
                var e = Object(p.a)(
                  s.a.mark(function e(t) {
                    var a, r, o, c, l, p;
                    return s.a.wrap(function(e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (
                              ((a = n.state.currentMarker),
                              (r = a.index),
                              (o = a.lat),
                              (c = a.lng),
                              r || o || c)
                            ) {
                              e.next = 4;
                              break;
                            }
                            return (
                              R.a.fire({
                                type: "warning",
                                title: "Oops!",
                                text:
                                  "Add and click on a place before deleting..."
                              }),
                              e.abrupt("return")
                            );
                          case 4:
                            if (
                              ((l = Object.assign([], n.state.places)),
                              (p = l.slice(r, r + 1))[0])
                            ) {
                              e.next = 9;
                              break;
                            }
                            return (
                              R.a.fire({
                                type: "warning",
                                title: "Oops!",
                                text: "Click on a place before deleting..."
                              }),
                              e.abrupt("return")
                            );
                          case 9:
                            return (
                              l.splice(r, 1),
                              (e.next = 12),
                              U(p[0].id)
                                .then(function(e) {
                                  n.setState({
                                    currentMarker: Object(i.a)(
                                      {},
                                      l[l.length ? l.length - 1 : 0],
                                      { index: l.length ? l.length - 1 : 0 }
                                    ),
                                    places: Object(u.a)(e.success.markers)
                                  });
                                })
                                .catch(function(e) {
                                  return R.a.fire({
                                    type: "error",
                                    title: "Error deleting location",
                                    text: "Something went wrong."
                                  });
                                })
                            );
                          case 12:
                          case "end":
                            return e.stop();
                        }
                    }, e);
                  })
                );
                return function(t) {
                  return e.apply(this, arguments);
                };
              })()),
              (n.state = {
                mapZoom: 8,
                markerName: "",
                addPlace: !1,
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
              }),
              n
            );
          }
          return (
            Object(g.a)(t, e),
            Object(m.a)(t, [
              {
                key: "componentDidUpdate",
                value: function(e, t) {
                  e !== this.props && (t.places, this.state.places);
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.classes,
                    n = this.state,
                    a = n.addPlace,
                    o = n.query,
                    c = n.coords,
                    l = n.currentMarker,
                    s = n.places,
                    u = n.markerName,
                    p = n.mapZoom;
                  return r.a.createElement(
                    "div",
                    { className: t.root },
                    r.a.createElement(
                      v.a,
                      { position: "static" },
                      r.a.createElement(
                        w.a,
                        { variant: "dense" },
                        r.a.createElement(
                          N.a,
                          {
                            className: t.menuButton,
                            color: "inherit",
                            "aria-label": "Menu"
                          },
                          r.a.createElement(q.a, null)
                        ),
                        r.a.createElement(
                          C.a,
                          { variant: "h6", color: "inherit" },
                          "MedWing App"
                        )
                      )
                    ),
                    r.a.createElement(
                      "div",
                      { className: "map-row" },
                      r.a.createElement(
                        "div",
                        { className: "map-container" },
                        r.a.createElement(
                          B.LoadScript,
                          {
                            id: "script-loader",
                            googleMapsApiKey: F,
                            onError: function(e) {
                              console.log(e);
                            }
                          },
                          r.a.createElement(
                            B.GoogleMap,
                            {
                              id: "map-component",
                              onLoad: function(e) {},
                              ref: function(t) {
                                return (e.mapRef = t);
                              },
                              onUnmount: function(e) {},
                              mapContainerClassName: "map-element",
                              mapContainerStyle: {
                                height: "550px",
                                width: "100%"
                              },
                              onZoomChanged: function() {
                                console.log("zoom changed");
                              },
                              clickableIcons: !0,
                              onDragEnd: function() {},
                              zoom: p,
                              center: {
                                lat: parseFloat(c.latitude),
                                lng: parseFloat(c.longitude)
                              }
                            },
                            r.a.createElement(
                              B.OverlayView,
                              {
                                position: {
                                  lat: parseFloat(l.lat) + 0.0522,
                                  lng: parseFloat(l.lng) - 0.0522 / K
                                },
                                mapPaneName: B.OverlayView.OVERLAY_MOUSE_TARGET
                              },
                              r.a.createElement(
                                "div",
                                {
                                  style: {
                                    background: "white",
                                    border: "1px solid #ccc",
                                    padding: 15,
                                    marginLeft: 10,
                                    marginTop: 20
                                  }
                                },
                                r.a.createElement(
                                  C.a,
                                  { component: "p" },
                                  l.lat ? l.title : "click on a marker"
                                )
                              )
                            ),
                            r.a.createElement(B.Polygon, {
                              onLoad: function(e) {},
                              paths: [
                                { lat: l.lat + 0.05, lng: l.lng + 0.05 },
                                { lat: l.lat + 0.05, lng: l.lng - 0.05 },
                                { lat: l.lat - 0.05, lng: l.lng - 0.05 },
                                { lat: l.lat - 0.05, lng: l.lng + 0.05 }
                              ],
                              options: this.polygonOptions
                            }),
                            r.a.createElement(
                              B.MarkerClusterer,
                              {
                                gridSize: 10,
                                options: {
                                  imagePath:
                                    "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
                                }
                              },
                              function(t) {
                                return s.map(function(n, a) {
                                  return r.a.createElement(B.Marker, {
                                    clickable: !0,
                                    onClick: function(t) {
                                      e.setState({
                                        coords: Object(i.a)({}, c, {
                                          latitude: s[a].lat,
                                          longitude: s[a].lng
                                        }),
                                        currentMarker: Object(i.a)({}, s[a], {
                                          index: a
                                        })
                                      });
                                    },
                                    onLoad: function(e) {},
                                    title: n.title,
                                    key: a,
                                    position: { lat: n.lat, lng: n.lng },
                                    clusterer: t
                                  });
                                });
                              }
                            )
                          ),
                          a
                            ? r.a.createElement(
                                "div",
                                {
                                  style: {
                                    background: "white",
                                    border: "1px solid #ccc",
                                    padding: 15
                                  },
                                  className: "overlay-component"
                                },
                                r.a.createElement(
                                  "span",
                                  { className: "overlay-header" },
                                  r.a.createElement("h3", null, "Add location"),
                                  r.a.createElement(
                                    "button",
                                    {
                                      onClick: this.toggleAddPlace,
                                      type: "button",
                                      className: "overlay-header-button"
                                    },
                                    "X"
                                  )
                                ),
                                r.a.createElement(
                                  "form",
                                  { onSubmit: this.addPlaceWithMarker },
                                  r.a.createElement(L.a, {
                                    id: "search-location",
                                    label: "Location",
                                    onKeyPress: function(t) {
                                      if ((t.stopPropagation(), 13 === t.which))
                                        return e.addPlaceWithMarker(t);
                                    },
                                    className: t.textField,
                                    value: o,
                                    helperText: "enter a valid address",
                                    onChange: this.handleChange("location"),
                                    margin: "normal",
                                    variant: "outlined"
                                  }),
                                  r.a.createElement("br", null),
                                  r.a.createElement(
                                    A.a,
                                    {
                                      variant: "contained",
                                      color: "primary",
                                      type: "submit",
                                      className: t.addButton
                                    },
                                    "Add"
                                  )
                                )
                              )
                            : r.a.createElement("div", null)
                        )
                      ),
                      r.a.createElement(
                        "div",
                        { className: "map-editor-container" },
                        r.a.createElement(
                          j.a,
                          { className: "editor-container", elevation: 1 },
                          r.a.createElement(
                            A.a,
                            {
                              variant: "outlined",
                              onClick: this.toggleAddPlace,
                              color: "primary",
                              className: t.button
                            },
                            "Add place"
                          ),
                          r.a.createElement(x.a, null),
                          r.a.createElement(
                            C.a,
                            { variant: "h6", component: "h4" },
                            l.title
                          ),
                          r.a.createElement(
                            "form",
                            null,
                            r.a.createElement(L.a, {
                              id: "edit-marker-name",
                              label: "Marker name",
                              className: t.textField,
                              value: u,
                              helperText: "change the marker title",
                              onChange: this.handleChange("marker_name"),
                              margin: "normal",
                              variant: "outlined"
                            }),
                            r.a.createElement("br", null),
                            r.a.createElement(
                              "div",
                              { className: "marker-label-section " },
                              r.a.createElement("label", null, "Latitude: "),
                              r.a.createElement(
                                "label",
                                null,
                                l.lat && l.lat.toFixed(6)
                              ),
                              r.a.createElement("br", null),
                              r.a.createElement("label", null, "Longitude: "),
                              r.a.createElement(
                                "label",
                                null,
                                l.lng && l.lng.toFixed(6),
                                " "
                              )
                            ),
                            r.a.createElement("br", null),
                            r.a.createElement(
                              "span",
                              { className: "edit-marker-section" },
                              r.a.createElement(
                                A.a,
                                {
                                  variant: "contained",
                                  color: "primary",
                                  className: t.button,
                                  onClick: this.editPlaceWithMarker
                                },
                                "Edit"
                              ),
                              "Or",
                              r.a.createElement(
                                A.a,
                                {
                                  variant: "contained",
                                  color: "primary",
                                  className: t.button,
                                  onClick: this.deletePlaceWithMarker
                                },
                                "Delete"
                              )
                            )
                          )
                        )
                      )
                    )
                  );
                }
              }
            ]),
            t
          );
        })(a.Component),
        H = Object(b.withStyles)(function(e) {
          return {
            root: { paddingBottom: 2 * e.spacing.unit, flexGrow: 1 },
            menuButton: { marginLeft: -18, marginRight: 10 },
            textField: {
              marginLeft: e.spacing.unit,
              marginRight: e.spacing.unit
            },
            button: {
              marginTop: 10,
              marginBottom: 10,
              marginLeft: 5,
              marginRight: 5
            },
            addButton: {
              marginTop: 10,
              marginBottom: 10,
              marginLeft: 9,
              marginRight: 5,
              padding: 5
            }
          };
        })(Z);
      Boolean(
        "localhost" === window.location.hostname ||
          "[::1]" === window.location.hostname ||
          window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
          )
      );
      c.a.render(r.a.createElement(H, null), document.getElementById("root")),
        "serviceWorker" in navigator &&
          navigator.serviceWorker.ready.then(function(e) {
            e.unregister();
          });
    }
  },
  [[107, 1, 2]]
]);
//# sourceMappingURL=main.584451e5.chunk.js.map
