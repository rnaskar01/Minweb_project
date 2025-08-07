import { Range } from 'react-range';
import dayjs from 'dayjs';

interface TimelineSliderProps {
  values: [number, number]; // Tuple
  onChange: (val: [number, number]) => void;
}

export default function TimelineSlider({ values, onChange }: TimelineSliderProps) {
  const totalHours = 15 * 24; // 15 days before today = 360 hours
  const startDate = dayjs().subtract(15, 'day');

  // Defensive check: ensure values are within bounds
  const safeValues: [number, number] = [
    Math.max(0, Math.min(values[0], totalHours - 1)),
    Math.max(0, Math.min(values[1], totalHours - 1)),
  ];

  return (
    <div className="w-full px-6 py-6 rounded-lg bg-gray-700 shadow border-gray-700">
      <Range
        step={1}
        min={0}
        max={totalHours - 1}
        values={safeValues}
        onChange={(vals) => {
          // Ensure we always send back a tuple
          if (vals.length === 2) {
            onChange([vals[0], vals[1]]);
          }
        }}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="h-2 bg-cyan-700 rounded-full"
            style={{ ...props.style }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className="h-4 w-4 bg-green-400 rounded-full shadow"
            style={{ ...props.style }}
          />
        )}
      />
      <div className="mt-2 text-sm text-green-300">
        {safeValues.map(val =>
          startDate.add(val, 'hour').format('MMM D, HH:mm')
        ).join(' — ')}
      </div>
      <div className="flex justify-between text-xs text-slate-400 mt-1">
        <span>{startDate.format('MMM D')}</span>
        <span>{dayjs().format('MMM D')}</span>
      </div>
    </div>
  );
}
