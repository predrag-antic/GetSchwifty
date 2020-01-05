import Home from "./pages/Home";
import Places from "./pages/Places";
import Bands from "./pages/Bands";

var routes = [
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
        path: "*",
        name: "Home",
        component: Home,
    }
]

export default routes;