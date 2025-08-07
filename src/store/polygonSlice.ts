import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';


type Polygon = {
  id: string;
  coordinates: number[][];
  dataSource: string;
  temperature: number | null;
  color: string;
};

interface PolygonState {
  polygons: Polygon[];
}

const initialState: PolygonState = {
  polygons: [],
};

const polygonSlice = createSlice({
  name: "polygons",
  initialState,
  reducers: {
    addPolygon(state, action: PayloadAction<Polygon>) {
      state.polygons.push(action.payload);
    },
    updatePolygonValue(
      state,
      action: PayloadAction<{ id: string; temperature: number }>
    ) {
      const poly = state.polygons.find((p) => p.id === action.payload.id);
      if (poly) {
        poly.temperature = action.payload.temperature;
      }
    },
    updatePolygonColor(
      state,
      action: PayloadAction<{ id: string; color: string }>
    ) {
      const poly = state.polygons.find((p) => p.id === action.payload.id);
      if (poly) {
        poly.color = action.payload.color;
      }
    },
    removePolygon(state, action: PayloadAction<string>) {
      state.polygons = state.polygons.filter((poly) => poly.id !== action.payload);
    },
  },
});

export const { addPolygon, updatePolygonValue, updatePolygonColor,removePolygon } = polygonSlice.actions;
export default polygonSlice.reducer;
