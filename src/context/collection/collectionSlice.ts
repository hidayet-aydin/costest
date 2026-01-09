import { createSlice } from "@reduxjs/toolkit";

export type collectionType = {
  complexity: string;
  country: string;
  cavity: string;
  date: string;
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
      state.collections.push(action.payload);
    },
    clearCollections: (state, action) => {
      state.collections = [];
    },
  },
});

export const { setCollections } = collectionSlide.actions;
export default collectionSlide.reducer;
