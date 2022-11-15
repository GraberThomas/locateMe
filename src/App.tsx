import './App.css'
import React, { useState, useRef, useEffect } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl'
import { FaMapMarkerAlt } from "react-icons/fa"

function App() {
  const [viewState, setViewState] = useState({
    longitude: 6.0240539,
    latitude: 47.237829,
    zoom: 13
  })

  function onclickbutton(e: React.MouseEvent) {
    console.log("longitude : " + viewState['longitude'] + ", latitude : " + viewState["latitude"]);
  }

  return (
    <div className="App flex flex-row self-center">
      <Map
        mapboxAccessToken='pk.eyJ1IjoidGhvbWFzNzAiLCJhIjoiY2xhZ3g1eWcyMDRpZDN2cGNzc2dvN2xvbyJ9.wfkekqLWXqky6nKsBhdwwA'
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{ width: '50vw', height:'100vh' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker longitude={6.024053} latitude={47.237829} anchor="bottom">
          <FaMapMarkerAlt size={"1.5em"}/>
        </Marker>
        <NavigationControl />
      </Map>

      <button onClick={(e) => onclickbutton(e)}>Click</button>
    </div>
  )
}

export default App
