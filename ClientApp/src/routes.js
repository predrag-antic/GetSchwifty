import { Home } from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import User from "./pages/User";

var routes = [
    {
        path:"/user/:id",
        name:User,
        component:User
    },
    {
        path:"/register",
        name:Register,
        component:Register
    },
    {
        path:"/login",
        name:Login,
        component:Login
    },
    {
        path: "*",
        name: "Home",
        component: Home,
    }
]

export default routes;