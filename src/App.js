import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Room, Star } from "@material-ui/icons";
import "./App.css";
import axios from "axios";
import { format } from "timeago.js";
import Register from "./components/Register";
import Login from "./components/Login";

const host = "https://travelmappin.herokuapp.com/api";

function App() {
  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"));
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [deletePin, setDeletePin] = useState(false);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 10.762622,
    longitude: 106.660172,
    zoom: 4,
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get(`${host}/pins`);
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, [deletePin]);

  const handleMarketClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleAddClick = (e) => {
    const [longitude, latitude] = e.lngLat;
    setNewPlace({
      lat: latitude,
      long: longitude,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post(`${host}/pins`, newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    myStorage.removeItem("user");
    setCurrentUser(null);
  };

  const handleDeletePin = async (pin) => {
    try {
      let user = myStorage.getItem("user");
      if (pin.username === user) {
        await axios.delete(`${host}/pins/${user}`);
        setDeletePin(true);
      } else {
        alert("Can't delete Pin!");
      }
    } catch (error) {
      console.log(error);
    }
    //console.log(pin);
  };

  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoibmdvY2xpbmh0dCIsImEiOiJja3czdm9pYXU1eDF4MzBvMGJnMHZoMTR0In0.f0VJ50mGamqEbdGy7fQiZQ"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/ngoclinhtt/ckwazpyvp6qyn15p1i8ygg84a"
        onDblClick={handleAddClick}
        transitionDuration="300"
      >
        {pins?.map((p, index) => (
          <div key={index} className="pin">
            <Marker
              latitude={p?.lat}
              longitude={p?.long}
              offsetLeft={-viewport.zoom * 3.5}
              offsetTop={-viewport.zoom * 7}
            >
              <Room
                style={{
                  fontSize: viewport.zoom * 7,
                  color:
                    p?.username === currentUser
                      ? "tomato"
                      : "rgb(236, 252, 95)",
                  cursor: "pointer",
                }}
                onClick={() => handleMarketClick(p?._id, p?.lat, p?.long)}
              />
            </Marker>
            {p?._id === currentPlaceId && (
              <Popup
                latitude={p?.lat}
                longitude={p?.long}
                closeButton={true}
                closeOnClick={false}
                anchor="left"
                onClose={() => setCurrentPlaceId(null)}
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p?.title}</h4>
                  <label>Review</label>
                  <p className="desc">{p?.desc}</p>
                  <label>Rating</label>
                  <div className="stars">
                    {Array(p?.rating).fill(<Star className="star" />)}
                  </div>
                  <label>Information </label>
                  <span className="username">
                    Created by <b>{p?.username}</b>
                  </span>
                  <span className="date">{format(p?.createdAt)}</span>
                  {localStorage.getItem('user') === p?.username ? (
                    <div className="buttonss">
                    <button
                      className="button delete"
                      onClick={() => handleDeletePin(p)}
                    >
                      Delete Pin
                    </button>
                  </div>
                  ) : (<></>)}
                </div>
              </Popup>
            )}
          </div>
        ))}
        {newPlace && (
          <Popup
            latitude={newPlace.lat}
            longitude={newPlace.long}
            closeButton={true}
            closeOnClick={false}
            anchor="left"
            onClose={() => setNewPlace(null)}
          >
            <div>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                  placeholder="Enter a title"
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
                <label>Review</label>
                <textarea
                  placeholder="Say us something about this place."
                  onChange={(e) => setDesc(e.target.value)}
                />
                <label>Rating</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                {localStorage.getItem('user') ? (
                  <button className="submitButton" type="submit">
                  Add New Pin
                </button>
                ) : (<></>)}
              </form>
            </div>
          </Popup>
        )}
        {currentUser ? (
          <button className="button logout" onClick={handleLogout}>
            Log out
          </button>
        ) : (
          <div className="buttons">
            <button
              className="button login"
              onClick={() => {
                if (showRegister) {
                  setShowRegister(!showRegister);
                }
                setShowLogin(true);
              }}
            >
              Login
            </button>
            <button
              className="button register"
              onClick={() => {
                if (showLogin) {
                  setShowLogin(!showLogin);
                }
                setShowRegister(true);
              }}
            >
              Register
            </button>
          </div>
        )}
        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            myStorage={myStorage}
            setCurrentUser={setCurrentUser}
          />
        )}
      </ReactMapGL>
    </div>
  );
}

export default App;
