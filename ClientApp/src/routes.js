import Home from "./pages/Home";
import Places from "./pages/Places";
import Bands from "./pages/Bands";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Place from "./components/Place";
import Band from "./components/Band";
import User from "./pages/User";
import CreatePlace from "./pages/CreatePlace";
import Play from "./pages/Play";
import CreateBand from "./pages/CreateBand";
import CreateEvent from "./pages/CreateEvent";

var routes = [
    {
    path:"/create-event",
    name:"CreateEvent",
    component: CreateEvent
    },
    {
        path:"/play",
        name:"Play",
        component: Play
    },
    {
        path:"/create-band",
        name:"CreateBand",
        component: CreateBand
    },
    {
        path:"/create-place",
        name:"CreatePlace",
        component: CreatePlace
    },
    {
        path: "/places/:id",
        name: "Place",
        component: Place
    },
    {
        path: "/bands/:id",
        name: "Band",
        component: Band
    },
    {
        path:"/user/:id",
        name:User,
        component:User
    },
    {
        path: "/places",
        name: "Places",
        component: Places,
    },
    {
        path: "/bands",
        name: "Bands",
        component: Bands,
    },
    {
        path:"/register",
        name:"Register",
        component:Register
    },
    {
        path:"/login",
        name:"Login",
        component:Login
    },
    {
        path: "*",
        name: "Home",
        component: Home,
    }
]

export default routes;