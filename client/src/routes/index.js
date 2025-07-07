import { createBrowserRouter } from "react-router-dom"
import App from             "../App";  
import Home from            "../pages/Home";
import Login from           "../pages/auth/Login";
import ForgotPassword from  "../pages/auth/ForgotPassword";
import SignUp from          "../pages/auth/SignUp";
import AdminPanel from      "../pages/admin/AdminPanel";
import AllUsers from        "../pages/admin/AllUsers";
import AllProducts from     "../pages/products/AllProducts";
import CategoryProduct from "../pages/products/CategoryProduct";
import ProductDetails from  "../pages/products/ProductDetails";
import Cart from            "../pages/Cart";

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element: <Home/>
            },
            {
                path : "login",
                element: <Login/>
            },
            {
                path : "forgot-password",
                element: <ForgotPassword/>
            },
            {
                path : "sign-up",
                element: <SignUp/>
            },
            {
                path : "product-category/:categoryName",
                element: <CategoryProduct/>
            },
            {
                path : "product/:id",
                element: <ProductDetails/>
            },
            {
                path : "cart",
                element: <Cart/>
            },
            {
                path : "admin-panel",
                element: <AdminPanel/>,
                children : [
                    {
                        path : "all-users",
                        element: <AllUsers/>
                    },
                    {
                        path: "all-products",
                        element: <AllProducts/>
                    }
                ]
            }   
        ]
    }
])

export default router