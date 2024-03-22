import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Details from "./components/Details";
import Register from "./pages/Register";
import Verification from "./pages/Verification";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Verified from "./pages/Verified";
import Edit from "./pages/Edit";
import AddProduct from "./pages/AddProduct";
import Products from "./components/Products";
import Product from "./pages/Product";
import Messages from "./pages/Messages";

const initialStatus = JSON.parse(localStorage.getItem("status"));

function App() {
  const [isLogin, setIsLogin] = useState(initialStatus?.isLogin ? true : false);

  useEffect(() => {
    localStorage.setItem("status", JSON.stringify({ isLogin }));
  }, [isLogin]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Root isLogin={isLogin} onSetIsLogin={setIsLogin} />}
        >
          <Route index element={<Home />} />
          <Route path="/verify" element={<Verification />} />
          <Route path="/verified" element={<Verified />} />
          <Route
            path="/details"
            element={<Details onSetIsLogin={setIsLogin} />}
          />
          <Route
            path="/register"
            element={<Register onSetIsLogin={setIsLogin} />}
          />
          <Route path="/products">
            <Route index element={<Products />} />
            <Route path="product/:id" element={<Product />} />
          </Route>
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/settings">
            <Route index element={<Settings />} />
            <Route path="edit" element={<Edit />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
