import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import "../Legend/leaflet.legend";

import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

import classes from "./map.module.css";
import treeData from "../../data/TampaTrees/TampaTrees.json";
import powerData from "../../data/PowerPlants/PowerPlants.json";
import tranData from "../../data/TranLines/TranLines.json";
import distData from "../../data/StateParkDist/StateParkDistricts.json";
import trailData from "../../data/StateParkTrails/StateParkTrails.json";

export default function Map({
  showTrees,
  showPowerLines,
  showTranLines,
  showParkDist,
  showParkTrails,
}) {
  useEffect(() => {
    const mapContainer = document.getElementById("map");

    if (!mapContainer._leaflet_id) {
      const map = L.map(mapContainer, { zoomControl: false }).setView(
        [27.6648, -81.5158],
        6.5
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

      function onEachTree(feature, layer) {
        if (feature.properties && feature.properties.NAME) {
          layer.bindPopup(feature.properties.NAME);
        }
      }

      function onEachPlant(feature, layer) {
        if (feature.properties && feature.properties.PLANT_NAME) {
          layer.bindPopup(feature.properties.PLANT_NAME);
        }
      }

      function onEachDist(feature, layer) {
        if (feature.properties && feature.properties.DISTRICT) {
          layer.bindPopup("District " + feature.properties.DISTRICT);
        }
      }

      function onEachTrail(feature, layer) {
        if (feature.properties && feature.properties.SITE_NAME) {
          layer.bindPopup(
            feature.properties.SITE_NAME + ": " + feature.properties.NAME
          );
        }
      }

      function onEachTran(feature, layer) {
        if (
          feature.properties &&
          feature.properties.NAME &&
          feature.properties.DESCRIPTION
        ) {
          layer.bindPopup(
            feature.properties.NAME +
              "<br><brs>" +
              feature.properties.DESCRIPTION
          );
        }
      }

      L.geoJSON(trailData.features, {
        filter: function () {
          return showParkTrails;
        },
        onEachFeature: onEachTrail,
      }).addTo(map);

      L.geoJSON(distData.features, {
        filter: function () {
          return showParkDist;
        },
        onEachFeature: onEachDist,
      }).addTo(map);

      L.geoJSON(tranData.features, {
        filter: function () {
          return showTranLines;
        },
        onEachFeature: onEachTran,
      }).addTo(map);

      L.geoJSON(powerData.features, {
        pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, {
            fillColor: "#FF0000",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8,
            radius: 5,
          });
        },
        filter: function () {
          console.log(showPowerLines);
          return showPowerLines;
        },
        onEachFeature: onEachPlant,
      }).addTo(map);

      L.geoJSON(treeData.features, {
        pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, {
            fillColor: "#00FF00",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8,
            radius: 5,
          });
        },
        filter: function () {
          return showTrees;
        },
        onEachFeature: onEachTree,
      }).addTo(map);

      L.control
        .Legend({
          position: "bottomright",
          legends: [
            {
              label: "Tree",
              type: "circle",
              radius: 5,
              color: "#000",
              fillColor: "#00FF00",
              fillOpacity: 0.8,
              weight: 1,
              opacity: 1,
              inactive: true,
            },
            {
              label: "Power Plant",
              type: "circle",
              radius: 5,
              color: "#000",
              fillColor: "#FF0000",
              fillOpacity: 0.8,
              weight: 1,
              opacity: 1,
              inactive: true,
            },
            {
              label: "Transmission Line",
              type: "polyline",
              color: "#0000FF",
              fillColor: "#0000",
              weight: 2,
            },
          ],
        })
        .addTo(map);

      return () => {
        map.remove();
      };
    }
  }, [showTrees, showPowerLines, showTranLines, showParkDist, showParkTrails]);

  return <div id="map" className={classes.map}></div>;
}
