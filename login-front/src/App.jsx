import { BrowserRouter, Routes, Route } from "react-router-dom";

import { routes } from "./routes.js";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, Element }) => (
          <Route path={path} key={path} element={<Element />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
