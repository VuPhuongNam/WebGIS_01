import React, { useRef, useEffect } from 'react'
import { loadModules } from "esri-loader"

function Map() {
    const MapEl = useRef(null)

    useEffect(
        () => {
            let view;

            loadModules(["esri/views/MapView", "esri/WebMap", "esri/layers/GeoJSONLayer"], {
                CSS: true
            }).then(([MapView, WebMap, GeoJSONLayer]) => {
                const webmap = new WebMap({
                    basemap: "arcgis/topographic"
                })
                view = new MapView({
                    map: webmap,
                    center: [],
                    zoom: 8,
                    //use the ref as a container
                    container: MapEl.current
                })

                const geojson = new GeoJSONLayer({
                    url: "https://raw.githubusercontent.com/adarshvarma15/mygeojson/refs/heads/main/RMS_Crime_Incidents%20edited.geojson"
                });
            })


            return () => {
                //close the Map view
                if (!!view) {
                    view.destroy()
                    view = null
                }
            }
        })

    return (
        <div style={{ height: 800 }} ref={MapEl}>

        </div>
    )
}

export default Map