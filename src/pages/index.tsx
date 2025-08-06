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

        if (temps.length > 0) {
          const avg = temps.reduce((a, b) => a + b, 0) / temps.length;
          const color = getColorFromRules(avg, dataSource.rules);
          dispatch(updatePolygonValue({ id: polygon.id, temperature: avg }));
          dispatch(updatePolygonColor({ id: polygon.id, color }));
        }
      }
    };

    updatePolygons();
  }, [timeRange, polygons.length, dataSource.rules]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TimelineSlider
          values={timeRange}
          onChange={(range: [number, number]) => dispatch(setTimeRange(range))}
        />
        <MapView />
      </div>
    </div>
  );
}
