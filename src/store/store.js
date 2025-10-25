import { configureStore } from "@reduxjs/toolkit";
import linkReducer from "./linkSlice.js"
import categoryReducer from "./categorySlice.js"

const store = configureStore({
    reducer: {
       links: linkReducer,
       categories: categoryReducer,
    }

})

export default store