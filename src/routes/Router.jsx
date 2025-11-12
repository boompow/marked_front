import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import CategoryOutlet from "../components/CategoryOutlet";
import UncategorizedOutlet from "../components/UncatagorizedOutlet";
import GoogleCallback from "../services/googleCallbackHnadler";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/dashboard" element={<Dashboard/>}>
        <Route index element={<UncategorizedOutlet/>}/>
        <Route path="/dashboard/:categoryId" element={<CategoryOutlet/>}/>
      </Route>
      <Route path="/*" element={<NotFound/>}/>
      <Route path="/auth/callback/google" element={<GoogleCallback/>}/>
    </Routes>
  )
}

export default Router
