import React, { useState, useEffect } from "react";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function App() {
  const [pointsData, setPointsData] = useState([]);
  const [polygonsData, setPolygonsData] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(null);
  useEffect(() => {
    // Initialize Leaflet map
    const map = L.map("map-container").setView([51.505, -0.09], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Fetch data from API
    fetchData(map);

    // Cleanup the map on unmount
    return () => {
      map.remove();
    };
  }, []);

  // Fetch Point and Polygon data from the API
  const fetchData = async map => {
    try {
      const pointsResponse = [
        { lat: 51.505, lon: -0.09, name: "Point 1" },
        { lat: 51.515, lon: -0.1, name: "Point 2" },
      ];
      const polygonsResponse = [
        {
          name: "Polygon 1",
          coordinates: [
            { lat: 51.505, lon: -0.09 },
            { lat: 51.515, lon: -0.1 },
            { lat: 51.525, lon: -0.11 },
            { lat: 51.515, lon: -0.12 },
            { lat: 51.505, lon: -0.09 },
          ],
        },
        {
          name: "Polygon 2",
          coordinates: [
            { lat: 51.535, lon: -0.08 },
            { lat: 51.545, lon: -0.09 },
            { lat: 51.555, lon: -0.1 },
            { lat: 51.545, lon: -0.11 },
            { lat: 51.535, lon: -0.08 },
          ],
        },
        {
          name: "Polygon 3",
          coordinates: [
            { lat: 51.505, lon: -0.09 },
            { lat: 51.515, lon: -0.1 },
            { lat: 51.525, lon: -0.11 },
            { lat: 51.515, lon: -0.12 },
            { lat: 51.505, lon: -0.09 },
          ],
        },
        {
          name: "Polygon 4",
          coordinates: [
            { lat: 51.505, lon: -0.09 },
            { lat: 51.515, lon: -0.1 },
            { lat: 51.525, lon: -0.11 },
            { lat: 51.515, lon: -0.12 },
            { lat: 51.505, lon: -0.09 },
          ],
        },
        {
          name: "Polygon 5",
          coordinates: [
            { lat: 38.505, lon: -0.09 },
            { lat: 38.515, lon: -0.1 },
            { lat: 38.525, lon: -0.11 },
            { lat: 38.515, lon: -0.12 },
            { lat: 38.505, lon: -0.09 },
          ],
        },
        {
          name: "Polygon 6",
          coordinates: [
            { lat: 49.505, lon: -0.09 },
            { lat: 49.515, lon: -0.1 },
            { lat: 49.525, lon: -0.11 },
            { lat: 49.515, lon: -0.12 },
            { lat: 49.505, lon: -0.09 },
          ],
        },
      ];

      const points = pointsResponse;
      const polygons = polygonsResponse;

      setPointsData(points);
      setPolygonsData(polygons);

      // Add Point markers to the map
      points.forEach(point => {
        const { lat, lon, name } = point;
        const marker = L.marker([lat, lon]).addTo(map);
        marker.bindPopup(`<b>${name}</b><br>Lat: ${lat}, Lon: ${lon}`);
        marker.on("click", () => handleFeatureClick(point));
      });

      // Add Polygons to the map
      polygons.forEach(polygon => {
        const latLngs = polygon.coordinates.map(coord => [
          coord.lat,
          coord.lon,
        ]);
        const polygonLayer = L.polygon(latLngs).addTo(map);
        polygonLayer.bindPopup(`<b>${polygon.name}</b>`);
        polygonLayer.on("click", () => handleFeatureClick(polygon));
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFeatureClick = feature => {
    setSelectedFeature(feature);
  };

  return (
    <div className="App">
      <div id="map-container" style={{ height: "600px", width: "100%" }}></div>

      {selectedFeature && (
        <div className="feature-card">
          <h3>Feature Details</h3>
          <p>
            <strong>Name:</strong> {selectedFeature.name}
          </p>
          {selectedFeature.coordinates ? (
            <>
              <p>
                <strong>Coordinates:</strong>
              </p>
              <ul>
                {selectedFeature.coordinates.map((coord, index) => (
                  <li key={index}>
                    Lat: {coord.lat}, Lon: {coord.lon}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <p>
                <strong>Location:</strong> Lat: {selectedFeature.lat}, Lon:{" "}
                {selectedFeature.lon}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
