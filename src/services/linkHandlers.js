import notification from "../components/ToastNotification.jsx";

const server = import.meta.env.VITE_SERVER;

// create Link
export async function createLinkHandler(body, addLinkStore, dispatch){
    try {
        const response = await fetch(`${server}/api/link/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body:JSON.stringify(body)
        })


        if(!response.ok){
            const error = await response.message;
            return notification(error, false)
        }

        const data = await response.json()
        console.log(data)
        dispatch(addLinkStore(data.link))

        notification("Link Created Successfully", true)
    } catch (error) {
        notification(error, false)
    } 
}


// update Link
export async function updateLinkHandler(body, linkId, editLinkStore, dispatch){
    try {
        const response = await fetch(`${server}/api/link/${linkId}/update`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body:JSON.stringify(body)
        })

        if(!response.ok){
            const error = await response.message;
            return notification(error, false)
        }
        const data = await response.json()
        dispatch( editLinkStore(data.link))
        
        notification("Link Edited Successfully", true)
    } catch (error) {
        notification(error, false)
    } 
}


// add Link to a category
export async function addLinkToCategory(linkId, categoryId, editLinkStore, dispatch){
    try {
        const response = await fetch(`${server}/api/link/${linkId}/add/${categoryId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        })

        if(!response.ok){
            const error = await response.message;
            return notification(error, false)
        }

        const data = await response.json()
        dispatch(editLinkStore(data.link))


       notification("Link Added to the Category", true)
    } catch (error) {
        notification(error, false)
    } 
}


// delete Link
export async function deleteLinkHandler(linkId, deleteLinkStore, dispatch){
    try {
        const response = await fetch(`${server}/api/link/${linkId}/delete`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        })

        if(!response.ok){
            const error = await response.message;
            return notification(error, false)
        }

        const data = await response.json()
        dispatch(deleteLinkStore(data.linkId))

        notification("Link Deleted Successfully", true)
    } catch (error) {
        notification(error, false)
    } 
}