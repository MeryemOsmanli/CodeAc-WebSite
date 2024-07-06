import './css/main.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { HelmetProvider } from "react-helmet-async";
import { DataContextProvider } from "./context/context";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import ROUTER from './router/index.router'

function App() {
  const routes = createBrowserRouter(ROUTER);

  useEffect(() => {

    // localStorage.setItem('theme',false) 
   }, [])
  return (
    <>
     <DataContextProvider>
        <HelmetProvider>
          <RouterProvider router={routes} />

          <Toaster />
        </HelmetProvider>
      </DataContextProvider>
    </>
  )
}

export default App
