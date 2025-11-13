import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Practice1 from './Pages/Practice1';
import PeopleDirectory from './components/assesment';
import Pratcice2 from './Pages/Practice2';

const router = createBrowserRouter([
  {
    path:"practice1",
    element:<Practice1/>
  },
  {
    path:"assesment-react",
    element:<PeopleDirectory/>
  },
  {
    path:"practice2",
    element:<Pratcice2/>
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