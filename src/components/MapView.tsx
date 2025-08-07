import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  Polygon as LeafletPolygon,
  Tooltip,
} from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { useDispatch, useSelector } from 'react-redux';
import { addPolygon, removePolygon } from '../store/polygonSlice';
import type { RootState } from '../store';
import { v4 as uuidv4 } from 'uuid';

export default function MapView() {
  const dispatch = useDispatch();
  const polygons = useSelector((state: RootState) => state.polygons.polygons);

  const handlePolygonCreate = (e: any) => {
    const layer = e.layer;
    const latlngs = layer.getLatLngs()[0].map((latlng: any) => [latlng.lat, latlng.lng]);
    const id = uuidv4();

    dispatch(
      addPolygon({
        id,
        coordinates: latlngs,
        dataSource: 'temperature_2m',
        temperature: null,
        color: 'gray',
      })
    );
  };

  const handlePolygonDelete = (e: any) => {
  const layers = e.layers;

  layers.eachLayer((layer: any) => {
    const latlngs = layer.getLatLngs()[0].map((latlng: any) => [latlng.lat, latlng.lng]);

    // Match by coordinates — simple version
    const matchedPolygon = polygons.find(
      (poly) => JSON.stringify(poly.coordinates) === JSON.stringify(latlngs)
    );

    if (matchedPolygon) {
      dispatch(removePolygon(matchedPolygon.id));
    }
  });
};


  return (
    <MapContainer
      center={[22.57, 88.36]}
      zoom={14}
      scrollWheelZoom={false}
      attributionControl={false}
      className="w-full h-[500px] z-0 rounded-lg mb-2"
    >
      <TileLayer
        // attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={handlePolygonCreate}
          onDeleted={handlePolygonDelete}
          draw={{
            polygon: {
              allowIntersection: false,
              shapeOptions: { color: 'blue' },
              showArea: true,
              metric: true,
              guidelineDistance: 10,
            },
            polyline: false,
            circle: false,
            rectangle: false,
            circlemarker: false,
            marker: false,
          }}
        />
      </FeatureGroup>

      {polygons.map((poly) => (
        <LeafletPolygon
          key={poly.id}
          positions={poly.coordinates as [number, number][]}
          pathOptions={{
            color: poly.color,
            fillColor: poly.color,
            fillOpacity: 0.5,
          }}
        >
          <Tooltip sticky>
            <div>
              <p>ID: {poly.id.slice(0, 6)}</p>
              <p>Temp: {poly.temperature?.toFixed(2) ?? 'N/A'}°C</p>
              <p>Color: {poly.color}</p>
            </div>
          </Tooltip>
        </LeafletPolygon>
      ))}
    </MapContainer>
  );
}
