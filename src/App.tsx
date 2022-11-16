import './App.css'
import React, { useState, useEffect } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl'
import { FaMapMarkerAlt } from "react-icons/fa"
import { MarkerType } from './types/types';
import Contacts_contenair from './components/Contacts_contenair';
import PopUpInfo from './components/PopUpInfo';


function App() {
  const [markersData, setMarkersData]: [MarkerType[], Function] = useState([]);
  const [popUpInfoIsvisible, setpopUpInfoIsvisible] = useState(false);
  const [infoPopUp, setInfoPopup]: [string, Function] = useState("");

  useEffect(() => {
    let data = fetch("http://localhost:8080/markers").then((res: Response) => {
      res.json().then(data => {
        setMarkersData(data.data)
      });
    })
  }, [])

  const addMarkers = () => {
    return markersData.map((value: MarkerType) => {
      return (<Marker key={value.id} longitude={value.longitude} latitude={value.lattitude} anchor="bottom">
        <FaMapMarkerAlt className='cursor-pointer' size={"2em"} onClick={(e:React.MouseEvent) => {e.stopPropagation() ;openPopUpInfo(value.name)}} />
      </Marker>)
    })
  }

  const openPopUpInfo = (name: string) => {
    setpopUpInfoIsvisible(true);
    setInfoPopup(name);
  }

  const closePopUpInfo = () => {
    setpopUpInfoIsvisible(false);
  }

  return (
    <div className="App flex absolute w-full font-barlow text-[1.2rem]">
      <Map
        mapboxAccessToken='pk.eyJ1IjoidGhvbWFzNzAiLCJhIjoiY2xhZ3g1eWcyMDRpZDN2cGNzc2dvN2xvbyJ9.wfkekqLWXqky6nKsBhdwwA'
        initialViewState={{
          longitude: 6.0240539,
          latitude: 47.237829,
          zoom: 13
        }}
        style={{ width: '70vw', height: '100vh' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onClick={(e:mapboxgl.MapMouseEvent) => console.log(e.lngLat)}
      >
        {addMarkers()}
        <NavigationControl />
      </Map>
      <Contacts_contenair openPopUp={openPopUpInfo} markersData={markersData} />
      <PopUpInfo visible={popUpInfoIsvisible} marksData={markersData} infoPopUp={infoPopUp} closePopUp={closePopUpInfo}/>
    </div >
  )
}

export default App
