import { createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


interface TimelineState {
  // Indexes (0–719 for 30 days hourly resolution)
  timeRange: [number, number]; // dual-ended slider
}

const initialState: TimelineState = {
  timeRange: [360, 370], // Example: middle 10 hours
};

const timelineSlice = createSlice({
  name: 'timeline',
  initialState,
  reducers: {
    setTimeRange(state, action: PayloadAction<[number, number]>) {
      state.timeRange = action.payload;
    },
  },
});

export const { setTimeRange } = timelineSlice.actions;
export default timelineSlice.reducer;
