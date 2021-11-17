import { useState } from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import {Room} from "@material-ui/icons";

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
      </ReactMapGL>  
    </div>
  );
}

export default App;
