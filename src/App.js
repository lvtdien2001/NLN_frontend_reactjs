import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes, adminRoutes } from './routes'

function App() {
  let routeUser = publicRoutes;
  if (true){
    routeUser = [...privateRoutes];
    routeUser = [...adminRoutes];
  }
  return (
    <Router>
      <div className="">
          <Routes>
            { routeUser.map((route, index) => {
              const Page = route.component;
              return (
                <Route key={index} path={route.path} element={<Page />} ></Route>
              )
            }
            
            ) }
          </Routes>
      </div>
    </Router>
  );
}

export default App;
