import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import "/leaflet-control-geocoder/dist/Control.Geocoder.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { GeoJSON } from "leaflet";
import classes from "./map.module.css";

export default function Map() {
  useEffect(() => {
    const mapContainer = document.getElementById("map");

    if (!mapContainer._leaflet_id) {
      const map = L.map(mapContainer, { zoomControl: false }).setView(
        [29.6465, -82.3533],
        13
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      const provider = new OpenStreetMapProvider();
      const searchControl = new GeoSearchControl({
        provider: provider,
        position: "topright",
      });

      map.addControl(searchControl);

      L.control.zoom({ position: "topright" }).addTo(map);

      return () => {
        map.remove();
      };
    }
  }, []);

  return <div id="map" className={classes.map}></div>;
}
