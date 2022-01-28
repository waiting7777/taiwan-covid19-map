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
import confirm from '../data/confirm_native.json'

const TaiwanMap = () => {
    const [town, setTown] = useState("")
    const [cases, setCases] = useState({})

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

        const temp = {}
        confirm.forEach(v => {
            if (temp[v["鄉鎮"]]) {
                temp[v["鄉鎮"]] += Number(v["確定病例數"])
            } else {
                temp[v["鄉鎮"]] = Number(v["確定病例數"])
            }
        })

        const mymap = L.map("mapid").setView([23.730023, 121.4389886], 8);
        mymap.doubleClickZoom.disable();

        L.tileLayer('https://api.mapbox.com/styles/v1/waiting7777/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            maxZoom: 10,
            minZoom: 7,
            id: 'ckyxrt2hz000115qyjsoer04g',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1Ijoid2FpdGluZzc3NzciLCJhIjoiY2lrNTI0NjJ3MDA2cXY2a3RpaTYzM3Q1NSJ9.EOZ_nqPf_QkZZNdxRKMQqQ'
        }).addTo(mymap);

        function style(feature) {
            let fillColor = 'transparent'
            const n = temp[feature.properties.name] ?? 0
            if (n === 0) {
                fillColor = 'rgb(255, 255, 255)'
            } else if (n > 1 && n <= 5) {
                fillColor = 'rgb(255, 216, 223)'
            } else if (n > 6 && n <= 10) {
                fillColor = 'rgb(254, 177, 191)'
            } else if (n > 10 && n <= 15) {
                fillColor = 'rgb(254, 137, 159)'
            } else if (n > 11 && n <= 20) {
                fillColor = 'rgb(253, 98, 127)'
            } else {
                fillColor = 'rgb(255, 0, 49)'
            }

            return {
                fillColor,
                fillOpacity: 0.8,
                color: '#636363',
                weight: 1,
                opacity: 0.5
            };
        }

        function highlightFeature(e) {
            var layer = e.target;

            layer.setStyle({
                fillColor: '#7f7677'
            });

            setTown(layer.feature.properties.name)

            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                layer.bringToFront();
            }
        }

        function resetHighlight(e) {
            e.target.setStyle(style(e.target.feature))
        }

        function onEachFeature(feature, layer) {
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight
            });
        }

        var topoLayer = new L.TopoJSON(null, { style: style, onEachFeature: onEachFeature });
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

        setCases(temp)
        console.log(temp)
        return () => {
            mymap.off();
            mymap.remove();
        }
    }, [])


    return (
        <div className='relative'>
            <div id="mapid" style={{ height: "100vh", width: "100vw" }} />
            <div className='absolute bg-white top-5 right-5 w-24 h-12 z-[1000] flex justify-center items-center'>{town}: {cases[town] ?? 0}</div>
            <div className='absolute right-5 top-1/2 bottom-auto z-[1000] transform -translate-y-1/2'>
                <div className='flex flex-col w-14' style={{ color: '#29242f' }}>
                    <div className='flex items-center gap-1 text-xs leading-none'>
                        <div className='flex-1 text-right'>21+</div>
                        <div className='w-2 h-3' style={{ backgroundColor: 'rgb(255, 0, 49)' }}></div>
                    </div>
                    <div className='flex items-center gap-1 text-xs leading-none'>
                        <div className='flex-1 text-right'>16 ~ 20</div>
                        <div className='w-2 h-3' style={{ backgroundColor: 'rgb(253, 98, 127)' }}></div>
                    </div>
                    <div className='flex items-center gap-1 text-xs leading-none'>
                        <div className='flex-1 text-right'>11 ~ 15</div>
                        <div className='w-2 h-3' style={{ backgroundColor: 'rgb(254, 137, 159)' }}></div>
                    </div>
                    <div className='flex items-center gap-1 text-xs leading-none'>
                        <div className='flex-1 text-right'>6 ~ 10</div>
                        <div className='w-2 h-3' style={{ backgroundColor: 'rgb(254, 177, 191)' }}></div>
                    </div>
                    <div className='flex items-center gap-1 text-xs leading-none'>
                        <div className='flex-1 text-right'>1 ~ 5</div>
                        <div className='w-2 h-3' style={{ backgroundColor: 'rgb(255, 216, 223)' }}></div>
                    </div>
                    <div className='flex items-center gap-1 text-xs leading-none'>
                        <div className='flex-1 text-right'>0</div>
                        <div className='w-2 h-3' style={{ backgroundColor: 'rgb(255, 255, 255)' }}></div>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default TaiwanMap;
