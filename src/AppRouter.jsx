import { BrowserRouter, Routes, Route } from "react-router-dom";
import Map from "./pages/Map";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth/Auth";
import Admin from "./pages/Auth/Admin";
import Authenticated from "./pages/Auth/Authenticated";
import TypeList from "./pages/Type/List";
import TypeEdit from "./pages/Type/Edit";
import StatusList from "./pages/Status/List";
import StatusEdit from "./pages/Status/Edit";
import CurrencyList from "./pages/Currency/List";
import CurrencyEdit from "./pages/Currency/Edit";
import PriceList from "./pages/Price/List";
import PriceEdit from "./pages/Price/Edit";
import PhotoList from "./pages/Photo/List";
import PhotoAdd from "./pages/Photo/Add";
import EstateList from "./pages/Estate/List";
import EstateEdit from "./pages/Estate/Edit";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/auth" element={<Auth />} />
        <Route element={<Authenticated />}>
          <Route path="*" element={<Home />} /> {/* page-not-found route */}
          <Route exact path="/prices" element={<PriceList />} />
          <Route exact path="/photos" element={<PhotoList />} />
          <Route exact path="/estates" element={<EstateList />} />
          <Route exact path="/map" element={<Map />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route element={<Admin />}>
            <Route exact path="/types" element={<TypeList />} />
            <Route exact path="/statuses" element={<StatusList />} />
            <Route exact path="/currencies" element={<CurrencyList />} />
            <Route exact path="/type/edit/:id?" element={<TypeEdit />} />
            <Route exact path="/status/edit/:id?" element={<StatusEdit />} />
            <Route
              exact
              path="/currency/edit/:id?"
              element={<CurrencyEdit />}
            />
          </Route>
          <Route exact path="/price/edit/:id?" element={<PriceEdit />} />
          <Route exact path="/photo/add" element={<PhotoAdd />} />
          <Route exact path="/estate/edit/:id?" element={<EstateEdit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
