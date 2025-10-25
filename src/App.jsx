import Router from "./routes/Router"
import { ToastContainer } from "react-toastify"
import LoadingState from "./components/LoadingState"

function App() {

  return (
    <>
      <Router/>
      <LoadingState/>
      <ToastContainer/>
    </>
  )
}

export default App
