import Home from "./pages/Home";
import Auth from "./pages/Auth/Auth";
import Authenticated from "./pages/Auth/Authenticated";
import TypeList from "./pages/Type/List";
import TypeEdit from "./pages/Type/Edit";
import StatusList from "./pages/Status/List";
import StatusEdit from "./pages/Status/Edit";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/auth" element={<Auth />} />
        <Route element={<Authenticated />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/types" element={<TypeList />} />
          <Route exact path="/statuses" element={<StatusList />} />
          <Route exact path="/type/edit/:id?" element={<TypeEdit />} />
          <Route exact path="/status/edit/:id?" element={<StatusEdit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
