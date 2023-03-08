import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from './routes';
import DefaultHeader from "./components/Header/DefaultHeader";

function App() {
  var routeUser = publicRoutes;
  // if (true){
  //   routeUser = [...privateRoutes];
  //   routeUser = [...adminRoutes];
  // }
  return (
    <Router>
      <div>
          <DefaultHeader />
          <main className="container">
            <Routes>
              { routeUser.map((route, index) => {
                  const Page = route.component;
                  return (
                    <Route key={index} path={route.path} element={<Page />} ></Route>
                  )
                }
            
              )}
            </Routes>
          </main>
      </div>
    </Router>
  );
}

export default App;
