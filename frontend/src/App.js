import { useState } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import {Room, Star} from "@material-ui/icons";

function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 10.762622,
    longitude: 106.660172,
    zoom: 4
  });

  return (
    <div className="App">
      <ReactMapGL
      {...viewport}
      mapboxApiAccessToken = {process.env.REACT_APP_MAPBOX}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapStyle = "mapbox://styles/ngoclinhtt/ckw3zuiri03sz14nukderqm1q"
    >

      <Marker 
        latitude={10.823099} 
        longitude={106.629664} 
        offsetLeft={-20} 
        offsetTop={-10}
      >
        <Room style = {{fontSize: viewport.zoom * 7, color: "orange"}}/> {/* thu phong con Pin theo action zoom */}
      </Marker>

      <Popup
          latitude={10.823099}
          longitude={106.629664}
          closeButton={true}
          closeOnClick={false}
          anchor="left" >
          <div className = "card">
            <label>Place</label>
            <h4 className = "place">Ho Chi Minh City</h4>
            <label>Review</label>
            <p>Beautiful city. I love it.</p>
            <label>Rating</label>
            <div className="stars">
              <Star/>
              <Star/>
              <Star/>
              <Star/>
              <Star/>
            </div>
            <label>Information </label>
            <span className="username">Created by <b>NgocLinh</b> </span>
            <span className="date">1 hours ago</span>
          </div>
        </Popup>
      </ReactMapGL>  
    </div>
  );
}

export default App;
