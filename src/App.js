import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import LogIn from "./pages/LogIn/LogIn";
import Dashboard from "./pages/Dashboard/Dashboard";
//import { Sidebar } from "./Components/SideBar/Sidebar";
//import { Sales } from "./pages/Sales/Sales";

import { SaleInvoice } from "./pages/SaleInvoice/SaleInvoice";
import PurchaseInvoice from "./pages/PurchaseInvoice/PurchaseInvoice";
import Store from "./pages/Store/Store";
import MainLayout from "./pages/MainLayout/MainLayout";
import { PurchaseRecord } from "./pages/PurchaseRecord/PurchaseRecord";
import { SalesRecord } from "./pages/SalesRecord/SalesRecord";
import { SourceCoding } from "./pages/SourceCoding/SourceCoding";
import { Treasury } from "./pages/Treasury/Treasury";
import { Payments } from "./pages/Payments/Payments";
import AuthContextProvider from "./Context/AuthContext";
import { AuthContext } from "./Context/AuthContext";
import { useContext } from "react";
import { createContext } from "react";
import { useEffect, useState } from "react";

export const loginContext = createContext();
function App() {
  //const { isLoggedIn } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("log"));
  // const isLoggedIn = true;

  const isLoggedFunc = (val) => {
    setIsLoggedIn(val);
  };

  // let routes = (
  //   <Routes>
  //     <Route path="/" element={<LogIn isLogged={isLoggedFunc} />} />
  //     <Route path="*" element={<Navigate to="/" replace />} />
  //   </Routes>
  // );

  // if (isLoggedIn) {
  //   routes = (
  //     <Routes>
  //       <Route
  //         path="/dashboard"
  //         element={<Dashboard isLogged={isLoggedFunc} />}
  //       />
  //       <Route
  //         path="/saleInvoice"
  //         element={<SaleInvoice isLogged={isLoggedFunc} />}
  //       />

  //       <Route path="/saleInvoice/:id" element={<SaleInvoice />} />

  //       <Route path="/purchaseInvoice" element={<PurchaseInvoice />} />
  //       <Route path="/purchaseInvoice/:id" element={<PurchaseInvoice />} />

  //       <Route path="/store" element={<Store />} />
  //       <Route path="*" element={<Navigate to="/dashboard" replace />} />

  //       <Route path="*" element={<Navigate to="/dashboard" replace />} />

  //       <Route path="/mainLayOut" element={<MainLayout />} />
  //       <Route path="/purchaseRecord" element={<PurchaseRecord />} />
  //       <Route
  //         path="/salesRecord"
  //         element={<SalesRecord isLogged={isLoggedFunc} />}
  //       />
  //       <Route path="/sourceCoding" element={<SourceCoding />} />
  //       <Route path="/treasury" element={<Treasury />} />
  //       <Route path="/payments" element={<Payments />} />
  //     </Routes>
  //   );
  // }
  return (
    <div className="App">
      {/* <Router>
        <AuthContextProvider>{routes}</AuthContextProvider>
      </Router> */}
      <Router>
        <loginContext.Provider value={isLoggedFunc}>
          {isLoggedIn ? (
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/saleInvoice" element={<SaleInvoice />} />

              <Route path="/saleInvoice/:id" element={<SaleInvoice />} />

              <Route path="/purchaseInvoice" element={<PurchaseInvoice />} />
              <Route
                path="/purchaseInvoice/:id"
                element={<PurchaseInvoice />}
              />

              <Route path="/store" element={<Store />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />

              <Route path="*" element={<Navigate to="/dashboard" replace />} />

              {/* <Route path="/mainLayOut" element={<MainLayout />} /> */}

              <Route path="/purchaseRecord" element={<PurchaseRecord />} />
              <Route path="/salesRecord" element={<SalesRecord />} />
              <Route path="/sourceCoding" element={<SourceCoding />} />
              <Route path="/treasury" element={<Treasury />} />
              <Route path="/payments" element={<Payments />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<LogIn isLogged={isLoggedFunc} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          )}
        </loginContext.Provider>
      </Router>
    </div>
  );
}

export default App;
