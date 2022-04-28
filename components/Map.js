import { useState } from 'react';
import ReactMapGL, {Marker, Popup} from "react-map-gl";
import getCenter from "geolib/es/getCenter"; 

function Map({ searchResults }) {
    const [selectedLocation, setSelectedLocation] = useState({});
  
    //   Transform the search results into the 
    //   { latitude: 52.516272, longitude: 13.377722 }, { latitude: 51.515, longitude: 7.453619 } 
    //   object
    const coordinates = searchResults.map(result => ({
      longitude: result.long,
      latitude: result.lat,
    }))


    // The longitude and latitude of the center of locations coordinates
    const center = getCenter(coordinates);

      const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
      });


    console.log(selectedLocation);

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/diar121/ckthr34v24ng418pm80k0mu69"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewPort) => setViewport(nextViewPort)}>

        {searchResults.map(result => (
            <div key={result.long}>
              <Marker
                  longitude={result.long}
                  latitude={result.lat}
                  offsetLeft={-20}
                  offsetRight={-10}
              >
                <p 
                role='img'
                onClick={() => setSelectedLocation(result)}
                className="cursor-pointer text-2xl animate-bounce"
                aria-label="push-pin"
                >
                📌</p>
              </Marker>

              {/* The popup that should show if we click on the Marker */}
              {selectedLocation.long === result.long ? (
                <Popup
                  onClose={() => setSelectedLocation({})}
                  closeOnClick={true}
                  latitude={result.lat}
                  longitude={result.long}
                >
                  {result.title}
                </Popup>
              ) : (
                false
              )}

            </div>
        ))}

      </ReactMapGL>
  );
}

export default Map;
