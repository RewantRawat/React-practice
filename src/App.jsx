import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Practice1 from './Pages/Practice1';
import PeopleDirectory from './components/assesment';

const router = createBrowserRouter([
  {
    path:"practice1",
    element:<Practice1/>
  },
  {
    path:"assesment-react",
    element:<PeopleDirectory/>
  }
])
function App() {
  return (
 <>
 <RouterProvider router={router}/>
 </>
  )
}

export default App