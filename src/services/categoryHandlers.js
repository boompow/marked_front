import notification from "../components/ToastNotification.jsx";

const server = import.meta.env.VITE_SERVER;

// create category
export async function createCategoryHandler(body, addCategoryStore, dispatch){
    try {
        const response = await fetch(`${server}/api/category/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body:JSON.stringify(body)
        })

         const data = await response.json()

        if(!response.ok){
            const error = data.message;
            return notification(error, false)
        }
        dispatch(addCategoryStore(data.category))

        return notification("Category Created Successfully", true)
    } catch (error) {
        return notification(error, false)
    }
}

// get category
export async function getCategory(categoryId){
    try {
        const response = await fetch(`${server}/api/category/${categoryId}/get`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        })

        const data = await response.json()

        if(!response.ok){
            const error = await data.message;
            return notification(error, false)
        }

        return data
    } catch (error) {
        return notification(error, false)
    }
}



// update category
export async function updateCategoryHandler(body, categoryId, editCategoryStore, dispatch){
    try {
        const response = await fetch(`${server}/api/category/${categoryId}/update`, {
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
        dispatch( editCategoryStore(data.category))

        return notification("Category Updated Successfully", true)
    } catch (error) {
        return notification(error, false)
    }
}


// delete category
export async function deleteCategoryHandler(categoryId, navigate, deleteCategoryStore, dispatch){
    try {
        const response = await fetch(`${server}/api/category/${categoryId}/delete`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        })

        if(!response.ok){
            const error = await response.message;
            return notification(error, false)
        }

        const data = await response.json()
        dispatch(deleteCategoryStore(data.categoryId))

        navigate("/dashboard")
        return notification("Category Deleted Successfully", true)
    } catch (error) {
        return notification(error, false)
    }
}