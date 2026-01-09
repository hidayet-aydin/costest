import { configureStore } from "@reduxjs/toolkit";

import collectionSlice from "./collection/collectionSlice";

export default configureStore({
  reducer: {
    collection: collectionSlice,
  },
});
