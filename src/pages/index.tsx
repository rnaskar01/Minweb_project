import { useDispatch, useSelector } from "react-redux";
import TimelineSlider from "../components/TimelineSlider";
import MapView from "../components/MapView";
import Sidebar from "../components/Sidebar";
import type { RootState } from "../store";
import { setTimeRange } from "../store/timelineSlice";
import { updatePolygonValue, updatePolygonColor } from "../store/polygonSlice";
import { fetchTemperature } from "../utils/api";
import { getCentroid } from "../utils/geo";
import { getColorFromRules } from "../utils/color";
import { useEffect } from "react";
import dayjs from "dayjs";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const timeRange = useSelector((state: RootState) => state.timeline.timeRange);
  const polygons = useSelector((state: RootState) => state.polygons.polygons);
  const dataSource = useSelector((state: RootState) => state.dataSource);
// console.log(dataSource);

useEffect(() => {
  const updatePolygons = async () => {
    for (const polygon of polygons) {
      const [lat, lon] = getCentroid(polygon.coordinates);
      const start = dayjs().subtract(15, "day").add(timeRange[0], "hour");
      const end = dayjs().subtract(15, "day").add(timeRange[1], "hour");

      const temps = await fetchTemperature(
        lat,
        lon,
        start.format("YYYY-MM-DD"),
        end.format("YYYY-MM-DD")
      );

      let temperatureToUse: number;

      if (timeRange[1] - timeRange[0] > 1) {
        // Use average
        temperatureToUse = temps.length > 0
          ? temps.reduce((a, b) => a + b, 0) / temps.length
          : NaN;
      } else {
        // Use latest or first available temperature
        temperatureToUse = temps.length > 0 ? temps[0] : NaN;
      }

      if (!isNaN(temperatureToUse)) {
        const color = getColorFromRules(temperatureToUse, dataSource.rules);
        dispatch(updatePolygonValue({ id: polygon.id, temperature: temperatureToUse }));
        dispatch(updatePolygonColor({ id: polygon.id, color }));
      }
    }
  };

  updatePolygons();
}, [timeRange, polygons.length, dataSource.rules]);


  return (
    <div className="px-0 py-0 bg-gray-800">
      <TimelineSlider
        values={timeRange}
        onChange={(range: [number, number]) => dispatch(setTimeRange(range))}
      />
      <div className="flex gap-4 m-4 bg-gray-800">
        <div className="flex-[1]">
          <Sidebar />
        </div>
        <div className="flex-[3]">
          <MapView />
        </div>
      </div>
    </div>
  );
}
