import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        links: []
    }

const linkSlice = createSlice({
   name:"links",
   initialState,
   reducers:{
    updateLinksArray: (state, actions)=>{
        state.links = actions.payload
    },

    addLinkStore: (state, actions)=>{
        state.links = [...state.links, actions.payload]
    },

    editLinkStore: (state, actions)=>{
        state.links = state.links.map(link=>
            link?._id === actions.payload?._id ?
                {...link, ...actions.payload}
            : link
        )
    },

    deleteLinkStore: (state, actions)=>{
        state.links = state.links.filter(link => link?._id !== actions.payload)
    }
   }

})

export const {updateLinksArray, editLinkStore, deleteLinkStore, addLinkStore} = linkSlice.actions

export default linkSlice.reducer;