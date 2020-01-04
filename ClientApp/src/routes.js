import { Home } from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

var routes = [
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