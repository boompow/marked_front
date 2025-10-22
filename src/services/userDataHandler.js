import notification from "../components/ToastNotification";

const server = import.meta.env.VITE_SERVER;


export async function getUserData(){
    try {
      const response = await fetch(`${server}/api/user/data`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })

      if(!response.ok){
              const error = await response.message;
              return notification(error, false)
          }

          const data = await response.json()
          
          // extracting the links and categories from the response
          const {links, categories} = data.data

          return({links, categories})
           
    } catch (error) {
     return notification(error, false)
    } 
  }
