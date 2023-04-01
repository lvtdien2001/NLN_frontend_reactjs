import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes, adminRoutes, privateRoutes } from './routes';
import DefaultHeader from "./components/Header/DefaultHeader";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import AdminRoute from "./components/routing/AdminRoute";
import { useContext } from "react";
import { MessageContext } from "./context/MessageContext";
import CustomToast from "./components/CustomToast";

function App() {
  const { inforMessage} = useContext(MessageContext)
 
  return (
    <Router>
      <CustomToast type={inforMessage.type} title={inforMessage.title} description={inforMessage.description} />
      <div>
          <DefaultHeader />
          <main className="container">
            <Routes>
              { publicRoutes.map((route, index) => {
                  const Page = route.component;
                  return (
                    <Route key={index} path={route.path} element={Page} ></Route>
                  )
                }
            
              )}
               { privateRoutes.map((route, index) => {
                  const Page = route.component;
                  return (
                    <Route key={index} path={route.path} element={<ProtectedRoute>{Page}</ProtectedRoute>} ></Route>
                  )
                }
            
              )}
               {adminRoutes.map((route, index) => {
                  const Page = route.component;
                  return (
                    <Route key={index} path={route.path} element={<AdminRoute>{Page}</AdminRoute> } ></Route>
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
