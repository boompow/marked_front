import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        categories: []
    }

const categorySlice = createSlice({
   name:"categories",
   initialState,
   reducers:{
    updateCategoriesArray: (state, actions)=>{
        state.categories = actions.payload
    },

    addCategoryStore: (state, actions)=>{
        state.categories = [...state.categories, actions.payload]
    },

    deleteCategoryStore: (state, actions)=>{
        console.log(actions)
        state.categories = state.categories.filter(category=>category?._id !== actions.payload)
    },

    editCategoryStore: (state, actions)=>{
        state.categories = state.categories.map(
            category=> 
            category?._id === actions.payload?._id ?
            {...category, ...actions.payload}
            :category
            
        )
   }

}})

export const {updateCategoriesArray, editCategoryStore, deleteCategoryStore, addCategoryStore} = categorySlice.actions

export default categorySlice.reducer;