// src/store/dataSourceSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ColorRule {
  operator: string;     // e.g. "<", ">", "between"
  value1: number;
  value2?: number;
  color: string;
}

interface DataSourceState {
  field: string; // e.g. "temperature_2m"
  rules: ColorRule[];
}

const initialState: DataSourceState = {
  field: 'temperature_2m',
  rules: [
    { operator: '<', value1: 10, color: 'red' },
    { operator: 'between', value1: 10, value2: 25, color: 'blue' },
    { operator: '>=', value1: 25, color: 'green' },
  ],
};

const dataSourceSlice = createSlice({
  name: 'dataSource',
  initialState,
  reducers: {
    setField(state, action: PayloadAction<string>) {
      state.field = action.payload;
    },
    setRules(state, action: PayloadAction<ColorRule[]>) {
      state.rules = action.payload;
    },
    addRule(state, action: PayloadAction<ColorRule>) {
      state.rules.push(action.payload);
    },
    updateRule(state, action: PayloadAction<{ index: number; rule: ColorRule }>) {
      state.rules[action.payload.index] = action.payload.rule;
    },
    removeRule(state, action: PayloadAction<number>) {
      state.rules.splice(action.payload, 1);
    },
  },
});

export const { setField, setRules, addRule, updateRule, removeRule } = dataSourceSlice.actions;
export default dataSourceSlice.reducer;
