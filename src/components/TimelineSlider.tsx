// TimelineSlider.tsx
import { Range } from 'react-range';
import dayjs from 'dayjs';

interface TimelineSliderProps {
  values: [number, number]; // tuple of 2 numbers
  onChange: (val: [number, number]) => void;
}

export default function TimelineSlider({ values, onChange }: TimelineSliderProps) {
  return (
    <div className="p-4">
      <Range
        step={1}
        min={0}
        max={30 * 24 - 1} // 720 hours for 30 days
        values={values}
        onChange={(vals) => {
          // Force to tuple to satisfy types
          onChange([vals[0], vals[1]]);
        }}
        renderTrack={({ props, children }) => (
          <div {...props} className="h-2 bg-gray-300 rounded-full">{children}</div>
        )}
        renderThumb={({ props }) => (
          <div {...props} className="h-4 w-4 bg-blue-500 rounded-full" />
        )}
      />
      <div className="mt-2 text-sm">
        {values.map(val => dayjs().subtract(15, 'day').add(val, 'hour').format('MMM D, HH:mm')).join(' — ')}
      </div>
    </div>
  );
}
