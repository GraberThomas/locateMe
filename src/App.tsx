import './App.css'
import React, { useState, useRef, useEffect, DOMElement, JSXElementConstructor, CSSProperties } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl'
import { FaMapMarkerAlt } from "react-icons/fa"
import { MarkerType } from './types/types';
import Contacts_contenair from './components/Contacts_contenair';
import Popup from 'reactjs-popup';

const popUpStyle:CSSProperties = {
  padding: '1000px !important'
}

function App() {
  const [markersData, setMarkersData]: [MarkerType[], Function] = useState([]);
  const [visible, setVisible] = useState(false);
  const [infoPopUp, setInfoPopup]: [string, Function] = useState("");

  useEffect(() => {
    let data = fetch("http://localhost:8080/markers").then((res: Response) => {
      res.json().then(data => {
        setMarkersData(data.data)
      });
    })
    // console.log(markersData);
  }, [])

  const addMarkers = () => {
    return markersData.map((value: MarkerType) => {
      return (<Marker longitude={value.longitude} latitude={value.lattitude} anchor="bottom">
        <FaMapMarkerAlt className='cursor-pointer' size={"2em"} onClick={() => openPopUp(value.name)} />
      </Marker>)
    })
  }

  const openPopUp = (name: string) => {
    setVisible(true);
    setInfoPopup(name);
  }

  const closePopUpInfo = () => {
    setVisible(false);
  }

  const getInfoPopUp = () => {
    let markData: MarkerType | null = null;
    for (const data of markersData) {
      if (data.name === infoPopUp) {
        console.log("found")
        markData = data;
        break;
      }
    }
    if (markData !== null) {
      return (
        <div className=' text-button '>
            <h3 className='block text-center font-bold text-2xl bg-card_bg rounded-lg mb-6 p-3'>{markData['name']}</h3>

          <p><span className='font-bold'>Description : </span>{markData['description']}</p>
          <p><span className='font-bold'>Type : </span>{markData['type']}</p>
          <p><span className='font-bold'>Coordonnées : </span>{'{'+markData['longitude']+','+ markData['lattitude']+'}'}</p>
        </div>
      )
    } else {
      return (
        <div>
          <p>ERROR</p>
        </div>
      )
    }
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
      >
        {addMarkers()}
        <NavigationControl />
      </Map>
      <Contacts_contenair openPopUp={openPopUp} markersData={markersData} />
      {/* <Popup visible={visible} onClose={() => setVisible(false)} style={popUpStyle}>
        {getInfoPopUp()}
      </Popup> */}
      <Popup open={visible} closeOnDocumentClick onClose={closePopUpInfo}>
        <div className='min-w-[200px] rounded-xl bg-[#f1f1f1] p-6 transition-all' >
          {getInfoPopUp()}
        </div>
      </Popup>
    </div >
  )
}

export default App
