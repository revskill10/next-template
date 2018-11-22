import { Map, TileLayer, Marker, Popup, WMSTileLayer } from "react-leaflet";
import { Suspense} from 'react'
import {useGeoPosition} from 'lib/hooks/geoposition'
import useAuth from 'lib/hooks/auth'
import {useState} from 'react'
// var wmsLayer = L.tileLayer.wms('https://old.geo-wiki.org/cgi-bin/campaignwms', {
//   layers: "sample_fotoquest_go_2017",
//   version: '1.1.1',
//   format: 'image/png',
//   crs: L.CRS.EPSG3857,
//   transparent: true
// });

// 48.2082° N, 16.3738° E

const MapViewer = () => {
  const {
    coords: { latitude, longitude }
  } = useGeoPosition()
  const [zoom] = useState(5)
  const {currentUser} = useAuth()

  const position = [latitude, longitude];
  return (
    <div>
      <h1>Your position</h1>
      <Map
        center={position}
        zoom={zoom}
        style={{ width: "600px", height: "600px" }}
      >
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <WMSTileLayer
          url="http://old.geo-wiki.org/cgi-bin/campaignwms"
          layers="sample_fotoquest_go_2017"
          format="image/png"
        />
        {/* <WMSTileLayer
          layers={"nasa:bluemarble"}
          url="https://demo.boundlessgeo.com/geoserver/ows"
        /> */}
        <Marker position={position}>
          <Popup>
            Hello {currentUser.name}
          </Popup>
        </Marker>
      </Map>
    </div>
  );
}

export default () => {
  return (
    <Suspense fallback={<div>...</div>}>
      <MapViewer />
    </Suspense>
  )
}