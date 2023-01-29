import { createBrowserRouter } from "react-router-dom"
import Main from "../../Layout/Main"
import Bill from "../../Pages/Bill/Bill";
import Home from "../../Pages/Home/Home"
import Login from "../../Pages/Login/Login";
import Signup from "../../Pages/Login/Signup";

const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/bill',
            element:<Bill></Bill>
        },
        {
            path:'/signup',
            element:<Signup></Signup>
        },
        ]
    }
])

export default router;