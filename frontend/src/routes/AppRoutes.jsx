
import SearchPanel from 'views/search/SearchPanel';

const AppRoutes = [
  {
    path: "/search",
    appbarName: "LNA - Search",
    component: SearchPanel
  },
  { 
    redirect: true, 
    path: "/", 
    to: "/search", 
    appbarName: "Redirect"
   }
]

export default AppRoutes;