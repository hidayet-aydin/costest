import { createSlice } from "@reduxjs/toolkit";

export type collectionType = {
  kind: string;
  complexity: string;
  country: string;
  cavity: string;
  date: string;
  gf: string;
  thickness: number;
  x: number;
  y: number;
  z: number;
  cost: number;
};

const initialCollections = [] as collectionType[];

const collectionSlide = createSlice({
  name: "collection",
  initialState: {
    collections: initialCollections,
  },
  reducers: {
    setCollections: (state, action) => {
      const inputs = action.payload.inputs;
      const kinds = action.payload.kinds;
      for (let kind of Object.keys(kinds)) {
        state.collections.push({ ...inputs, kind, cost: kinds[kind] });
      }
    },
    clearCollections: (state, action) => {
      state.collections = [];
    },
  },
});

export const { setCollections, clearCollections } = collectionSlide.actions;
export default collectionSlide.reducer;
