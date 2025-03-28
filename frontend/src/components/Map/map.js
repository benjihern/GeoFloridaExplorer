import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import "../Legend/leaflet.legend";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/leaflet.markercluster.js";

import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

import classes from "./map.module.css";
import natCollectionData from "../../data/NaturalCollectionTampa/NaturalCollection.json";
import powerData from "../../data/PowerPlants/PowerPlants.json";
import tranData from "../../data/TranLines/TranLines.json";
import distData from "../../data/StateParkDist/StateParkDistricts.json";
import trailData from "../../data/StateParkTrails/StateParkTrails.json";
import wasteData from "../../data/SolidWaste/SolidWasteFacilities.json";
import lakeData from "../../data/Lakes/FloridaLakes.json";
import surfaceData from "../../data/SurfaceGeology/SurficialGeology.json";
import sinkData from "../../data/Sinkholes/FloridaSinkholeTypes.json";
import bridgeData from "../../data/Bridges/BridgesTDA.json";
import treeData from "../../data/TreeInventory/TreeInventory.json";
import soilData from "../../data/SoilFormation/SoilFormation.json";
import rockData from "../../data/Rocks/Rock.json";
import greenwayData from "../../data/Greenways/Greenways.json";
import healthData from "../../data/Health/Health.json";

export default function Map({
  showNatCollection,
  showPowerLines,
  showTranLines,
  showParkDist,
  showParkTrails,
  showSolidWaste,
  showLakes,
  showSurface,
  showSinkhole,
  showBridge,
  showTree,
  showSoil,
  showRock,
  showGreenway,
  showHealth,
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

      // natural collection data functions ----------------------------------- //

      function onEachColl(feature, layer) {
        if (feature.properties && feature.properties.NAME) {
          layer.bindPopup(feature.properties.NAME);
        }
      }

      L.geoJSON(natCollectionData.features, {
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
          return showNatCollection;
        },
        onEachFeature: onEachColl,
      }).addTo(map);

      // natural collection data functions ----------------------------------- //

      // power plant functions ----------------------------------------------- //

      function onEachPlant(feature, layer) {
        if (feature.properties && feature.properties.PLANT_NAME) {
          layer.bindPopup(feature.properties.PLANT_NAME);
        }
      }

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

      // power plant functions ----------------------------------------------- //

      // park district functions --------------------------------------------- //
      function onEachDist(feature, layer) {
        if (feature.properties && feature.properties.DISTRICT) {
          layer.bindPopup("District " + feature.properties.DISTRICT);
        }
      }

      L.geoJSON(distData.features, {
        filter: function () {
          return showParkDist;
        },
        onEachFeature: onEachDist,
      }).addTo(map);

      // park district functions --------------------------------------------- //

      // park trail functions ------------------------------------------------ //
      function onEachTrail(feature, layer) {
        if (feature.properties && feature.properties.SITE_NAME) {
          layer.bindPopup(
            feature.properties.SITE_NAME + ": " + feature.properties.NAME
          );
        }
      }

      L.geoJSON(trailData.features, {
        filter: function () {
          return showParkTrails;
        },
        onEachFeature: onEachTrail,
      }).addTo(map);

      // park trail functions ------------------------------------------------ //

      // waste facility functions -------------------------------------------- //
      function onEachWaste(feature, layer) {
        if (feature.properties && feature.properties.FACILITY_NAME) {
          layer.bindPopup(
            feature.properties.FACILITY_NAME +
              "<br><br> Facility Status: " +
              feature.properties.FACILITY_STATUS
          );
        }
      }

      var wasteClusters = L.markerClusterGroup();

      var wastes = L.geoJSON(wasteData.features, {
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
          return showSolidWaste;
        },
        onEachFeature: onEachWaste,
      });

      wasteClusters.addLayer(wastes).addTo(map);

      // waste facility functions -------------------------------------------- //

      // transmission line functions ----------------------------------------- //
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

      L.geoJSON(tranData.features, {
        filter: function () {
          return showTranLines;
        },
        onEachFeature: onEachTran,
      }).addTo(map);

      // transmission line functions ----------------------------------------- //

      // florida lakes functions --------------------------------------------- //

      function onEachLake(feature, layer) {
        if (feature.properties && feature.properties.NAME) {
          layer.bindPopup(feature.properties.NAME);
        }
      }

      var lakeClusters = L.markerClusterGroup();

      var lakes = L.geoJSON(lakeData.features, {
        filter: function () {
          return showLakes;
        },
        onEachFeature: onEachLake,
      });

      lakeClusters.addLayer(lakes).addTo(map);

      // florida lakes functions --------------------------------------------- //

      // surface geology functions ------------------------------------------- //

      function onEachSurface(feature, layer) {
        if (feature.properties && feature.properties.GEOLOGICUNITNAME) {
          layer.bindPopup(
            feature.properties.GEOLOGICUNITNAME +
              "<br><brs>Lithology: " +
              feature.properties.LITHOLOGY
          );
        }
      }

      L.geoJSON(surfaceData.features, {
        filter: function () {
          return showSurface;
        },
        onEachFeature: onEachSurface,
      }).addTo(map);

      // surface geology functions ------------------------------------------- //

      // sinkhole functions -------------------------------------------------- //

      function onEachSinkhole(feature, layer) {
        if (feature.properties && feature.properties.AREA_DESC) {
          layer.bindPopup(
            feature.properties.AREA_DESC +
              "<br><brs>Area: " +
              feature.properties.DEP_SINKHOLE_TYPES_AREA +
              "<br><brs>Perimiter: " +
              feature.properties.PERIMETER
          );
        }
      }

      L.geoJSON(sinkData.features, {
        filter: function () {
          return showSinkhole;
        },
        onEachFeature: onEachSinkhole,
      }).addTo(map);

      // sinkhole functions -------------------------------------------------- //

      // bridge functions ---------------------------------------------------- //

      function onEachBridge(feature, layer) {
        if (feature.properties && feature.properties.DISTRICT) {
          layer.bindPopup(
            "District: " +
              feature.properties.DISTRICT +
              "<br><brs>County: " +
              feature.properties.COUNTY
          );
        }
      }

      L.geoJSON(bridgeData.features, {
        pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, {
            fillColor: "#000",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8,
            radius: 5,
          });
        },
        filter: function () {
          return showBridge;
        },
        onEachFeature: onEachBridge,
      }).addTo(map);

      // bridge functions ---------------------------------------------------- //

      // tree functions ------------------------------------------------------ //

      function onEachTree(feature, layer) {
        if (feature.properties && feature.properties.BOTANICAL) {
          layer.bindPopup(
            "Botanical Name: " +
              feature.properties.BOTANICAL +
              "<br><br> Common Name: " +
              feature.properties.COMMON
          );
        }
      }

      var treeClusters = L.markerClusterGroup();

      var trees = L.geoJSON(treeData.features, {
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
          return showTree;
        },
        onEachFeature: onEachTree,
      });

      treeClusters.addLayer(trees).addTo(map);

      // tree functions ------------------------------------------------------ //

      // soil functions ------------------------------------------------------ //

      function onEachSoil(feature, layer) {
        if (feature.properties && feature.properties.SITEID) {
          layer.bindPopup("Site ID: " + feature.properties.SITEID);
        }
      }

      L.geoJSON(soilData.features, {
        pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, {
            fillColor: "#964B00",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8,
            radius: 5,
          });
        },
        filter: function () {
          return showSoil;
        },
        onEachFeature: onEachSoil,
      }).addTo(map);

      // soil functions ------------------------------------------------------ //

      // rock functions ------------------------------------------------------ //

      function onEachRock(feature, layer) {
        if (feature.properties && feature.properties.CATEGORY) {
          layer.bindPopup(feature.properties.CATEGORY);
        }
      }

      var rockClusters = L.markerClusterGroup();

      var rocks = L.geoJSON(rockData.features, {
        pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, {
            fillColor: "#808080",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8,
            radius: 5,
          });
        },
        filter: function () {
          return showRock;
        },
        onEachFeature: onEachRock,
      });

      rockClusters.addLayer(rocks).addTo(map);

      // rock functions ------------------------------------------------------ //

      // greenways functions ------------------------------------------------- //

      function onEachGreenway(feature, layer) {
        if (feature.properties && feature.properties.NAME) {
          layer.bindPopup(feature.properties.NAME);
        }
      }

      L.geoJSON(greenwayData.features, {
        filter: function () {
          return showGreenway;
        },
        onEachFeature: onEachGreenway,
      }).addTo(map);

      // greenways functions ------------------------------------------------- //

      // health functions ---------------------------------------------------- //

      function onEachHealth(feature, layer) {
        if (feature.properties && feature.properties.Name) {
          layer.bindPopup(feature.properties.Name);
        }
      }

      L.geoJSON(healthData.features, {
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
          return showHealth;
        },
        onEachFeature: onEachHealth,
      }).addTo(map);

      // health functions ---------------------------------------------------- //

      // map legend control -------------------------------------------------- //

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

      // map legend control -------------------------------------------------- //

      return () => {
        map.remove();
      };
    }
  }, [
    showNatCollection,
    showPowerLines,
    showTranLines,
    showParkDist,
    showParkTrails,
    showSolidWaste,
    showLakes,
    showSurface,
    showSinkhole,
    showBridge,
    showTree,
    showSoil,
    showRock,
    showGreenway,
    showHealth,
  ]);

  return <div id="map" className={classes.map}></div>;
}
