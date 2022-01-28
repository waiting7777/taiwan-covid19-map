import React, { useEffect, useState } from 'react'
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import towns09007 from "./towns-09007.json"
import towns09020 from "./towns-09020.json"
import towns10002 from "./towns-10002.json"
import towns10004 from "./towns-10004.json"
import towns10005 from "./towns-10005.json"
import towns10007 from "./towns-10007.json"
import towns10008 from "./towns-10008.json"
import towns10009 from "./towns-10009.json"
import towns10010 from "./towns-10010.json"
import towns10013 from "./towns-10013.json"
import towns10014 from "./towns-10014.json"
import towns10015 from "./towns-10015.json"
import towns10016 from "./towns-10016.json"
import towns10017 from "./towns-10017.json"
import towns10018 from "./towns-10018.json"
import towns10020 from "./towns-10020.json"
import towns63000 from "./towns-63000.json"
import towns64000 from "./towns-64000.json"
import towns65000 from "./towns-65000.json"
import towns66000 from "./towns-66000.json"
import towns67000 from "./towns-67000.json"
import towns68000 from "./towns-68000.json"
import * as topojson from 'topojson-client'

const TaiwanMap = () => {
    const [town, setTown] = useState("")

    useEffect(() => {
        L.TopoJSON = L.GeoJSON.extend({
            addData: function (jsonData) {
                if (jsonData.type === "Topology") {
                    for (let key in jsonData.objects) {
                        const geojson = topojson.feature(jsonData, jsonData.objects[key]);
                        L.GeoJSON.prototype.addData.call(this, geojson);
                    }
                }
                else {
                    L.GeoJSON.prototype.addData.call(this, jsonData);
                }
            }
        });

        const mymap = L.map("mapid").setView([23.730023, 121.4389886], 8);
        mymap.doubleClickZoom.disable();

        L.tileLayer('https://api.mapbox.com/styles/v1/waiting7777/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            maxZoom: 10,
            minZoom: 7,
            id: 'cik561ckp007ibum79vhnh7hp',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1Ijoid2FpdGluZzc3NzciLCJhIjoiY2lrNTI0NjJ3MDA2cXY2a3RpaTYzM3Q1NSJ9.EOZ_nqPf_QkZZNdxRKMQqQ'
        }).addTo(mymap);

        var myStyle = {
            fillColor: 'transparent',
            color: '#636363',
            weight: 1,
            opacity: 0.5
        };

        function highlightFeature(e) {
            var layer = e.target;

            layer.setStyle({
                fillColor: '#7f7677',
                fillOpacity: 0.7
            });

            setTown(layer.feature.properties.name)

            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                layer.bringToFront();
            }
        }

        function resetHighlight(e) {
            e.target.setStyle(myStyle)
        }

        function onEachFeature(feature, layer) {
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight
            });
        }

        var topoLayer = new L.TopoJSON(null, { style: myStyle, onEachFeature: onEachFeature });
        topoLayer.addData(towns09007)
        topoLayer.addData(towns09020)
        topoLayer.addData(towns10002)
        topoLayer.addData(towns10004)
        topoLayer.addData(towns10005)
        topoLayer.addData(towns10007)
        topoLayer.addData(towns10008)
        topoLayer.addData(towns10009)
        topoLayer.addData(towns10010)
        topoLayer.addData(towns10013)
        topoLayer.addData(towns10014)
        topoLayer.addData(towns10015)
        topoLayer.addData(towns10016)
        topoLayer.addData(towns10017)
        topoLayer.addData(towns10018)
        topoLayer.addData(towns10020)
        topoLayer.addData(towns63000)
        topoLayer.addData(towns64000)
        topoLayer.addData(towns65000)
        topoLayer.addData(towns66000)
        topoLayer.addData(towns67000)
        topoLayer.addData(towns68000)
        topoLayer.addTo(mymap);

        return () => {
            mymap.off();
            mymap.remove();
        }
    }, [])


    return (
        <div className='relative'>
            <div id="mapid" style={{ height: "100vh", width: "100vw" }} />
            <div className='absolute bg-white top-5 right-5 w-48 h-24 z-[1000]'>{town}</div>
        </div>
    )
}

export default TaiwanMap;
